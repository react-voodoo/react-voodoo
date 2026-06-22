/*
 * @author : Nathanael BRAUN <pp9ping@gmail.com>
 *
 * Copyright 2026 Nathanael BRAUN
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as easingFn                                          from "d3-ease";
import deepEqual                                              from "fast-deep-equal";
import is                                                     from "is";
import React                                                  from "react";
import {clearTweenableValue, deMuxLine, deMuxTween, muxToCss} from "../utils/css";
import tweenAxis
                                                              from "../utils/CssTweenAxis";
import domUtils                                               from "../utils/dom";
import Inertia                                                from '../utils/inertia';
import { prefersReducedMotion }                               from '../utils/motionPrefs';

/**
 * Tweener — the central animation engine for react-voodoo.
 *
 * Responsibilities:
 *  - Owns all registered node state: numeric interpolatable values (`tweenRefMaps`),
 *    CSS string cache (`tweenRefCSS`), demuxer registries (`muxByTarget`, `muxDataByTarget`).
 *  - Drives scroll axes: each Axis registers a CssTweenAxis timeline here; on each
 *    scroll event `goTo(pos, tweenRefMaps)` emits deltas directly into tweenRefMaps.
 *  - Writes CSS to the DOM directly, bypassing React's render loop entirely, via
 *    `_updateTweenRefs()` → `node.style[prop] = value` (or setAttribute for SVG attrs).
 *  - Is distributed to all descendants via TweenerContext so that Node, Axis, and
 *    Draggable can find the nearest engine without prop-drilling.
 *
 * Tweener is a PURE engine class — it does not extend React.Component and is never
 * rendered. Hosts own its lifecycle and call the lifecycle-named methods manually:
 *  - `useVoodoo` instantiates it and drives componentDidMount/WillUnmount from effects
 *  - `asTweener` wraps it in a thin TweenerHost function component that also maps the
 *    parent engine from TweenerContext (the role the legacy render() used to play)
 * All mutable animation state lives in `this._` (see constructor).
 */

let isBrowserSide           = (new Function("try {return this===window;}catch(e){ return false;}"))(),
    isArray                 = is.array,
    _live, lastTm, _running = [];

/**
 * Build a plain style object from a tweenRefCSS map, filtering out SVG geometry
 * attribute entries (keys prefixed with "attr_") that are applied via setAttribute
 * and must not appear in a React style prop.
 */
function toStyleProp( css ) {
	const s = {};
	for ( const k in css )
		if ( k.length < 5 || k[0] !== 'a' || k[1] !== 't' || k[2] !== 't' || k[3] !== 'r' || k[4] !== '_' )
			s[k] = css[k];
	return s;
}

/**
 * Runner — a module-level setTimeout-based timer shared across all Tweener instances.
 *
 * This is NOT the per-frame RAF loop. Its job is to drive time-based animations:
 *  - `pushAnim()` one-shot timelines
 *  - `scrollTo(pos, ms)` eased scroll transitions via `_runScrollGoTo`
 *
 * RAF (`requestAnimationFrame`) is used separately in `_rafLoop` only for the
 * per-frame DOM write pass that flushes accumulated deltas to node.style.
 */
const Runner = {
	/**
	 * Enqueue a new animation. Resets the timeline to position 0, then starts
	 * ticking at ~16ms intervals until all queued animations complete.
	 */
	run  : function ( tl, ctx, duration, cb ) {
		let apply = ( pos, size ) => tl.go(pos / size, ctx);
		_running.push({ apply, duration, cpos: 0, cb });
		tl.go(0, ctx, true);//reset tl

		if ( !_live ) {
			_live  = true;
			lastTm = Date.now();
			setTimeout(this._tick, 16);
		}
	},
	/**
	 * Advance each running animation by elapsed ms. Animations that reach their
	 * full duration are completed (callback fired) and removed from the queue.
	 * The loop stops itself when the queue is empty.
	 */
	_tick: function _tick() {
		let i  = 0, o, tm = Date.now(), delta = tm - lastTm;
		lastTm = tm;
		for ( ; i < _running.length; i++ ) {
			_running[i].cpos = Math.min(delta + _running[i].cpos, _running[i].duration);//cpos
			_running[i].apply(
				_running[i].cpos, _running[i].duration
			);
			if ( _running[i].cpos == _running[i].duration ) {

				_running[i].cb && setTimeout(_running[i].cb);
				_running.splice(i, 1), i--;
			}

		}
		if ( _running.length )
			setTimeout(_tick, 16);
		else {
			_live = false;
		}
	},
};
export default class Tweener {

	axes                 = {};
	_scrollWatcherByAxis = {};

	// ------------------------------------------------------------
	// -------------------- TweenRefs utils -----------------------
	// ------------------------------------------------------------

	// Scratch buffer reused every RAF frame by _updateTweenRef to avoid allocations
	_swap = {};

