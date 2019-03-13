/*
 *
 * Copyright (C) 2019 Nathan Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React          from "react";
import is             from "is";
import taskflow       from "taskflows";
import utils          from "./utils";
import TweenerContext from "./TweenerContext";
import rtween         from "rtween";
import ReactDom       from "react-dom";

/**
 * @todo : clean & comments
 */


var isBrowserSide    = (new Function("try {return this===window;}catch(e){ return false;}"))(),
    isArray          = is.array,
    initialTweenable = {// while no matrix..
	    //x      : 0,
	    //y      : 0,
	    //z      : 0,
	    //_x     : 0,
	    //_y     : 0,
	    //_z     : 0,
	    //// opacity   : 1,
	    //rotateY: 0,
	    //rotateX: 0,
	    //rotate : 0
    },
    unitsRe          = new RegExp(
	    "([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" +
	    ['em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|')
	    + ")"
    ),
    extractUnits     = ( map ) => {
	    var r = {};
	    Object.keys(map).map(( k ) => {
		    if ( unitsRe.test((map[k] + '').trim()) ) {
			    r[k]   = (map[k] + '').trim().replace(unitsRe, '$2');
			    map[k] = parseFloat((map[k] + '').trim().replace(unitsRe, '$1'));
		    }
	    });
	    return r;
    };

