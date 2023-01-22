/*
 * Copyright (c) 2022-2023 Braun Nathanael
 *
 * This project is dual licensed under one of the following licenses:
 * - Creative Commons Attribution-NoDerivatives 4.0 International License.
 * - GNU AFFERO GENERAL PUBLIC LICENSE Version 3
 *
 * You should have received a copy of theses licenses along with this work.
 * If not, see <http://creativecommons.org/licenses/by-nd/4.0/> or <http://www.gnu.org/licenses/agpl-3.0.txt>.
 */

import * as easingFn                                          from "d3-ease";
import deepEqual                                              from "fast-deep-equal";
import is                                                     from "is";
import React                                                  from "react";
import ReactDom                                               from "react-dom";
import TweenerContext
                                                              from "../comps/TweenerContext";
import {clearTweenableValue, deMuxLine, deMuxTween, muxToCss} from "../utils/css";
import tweenAxis
                                                              from "../utils/CssTweenAxis";
import domUtils                                               from "../utils/dom";
import Inertia                                                from '../utils/inertia';


let isBrowserSide           = (new Function("try {return this===window;}catch(e){ return false;}"))(),
    isArray                 = is.array,
    _live, lastTm, _running = [];

// Axis Interpolation timer ( not the rendering loop ! )
const Runner = {
	run  : function ( tl, ctx, duration, cb ) {
		let apply = ( pos, size ) => tl.go(pos / size, ctx);
		_running.push({ apply, duration, cpos: 0, cb });
		tl.go(0, ctx, true);//reset tl
		
		if ( !_live ) {
			_live  = true;
			lastTm = Date.now();
			// console.log("TL runner On");
			setTimeout(this._tick, 16);
		}
	},
	_tick: function _tick() {
		let i  = 0, o, tm = Date.now(), delta = tm - lastTm;
		lastTm = tm;
		for ( ; i < _running.length; i++ ) {
			_running[i].cpos = Math.min(delta + _running[i].cpos, _running[i].duration);//cpos
			_running[i].apply(
				_running[i].cpos, _running[i].duration
			);
			// console.log("TL runner ",_running[i][3]);
			if ( _running[i].cpos == _running[i].duration ) {
				
				_running[i].cb && setTimeout(_running[i].cb);
				_running.splice(i, 1), i--;
			}
			
		}
		if ( _running.length )
			setTimeout(_tick, 16);
		else {
			// console.log("TL runner Off");
			_live = false;
		}
	},
};
/**
 * The main tweener component
 */
export default class Tweener extends React.Component {
	
	constructor( props ) {
		super(...arguments);
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
		
		_.scrollHook    = [];
		_.activeInertia = [];
		isBrowserSide && window.addEventListener(
			"resize",
			this._.onResize = ( e ) => {//@todo
				this._updateBox();
				this._updateTweenRefs();
				_.rootRef?.current?.windowDidResize?.(e);
			});
	}
	
	axes = {};
	
	// ------------------------------------------------------------
	// -------------------- TweenRefs utils -----------------------
	// ------------------------------------------------------------
	