	/**
	 * All mutable animation state is stored in `this._` rather than directly on
	 * the instance or in React state. This prevents React's reconciler from
	 * touching it during re-renders, and avoids the overhead of setState for
	 * changes that are written straight to the DOM anyway.
	 *
	 * Key sub-objects:
	 *  - `_.tweenRefMaps[id]`    — numeric additive values per node (the hot path)
	 *  - `_.tweenRefCSS[id]`     — last-written CSS string values per node
	 *  - `_.muxByTarget[id]`     — active demuxer instances per CSS property per node
	 *  - `_.muxDataByTarget[id]` — per-target mux metadata (ref counts, unit info)
	 *  - `_.tweenRefOrigin[id]`  — snapshot of initial numeric values at registration time
	 *  - `_.runningAnims`        — pushAnim timelines currently being ticked
	 *  - `_.refs[id]`            — DOM node references set by the ref callback on each Node
	 */
	constructor( props ) {
		this.props            = props;
		let _                 = this._ = {
			refs       : {},
			muxByTarget: {},
		};
		_.box                 = {
			x: 100,
			y: 100,
			z: 800
		};
		this.__isTweener      = true;
		_._rafLoop            = this._rafLoop.bind(this);
		_.rootRef             = this.props.forwardedRef || React.createRef();
		_.options             = {
			maxClickTm    : 200,
			maxClickOffset: 5,
			...(props.tweenerOptions || {})
		};
		_.tweenRefCSS         = {};
		_.tweenRefs           = {};
		_.tweenRefMaps        = {};
		_.iMapOrigin          = {};
		_.tweenRefInitialData = {};
		_.tweenEnabled        = true;
		_.tweenRefOrigin      = {};
		_.tweenRefOriginCss   = {};
		_.muxDataByTarget     = _.muxDataByTarget || {};
		_.tweenRefDemuxed     = _.tweenRefDemuxed || {};
		_.tweenRefTargets     = _.tweenRefTargets || [];
		_.runningAnims        = _.runningAnims || [];
		
		_.scrollHook          = [];
		_.activeInertia       = [];
		_.defaultAxesPosition = props.tweenerOptions?.defaultAxesPosition;
		// note: side effects (tweenerOptions.ref callback, window resize listener)
		// live in componentDidMount — hosts may construct engines during render
		// passes that never commit (StrictMode, concurrent rendering), so the
		// constructor must stay pure.
	}
	
	/**
	 * Register (or re-register) an animatable node.
	 *
	 * First call: allocates `tweenRefMaps[id]` with numeric initial values derived
	 * from `iMap` via deMuxTween. The resulting demuxer instances are stored in
	 * `muxByTarget[id]` so the same parsers are reused on every subsequent frame.
	 *
	 * Subsequent calls with a changed `iMap` or `iStyle`: hot-swaps the initial
	 * offset so any running animation deltas are preserved. The algorithm:
	 *   1. Subtracts the old origin from tweenRefMaps (undoes previous baseline).
	 *   2. Re-demuxes the new iMap to get a fresh tweenableMap.
	 *   3. Adds the new tweenableMap to tweenRefMaps (applies new baseline).
	 * This keeps in-flight animations (whose deltas are already accumulated in
	 * tweenRefMaps) intact through style prop changes.
	 *
	 * Returns `{ style, ref }` — style is the initial CSS for React's first render;
	 * ref is a callback that stores the DOM node into `_.refs[id]` for direct writes.
	 */
	tweenRef( id, iStyle = {}, iMap = {}, pos, ref, noref, mapReset ) {// ref initial style
		
		
		let _            = this._,
		    tweenableMap = {};
		
		let initials = {};
		if ( !_.tweenRefs[id] )
			_.tweenRefTargets.push(id);
		
		if ( _.tweenRefs[id] && (// if node exist hot switch initial values
			mapReset
			|| (_.iMapOrigin[id] !== iMap || !deepEqual(iMap, _.iMapOrigin[id]))
			|| (_.tweenRefOriginCss[id] !== iStyle || !deepEqual(iStyle, _.tweenRefOriginCss[id]))
		) ) {
			
			//console.warn('ref exist & style is !==', id, iStyle,
			//             _.tweenRefOriginCss[id], mapReset)
			_.iMapOrigin[id]        = iMap;
			_.tweenRefOriginCss[id] = iStyle;
			iStyle                  = iStyle || {};
			iMap                    = iMap || {};
			
			
			iStyle = { ...iStyle, ...deMuxTween(iMap, tweenableMap, initials, _.muxDataByTarget[id], _.muxByTarget[id], false, true) };
			
			//console.log("update ref", id)
			
			// minus initial values
			Object.keys(_.tweenRefOrigin[id])
			      .forEach(
				      key => (_.tweenRefMaps[id][key] -= _.tweenRefOrigin[id][key])
			      );
			// set defaults values in case of
			Object.keys(initials)
			      .forEach(
				      key => (_.tweenRefMaps[id][key] = is.number(_.tweenRefMaps[id][key])
				                                        ? _.tweenRefMaps[id][key]
				                                        : initials[key])
			      );
			// add new initial values
			Object.keys(tweenableMap)
			      .forEach(
				      key => (_.tweenRefMaps[id][key] += tweenableMap[key])
			      );
			
			Object.keys(_.tweenRefOrigin[id])// unset
			      .forEach(
				      key => {
					      clearTweenableValue(key, key, _.tweenRefMaps[id], _.tweenRefCSS[id], _.muxDataByTarget[id], _.muxByTarget[id])
				      }
			      );
			Object.keys(_.tweenRefCSS[id])// unset not tweened
			      .forEach(
				      key => {
					      if ( _.tweenRefCSS[id][key] && !_.muxByTarget[id][key] && !iStyle[key] )
						      delete _.tweenRefCSS[id][key];
				      }
			      );
			Object.keys(iStyle)// reset not tweened
			      .forEach(
				      key => {
					      if ( _.tweenRefCSS[id][key] !== iStyle[key] && !_.muxByTarget[id][key] )
						      _.tweenRefCSS[id][key] = iStyle[key];
				      }
			      );
			_.tweenRefOrigin[id] = { ...tweenableMap };
			
			muxToCss(_.tweenRefMaps[id], _.tweenRefCSS[id], _.muxByTarget[id], _.muxDataByTarget[id], _.box);
			this._updateTweenRef(id, true);
		}
		else if ( !_.tweenRefs[id] ) {
			//console.log("init ref", id)
			
			_.iMapOrigin[id] = iMap;
			iStyle           = iStyle || {};
			iMap             = iMap || {};
			
			_.tweenRefs[id]       = true;
			_.muxByTarget[id]     = _.muxByTarget[id] || {};
			_.muxDataByTarget[id] = _.muxDataByTarget[id] || {};
			
			_.tweenRefOriginCss[id] = iStyle;
			
			_.tweenRefMaps[id] = _.tweenRefMaps[id] || {};
			if ( _.tweenRefOrigin[id] ) {
				iStyle = { ...iStyle, ...deMuxTween(iMap, tweenableMap, initials, _.muxDataByTarget[id], _.muxByTarget[id], false, true) };
				
				//// set defaults values in case of
				Object.keys(initials)
				      .forEach(
					      key => (_.tweenRefMaps[id][key] = is.number(_.tweenRefMaps[id][key])
					                                        ? _.tweenRefMaps[id][key] - initials[key]
					                                        : 0)
				      );
				//// add new initial values
				Object.keys(tweenableMap)
				      .forEach(
					      key => (_.tweenRefMaps[id][key] += tweenableMap[key])
				      );
			}
			else {
				iStyle = { ...iStyle, ...deMuxTween(iMap, tweenableMap, initials, _.muxDataByTarget[id], _.muxByTarget[id]) };
				
				
				// init / reset or get the tweenable view
				tweenableMap = Object.assign({}, initials, tweenableMap || {});
				
				// set defaults values in case of
				// add new initial values
				Object.keys(tweenableMap)
				      .forEach(
					      key => (_.tweenRefMaps[id][key] = (_.tweenRefMaps[id][key] || 0) + tweenableMap[key])
				      );
			}
			_.tweenRefOrigin[id] = { ...tweenableMap };
			_.tweenRefCSS[id]    = iStyle;
			tweenableMap         = _.tweenRefMaps[id];
			muxToCss(tweenableMap, iStyle, _.muxByTarget[id], _.muxDataByTarget[id], _.box);
			
		}
		else {
			
			muxToCss(_.tweenRefMaps[id], _.tweenRefCSS[id], _.muxByTarget[id], _.muxDataByTarget[id], _.box);
		}
		//console.log('tweenRef::tweenRef:519: ', id, { ..._.muxDataByTarget[id] }, {
		// ..._.tweenRefCSS[id] });
		if ( noref )
			return {
				style: toStyleProp(_.tweenRefCSS[id])
			};
		else
			return {
				style: toStyleProp(_.tweenRefCSS[id]),
				ref  : is.function(ref)
				       ? node => (_.refs[id] = ref(node))
				       : ref
				         ? node => (_.refs[id] = ref.current = node)
				         : node => (_.refs[id] = node)
			};
	}
	
