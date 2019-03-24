/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */

import React    from "react";
import is       from "is";
import taskflow from "taskflows";
import utils    from "./utils";

import TweenerContext                    from "./TweenerContext";
import rtween                            from "rtween";
import ReactDom                          from "react-dom";
import {deMuxTween, muxToCss, deMuxLine} from "./helpers";

/**
 * @todo : clean & comments
 */


var isBrowserSide           = (new Function("try {return this===window;}catch(e){ return false;}"))(),
    isArray                 = is.array,
    initialTweenable        = {// while no matrix..
    },
    _live, lastTm, _running = [];

const SimpleObjectProto = ({}).constructor;

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
		var i  = 0, o, tm = Date.now(), delta = tm - lastTm;
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
 * asTweener decorator
 * @param argz
 * @returns {*}
 */
export default function asTweener( ...argz ) {
	
	let BaseComponent = (!argz[0] || argz[0].prototype instanceof React.Component || argz[0] === React.Component) && argz.shift(),
	    opts          = (!argz[0] || argz[0] instanceof SimpleObjectProto) && argz.shift() || {};
	
	if ( !(BaseComponent && (BaseComponent.prototype instanceof React.Component || BaseComponent === React.Component)) ) {
		return function ( BaseComponent ) {
			return asTweener(BaseComponent, opts)
		}
	}
	
	
	return class TweenableComp extends BaseComponent {
		static displayName = (BaseComponent.displayName || BaseComponent.name) + " (tweener)";
		
		constructor() {
			super(...arguments);
			let _static             = this.constructor;
			this._                  = {
				refs       : {},
				muxByTarget: {},
			};
			this._.box              = {
				x: 100,
				y: 100,
				z: 800
			};
			this._.curMotionStateId = _static.InitialMotionState || "stand";
			this._._rafLoop         = this._rafLoop.bind(this);
		}
		
		
		resetTweenable( ...targets ) {
			targets.forEach(
				( t ) => {
					// delete this._.tweenRefs[t];
					// delete this._.tweenRefCSS[t];
					this._.tweenRefMaps[t] = { ...this._.tweenRefOrigin[t] };
				}
			)
		}
		
		/**
		 * Register tweenable element
		 * @param id
		 * @param iStyle
		 * @param iMap
		 * @param pos
		 * @param noref
		 * @param mapReset
		 * @returns {*}
		 */
		tweenRef( id, iStyle, iMap, pos, noref, mapReset ) {// ref initial style
			this.makeTweenable();
			
			let _static      = this.constructor,
			    _            = this._,
			    tweenableMap = {},
			    cState       = _static.motionStates && _static.motionStates[this._.curMotionStateId];
			
			if ( !this._.tweenRefs[id] )
				this._.tweenRefTargets.push(id);
			
			if ( mapReset || !this._.tweenRefs[id] ) {
				if ( cState && cState.refs && cState.refs[id] ) {
					iStyle = iStyle || { ...cState.refs[id][0] };
					iMap   = iMap || { ...cState.refs[id][1] };
				}
				else {
					iStyle = iStyle || {};
					iMap   = iMap || {};
				}
				
				let initials               = {};
				this._.tweenRefs[id]       = true;
				this._.muxByTarget[id]     = this._.muxByTarget[id] || {};
				this._.muxDataByTarget[id] = this._.muxDataByTarget[id] || {};
				
				if ( iMap.getPosAt ) {// typeof rtween
					tweenableMap = iMap.getPosAt(
						pos,
						!mapReset && this._.tweenRefMaps[id]
							|| Object.assign({}, initialTweenable, iMap.scope || {})
					);
				}
				else {
					
					mapReset = noref;
					noref    = pos;
					
					
					iStyle = { ...iStyle, ...deMuxTween(iMap, tweenableMap, initials, this._.muxDataByTarget[id], this._.muxByTarget[id]) };
					//this._.tweenRefUnits[id] = extractUnits(iMap);
				}
				this._.tweenRefOrigin[id] = tweenableMap;
				iStyle                    = mapReset && { ...iStyle } || this._.tweenRefCSS[id] || { ...iStyle };
				this._.tweenRefCSS[id]    = iStyle;
				// init / reset or get the tweenable view
				tweenableMap              = this._.tweenRefMaps[id] = !mapReset && this._.tweenRefMaps[id]
					|| Object.assign({}, initials, tweenableMap || {});
				
				//console.log(tweenableMap, iStyle, initials, this._.muxByTarget[id], this._.muxDataByTarget[id])
				//utils.mapInBoxCSS(iMap, iStyle, this._.box, this._.tweenRefUnits[id]);
				muxToCss(tweenableMap, iStyle, this._.muxByTarget[id], this._.muxDataByTarget[id], this._.box);
				
				
				//this._.refs[id] = this._.refs[id] || React.createRef();
			}
			if ( noref )
				return {
					style: { ...this._.tweenRefCSS[id] }
				};
			else
				return {
					style: { ...this._.tweenRefCSS[id] },
					ref  : node => (this._.refs[id] = node)
					,
					// __tweenMap : this._.tweenRefMaps[id],
					// __tweenCSS : this._.tweenRefCSS[id]
				};
		}
		
		/**
		 * Push anims
		 * @param anim
		 * @param then
		 * @param skipInit
		 * @returns {rtween}
		 */
		pushAnim( anim, then, skipInit ) {
			var sl, initial, muxed, initials = {};
			if ( isArray(anim) ) {
				sl = anim;
			}
			else {
				sl      = anim.anims;
				initial = anim.initial;
			}
			
			if ( !(sl instanceof rtween) ) {
				// tweenLine, initials, data, demuxers
				sl = deMuxLine(sl, initials, this._.muxDataByTarget, this._.muxByTarget);
				sl = new rtween(sl, this._.tweenRefMaps);
				Object.keys(initials)
				      .forEach(
					      id => (
						      Object.assign(this._.tweenRefMaps[id], {
							      ...initials[id],
							      ...this._.tweenRefMaps[id]
						      })
					      )
				      )
			}
			
			
			// console.warn("Should start anim ", sl);
			this.makeTweenable();
			
			
			!skipInit && initial && Object.keys(initial).map(
				( id ) => this.applyTweenState(id, initial[id], anim.reset)
			);
			
			
			sl.run(this._.tweenRefMaps, () => {
				var i = this._.runningAnims.indexOf(sl);
				if ( i != -1 )
					this._.runningAnims.splice(i, 1);
				
				then && then(sl);
			});//launch
			this._.runningAnims.push(sl);
			
			
			if ( !this._.live ) {
				this._.live = true;
				//console.log("RAF On");
				requestAnimationFrame(this._._rafLoop = this._._rafLoop || this._rafLoop.bind(this));
			}
			return sl;
			
		}
		
		// ------------------------------------------------------------
		// ------------------ Scrollable anims ------------------------
		// ------------------------------------------------------------
		
		/**
		 * Tween this tween line to 'to' during 'tm' ms using easing fn
		 * @param to {int}
		 * @param tm {int} duration in ms
		 * @param easing {function} easing fn
		 * @param tick {function} fn called at each tick
		 * @param cb {function} fn called on complete
		 */
		_runScrollGoTo( axe, to, tm, easing = x => x, tick, cb ) {
			let from   = this._.axes[axe].scrollPos,
			    length = to - from;
			
			_running.push(
				{
					apply   : ( pos, max ) => {
						let x = (from + (easing(pos / max)) * length);
						
						this._.axes[axe].scrollableAnims.forEach(
							sl => sl.goTo(x)
						);
						tick && tick(x);
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
		
		addScrollableAnim( anim, axe = "scrollY", size ) {
			var sl, _ = this._, initials = {};
			if ( isArray(anim) ) {
				sl = anim;
			}
			else {
				sl   = anim.anims;
				size = anim.length;
			}
			
			if ( !(sl instanceof rtween) ) {
				sl = deMuxLine(sl, initials, this._.muxDataByTarget, this._.muxByTarget);
				sl = new rtween(sl, _.tweenRefMaps);
				Object.keys(initials)
				      .forEach(
					      id => (
						      Object.assign(this._.tweenRefMaps[id], {
							      ...initials[id],
							      ...this._.tweenRefMaps[id]
						      })
					      )
				      )
			}
			
			this.makeTweenable();
			this.makeScrollable();
			
			// init scroll
			
			_.axes[axe] = _.axes[axe] || {
				scrollableAnims: [],
				scrollPos      : opts.initialScrollPos && opts.initialScrollPos[axe] || 0,
				targetPos      : 0,
				scrollableArea : 0
			}
			
			_.axes[axe].scrollableAnims.push(sl);
			_.axes[axe].scrollPos      = _.axes[axe].scrollPos || 0;
			_.axes[axe].scrollableArea = _.axes[axe].scrollableArea || 0;
			_.axes[axe].scrollableArea = Math.max(_.axes[axe].scrollableArea, sl.duration);
			
			sl.goTo(_.axes[axe].scrollPos, this._.tweenRefMaps);
			this._updateTweenRefs();
			return sl;
		}
		
		rmScrollableAnim( sl, axe = "scrollY" ) {
			var _ = this._, found;
			if ( _.axes ) {
				let i = _.axes[axe].scrollableAnims.indexOf(sl);
				if ( i != -1 ) {
					_.axes[axe].scrollableAnims.splice(i, 1);
					_.axes[axe].scrollableArea = Math.max(..._.axes[axe].scrollableAnims.map(tl => tl.duration), 0);
					sl.goTo(0, this._.tweenRefMaps)
					found = true;
				}
			}
			!found && console.warn("TweenLine not found !")
		}
		
		scrollTo( newPos, ms = 0, axe = "scrollY" ) {
			if ( this._.axes ) {
				let oldPos = this._.axes[axe].targetPos,
				    setPos = pos => (
					    this._.axes[axe].scrollPos = pos,
					    this.componentDidScroll && this.componentDidScroll(~~pos),
						    this._updateTweenRefs()
				    );
				
				newPos                     = Math.max(0, newPos);
				newPos                     = Math.min(newPos, this._.axes[axe].scrollableArea);
				this._.axes[axe].targetPos = newPos;
				
				if ( !ms ) {
					this._.axes[axe].scrollableAnims.forEach(
						sl => sl.goTo(newPos, this._.tweenRefMaps)
					);
					setPos(newPos);
				}
				else {
					this._runScrollGoTo(axe, newPos, ms, undefined, setPos)
				}
				
				if ( !this._.live ) {
					this._.live = true;
					requestAnimationFrame(this._._rafLoop);
				}
				return !(oldPos - newPos);
			}
		}
		
		
		// ------------------------------------------------------------
		// ------------------ Motion/FSM anims ------------------------
		// ------------------------------------------------------------
		
		
		goToMotionStateId( targetId ) {
			let _static = this.constructor,
			    tState  = _static.motionStates[targetId],
			    cState  = this._.curMotionStateId;
			if ( !this._.rendered )
				return this._.delayedMotionTarget = targetId;
			if ( this.running )
				this.running = arguments;
			if (
				!this.running
				&& targetId != this._.curMotionStateId
			) {
				if ( !this._.tweenRefCSS )
					this.makeTweenable();
				this.running = true;
				let flow     = new taskflow(
					[
						_static.motionStates[this._.curMotionStateId] &&
						(( ctx, flow ) => (_static.motionStates[cState].leaving(ctx, flow, cState))),
						() => {
							this._.curMotionStateId = targetId
							if ( this.running !== true )
								setTimeout(() => this.goToMotionStateId(...this.running));
							this.running = false;
						},
						tState &&
						(( ctx, flow ) => (tState.entering(ctx, flow, cState))),
						() => {
							tState.refs
							&& Object.keys(tState.refs)
							         .map(
								         ( k ) => {
									         this.updateRefStyle(k, tState.refs[k][0]);
									         this.applyTweenState(k, tState.refs[k][1]);
								         }
							         )
						}
					],
					this
				    )
				;
				flow.run()
			}
			
		}
		
		applyTweenState( id, map, reset ) {
			var me = this;
			Object.keys(map).map(
				( p ) => me._tweenRefMaps[id][p] = (!reset && me._tweenRefMaps[id][p] || 0) + map[p]
			);
		}
		
		updateRefStyle( target, style, postPone ) {
			if ( isArray(target) && isArray(style) )
				return target.map(( m, i ) => this.updateRefStyle(m, style[i], postPone));
			if ( isArray(target) )
				return target.map(( m ) => this.updateRefStyle(m, style, postPone));
			
			if ( !this._.tweenRefCSS )
				this.makeTweenable();
			
			if ( !postPone && this.refs[target] ) {
				var node = this.refs[target] instanceof Element
				           ? this.refs[target]
				           : ReactDom.findDOMNode(
						this.refs[target]);
				node && Object.assign(node.style, style);
			}
			this._.tweenRefCSS[target] = this._.tweenRefCSS[target] || {};
			Object.assign(this._.tweenRefCSS[target], style);
		}
		
		//
		//shouldApplyScroll( to, from ) {
		//	return this._.scrollHook.reduce(( r, hook ) => (!r
		//	                                                ? false
		//	                                                : hook(to, from)), true)
		//		|| super.shouldApplyScroll && super.shouldApplyScroll(to, from);
		//}
		
		makeScrollable() {
			if ( !this._.scrollEnabled ) {
				this._.scrollEnabled = true;
				this._.scrollHook    = [];
				this._.axes          = {};
				this._registerScrollListeners();
				//ReactDom.findDOMNode(this).addEventListener("onscroll", this._.onScroll)
			}
		}
		
		_registerScrollListeners() {
			if ( this._.rendered ) {
				isBrowserSide && utils.addWheelEvent(
					ReactDom.findDOMNode(this),
					this._.onScroll = ( e ) => {//@todo
						let prevent,
						    axe    = "scrollY",
						    oldPos = this._.axes[axe].scrollPos,
						    newPos = oldPos + e.deltaY;
						
						if ( oldPos !== newPos ) {
							if ( !this.shouldApplyScroll || this.shouldApplyScroll(newPos, oldPos, axe) ) {
								if ( this.scrollTo(newPos, 100, axe) )
									prevent = !(opts.propagateAxes && opts.propagateAxes.scrollY);
							}
							
						}
						axe    = "scrollX";
						oldPos = this._.axes[axe].scrollPos;
						newPos = oldPos + e.deltaX;
						if ( oldPos !== newPos ) {
							if ( !this.shouldApplyScroll || this.shouldApplyScroll(newPos, oldPos, axe) ) {
								if ( this.scrollTo(newPos, 100, axe) )
									prevent = !(opts.propagateAxes && opts.propagateAxes.scrollX);
							}
							
						}
						
						if ( prevent ) {
							e.preventDefault();
							e.originalEvent.stopPropagation();
						}
					}
				);
				let lastPos;
				isBrowserSide && utils.addEvent(
					ReactDom.findDOMNode(this), this._.dragList = {
						'drag'   : ( e, touch, descr ) => {//@todo
							
							lastPos = lastPos || { ...descr._startPos };
							
							let prevent,
							    axe    = "scrollY",
							    delta  = lastPos.y - descr._lastPos.y,
							    oldPos = this._.axes[axe].scrollPos,
							    newPos = oldPos + (delta) / 10;
							
							if ( delta && (!this.shouldApplyScroll || this.shouldApplyScroll(newPos, oldPos, axe)) ) {
								lastPos.y = descr._lastPos.y;
								if ( this.scrollTo(newPos, 10, axe) )
									prevent = !(opts.propagateAxes && opts.propagateAxes.scrollX) && prevent;
							}
							
							axe    = "scrollX";
							oldPos = this._.axes[axe].scrollPos;
							delta  = lastPos.x - descr._lastPos.x;
							newPos = oldPos + (delta) / 10;
							if ( delta && (!this.shouldApplyScroll || this.shouldApplyScroll(newPos, oldPos, axe)) ) {
								lastPos.x = descr._lastPos.x;
								if ( this.scrollTo(newPos, 10, axe) )
									prevent = !(opts.propagateAxes && opts.propagateAxes.scrollX) && prevent;
							}
							
							if ( prevent ) {
								e.preventDefault();
								e.stopPropagation();
							}
							return !prevent;
						},
						'dropped': ( e, touch, descr ) => {
							lastPos = null;
						}
					}, null,
					opts.enableMouseDrag
				)
			}
			else {
				this._.doRegister = true;
			}
		}
		
		makeTweenable() {
			if ( !this._.tweenEnabled ) {
				this._.rtweensByProp      = {};
				this._.rtweensByStateProp = {};
				this._.tweenRefCSS        = {};
				this._.tweenRefs          = {};
				this._.tweenRefMaps       = {};
				this._.tweenRefUnits      = {};
				this._.tweenEnabled       = true;
				this._.tweenRefOrigin     = {};
				this._.muxDataByTarget    = this._.muxDataByTarget || {};
				this._.tweenRefDemuxed    = this._.tweenRefDemuxed || {};
				this._.tweenRefTargets    = this._.tweenRefTargets || [];
				this._.runningAnims       = this._.runningAnims || [];
				
				isBrowserSide && window.addEventListener(
					"resize",
					this._.onResize = () => {//@todo
						this._updateBox();
						this._updateTweenRefs()
					});
			}
		}
		
		_updateBox() {
			var node = ReactDom.findDOMNode(this);
			if ( node ) {
				this._.box.inited = true;
				this._.box.x      = node.offsetWidth;
				this._.box.y      = node.offsetHeight;
			}
		}
		
		getTweenableRef( id ) {
			return this._.refs[id];
		}
		
		_rafLoop() {
			this._updateTweenRefs();
			if ( this._.runningAnims.length )
				requestAnimationFrame(this._._rafLoop);
			else {
				this._.live = false;
			}
		}
		
		_updateTweenRefs() {
			//if ( this._.tweenEnabled ) {
			//console.log("refs update")
			for ( var i = 0, target, node; i < this._.tweenRefTargets.length; i++ ) {
				target = this._.tweenRefTargets[i];
				muxToCss(this._.tweenRefMaps[target], this._.tweenRefCSS[target], this._.muxByTarget[target], this._.muxDataByTarget[target], this._.box);
				node = this._.tweenEnabled && target == "__root"
				       ? ReactDom.findDOMNode(this)
				       : this.getTweenableRef(target);
				node && Object.assign(node.style, this._.tweenRefCSS[target]);
			}
			//}
		}
		
		componentWillUnmount() {
			
			if ( this._.tweenEnabled ) {
				this._.tweenEnabled = false;
				window.removeEventListener("resize", this._.onResize);
			}
			
			if ( this._.scrollEnabled ) {
				this._.scrollEnabled = false;
				//this._.axes          = undefined;
				utils.rmWheelEvent(
					ReactDom.findDOMNode(this),
					this._.onScroll);
				utils.removeEvent(
					ReactDom.findDOMNode(this), this._.dragList)
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
			if ( this._.delayedMotionTarget ) {
				this.goToMotionStateId(this._.delayedMotionTarget);
				delete this._.delayedMotionTarget;
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
			if ( this._.doRegister ) {
				this._registerScrollListeners();
				this._.doRegister = false;
			}
			super.componentDidMount && super.componentDidMount(...arguments);
		}
		
		componentDidUpdate( prevProps, prevState ) {
			
			if ( this._.tweenEnabled ) {
				this._updateBox();
				this._updateTweenRefs();
				
				this._.rtweensByProp
				&& Object.keys(prevProps)
				         .forEach(
					         ( k ) =>
						         this._.rtweensByProp[k]
						         && (this.props[k] !== prevProps[k])
						         && this._.rtweensByProp[k][this.props[k]]
						         && this.pushAnim(this._.rtweensByProp[k][this.props[k]]/*get current pos*/),
					         this
				         );
				this._.rtweensByStateProp
				&& prevState
				&& Object.keys(prevState)
				         .forEach(
					         ( k ) =>
						         this._.rtweensByStateProp[k]
						         && (this.state[k] !== prevState[k])
						         && this._.rtweensByStateProp[k][this.state[k]]
						         && this.pushAnim(this._.rtweensByStateProp[k][this.state[k]]/*get current pos*/),
					         this
				         );
			}
			super.componentDidUpdate && super.componentDidUpdate(...arguments);
			// return;
		}
		
		registerPropChangeAnim( propId, propValue, anims ) {
			this._.rtweensByProp                    = this._.rtweensByProp || {};
			this._.rtween                           = this._.rtween || new rtween();
			this._.rtweensByProp[propId]            = this._.rtweensByProp[propId] || {};
			this._.rtweensByProp[propId][propValue] = this._.rtweensByProp[propId][propValue] ||
				new rtween();
			
			this._.rtweensByProp[propId][propValue].mount(anims);
			
		}
		
		registerStateChangeAnim( propId, propValue, anims ) {
			this._.rtweensByStateProp                    = this._.rtweensByStateProp || {};
			this._.rtween                                = this._.rtween || new rtween();
			this._.rtweensByStateProp[propId]            = this._.rtweensByStateProp[propId] || {};
			this._.rtweensByStateProp[propId][propValue] = this._.rtweensByStateProp[propId][propValue] ||
				new rtween();
			
			this._.rtweensByStateProp[propId][propValue].mount(anims);
			
		}
		
		render() {
			return <TweenerContext.Provider value={ this }>
				{ super.render() }
			</TweenerContext.Provider>;
		}
	}
}
