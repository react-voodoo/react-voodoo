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

import React                             from "react";
import is                                from "is";
import utils                             from "./utils";
import Inertia                           from './helpers/Inertia';

var easingFn = require('d3-ease');
import TweenerContext                    from "./TweenerContext";
import rtween                            from "rtween";
import ReactDom                          from "react-dom";
import {deMuxTween, muxToCss, deMuxLine} from "./helpers";

/**
 * @todo : clean & comments
 */


let isBrowserSide           = (new Function("try {return this===window;}catch(e){ return false;}"))(),
    isArray                 = is.array,
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
	
	opts = {
		...opts,
		wheelRatio: 5,
		
	}
	
	return class TweenableComp extends BaseComponent {
		static displayName = (BaseComponent.displayName || BaseComponent.name) + " (tweener)";
		
		constructor() {
			super(...arguments);
			this._           = {
				refs       : {},
				muxByTarget: {},
			};
			this._.box       = {
				x: 100,
				y: 100,
				z: 800
			};
			this._._rafLoop  = this._rafLoop.bind(this);
			this.__isTweener = true;
			
		}
		
		resetTweenable( ...targets ) {
			let _ = this._;
			targets.forEach(
				( t ) => {
					// delete this._.tweenRefs[t];
					// delete this._.tweenRefCSS[t];
					//this._.tweenRefMaps[t] = Object.fromEntries(Object.entries(this._.tweenRefMaps[t]).map(( obj ) =>
					//let newCss        = {};
					//_.tweenRefMaps[t] = { ..._.tweenRefOrigin[t] };
					//Object.keys(_.tweenRefCSS[t])
					//      .forEach(
					//	      key => (newCss[key] = '')
					//      );
					//Object.assign(newCss, _.tweenRefOriginCss[t]);
					//_.tweenRefCSS[t] = newCss;
					this.tweenRef(t, _.tweenRefOriginCss[t], _.iMapOrigin[t], null, null, true)
				}
			)
			this._updateTweenRefs();
		}
		
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
		tweenRef( id, iStyle, iMap, pos, noref, mapReset ) {// ref initial style
			this.makeTweenable();
			
			let _            = this._,
			    tweenableMap = {};
			
			let initials = {};
			if ( !_.tweenRefs[id] )
				_.tweenRefTargets.push(id);
			
			if ( _.tweenRefs[id] && (_.iMapOrigin[id] !== iMap || mapReset) ) {
				// hot switch initial values
				
				_.iMapOrigin[id] = iMap;
				iStyle           = iStyle || {};
				iMap             = iMap || {};
				
				if ( mapReset ) {
					_.muxByTarget[id]     = {};
					_.muxDataByTarget[id] = {};
					Object.keys(_.tweenRefCSS[id])// unset
					      .forEach(
						      key => (iStyle[key] = iStyle[key] || '')
					      );
					_.tweenRefMaps[id] = tweenableMap = { ..._.tweenRefOrigin[id] };
					iStyle             = {
						...iStyle, ...deMuxTween(iMap, tweenableMap, initials,
						                         _.muxDataByTarget[id], _.muxByTarget[id], true)
					};
					Object.assign(_.tweenRefCSS[id], _.tweenRefOriginCss[id]);
					//Object.keys(_.tweenRefMaps[id])// unset
					//      .forEach(
					//	      key => (
					//		      tweenableMap.hasOwnProperty(key)
					//		      ? _.tweenRefMaps[id][key] = tweenableMap[key] : delete _.tweenRefMaps[id][key]
					//	      )
					//      );
				}
				else {
					//_.muxByTarget[id]     = {};
					delete _.muxDataByTarget[id].transform_head;
					iStyle = { ...iStyle, ...deMuxTween(iMap, tweenableMap, initials, _.muxDataByTarget[id], _.muxByTarget[id], true) };
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
					
					Object.keys(_.tweenRefMaps[id])// unset
					      .forEach(
						      key => {
							      //key == "width" &&
							      if ( _.tweenRefOrigin[id].hasOwnProperty(key) && !tweenableMap.hasOwnProperty(key) ) {
								      delete _.tweenRefMaps[id][key]
								      delete _.muxByTarget[id][key]
							      }
						      }
					      );
					_.tweenRefOrigin[id]    = { ...tweenableMap };
					_.tweenRefOriginCss[id] = { ...iStyle };
				}
				
				//let newCss        = {};
				//_.tweenRefMaps[t] = { ..._.tweenRefOrigin[t] };
				
				//_.tweenRefMaps[id] = tweenableMap;
				muxToCss(_.tweenRefMaps[id], _.tweenRefCSS[id], _.muxByTarget[id], _.muxDataByTarget[id], _.box);
			}
			else if ( !_.tweenRefs[id] ) {
				_.iMapOrigin[id] = iMap;
				iStyle           = iStyle || {};
				iMap             = iMap || {};
				
				_.tweenRefs[id]       = true;
				_.muxByTarget[id]     = _.muxByTarget[id] || {};
				_.muxDataByTarget[id] = _.muxDataByTarget[id] || {};
				
				
				iStyle = { ...iStyle, ...deMuxTween(iMap, tweenableMap, initials, _.muxDataByTarget[id], _.muxByTarget[id], true) };
				//_.tweenRefUnits[id] = extractUnits(iMap);
				//}
				_.tweenRefOrigin[id]    = tweenableMap;
				_.tweenRefOriginCss[id] = { ...iStyle };
				_.tweenRefCSS[id]       = iStyle;
				// init / reset or get the tweenable view
				tweenableMap            = _.tweenRefMaps[id] = Object.assign(_.tweenRefMaps[id] || {}, initials, tweenableMap || {});
				
				muxToCss(tweenableMap, iStyle, _.muxByTarget[id], _.muxDataByTarget[id], _.box);
				
				
			}
			if ( noref )
				return {
					style: { ..._.tweenRefCSS[id] }
				};
			else
				return {
					style: { ..._.tweenRefCSS[id] },
					ref  : node => (_.refs[id] = node)
					,
					// __tweenMap : this._.tweenRefMaps[id],
					// __tweenCSS : this._.tweenRefCSS[id]
				};
		}
		
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
		
		setRootRef( id ) {
			this._.rootRef = id;
		}
		
		// ------------------------------------------------------------
		// -------------------- Pushable anims ------------------------
		// ------------------------------------------------------------
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
		
		makeTweenable() {
			if ( !this._.tweenEnabled ) {
				this._.rtweensByProp       = {};
				this._.rtweensByStateProp  = {};
				this._.tweenRefCSS         = {};
				this._.tweenRefs           = {};
				this._.tweenRefMaps        = {};
				this._.iMapOrigin          = {};
				this._.tweenRefInitialData = {};
				this._.tweenEnabled        = true;
				this._.tweenRefOrigin      = {};
				this._.tweenRefOriginCss   = {};
				this._.axes                = {};
				this._.muxDataByTarget     = this._.muxDataByTarget || {};
				this._.tweenRefDemuxed     = this._.tweenRefDemuxed || {};
				this._.tweenRefTargets     = this._.tweenRefTargets || [];
				this._.runningAnims        = this._.runningAnims || [];
				
				isBrowserSide && window.addEventListener(
					"resize",
					this._.onResize = () => {//@todo
						this._updateBox();
						this._updateTweenRefs()
					});
			}
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
						if ( this._.tweenEnabled ) {
							//console.log('TweenableComp::setPos:514: ', x);
							this._.axes[axe].tweenLines.forEach(
								sl => sl.goTo(x, this._.tweenRefMaps)
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
		
		_getAxis( axe = "scrollY" ) {
			let _ = this._;
			
			_.axes[axe] = _.axes[axe] || {
				tweenLines      : [],
				scrollPos       : opts.initialScrollPos && opts.initialScrollPos[axe] || 0,
				targetPos       : 0,
				scrollableWindow: 0,
				scrollableArea  : 0,
				inertia         : new Inertia({
					                              value: opts.initialScrollPos && opts.initialScrollPos[axe] || 0,
					                              ...(opts.axes && opts.axes[axe] && opts.axes[axe].inertia || {})
				                              }),
			};
			
			return _.axes[axe];
		}
		
		getAxisState() {
			let _ = this._, state = {};
			_.axes && Object.keys(_.axes)
			                .forEach(
				                axe => (state[axe] = _.axes[axe].targetPos || _.axes[axe].scrollPos)
			                );
			return state;
		}
		
		initAxis( axe, _inertia, _scrollableArea = 0, _scrollableWindow, defaultPosition ) {
			this.makeTweenable();
			this.makeScrollable();
			let _                = this._,
			    dim              = _.axes[axe],
			    scrollPos        = dim ? dim.scrollPos : defaultPosition || 0,
			    scrollableArea   = Math.max(dim && dim.scrollableArea || 0, _scrollableArea),
			    scrollableWindow = Math.max(dim && dim.scrollableWindow || 0, _scrollableWindow),
			    targetPos        = dim ? dim.targetPos : scrollPos,
			    inertia          = _inertia !== false && (
				    dim ? dim.inertia : new Inertia({// todo mk pure
					                                    ...(_inertia || {}),
					                                    value: scrollPos
				                                    })),
			    nextDescr        = {
				    ...(_inertia || {}),
				    tweenLines: dim && dim.tweenLines || [],
				    scrollPos,
				    targetPos,
				    inertia,
				    scrollableWindow,
				    scrollableArea
			    }
			;
			
			dim = this._.axes[axe] = nextDescr;
			(_inertia) && (dim.inertia._.wayPoints = _inertia.wayPoints);
		}
		
		addScrollableAnim( anim, axe = "scrollY", size ) {
			var sl,
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
			
			if ( !(sl instanceof rtween) ) {
				sl = deMuxLine(sl, initials, this._.muxDataByTarget, this._.muxByTarget);
				sl = new rtween(sl, _.tweenRefMaps);
				Object.keys(initials)
				      .forEach(
					      id => {
						      this._.tweenRefMaps[id] = this._.tweenRefMaps[id] || {},
							      Object.assign(this._.tweenRefMaps[id], {
								      ...initials[id],
								      ...this._.tweenRefMaps[id]
							      })
					      }
				      )
			}
			
			this.makeTweenable();
			this.makeScrollable();
			
			// init scroll
			dim.tweenLines.push(sl);
			dim.scrollPos      = dim.scrollPos || 0;
			dim.scrollableArea = dim.scrollableArea || 0;
			dim.scrollableArea = Math.max(dim.scrollableArea, sl.duration);
			dim.inertia.setBounds(0, dim.scrollableArea);
			sl.goTo(dim.scrollPos, this._.tweenRefMaps);
			this._updateTweenRefs();
			return sl;
		}
		
		rmScrollableAnim( sl, axe = "scrollY" ) {
			var _   = this._, found,
			    dim = this._getAxis(axe);
			let i   = dim.tweenLines.indexOf(sl);
			if ( i != -1 ) {
				dim.tweenLines.splice(i, 1);
				dim.scrollableArea = Math.max(...dim.tweenLines.map(tl => tl.duration), 0);
				dim.inertia.setBounds(0, dim.scrollableArea || 0);
				sl.goTo(0, this._.tweenRefMaps)
				found = true;
			}
			!found && console.warn("TweenAxis not found !")
		}
		
		scrollTo( newPos, ms = 0, axe = "scrollY", ease ) {
			return new Promise(
				(( resolve, reject ) => {
					
					if ( this._.axes && this._.axes[axe] ) {
						let oldPos = this._.axes[axe].targetPos,
						    setPos = pos => {
							
							    //console.log('TweenableComp::setPos:514: ', this.constructor.displayName);
							    this._.axes[axe].targetPos = this._.axes[axe].scrollPos = pos;
							    if ( this._.axes[axe].inertia ) {
								    this._.axes[axe].inertia._.pos = pos;
							    }
							    this.componentDidScroll && this.componentDidScroll(~~pos, axe);
							    this._updateTweenRefs()
						    }
						;
						
						newPos                     = Math.max(0, newPos);
						newPos                     = Math.min(newPos, this._.axes[axe].scrollableArea || 0);
						this._.axes[axe].targetPos = newPos;
						
						if ( !ms ) {
							this._.axes[axe].tweenLines.forEach(
								sl => sl.goTo(newPos, this._.tweenRefMaps)
							);
							setPos(newPos);
							resolve()
						}
						else {
							this._runScrollGoTo(axe, newPos, ms, easingFn[ease], setPos, resolve)
						}
						
						if ( !this._.live ) {
							this._.live = true;
							requestAnimationFrame(this._._rafLoop);
						}
						//return !(oldPos - newPos);
					}
				}))
		}
		
		makeScrollable() {
			if ( !this._.scrollEnabled ) {
				this._.scrollEnabled = true;
				this._.scrollHook    = [];
				this._registerScrollListeners();
			}
		}
		
		_registerScrollListeners() {
			let _static = this.constructor,
			    _       = this._;
			if ( this._.rendered ) {
				let rootNode   = this.getRootNode(),
				    debounceTm = 0,
				    debounceTr = 0,
				    scrollLoad = { x: 0, y: 0 },
				    lastScrollEvt;
				if ( !this._parentTweener && isBrowserSide ) {
					
					if ( !rootNode )
						console.warn("fail registering scroll listener !! ")
					else
						utils.addWheelEvent(
							rootNode,
							this._.onScroll = ( e ) => {//@todo
								let now       = Date.now();
								scrollLoad.y += e.deltaY;
								scrollLoad.x += e.deltaX;
								lastScrollEvt = e.originalEvent;
								//debounceTm    = debounceTm || now;
								//if ( debounceTr && debounceTm + 500 < now ) {
								//
								//	clearTimeout(debounceTr)
								//	this._doDispatch(document.elementFromPoint(lastScrollEvt.clientX,
								// lastScrollEvt.clientY), scrollLoad.x * 5, scrollLoad.y * 5) scrollLoad.y = 0;
								// scrollLoad.x = 0; debounceTm   = 0; //debounceTm = now; return; }
								// clearTimeout(debounceTr) //debounceTm = now; debounceTr = setTimeout( tm => {
								// debugger
								this._doDispatch(document.elementFromPoint(lastScrollEvt.clientX, lastScrollEvt.clientY), scrollLoad.x * 5, scrollLoad.y * 5)
								scrollLoad.y = 0;
								scrollLoad.x = 0;
								debounceTm   = 0;
								debounceTr   = lastScrollEvt = undefined;
								//	},
								//	50
								//)
								// check if there scrollable stuff in dom targets
								;
								
								
							}
						);
					
					let lastStartTm,
					    cLock, dX,
					    parents, dY,
					    parentsState;
					if ( !rootNode )
						console.warn("fail registering drag listener !! ")
					else
						utils.addEvent(
							rootNode, this._.dragList = {
								'dragstart': ( e, touch, descr ) => {//@todo
									let tweener,
									    x,
									    y, i;
									
									parents      = utils.findReactParents(e.target);
									//console.log(parents)
									lastStartTm  = Date.now();
									dX           = 0;
									dY           = 0;
									parentsState = [];
									//document.body.style.touchAction = 'none';
									//document.body.style.userSelect  = 'none';
									for ( i = 0; i < parents.length; i++ ) {
										tweener = parents[i];
										// react comp with tweener support
										if ( tweener.__isTweener && tweener._.scrollEnabled ) {
											x = tweener._getAxis("scrollX");
											y = tweener._getAxis("scrollY");
											//x.inertia.startMove();
											//y.inertia.startMove();
											//parentsState[i] = { x: x.scrollPos, y: y.scrollPos };
											//!x.inertiaFrame && tweener.applyInertia(x, "scrollX");
											//!y.inertiaFrame && tweener.applyInertia(y, "scrollY");
										}
										else if ( is.element(tweener) ) {
											parentsState[i] = getComputedStyle(tweener, null);
										}
										
									}
								},
								'click'    : ( e, touch, descr ) => {//@todo
									if ( lastStartTm && !(lastStartTm > Date.now() - 150 && Math.abs(dY) < 10 && Math.abs(dX) < 10) )// skip tap & click
									{
										e.preventDefault();
										e.stopPropagation();
									}
								},
								'drag'     : ( e, touch, descr ) => {//@todo
									let tweener,
									    x, deltaX, xDispatched,
									    y, deltaY, yDispatched,
									    style, i;
									
									dX += -(descr._lastPos.x - descr._startPos.x);
									dY += -(descr._lastPos.y - descr._startPos.y);
									
									if ( lastStartTm > Date.now() - 150 && Math.abs(dY) < 10 && Math.abs(dX) < 10 )// skip tap & click
										return;
									
									if ( opts.dragDirectionLock ) {
										if ( cLock === "Y" || !cLock && Math.abs(dY * .5) > Math.abs(dX) ) {
											cLock = "Y";
											dX    = 0;
										}
										else if ( cLock === "X" || !cLock && Math.abs(dX * .5) > Math.abs(dY) ) {
											cLock = "X";
											dY    = 0;
										}
									}
									
									//console.log("drag", dY);
									for ( i = 0; i < parents.length; i++ ) {
										tweener = parents[i];
										// react comp with tweener support
										if ( tweener.__isTweener && tweener._.scrollEnabled ) {
											
											x = tweener._getAxis("scrollX");
											y = tweener._getAxis("scrollY");
											
											if ( !parentsState[i] ) {
												parentsState[i] = { x: x.scrollPos, y: y.scrollPos };
												x.inertia.startMove();
												y.inertia.startMove();
												!x.inertiaFrame && tweener.applyInertia(x, "scrollX");
												!y.inertiaFrame && tweener.applyInertia(y, "scrollY");
											}
											deltaX = (dX / tweener._.box.x) * (x.scrollableWindow || x.scrollableArea);
											deltaY = (dY / tweener._.box.y) * (y.scrollableWindow || y.scrollableArea);
											if ( !xDispatched && !tweener.isAxisOut("scrollX", parentsState[i].x + deltaX, true) ) {
												x.inertia.hold(parentsState[i].x + deltaX);
												xDispatched = true;
											}
											if ( !yDispatched && !tweener.isAxisOut("scrollY", parentsState[i].y + deltaY, true) ) {
												y.inertia.hold(parentsState[i].y + deltaY);
												yDispatched = true;
											}
										}
										else if ( is.element(tweener) ) {
											style = parentsState[i];
											if ( /(auto|scroll)/.test(
												style.getPropertyValue("overflow")
												+ style.getPropertyValue("overflow-x")
												+ style.getPropertyValue("overflow-y")
											)
											) {
												if (
													(dY < 0 && tweener.scrollTop !== 0)
													||
													(dY > 0 && tweener.scrollTop !== (tweener.scrollHeight - tweener.offsetHeight))
												) {
													return;
												} // let the node do this scroll
											}
											
										}
										
									}
									dX = 0;
									dY = 0;
								},
								'dropped'  : ( e, touch, descr ) => {
									let tweener,
									    i;
									cLock = undefined;
									//lastStartTm                     = undefined;
									//document.body.style.userSelect  = '';
									//document.body.style.touchAction = '';
									
									for ( i = 0; i < parents.length; i++ ) {
										tweener = parents[i];
										// react comp with tweener support
										if ( tweener.__isTweener && tweener._.scrollEnabled && parentsState[i] ) {
											tweener._getAxis("scrollY").inertia.release();
											tweener._getAxis("scrollX").inertia.release();
										}
										
									}
									parents = parentsState = null;
								}
							}, null,
							opts.enableMouseDrag
						)
				}
				this._.doRegister = !!rootNode;
			}
			else {
				this._.doRegister = true;
			}
		}
		
		// ------------------------------------------------------------
		// --------------- Inertia & scroll modifiers -----------------
		// ------------------------------------------------------------
		
		
		applyInertia( dim, axe ) {
			let x = dim.inertia.update();
			
			this._.axes[axe].tweenLines.forEach(
				sl => {
					this._.axes[axe].targetPos = this._.axes[axe].scrollPos = x;
					sl.goTo(x, this._.tweenRefMaps)
				}
			);
			//console.log("scroll at " + x, axe, dim.inertia.active || dim.inertia.holding);
			//this.scrollTo(x, 0, axe);
			this.componentDidScroll && this.componentDidScroll(x, axe);
			this._updateTweenRefs()
			if ( dim.inertia.active || dim.inertia.holding ) {
				dim.inertiaFrame = setTimeout(this.applyInertia.bind(this, dim, axe));
			}
			else {
				dim.inertiaFrame = null;
				//console.log("complete");
			}
		}
		
		
		isInertiaActive() {//todo
			let _ = this._, active = false;
			_.axes &&
			Object.keys(_.axes)
			      .forEach(
				      axe => (active = active || _.axes[axe] && _.axes[axe].inertia.active)
			      );
			return active;
		}
		
		
		dispatchScroll( delta, axe = "scrollY" ) {
			let prevent,
			    dim    = this._.axes[axe],
			    oldPos = dim && dim.scrollPos,
			    newPos = oldPos + delta;
			
			if ( dim && oldPos !== newPos ) {
				
				//console.log("dispatch " + delta, this.constructor.displayName);
				dim.inertia.dispatch(delta, 100);
				!dim.inertiaFrame && this.applyInertia(dim, axe);
				
				//this.scrollTo(newPos, 0, axe)
			}
			
			return prevent;
		}
		
		isAxisOut( axis, v, abs ) {
			let _   = this._,
			    dim = _.axes && _.axes[axis],
			    pos = abs ? v : dim && (dim.scrollPos + v);
			return !dim || (pos <= 0 || pos >= dim.scrollableArea);
		}
		
		_doDispatch( target, dx, dy, holding ) {
			let style,
			    Comps,
			    headTarget = target,
			    i;
			
			// check if there scrollable stuff in dom targets
			// get all the parents components & dom node of an dom element ( from fibers )
			Comps = utils.findReactParents(headTarget);
			//console.log("dispatching ", dx, dy, Comps);
			for ( i = 0; i < Comps.length; i++ ) {
				// react comp with tweener support
				if ( Comps[i].__isTweener ) {
					if ( !Comps[i].isAxisOut("scrollX", dx) ) {
						Comps[i].dispatchScroll(dx, "scrollX", holding);
						dx = 0;
					}
					if ( !Comps[i].isAxisOut("scrollY", dy) ) {
						Comps[i].dispatchScroll(dy, "scrollY", holding);
						dy = 0;
					}
					if ( !dx && !dy )
						break;
				}
				// dom element
				else if ( is.element(Comps[i]) ) {
					style = getComputedStyle(headTarget, null)
					if ( /(auto|scroll)/.test(
						style.getPropertyValue("overflow")
						+ style.getPropertyValue("overflow-x")
						+ style.getPropertyValue("overflow-y")
					)
					) {
						if (
							(dy < 0 && headTarget.scrollTop !== 0)
							||
							(dy > 0 && headTarget.scrollTop !== (headTarget.scrollHeight - headTarget.offsetHeight))
						) {
							return;
						} // let the node do this scroll
					}
					
					headTarget = headTarget.parentNode;
					if ( headTarget === document || headTarget === target )
						break;
				}
			}
		}
		
		// ------------------------------------------------------------
		// ------------------ Motion/FSM anims ------------------------
		// ------------------------------------------------------------
		
		applyTweenState( id, map, reset ) {
			let tmap = {}, initials = {};
			deMuxTween(map, tmap, initials, this._.muxDataByTarget[id], this._.muxByTarget[id])
			Object.keys(tmap).map(
				( p ) => this._.tweenRefMaps[id][p] = (!reset && this._.tweenRefMaps[id][p] || initials[p]) + tmap[p]
			);
		}
		
		updateRefStyle( target, style, postPone ) {
			let _ = this._, initials = {}, map = {};
			if ( isArray(target) && isArray(style) )
				return target.map(( m, i ) => this.updateRefStyle(m, style[i], postPone));
			if ( isArray(target) )
				return target.map(( m ) => this.updateRefStyle(m, style, postPone));
			
			if ( !this._.tweenRefCSS )
				this.makeTweenable();
			
			deMuxTween(style, _.tweenRefMaps[target], initials, _.muxDataByTarget[target], _.muxByTarget[target], true);
			this._updateTweenRefs();
			//Object.assign(initials, _.tweenRefCSS[target]);
			//_.tweenRefCSS[target] = initials;
		}
		
		_updateBox() {
			var node = this.getRootNode();
			if ( node ) {
				this._.box.inited = true;
				this._.box.x      = node.offsetWidth;
				this._.box.y      = node.offsetHeight;
			}
		}
		
		getTweenableRef( id ) {
			return this._.refs[id] && ReactDom.findDOMNode(this._.refs[id]);
		}
		
		getRootNode() {
			return this._.rootRef && this.getTweenableRef(this._.rootRef) || ReactDom.findDOMNode(this);
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
				//let now = Date.now();
				//console.log(now - this._lf)
				//this._lf = now;
				for ( let i = 0, target, node; i < this._.tweenRefTargets.length; i++ ) {
					target = this._.tweenRefTargets[i];
					muxToCss(this._.tweenRefMaps[target], this._.tweenRefCSS[target], this._.muxByTarget[target], this._.muxDataByTarget[target], this._.box);
					node = this.getTweenableRef(target);
					node && Object.assign(node.style, this._.tweenRefCSS[target]);
				}
			}
		}
		
		componentWillUnmount() {
			let node = this.getRootNode();
			if ( this._.tweenEnabled ) {
				this._.tweenEnabled = false;
				window.removeEventListener("resize", this._.onResize);
			}
			
			if ( this._.scrollEnabled ) {
				this._.scrollEnabled = false;
				
				//this._.axes          = undefined;
				node && this._.onScroll && !this._parentTweener && utils.rmWheelEvent(
					node,
					this._.onScroll);
				node && this._.dragList && utils.removeEvent(node
					, this._.dragList)
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
			if ( this._.doRegister || this.__isFirst ) {
				
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
		}
		
		render() {
			return <TweenerContext.Consumer>
				{
					parentTweener => {
						this._parentTweener = parentTweener;
						return <TweenerContext.Provider value={ this }>
							{ super.render() }
						</TweenerContext.Provider>;
					}
				}
			</TweenerContext.Consumer>;
		}
	}
}