	/**
	 * Delete tweenable element
	 * @param id
	 */
	rmTweenRef( id ) {
		if ( this._.tweenRefs[id] ) {
			this._.tweenRefTargets.splice(this._.tweenRefTargets.indexOf(id), 1);
			delete this._.tweenRefs[id];
			delete this._.muxByTarget[id];
			delete this._.muxDataByTarget[id];
			delete this._.iMapOrigin[id];
			delete this._.tweenRefOrigin[id];
			delete this._.tweenRefCSS[id];
			delete this._.tweenRefMaps[id];
			delete this._.refs[id];
		}
	}
	
	/**
	 * Reset tweenRefs
	 * @param targets
	 */
	resetTweenable( ...targets ) {
		let _ = this._;
		targets.forEach(
			( t ) => {
				this.tweenRef(t, _.tweenRefOriginCss[t], _.iMapOrigin[t], null, null, null, true)
			}
		);
		this._updateTweenRefs();
	}
	
	/**
	 * Update tweenRefs style ( anims & axis will still update the ref )
	 * @param target
	 * @param style
	 * @param postPone
	 * @returns {*}
	 */
	updateRefStyle( target, style, postPone ) {
		let _ = this._, initials = {}, pureCss;
		
		// allow batched stykes updates
		if ( isArray(target) && isArray(style) )
			return target.map(( m, i ) => this.updateRefStyle(m, style[i], postPone));
		if ( isArray(target) )
			return target.map(( m ) => this.updateRefStyle(m, style, postPone));
		
		if ( !_.tweenRefMaps[target] )
			return console.warn("[react-voodoo] Cannot update styles: unknown Node id '", target, "'");
		
		pureCss = deMuxTween(style, _.tweenRefMaps[target], initials, _.muxDataByTarget[target], _.muxByTarget[target]);
		Object.assign(_.tweenRefCSS[target], pureCss);
		Object.assign(_.tweenRefOriginCss[target], pureCss);
		muxToCss(_.tweenRefMaps[target], _.tweenRefCSS[target], _.muxByTarget[target], _.muxDataByTarget[target], _.box);
		this._updateTweenRef(target, true);
	}
	
	// ------------------------------------------------------------
	// -------------------- Pushable anims ------------------------
	// ------------------------------------------------------------
	