	/**
	 * Register tweenable element
	 * return its current style
	 * @param id
	 * @param iStyle
	 * @param iMap
	 * @param pos
	 * @param noref
	 * @param mapReset
	 * @returns {style,ref}
	 */
	tweenRef( id, iStyle = {}, iMap = {}, pos, ref, noref, mapReset ) {// ref initial style
		
		
		let _            = this._,
		    tweenableMap = {};
		
		let initials = {};
		if ( !_.tweenRefs[id] )
			_.tweenRefTargets.push(id);
		//if ( id === "items" ) {
		//	debugger
		//}
		//ref && console.warn('ref ', id, ref)
		
		if ( _.tweenRefs[id] && (
			mapReset
			|| (_.iMapOrigin[id] !== iMap || !deepEqual(iMap, _.iMapOrigin[id]))
			|| (_.tweenRefOriginCss[id] !== iStyle || !deepEqual(iStyle, _.tweenRefOriginCss[id]))
		) ) {
			// hot switch initial values
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
				//debugger
				// minus initial values from axis pre init
				//Object.keys(_.tweenRefOrigin[id])
				//      .forEach(
				//	      key => (_.tweenRefMaps[id][key] -= _.tweenRefOrigin[id][key])
				//      );
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
				style: { ..._.tweenRefCSS[id] }
			};
		else
			return {
				style: { ..._.tweenRefCSS[id] },
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
			return console.warn("React-Voodoo : Can't update styles of an unknown Node id '", target, "'");
		
		pureCss = deMuxTween(style, _.tweenRefMaps[target], initials, _.muxDataByTarget[target], _.muxByTarget[target]);
		Object.assign(_.tweenRefCSS[target], pureCss);
		Object.assign(_.tweenRefOriginCss[target], pureCss);
		muxToCss(_.tweenRefMaps[target], _.tweenRefCSS[target], _.muxByTarget[target], _.muxDataByTarget[target], _.box);
		this._updateTweenRef(target, true);
	}
	
	/**
	 * Retrieve the tween ref dom node
	 * @param id
	 * @returns {*}
	 */
	getTweenableRef( id ) {
		try {
			return this._.refs[id] && ReactDom.findDOMNode(this._.refs[id]);
		} catch ( e ) {
			try {
				return this._.refs[id]._.rootRef.current
			} catch ( e ) {
				console.warn("react-voodoo: Can't find voodooNode ", id, e)
				return;
			}
		}
	}
	
	/**
	 * Get the root dom node of the tweener element
	 * @returns {*}
	 */
	getRootNode() {
		try {
			return this.getTweenableRef(this._.rootRef)
				|| this.isMountedFromHook && this._.rootRef && this._.rootRef.current
				|| ReactDom.findDOMNode(this);
		} catch ( e ) {
			return this._.rootRef && this._.rootRef.current;
		}
	}
	
	// ------------------------------------------------------------
	// -------------------- Pushable anims ------------------------
	// ------------------------------------------------------------
	
	/**
	 * Push anims
	 * @param anim
	 * @param then
	 * @param skipInit
	 * @returns {tweenAxis}
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
					      }) || (fail = console.warn("react-voodoo : Can't find tween target ", id, " in ", Tweener.displayName) || true)
				      )
			      )
		}
		if ( fail )
			return;
		
		
		return new Promise(
			resolve => {
				
				// start timer launch @todo
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
				});
				
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
	
	// ------------------------------------------------------------
	// ------------------ Scrollable axes -------------------------
	// ------------------------------------------------------------
	
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
		                       : defaultPosition || scrollableBounds && scrollableBounds.min || 0,
		    scrollableArea   = Math.max(dim && dim.scrollableArea || 0, _scrollableArea),
		    scrollableWindow = Math.max(dim && dim.scrollableWindow || 0, _scrollableWindow),
		    targetPos        = dim ? dim.targetPos : scrollPos,
		    inertia          = (
			    dim ? dim.inertia : new Inertia({// todo mk pure
				                                    disabled: !_inertia,
				                                    ...(_inertia || {}),
				                                    value: scrollPos
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
				                              value: _.options.initialScrollPos && _.options.initialScrollPos[axe] || 0,
				                              ...(_.options.axes && _.options.axes[axe] && _.options.axes[axe].inertia || {})
			                              }),
			scrollTo        : ( pos, tm, ease, noEvents ) => {
				return this.scrollTo(pos, tm, axe, ease, noEvents)
			}
		};
		
		return this.axes[axe];
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
	 * Do scroll an axis
	 * @param newPos
	 * @param ms
	 * @param axe
	 * @param ease
	 * @returns {Promise<any | never>}
	 */
	scrollTo( newPos, ms = 0, axe = "scrollY", ease, noEvents ) {
		let _ = this._;
		if ( !isBrowserSide ) {
			console.warn("React-voodoo : scrollTo can't be used serverside, use Axis defaultPosition prop to set initial axes position");
			return Promise.resolve();
		}
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
	 * Add scrollable tween axis (scrollable anims) to a global axis
	 * @param anim
	 * @param axe
	 * @param size
	 * @returns {tweenAxis}
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
		!found && console.warn("react-voodoo: Axis not found : ", axe)
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
			// console.log("TL runner On");
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
	
	_scrollWatcherByAxis = {};
	
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
	
	axisDidScroll( pos, axisId ) {
		let watchers = this._scrollWatcherByAxis[axisId],
		    i        = watchers?.length;
		if ( watchers )
			while ( i ) watchers[--i](pos);
	}
	
	// ------------------------------------------------------------
	// --------------- Inertia & scroll modifiers -----------------
	// ------------------------------------------------------------
	
	/**
	 * Retrieve updates from an axis inertia & apply them
	 * @param dim
	 * @param axe
	 */
	applyInertia( dim, axe ) {
		let x = dim.inertia.update(), _ = this._;
		
		this.axes[axe].tweenAxis.forEach(
			sl => {
				this.axes[axe].targetPos = this.axes[axe].scrollPos = x;
				sl.goTo(x, this._.tweenRefMaps)
			}
		);
		//console.log("scroll at " + x, axe, dim.inertia.active || dim.inertia.holding);
		//this.scrollTo(x, 0, axe);
		_.rootRef?.current?.componentDidScroll?.(x, axe);
		this.axisDidScroll(x, axe);
		this._updateTweenRefs()
		if ( dim.inertia.active || dim.inertia.holding ) {
			dim.inertiaFrame = setTimeout(this.applyInertia.bind(this, dim, axe), 33);
		}
		else {
			dim.inertiaFrame = null;
			//console.log("complete");
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
							               max  : node.scrollWidth - node.offsetLeft,
							               value: node.scrollLeft
						               }),
						y: new Inertia({
							               max  : node.scrollHeight - node.offsetHeight,
							               value: node.scrollTop
						               })
					},
					target : node
				});
			i = _.activeInertia.length - 1;
		}
		return _.activeInertia[i].inertia;
		
	}
	
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
	
	// ------------------------------------------------------------
	// --------------- Initialization & drawers -------------------
	// ------------------------------------------------------------
	
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
			//this._.live && console.log("RAF off", this.constructor.displayName);
			this._.live = false;
		}
	}
	
	_updateTweenRefs() {
		if ( this._.tweenEnabled ) {
			for ( let i = 0, target, node, style; i < this._.tweenRefTargets.length; i++ ) {
				target = this._.tweenRefTargets[i];
				style  = this._updateTweenRef(target);
			}
		}
	}
	
	_swap = {};
	
	_updateTweenRef( target, force ) {
		let node, swap = this._swap, changes;
		this._.tweenRefCSS[target] &&
		muxToCss(this._.tweenRefMaps[target], swap, this._.muxByTarget[target], this._.muxDataByTarget[target], this._.box);
		node = this.getTweenableRef(target);
		if ( node ) {
			for ( let o in this._.tweenRefCSS[target] )
				if ( swap[o] === undefined ) {
					node.style[o] = this._.tweenRefCSS[target][o];
					//		node.style[o] = null;
					//		delete this._.tweenRefCSS[target][o];
				}
			for ( let o in swap )
				if ( this._.tweenRefCSS[target].hasOwnProperty(o) ) {
					if ( force || swap[o] !== this._.tweenRefCSS[target][o] ) {
						
						node.style[o] = this._.tweenRefCSS[target][o] = swap[o];
						//if ( target == "card" ) console.log(target, o, node.style[o],
						// swap[o]);
						changes = true;
					}
					delete swap[o];
				}
		}
		//if ( !changes )
		//console.log('no changes', target, this._.tweenRefCSS[target], !!node, force)
		return this._.tweenRefCSS[target];
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
		super.componentWillUnmount && super.componentWillUnmount(...arguments);
	}
	
	componentDidMount() {
		let _static = this.constructor;
		
		this._.rendered = true;
		if ( this._.tweenEnabled ) {
			// debugger;
			this._updateBox();
			this._updateTweenRefs();
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
		super.componentDidMount && super.componentDidMount(...arguments);
	}
	
	componentDidUpdate( prevProps, prevState ) {
		
		if ( this._.tweenEnabled ) {
			this._updateBox();
			this._updateTweenRefs();
		}
		super.componentDidUpdate && super.componentDidUpdate(...arguments);
	}
	
	render() {
		const { BaseComponent, oProps } = this.props;
		return <TweenerContext.Consumer>
			{
				parentTweener => {
					this._parentTweener = parentTweener;
					return <TweenerContext.Provider value={this}>
						<BaseComponent {...oProps} ref={this._.rootRef}
						               tweener={this}/>
					</TweenerContext.Provider>;
				}
			}
		</TweenerContext.Consumer>;
	}
}