const SimpleObjectProto = ({}).constructor;

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
				refs: {}
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
			
			let _static = this.constructor,
			    _       = this._,
			    cState  = _static.motionStates && _static.motionStates[this._.curMotionStateId];
			
			if ( !this._.tweenRefs[id] )
				this._.tweenRefTargets.push(id);
			
			if ( cState && cState.refs && cState.refs[id] ) {
				iStyle = iStyle || { ...cState.refs[id][0] };
				iMap   = iMap || { ...cState.refs[id][1] };
			}
			else {
				iStyle = iStyle || {};
				iMap   = iMap || {};
			}
			
			this._.tweenRefs[id] = true;
			
			if ( isArray(iMap) ) {
				this._.tweenRefUnits[id] = iMap[1];
				iMap                     = iMap[0];
			}
			if ( iMap.getPosAt ) {// typeof rtween
				// debugger;
				
				
				// if (/btn_/.test(id)) debugger;
				iMap = iMap.getPosAt(
					pos,
					!mapReset && this._.tweenRefMaps[id]
						|| Object.assign({}, initialTweenable, iMap.scope || {})
				);
				
			}
			else {
				
				mapReset = noref;
				noref    = pos;
				
				this._.tweenRefUnits[id] = extractUnits(iMap);
			}
			this._.tweenRefOrigin[id] = iMap;
			//this._.tweenRefCSS[id]    = this._.tweenRefCSS[id] || {};
			
			if ( !mapReset && this._.tweenRefCSS[id] ) {
				this._.tweenRefCSS[id] = {
					...iStyle
				}
			}
			else this._.tweenRefCSS[id] = iStyle && { ...iStyle } || {}
			iStyle = this._.tweenRefCSS[id];
			iMap   = this._.tweenRefMaps[id] = !mapReset && this._.tweenRefMaps[id]
				|| Object.assign({}, initialTweenable, iMap || {});
			
			utils.mapInBoxCSS(iMap, iStyle, this._.box, this._.tweenRefUnits[id]);
			
			//this._.refs[id] = this._.refs[id] || React.createRef();
			
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
			var sl, initial;
			if ( isArray(anim) ) {
				sl = anim;
			}
			else {
				sl      = anim.anims;
				initial = anim.initial;
			}
			
			if ( !(sl instanceof rtween) )
				sl = new rtween(sl, this._.tweenRefMaps);
			
			
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
				// if (anim.resetAfter)
				//     setTimeout(()=>sl.go(0,me._tweenRefMaps),133);
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
		
		addScrollableAnim( anim, axe = "scrollY", size ) {
			var sl, _ = this._;
			if ( isArray(anim) ) {
				sl = anim;
			}
			else {
				sl   = anim.anims;
				size = anim.length;
			}
			
			if ( !(sl instanceof rtween) )
				sl = new rtween(sl, _.tweenRefMaps);
			
			this.makeTweenable();
			this.makeScrollable();
			
			// init scroll
			
			_.axes[axe] = _.axes[axe] || {
				scrollableAnims: [],
				scrollPos      : opts.initialScrollPos && opts.initialScrollPos[axe] || 0,
				scrollableArea : 0
			}
			
			_.axes[axe].scrollableAnims.push(sl);
			_.axes[axe].scrollPos      = _.axes[axe].scrollPos || 0;
			_.axes[axe].scrollableArea = _.axes[axe].scrollableArea || 0;
			_.axes[axe].scrollableArea = Math.max(_.axes[axe].scrollableArea, sl.duration);
			
			_.axes[axe].scrollPos && sl.goTo(_.axes[axe].scrollPos, this._.tweenRefMaps)
		}
		
		rmScrollableAnim( sl ) {
			var _ = this._;
			if ( _.axes ) {
				Object.keys(_.axes)
				      .forEach(
					      axe => {
						      let i = _.axes[axe].scrollableAnims.indexOf(sl);
						      if ( i != -1 ) {
							      _.axes[axe].scrollableAnims.splice(i);
							      _.axes[axe].scrollableArea = Math.max(..._.axes[axe].scrollableAnims.map(tl => tl.duration), 0);
							      sl.goTo(0, this._.tweenRefMaps)
						      }
					      }
				      )
			}
		}
		
		scrollTo( newPos, ms = 0, axe = "scrollY" ) {
			if ( this._.axes ) {
				let oldPos = newPos,
				    setPos = pos => (this._.axes[axe].scrollPos = pos, this.componentDidScroll && this.componentDidScroll(~~pos), requestAnimationFrame(this._._rafLoop));
				
				newPos = Math.max(0, newPos);
				newPos = Math.min(newPos, this._.axes[axe].scrollableArea);
				
				if ( !ms ) {
					this._.axes[axe].scrollableAnims.forEach(
						sl => sl.goTo(newPos, this._.tweenRefMaps)
					);
					setPos(newPos);
				}
				else
					this._.axes[axe].scrollableAnims.forEach(
						sl => sl.runTo(newPos, ms, undefined, setPos)
					);
				
				
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
				this._.axes          = {
					scrollX: {
						scrollableAnims: [],
						scrollPos      : opts.initialScrollPos && opts.initialScrollPos["scrollX"] || 0,
						scrollableArea : 0
					},
					scrollY: {
						scrollableAnims: [],
						scrollPos      : opts.initialScrollPos && opts.initialScrollPos["scrollY"] || 0,
						scrollableArea : 0
					}
				};
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
								if ( this.scrollTo(newPos, undefined, axe) )
									prevent = true;
							}
							
						}
						axe    = "scrollX";
						oldPos = this._.axes[axe].scrollPos;
						newPos = oldPos + e.deltaX;
						if ( oldPos !== newPos ) {
							if ( !this.shouldApplyScroll || this.shouldApplyScroll(newPos, oldPos, axe) ) {
								if ( this.scrollTo(newPos, undefined, axe) )
									prevent = true;
							}
							
						}
						
						if ( prevent ) {
							e.preventDefault();
							e.originalEvent.stopPropagation();
						}
					}
				);
				isBrowserSide && utils.addEvent(
					ReactDom.findDOMNode(this), 'drag',
					this._.onDrag = ( e, touch, descr ) => {//@todo
						let prevent,
						    axe    = "scrollY",
						    oldPos = this._.axes[axe].scrollPos,
						    newPos = oldPos + (descr._startPos.y - descr._lastPos.y) / 10;
						
						if ( !this.shouldApplyScroll || this.shouldApplyScroll(newPos, oldPos, axe) ) {
							descr._startPos.y = descr._lastPos.y;
							prevent           = !!this.scrollTo(newPos, undefined, axe);
						}
						
						axe    = "scrollX";
						oldPos = this._.axes[axe].scrollPos;
						newPos = oldPos + (descr._startPos.x - descr._lastPos.x) / 10;
						if ( !this.shouldApplyScroll || this.shouldApplyScroll(newPos, oldPos, axe) ) {
							descr._startPos.x = descr._lastPos.x;
							prevent           = !!this.scrollTo(newPos, undefined, axe) && prevent;
						}
						
						//e.preventDefault();
						//debugger
						
						if ( prevent ) {
							e.preventDefault();
							e.stopPropagation();
							//e.defaultPrevented=true;
							//console.log(this.constructor.displayName, prevent, e.defaultPrevented)
						}
						return !prevent;
					},
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
			
			for ( var i = 0, target, node; i < this._.tweenRefTargets.length; i++ ) {
				target = this._.tweenRefTargets[i];
				utils.mapInBoxCSS(
					this._.tweenRefMaps[target],
					this._.tweenRefCSS[target],
					this._.box,
					this._.tweenRefUnits[target]
				);
				node = this._.tweenEnabled && target == "__root"
				       ? ReactDom.findDOMNode(this)
				       : this.getTweenableRef(target);
				node && Object.assign(node.style, this._.tweenRefCSS[target]);
				//console.log(this._.tweenRefCSS[target].transform)
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
				this._.axes          = undefined;
				utils.rmWheelEvent(
					ReactDom.findDOMNode(this),
					this._.onScroll);
			}
			
			super.componentWillUnmount && super.componentWillUnmount();
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
			super.componentDidMount && super.componentDidMount();
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
			super.componentDidUpdate && super.componentDidUpdate();
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