	/**
	 * Retrieve the tween ref dom node
	 * @param id
	 * @returns {*}
	 */
	getTweenableRef( id ) {
		if ( this._.refs[id]?.nodeType === 1 )
			return this._.refs[id];
		else if ( this._.refs[id]?._?.rootRef?.current && is.element(this._.refs[id]._.rootRef.current) )
			return this._.refs[id]._.rootRef.current
		else if ( !this._.tweenRefs[id] )
			console.warn("[react-voodoo] getTweenableRef: no registered node found for id '", id, "'")
	}
	
	/**
	 * Get the root dom node of the tweener element
	 * @returns {*}
	 */
	getRootNode() {
		try {
			return this._.rootRef && this._.rootRef.current;
		} catch ( e ) {
			return this._.rootRef && this._.rootRef.current;
		}
	}
	
	// ------------------------------------------------------------
	// ------------------ Scrollable axes -------------------------
	// ------------------------------------------------------------
	
	/**
	 * Run a one-shot animation timeline and return a Promise that resolves when it completes.
	 *
	 * If `anim` is a plain descriptor array, it is demuxed into a CssTweenAxis here.
	 * The axis is handed to `tweenAxis.run()` which drives it via the module-level
	 * Runner (setTimeout loop). While the animation runs, the RAF loop is also kept
	 * alive so DOM writes happen every frame.
	 *
	 * On completion the axis is destroyed (returned to the pool) and the demuxed
	 * property locks are released via `clearTweenableValue`.
	 */
	pushAnim( anim, then, keepResults = true ) {
		let sl,
		    initial,
		    _        = this._,
		    initials = {},
		    fail;
		
		if ( isArray(anim) ) {
			sl = anim;
		}
		else {
			sl      = anim.anims;
			initial = anim.initial;
		}
		
		if ( !(sl instanceof tweenAxis) ) {
			// tweenLine, initials, data, demuxers
			sl = deMuxLine(sl, initials, this._.muxDataByTarget, this._.muxByTarget);
			sl = new tweenAxis(sl, this._.tweenRefMaps);
			Object.keys(initials)
			      .forEach(
				      id => (
					      this._.tweenRefMaps[id] &&
					      Object.assign(this._.tweenRefMaps[id], {
						      ...initials[id],
						      ...this._.tweenRefMaps[id]
					      }) || (fail = console.warn("[react-voodoo] pushAnim: cannot find tween target '", id, "' in", Tweener.displayName) || true)
				      )
			      )
		}
		if ( fail )
			return;
		
		
		return new Promise(
			resolve => {
				
				// start timer launch @todo
				// reduced motion: tm=1 → the first Runner tick completes the timeline,
				// applying the full final state (keepResults & cleanup path unchanged)
				sl.run(this._.tweenRefMaps, () => {
					let i = this._.runningAnims.indexOf(sl);
					if ( i != -1 )
						this._.runningAnims.splice(i, 1);
					//console.log( _.muxDataByTarget)
					Object.keys(initials)// unset
					      .forEach(
						      id => {
							      Object.keys(initials[id])// unset
							            .forEach(
								            rkey => {
									            // todo
									            clearTweenableValue(rkey, rkey, _.tweenRefMaps[id], _.tweenRefCSS[id], _.muxDataByTarget[id], _.muxByTarget[id], keepResults)
								            })
						      });
					sl.destroy();
					resolve(sl);
				}, this.shouldReduceMotion() ? 1 : undefined);
				
				this._.runningAnims.push(sl);
				
				if ( !this._.live ) {
					this._.live = true;
					requestAnimationFrame(this._._rafLoop = this._._rafLoop || this._rafLoop.bind(this));
				}
			}
		).then(sl => (then && then(sl)));
		
	}
	
	/**
	 * Update tweenRef raw tweened values
	 * @param id
	 * @param map
	 * @param reset
	 */
	applyTweenState( id, map, reset ) {
		let tmap = {}, initials = {};
		deMuxTween(map, tmap, initials, this._.muxDataByTarget[id], this._.muxByTarget[id], true)
		Object.keys(tmap).map(
			( p ) => this._.tweenRefMaps[id][p] = (!reset && this._.tweenRefMaps[id][p] || initials[p]) + tmap[p]
		);
	}
	
	/**
	 * Will init / update a scrollable axis
	 * @param axe
	 * @param _inertia
	 * @param _scrollableArea
	 * @param _scrollableBounds
	 * @param _scrollableWindow
	 * @param defaultPosition
	 * @param scrollFirst
	 * @param reset
	 */
	initAxis( axe, {
		inertia         : _inertia,
		scrollableArea  : _scrollableArea = 0,
		scrollableBounds: _scrollableBounds,
		scrollableWindow: _scrollableWindow,
		defaultPosition,
		scrollFirst
	}, reset ) {
		
		
		let _                = this._,
		    dim              = this.axes[axe],
		    scrollableBounds = _scrollableBounds,
		    scrollPos        = !reset && dim
		                       ? dim.scrollPos
		                       : _.defaultAxesPosition?.[axe] || defaultPosition || scrollableBounds && scrollableBounds.min || 0,
		    scrollableArea   = Math.max(dim && dim.scrollableArea || 0, _scrollableArea),
		    scrollableWindow = Math.max(dim && dim.scrollableWindow || 0, _scrollableWindow),
		    targetPos        = dim ? dim.targetPos : scrollPos,
		    inertia          = (
			    dim ? dim.inertia : new Inertia({// todo mk pure
				                                    disabled     : !_inertia,
				                                    ...(_inertia || {}),
				                                    value        : scrollPos,
				                                    reducedMotion: () => this.shouldReduceMotion()
			                                    })),
		    nextDescr        = {
			    //...(_inertia || {}),
			    scrollFirst,
			    tweenAxis: dim && dim.tweenAxis || [],
			    scrollPos,
			    targetPos,
			    inertia,
			    scrollableWindow,
			    scrollableBounds,
			    scrollableArea,
			    scrollTo : ( pos, tm, ease, noEvents ) => {
				    return this.scrollTo(pos, tm, axe, ease, noEvents)
			    }
		    };
		
		this.axes[axe] = nextDescr;
		!_inertia && (inertia._.disabled = true);
		(_inertia) && inertia && !inertia.active && (inertia._.pos = scrollPos);
		(_inertia) && inertia && (inertia.updateConf(_inertia));
		if ( inertia && scrollableBounds )
			inertia.setBounds?.(scrollableBounds.min, scrollableBounds.max);
		else
			inertia && inertia.setBounds?.(0, scrollableArea)
	}
	
