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
import ReactDom       from "react-dom";
import taskflow       from "taskflows";
import utils          from "./utils";
import TweenerContext from "./TweenerContext";
import rtween         from "rtween";

/**
 * @todo : clean & comments
 */


var isBrowserSide    = (new Function("try {return this===window;}catch(e){ return false;}"))(),
    isArray          = is.array,
    initialTweenable = {// while no matrix..
	    x      : 0,
	    y      : 0,
	    z      : 0,
	    _x     : 0,
	    _y     : 0,
	    _z     : 0,
	    // opacity   : 1,
	    rotateY: 0,
	    rotateX: 0,
	    rotate : 0
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
	    opts          = (!argz[0] || argz[0] instanceof SimpleObjectProto) && argz.shift();
	
	if ( !(BaseComponent && (BaseComponent.prototype instanceof React.Component || BaseComponent === React.Component)) ) {
		return function ( BaseComponent ) {
			return asTweener(BaseComponent, opts)
		}
	}
	
	const _ = {
		refs: {}
	};
	
	return class TweenableComp extends BaseComponent {
		
		constructor() {
			super(...arguments);
			let _static        = this.constructor;
			this._             = _;
			_.box              = {
				x: 100,
				y: 100,
				z: 800
			};
			_.curMotionStateId = _static.InitialMotionState || "stand";
		}
		
		goToMotionStateId( targetId ) {
			let _static = this.constructor,
			    tState  = _static.motionStates[targetId],
			    cState  = _.curMotionStateId;
			if ( !_.rendered )
				return _.delayedMotionTarget = targetId;
			if ( this.running )
				this.running = arguments;
			if (
				!this.running
				&& targetId != _.curMotionStateId
			) {
				if ( !_.tweenRefCSS )
					this.makeTweenable();
				this.running = true;
				let flow     = new taskflow(
					[
						_static.motionStates[_.curMotionStateId] &&
						(( ctx, flow ) => (_static.motionStates[cState].leaving(ctx, flow, cState))),
						() => {
							_.curMotionStateId = targetId
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
			
			if ( !_.tweenRefCSS )
				this.makeTweenable();
			
			if ( !postPone && this.refs[target] ) {
				var node = this.refs[target] instanceof Element
				           ? this.refs[target]
				           : ReactDom.findDOMNode(
						this.refs[target]);
				node && Object.assign(node.style, style);
			}
			_.tweenRefCSS[target] = _.tweenRefCSS[target] || {};
			Object.assign(_.tweenRefCSS[target], style);
		}
		
		resetTweenable( ...targets ) {
			targets.forEach(
				( t ) => {
					// delete _.tweenRefs[t];
					// delete _.tweenRefCSS[t];
					_.tweenRefMaps[t] = { ..._.tweenRefOrigin[t] };
				}
			)
		}
		
		addScrollableAnim( anim, size, pos ) {
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
			_.scrollableAnims.push(sl);
			_.scrollPos      = _.scrollPos || 0;
			_.scrollableArea = _.scrollableArea || 0;
			_.scrollableArea = Math.max(_.scrollableArea, sl.duration);
		}
		
		clearScrollableAnim( sl ) {
			if ( _.scrollableAnims ) {
				let i = _.scrollableAnims.indexOf(sl);
				if ( i != -1 )
					_.scrollableAnims.splice(i);
				
				_.scrollableArea = Math.max(..._.scrollableAnims.map(tl => tl.duration), 0);
			}
		}
		
		clearScrollableAnims() {
			if ( _.scrollableAnims ) {
				_.scrollableAnims = [];
				_.scrollPos       = _.scrollableArea = 0;
			}
		}
		
		scrollTo( newPos, ms = 0 ) {
			if ( _.scrollableAnims ) {
				let oldPos = newPos,
				    setPos = pos => (_.scrollPos = pos, this.componentDidScroll && this.componentDidScroll(~~pos));
				
				newPos = Math.max(0, newPos);
				newPos = Math.min(newPos, _.scrollableArea);
				
				if ( !ms ) {
					_.scrollableAnims.forEach(
						sl => sl.goTo(newPos)
					);
					setPos(newPos);
				}
				else
					_.scrollableAnims.forEach(
						sl => sl.runTo(newPos, ms, undefined, setPos)
					);
				
				
				if ( !_.live ) {
					_.live = true;
					requestAnimationFrame(_._rafLoop = _._rafLoop || this._rafLoop.bind(this));
				}
				return !(oldPos - newPos);
			}
		}
		
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
				sl = new rtween(sl, _.tweenRefMaps);
			
			
			// console.warn("Should start anim ", sl);
			this.makeTweenable();
			
			
			!skipInit && initial && Object.keys(initial).map(
				( id ) => this.applyTweenState(id, initial[id], anim.reset)
			);
			
			
			sl.run(_.tweenRefMaps, () => {
				var i = _.runningAnims.indexOf(sl);
				if ( i != -1 )
					_.runningAnims.splice(i, 1);
				
				then && then(sl);
				// if (anim.resetAfter)
				//     setTimeout(()=>sl.go(0,me._tweenRefMaps),133);
			});//launch
			_.runningAnims.push(sl);
			
			
			if ( !_.live ) {
				_.live = true;
				//console.log("RAF On");
				requestAnimationFrame(_._rafLoop = _._rafLoop || this._rafLoop.bind(this));
			}
			return sl;
			
		}
		
		/*
		 motionRef( id, css, listen, rtween, from, to )
		 motionRef( id, css, state, listen, rtween, from, to )
		 motionRef( id, css, state, rtween, at )
		 motionRef( id, css, state, rtween, units, at )
		 motionRef( id, css, rtween, at )
		 motionRef( id, css, rtween, units, at )
		 motionRef( id, css, watchRefs )
		 
		 motionRef( string, object )// tween ref
		 motionRef( string, object, object )
		 motionRef( string, object, object, rtween, int )// tween ref with pos
		 motionRef( string, object, object, rtween, object, int )
		 motionRef( string, object, string, rtween, int, int )  // tween ref watching cursor
		 motionRef( string, object, object, string, rtween, int, int )
		 motionRef( string, object, rtween, int )// tween ref with pos
		 motionRef( string, object, rtween, object, int )
		 motionRef( string, object, array )// stacked ref types
		 
		 watchRefs = [
		 {
		 listen:"some_parent_thread",
		 anim : somertween,
		 from,to
		 },
		 {
		 anim : somertween,
		 at : anim_state_position
		 },
		 {
		 state : {},// rtween values
		 }
		 ]
		 */
		
		tweenable( id, css, watchRefs ) {// ref initial style
			var argz = [...arguments],
			    p    = argz.map(( v ) => (
				    (v instanceof rtween) && "rtween"
				    || (v instanceof Array) && "array"
				    || typeof v
			    ));
			// if ( p[3] == "object" && p[3] == "object" )
			// debugger;
			return {};
		}
		
		tweenRef( id, iStyle, iMap, pos, noref, mapReset ) {// ref initial style
			// if (mapReset) debugger;
			this.makeTweenable();
			
			let _static = this.constructor,
			    _       = this._,
			    cState  = _static.motionStates && _static.motionStates[_.curMotionStateId];
			
			if ( !_.tweenRefs[id] )
				_.tweenRefTargets.push(id);
			
			if ( cState && cState.refs && cState.refs[id] ) {
				iStyle = iStyle || { ...cState.refs[id][0] };
				iMap   = iMap || { ...cState.refs[id][1] };
			}
			else {
				iStyle = iStyle || {};
				iMap   = iMap || {};
			}
			
			_.tweenRefs[id] = true;
			
			if ( isArray(iMap) ) {
				_.tweenRefUnits[id] = iMap[1];
				iMap                = iMap[0];
			}
			if ( iMap.getPosAt ) {// typeof rtween
				// debugger;
				
				
				// if (/btn_/.test(id)) debugger;
				iMap = iMap.getPosAt(
					pos,
					!mapReset && _.tweenRefMaps[id]
						|| Object.assign({}, initialTweenable, iMap.scope || {})
				);
				
			}
			else {
				
				mapReset = noref;
				noref    = pos;
				
				_.tweenRefUnits[id] = extractUnits(iMap);
			}
			_.tweenRefOrigin[id] = iMap;
			//_.tweenRefCSS[id]    = _.tweenRefCSS[id] || {};
			
			if ( !mapReset && _.tweenRefCSS[id] ) {
				_.tweenRefCSS[id] = {
					...iStyle
				}
			}
			else _.tweenRefCSS[id] = iStyle && { ...iStyle } || {}
			iStyle = _.tweenRefCSS[id];
			iMap   = _.tweenRefMaps[id] = !mapReset && _.tweenRefMaps[id]
				|| Object.assign({}, initialTweenable, iMap || {});
			
			utils.mapInBoxCSS(iMap, iStyle, _.box, _.tweenRefUnits[id]);
			
			_.refs[id] = _.refs[id] || React.createRef();
			
			if ( noref )
				return {
					style: { ..._.tweenRefCSS[id] }
				};
			else
				return {
					style: { ..._.tweenRefCSS[id] },
					ref  : _.refs[id],
					// __tweenMap : _.tweenRefMaps[id],
					// __tweenCSS : _.tweenRefCSS[id]
				};
		}
		
		makeScrollable() {
			if ( !_.scrollEnabled ) {
				_.scrollEnabled   = true;
				_.scrollableAnims = [];
				isBrowserSide && utils.addWheelEvent(
					ReactDom.findDOMNode(this),
					_.onScroll = ( e ) => {//@todo
						let oldPos = _.scrollPos,
						    newPos = oldPos + e.deltaY;
						
						if ( this.shouldApplyScroll && !this.shouldApplyScroll() ) {
							return;
						}
						
						if ( this.scrollTo(newPos) )
							e.preventDefault();
					});
			}
		}
		
		makeTweenable() {
			if ( !_.tweenEnabled ) {
				_.rtweensByProp      = {};
				_.rtweensByStateProp = {};
				_.tweenRefCSS        = {};
				_.tweenRefs          = {};
				_.tweenRefMaps       = {};
				_.tweenRefUnits      = {};
				_.tweenEnabled       = true;
				_.tweenRefOrigin     = {};
				_.tweenRefTargets    = _.tweenRefTargets || [];
				_.runningAnims       = _.runningAnims || [];
				
				isBrowserSide && window.addEventListener(
					"resize",
					_.onResize = () => {//@todo
						this._updateBox();
						this._updateTweenRefs()
					});
			}
		}
		
		_updateBox() {
			var node = ReactDom.findDOMNode(this);
			if ( node ) {
				_.box.inited = true;
				_.box.x      = node.offsetWidth;
				_.box.y      = node.offsetHeight;
			}
		}
		
		// updateRefMap( target, map ) {
		//     Object.assign(_.tweenRefMaps[target], map);
		// }
		
		getTweenableRef( id ) {
			return _.refs[id].current;
		}
		
		_rafLoop() {
			this._updateTweenRefs();
			//if ( _.runningAnims.length )
			requestAnimationFrame(_._rafLoop);
			//else {
			//	_.live = false;
			//}
		}
		
		_updateTweenRefs() {
			if ( _.tweenEnabled ) {
				
				for ( var i = 0, target, node; i < _.tweenRefTargets.length; i++ ) {
					target = _.tweenRefTargets[i];
					utils.mapInBoxCSS(
						_.tweenRefMaps[target],
						_.tweenRefCSS[target],
						_.box,
						_.tweenRefUnits[target]
					);
					node = _.tweenEnabled && target == "__root"
					       ? ReactDom.findDOMNode(this)
					       : this.getTweenableRef(target);
					node && Object.assign(node.style, _.tweenRefCSS[target]);
				}
			}
		}
		
		componentWillUnmount() {
			
			if ( _.tweenEnabled ) {
				_.tweenEnabled = false;
				window.removeEventListener("resize", _.onResize);
			}
			
			if ( _.scrollEnabled ) {
				_.scrollEnabled   = false;
				_.scrollableAnims = undefined;
				utils.rmWheelEvent(
					ReactDom.findDOMNode(this),
					_.onScroll);
			}
			
			super.componentWillUnmount && super.componentWillUnmount();
		}
		
		componentDidMount() {
			let _static = this.constructor;
			
			_.rendered = true;
			if ( _.tweenEnabled ) {
				// debugger;
				this._updateBox();
				this._updateTweenRefs();
			}
			if ( _.delayedMotionTarget ) {
				this.goToMotionStateId(_.delayedMotionTarget);
				delete _.delayedMotionTarget;
			}
			if ( _static.scrollableAnim ) {
				this.addScrollableAnim(_static.scrollableAnim);
			}
			super.componentDidMount && super.componentDidMount();
		}
		
		componentDidUpdate( prevProps, prevState ) {
			
			if ( _.tweenEnabled ) {
				this._updateBox();
				this._updateTweenRefs();
				
				_.rtweensByProp
				&& Object.keys(prevProps)
				         .forEach(
					         ( k ) =>
						         _.rtweensByProp[k]
						         && (this.props[k] !== prevProps[k])
						         && _.rtweensByProp[k][this.props[k]]
						         && this.pushAnim(_.rtweensByProp[k][this.props[k]]/*get current pos*/),
					         this
				         );
				_.rtweensByStateProp
				&& prevState
				&& Object.keys(prevState)
				         .forEach(
					         ( k ) =>
						         _.rtweensByStateProp[k]
						         && (this.state[k] !== prevState[k])
						         && _.rtweensByStateProp[k][this.state[k]]
						         && this.pushAnim(_.rtweensByStateProp[k][this.state[k]]/*get current pos*/),
					         this
				         );
			}
			super.componentDidUpdate && super.componentDidUpdate();
			// return;
		}
		
		registerPropChangeAnim( propId, propValue, anims ) {
			_.rtweensByProp                    = _.rtweensByProp || {};
			_.rtween                           = _.rtween || new rtween();
			_.rtweensByProp[propId]            = _.rtweensByProp[propId] || {};
			_.rtweensByProp[propId][propValue] = _.rtweensByProp[propId][propValue] ||
				new rtween();
			
			_.rtweensByProp[propId][propValue].mount(anims);
			
		}
		
		registerStateChangeAnim( propId, propValue, anims ) {
			_.rtweensByStateProp                    = _.rtweensByStateProp || {};
			_.rtween                                = _.rtween || new rtween();
			_.rtweensByStateProp[propId]            = _.rtweensByStateProp[propId] || {};
			_.rtweensByStateProp[propId][propValue] = _.rtweensByStateProp[propId][propValue] ||
				new rtween();
			
			_.rtweensByStateProp[propId][propValue].mount(anims);
			
		}
		
		render() {
			return <TweenerContext.Provider value={ this.tweenRef.bind(this) }>
				{ super.render() }
			</TweenerContext.Provider>;
		}
	}
}