	_getAxis( axe = "scrollY" ) {
		let _ = this._;
		
		this.axes[axe] = this.axes[axe] || {
			tweenAxis       : [],
			scrollPos       : _.options.initialScrollPos && _.options.initialScrollPos[axe] || 0,
			targetPos       : 0,
			scrollableWindow: 0,
			scrollableArea  : 0,
			inertia         : new Inertia({
				                              value        : _.options.initialScrollPos && _.options.initialScrollPos[axe] || 0,
				                              ...(_.options.axes && _.options.axes[axe] && _.options.axes[axe].inertia || {}),
				                              reducedMotion: () => this.shouldReduceMotion()
			                              }),
			scrollTo        : ( pos, tm, ease, noEvents ) => {
				return this.scrollTo(pos, tm, axe, ease, noEvents)
			}
		};
		
		return this.axes[axe];
	}
	
	/**
	 * Resolve the effective reduced-motion state for this tweener.
	 *
	 * Driven by the `reducedMotion` tweener option:
	 *   'user'   — follow the OS prefers-reduced-motion setting (live)
	 *   'always' — always reduce
	 *   'never'  — never reduce (default: existing behavior)
	 *
	 * When active: eased scrollTo() calls become instant, pushAnim() timelines jump
	 * to their final state, and inertia releases teleport straight to the predicted
	 * snap target. Direct 1:1 dragging is intentionally unaffected (user-controlled
	 * motion is exempt from reduced-motion guidelines).
	 *
	 * @returns {boolean}
	 */
	shouldReduceMotion() {
		// optional chain: useVoodoo's options hot-update effect can leave _.options
		// undefined when the hook is called without arguments
		const mode = this._.options?.reducedMotion;
		return mode === 'always' || (mode === 'user' && prefersReducedMotion());
	}

	/**
	 * Return axis infos
	 */
	getAxisState( axe ) {
		let _ = this._, state = {};
		this.axes && Object.keys(this.axes)
		                   .forEach(
			                   axe => (state[axe] = this.axes[axe].targetPos || this.axes[axe].scrollPos)
		                   );
		return state;
	}
	
	getScrollPos( axis = "scrollY" ) {
		let _ = this._, state = {};
		return this.axes[axis]
		       ? this.axes[axis].targetPos || this.axes[axis].scrollPos
		       : 0
	}
	
	/**
	 * Scroll an axis to `newPos`.
	 *
	 * Fast path (ms === 0): directly calls `axis.tweenAxis[].goTo(newPos)` and
	 * triggers a single `_updateTweenRefs()` pass — no timer is started.
	 *
	 * Eased path (ms > 0): delegates to `_runScrollGoTo()` which enqueues an entry
	 * in the module-level Runner, interpolating between the current position and the
	 * target over the given duration using the supplied d3-ease function.
	 */
	scrollTo( newPos, ms = 0, axe = "scrollY", ease, noEvents ) {
		let _ = this._;
		if ( !isBrowserSide ) {
			console.warn("[react-voodoo] scrollTo() cannot be used server-side — use the Axis defaultPosition prop to set the initial axis position");
			return Promise.resolve();
		}
		// reduced motion: collapse eased scrolls to the existing instant path —
		// same final state, same events, same resolved Promise
		if ( ms && this.shouldReduceMotion() )
			ms = 0;
		return new Promise(
			(( resolve, reject ) => {
				if ( this.axes && this.axes[axe] ) {
					let oldPos = this.axes[axe].targetPos,
					    setPos = pos => {
						    //console.log('TweenableComp::setPos:514: ',  newPos,pos, ms,
						    // axe);
						    pos                      = (~~(pos * 10000)) / 10000;
						    this.axes[axe].targetPos = this.axes[axe].scrollPos = pos;
						    
						    //this.axes[axe].inertia._doSnap()
						    if ( ~~pos !== oldPos ) {
							    this.axisDidScroll(~~pos, axe);
							    _.rootRef?.current?.componentDidScroll?.(~~pos, axe);
						    }
						    this._updateTweenRefs()
					    };
					
					newPos = Math.max(0, newPos);
					newPos = Math.min(newPos, this.axes[axe].scrollableArea || 0);
					
					this.axes[axe].targetPos = newPos;
					
					if ( !ms ) {
						this.axes?.[axe]?.inertia?.setPos(newPos);
						if ( this.axes?.[axe]?.inertia?._ ) {
							newPos = this.axes?.[axe]?.inertia?._.pos;
						}
						this.axes[axe].tweenAxis.forEach(
							sl => sl.goTo(newPos, _.tweenRefMaps, false, noEvents)
						);
						setPos(newPos);
						resolve()
					}
					else {
						this._runScrollGoTo(axe, newPos, ms, easingFn[ease], noEvents, setPos, resolve)
					}
					
					if ( !_.live ) {
						_.live = true;
						requestAnimationFrame(_._rafLoop);
					}
				}
			})).then(
			p => {
				this.axes?.[axe]?.inertia?._detectCurrentSnap();
			}
		)
	}
	
	/**
	 * Parse a tween descriptor array into a CssTweenAxis, register it on the named
	 * axis, and immediately advance it to the current scroll position so there is no
	 * visual jump when an axis is added mid-session.
	 *
	 * The resulting CssTweenAxis is pushed into `dim.tweenAxis[]` so that every
	 * future `goTo()` call (from scrolling or inertia) hits all registered timelines
	 * for that axis in one pass.
	 */
	addScrollableAnim( anim, axe = "scrollY", size ) {
		let sl,
		    _        = this._,
		    initials = {},
		    dim      = this._getAxis(axe);
		
		if ( isArray(anim) ) {
			sl = anim;
		}
		else {
			sl   = anim.anims;
			size = anim.length;
		}
		
		//console.warn("add scrollable")
		if ( !(sl instanceof tweenAxis) ) {
			sl = deMuxLine(sl, initials, this._.muxDataByTarget, this._.muxByTarget);
			
			sl          = new tweenAxis(sl, _.tweenRefMaps);
			sl.initials = initials;
			
			Object.keys(initials)
			      .forEach(
				      id => {
					      _.tweenRefOrigin[id] = _.tweenRefOrigin[id] || {};
					      
					      _.tweenRefMaps[id] = _.tweenRefMaps[id] || {};
					      Object.assign(this._.tweenRefMaps[id], {
						      ...initials[id],
						      ...this._.tweenRefMaps[id]
					      })
				      }
			      );
			
		}
		
		
		// init scroll
		dim.tweenAxis.push(sl);
		dim.scrollPos      = dim.scrollPos || 0;
		dim.scrollableArea = dim.scrollableArea || 0;
		dim.scrollableArea = Math.max(dim.scrollableArea, sl.duration);
		
		if ( !dim.scrollableBounds )
			dim.inertia?.setBounds(0, dim.scrollableArea);
		
		sl.goTo(dim.scrollPos, this._.tweenRefMaps, false, true);
		this._updateTweenRefs();
		return sl;
	}
	
	/**
	 * Remove a tweenAxis object from a component scrollable axis
	 * @param sl
	 * @param axe
	 */
	rmScrollableAnim( sl, axe = "scrollY" ) {
		let _   = this._, found,
		    dim = this._getAxis(axe), twAxis;
		let i   = dim.tweenAxis.indexOf(sl);
		if ( i !== -1 ) {
			
			//dim.tweenAxis[i].destroy();
			dim.tweenAxis.splice(i, 1);
			dim.scrollableArea = Math.max(...dim.tweenAxis.map(tl => tl.duration), 0);
			if ( !dim.scrollableBounds )
				dim.inertia?.setBounds(0, dim.scrollableArea || 0);
			//console.warn("rm scrollable", { ...this._.tweenRefMaps })
			sl.goTo(0, this._.tweenRefMaps, false, true);
			//console.warn("rm scrollable", { ...this._.tweenRefMaps["card"] })
			
			Object.keys(sl.initials)// unset
			      .forEach(
				      id => {
					      Object.keys(sl.initials[id])// unset
					            .forEach(
						            rkey => {
							            //debugger
							            clearTweenableValue(rkey, rkey, _.tweenRefMaps[id], _.tweenRefCSS[id], _.muxDataByTarget[id], _.muxByTarget[id])
							            //!_.tweenRefCSS[id] &&
							            //_.refs[id] && _.refs[id].style &&
							            // _.refs[id].style[rkey] &&
							            // (_.refs[id].style[rkey] = null);
						            })
				      });
			delete sl.initials;
			sl.destroy();
			found = true;
			this._updateTweenRefs();
		}
		!found && console.warn("[react-voodoo] rmScrollableAnim: axis not found:", axe)
	}
	
	/**
	 * @private fn to push scrollTo
	 * @param axe
	 * @param to
	 * @param tm
	 * @param easing
	 * @param tick
	 * @param cb
	 * @private
	 */
	_runScrollGoTo( axe, to, tm, easing = x => x, noEvents, tick, cb ) {
		let from   = this.axes[axe].scrollPos,
		    length = to - from;
		
		_running.push(
			{
				apply   : ( pos, max ) => {
					let x = (from + (easing(pos / max)) * length);
					if ( this._.tweenEnabled ) {
						// allow shouldLoop on scrollTo
						this.axes?.[axe]?.inertia?.setPos(x);
						if ( this.axes?.[axe]?.inertia?._ ) {
							x = this.axes?.[axe]?.inertia?._.pos;
						}
						this.axes[axe].tweenAxis.forEach(
							sl => sl.goTo(x, this._.tweenRefMaps, false, noEvents)
						);
						tick && tick(x);
					}
				},
				duration: tm,
				cpos    : 0,
				cb
			})
		;
		
		if ( !_live ) {
			_live  = true;
			lastTm = Date.now();
			setTimeout(Runner._tick, 16);
		}
	}

	/**
	 * Hook to know if the composed element allow scrolling
	 * @returns {boolean}
	 */
	componentShouldScroll() {
		let _ = this._;
		return _.rootRef &&
		       _.rootRef.current &&
		       _.rootRef.current.componentShouldScroll ?
		       _.rootRef.current.componentShouldScroll(...arguments) : true
	}
	
	/**
	 * Add scroll listener to {axisId} axis, return unwatch
	 * @param axisId
	 * @param listener
	 * @returns {function(...[*]=)}
	 */
	watchAxis( axisId, listener ) {
		let byId     = this._scrollWatcherByAxis;
		byId[axisId] = byId[axisId] || [];
		byId[axisId].push(listener);
		return () => {
			let index = byId[axisId].indexOf(listener);
			byId[axisId].splice(index, 1);
		}
	}
	
	// ------------------------------------------------------------
	// --------------- Inertia & scroll modifiers -----------------
	// ------------------------------------------------------------
	
	axisDidScroll( pos, axisId ) {
		let watchers = this._scrollWatcherByAxis[axisId],
		    i        = watchers?.length;
		if ( watchers )
			while ( i ) watchers[--i](pos);
	}
	
	/**
	 * Called from a recurring 16ms setTimeout while inertia is active (set up by
	 * the drag handlers in Draggable). Each call reads the next position from
	 * `Inertia.update()`, calls `goTo()` on all registered timelines for the axis,
	 * and triggers a DOM write via `_updateTweenRefs()`. Re-schedules itself as long
	 * as `dim.inertia.active` or `dim.inertia.holding` remains true.
	 */
	applyInertia( dim, axe ) {
		let x = dim.inertia.update(), _ = this._;
		
		this.axes[axe].tweenAxis.forEach(
			sl => {
				this.axes[axe].targetPos = this.axes[axe].scrollPos = x;
				sl.goTo(x, this._.tweenRefMaps)
			}
		);
		_.rootRef?.current?.componentDidScroll?.(x, axe);
		this.axisDidScroll(x, axe);
		this._updateTweenRefs()
		if ( dim.inertia.active || dim.inertia.holding ) {
			dim.inertiaFrame = setTimeout(this.applyInertia.bind(this, dim, axe), 16);
		}
		else {
			dim.inertiaFrame = null;
		}
	}
	
	/**
	 * Return true if at least 1 of this tweener axis have it's inertia active
	 * @returns {boolean}
	 */
	isInertiaActive() {//todo
		let _ = this._, active = false;
		this.axes &&
		Object.keys(this.axes)
		      .forEach(
			      axe => (active = active || this.axes[axe] && this.axes[axe].inertia.active)
		      );
		return active;
	}
	
	isAxisOut( axis, v, abs ) {
		let _   = this._,
		    dim = this.axes && this.axes[axis],
		    pos = abs ? v : dim && (dim.scrollPos + v);
		
		pos = pos && Math.round(pos);
		
		return !dim
			|| (
				dim.scrollableBounds
				?
				(pos <= dim.scrollableBounds.min || pos >= dim.scrollableBounds.max)
				:
				(pos <= 0 || pos >= dim.scrollableArea)
			);
	}
	
	_activateNodeInertia( node ) {
		let _ = this._,
		    i = _.activeInertia.findIndex(item => (item.target === node));
		if ( i === -1 ) {
			_.activeInertia.push(
				{
					inertia: {
						x: new Inertia({
							               max          : node.scrollWidth - node.offsetLeft,
							               value        : node.scrollLeft,
							               reducedMotion: () => this.shouldReduceMotion()
						               }),
						y: new Inertia({
							               max          : node.scrollHeight - node.offsetHeight,
							               value        : node.scrollTop,
							               reducedMotion: () => this.shouldReduceMotion()
						               })
					},
					target : node
				});
			i = _.activeInertia.length - 1;
		}
		return _.activeInertia[i].inertia;
		
	}
	
	// ------------------------------------------------------------
	// --------------- Initialization & drawers -------------------
	// ------------------------------------------------------------
	
	_updateNodeInertia = () => {
		let _ = this._, current, ln = _.activeInertia.length;
		
		if ( this._inertiaRaf )
			cancelAnimationFrame(this._inertiaRaf);
		
		for ( let i = 0; ln > i; i++ ) {
			current = _.activeInertia[i];
			if ( current.inertia.x.active || current.inertia.x.holding ) {
				current.target.scrollLeft = ~~current.inertia.x.update()
			}
			if ( current.inertia.y.active || current.inertia.y.holding ) {
				current.target.scrollTop = ~~current.inertia.y.update()
			}
			
			if ( !current.inertia.x.active && !current.inertia.y.active && !current.inertia.x.holding && !current.inertia.y.holding ) {
				_.activeInertia.slice(i, 1);
				i--;
				ln--;
			}
		}
		if ( ln !== 0 )
			this._inertiaRaf = requestAnimationFrame(this._updateNodeInertia)
		else this._inertiaRaf = null;
	}
	
	setRootRef( id ) {
		this._.rootRef = id;
	}
	
	_updateBox() {
		let node = this.getRootNode();
		if ( node ) {
			this._.box.inited = true;
			this._.box.x      = node.offsetWidth;
			this._.box.y      = node.offsetHeight;
		}
	}
	
	_rafLoop() {
		this._updateTweenRefs();
		if ( this._.runningAnims.length ) {
			requestAnimationFrame(this._._rafLoop);
		}
		else {
			this._.live = false;
		}
	}
	
	/**
	 * Hot path — called every RAF frame and after any scroll/inertia event.
	 * Iterates every registered node id and delegates to `_updateTweenRef` which
	 * reconstructs CSS strings from the accumulated numeric state and writes any
	 * changed values to the DOM node directly.
	 */
	_updateTweenRefs() {
		if ( this._.tweenEnabled ) {
			for ( let i = 0, target, node, style; i < this._.tweenRefTargets.length; i++ ) {
				target = this._.tweenRefTargets[i];
				style  = this._updateTweenRef(target);
			}
		}
	}

	/**
	 * Swap-buffer DOM write for a single registered target.
	 *
	 * Writes new CSS values into the shared `this._swap` scratch object, then diffs
	 * against `tweenRefCSS[id]` (the last-written values). Only changed properties
	 * are applied to the DOM, avoiding unnecessary style recalculations.
	 *
	 * Keys prefixed with `attr_` are SVG geometry attributes (e.g. `attr_cx`) that
	 * must be applied via `element.setAttribute(name, value)` rather than
	 * `element.style[name]` because they are not CSS properties.
	 */
	_updateTweenRef( target, force ) {
		let node, swap = this._swap, changes;
		this._.tweenRefCSS[target] &&
		muxToCss(this._.tweenRefMaps[target], swap, this._.muxByTarget[target], this._.muxDataByTarget[target], this._.box);
		node = this.getTweenableRef(target);
		if ( node ) {
			for ( let o in this._.tweenRefCSS[target] )
				if ( swap[o] === undefined ) {
					if ( o.length > 5 && o[0] === 'a' && o[1] === 't' && o[2] === 't' && o[3] === 'r' && o[4] === '_' )
						node.setAttribute(o.slice(5), this._.tweenRefCSS[target][o]);
					else
						node.style[o] = this._.tweenRefCSS[target][o];
				}
			for ( let o in swap )
				if ( this._.tweenRefCSS[target].hasOwnProperty(o) ) {
					if ( force || swap[o] !== this._.tweenRefCSS[target][o] ) {
						this._.tweenRefCSS[target][o] = swap[o];
						if ( o.length > 5 && o[0] === 'a' && o[1] === 't' && o[2] === 't' && o[3] === 'r' && o[4] === '_' )
							node.setAttribute(o.slice(5), swap[o]);
						else
							node.style[o] = swap[o];
						changes = true;
					}
					delete swap[o];
				}
		}
		return toStyleProp(this._.tweenRefCSS[target]);
	}
	
	
	// ------------------------------------------------------------
	// --------------- React Hooks --------------------------------
	// ------------------------------------------------------------
	
	componentWillUnmount() {
		let node = this.getRootNode();
		if ( this._.tweenEnabled ) {
			this._.tweenEnabled = false;
			window.removeEventListener("resize", this._.onResize);
			
			Object.keys(this.axes).forEach(
				axe => {
					this.axes[axe].inertiaFrame &&
					clearTimeout(this.axes[axe].inertiaFrame);
				}
			);
		}
	}
	
	/**
	 * Apply SVG geometry attribute values (attr_* keys in tweenRefCSS) to the DOM
	 * via setAttribute. Called once on mount because these are filtered from the
	 * React style prop and cannot be applied via node.style.
	 */
	_applyInitialSvgAttrs() {
		for ( const id of this._.tweenRefTargets ) {
			const node = this.getTweenableRef(id);
			const css  = this._.tweenRefCSS[id];
			if ( !node || !css ) continue;
			for ( const k in css )
				if ( k.length > 5 && k[0] === 'a' && k[1] === 't' && k[2] === 't' && k[3] === 'r' && k[4] === '_' )
					node.setAttribute(k.slice(5), css[k]);
		}
	}

	/**
	 * Called once after the root DOM node is available. Measures the viewport box,
	 * force-writes all initial CSS/attr values to the DOM, and processes the static
	 * `scrollableAnim` property — the hook used by the `asTweener` HOC pattern to
	 * declare axis animations directly on a class component.
	 */
	componentDidMount() {
		let _static = this.constructor;

		this._.rendered = true;
		// side effects deferred from the constructor — only mounted engines may
		// touch the DOM or call user callbacks
		this.props.tweenerOptions?.ref?.(this);
		isBrowserSide && window.addEventListener(
			"resize",
			this._.onResize = this._.onResize || (( e ) => {//@todo
				this._updateBox();
				this._updateTweenRefs();
				this._.rootRef?.current?.windowDidResize?.(e);
			}));
		if ( this._.tweenEnabled ) {
			this._updateBox();
			// Force-push all values (CSS and attr_*) to the DOM on initial mount.
			for ( let i = 0; i < this._.tweenRefTargets.length; i++ )
				this._updateTweenRef(this._.tweenRefTargets[i], true);
		}
		if ( _static.scrollableAnim ) {
			if ( is.array(_static.scrollableAnim) )
				this.addScrollableAnim(_static.scrollableAnim);
			else
				Object.keys(_static.scrollableAnim)
				      .forEach(
					      axe => this.addScrollableAnim(_static.scrollableAnim[axe], axe)
				      )
		}
		//if ( this._.doRegister || this.__isFirst ) {
		//
		//	this._.doRegister = false;
		//}
	}

	componentDidUpdate( prevProps, prevState ) {

		if ( this._.tweenEnabled ) {
			this._updateBox();
			this._updateTweenRefs();
		}
	}
}
