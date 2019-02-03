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
import ReactDom from "react-dom";
import utils    from "./utils";

var rtween           = require('rtween'),
    isBrowserSide    = (new Function("try {return this===window;}catch(e){ return false;}"))(),
    isArray          = is.array,
    taskflow         = require('taskflows'),
    defaultAnims     = {// while no matrix..
	    hide: require('Comp/anims/pushOut'),
	    show: require('Comp/anims/pushIn')
    },
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
 * Tweener decorator
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
	
	return class TweenableComp extends BaseComponent {
		
		constructor() {
			super(...arguments);
			let _static            = this.constructor;
			this._box              = {
				x: 100,
				y: 100,
				z: 800
			};
			this._curMotionStateId = _static.InitialMotionState || "stand";
		}
		
		_rafLoop() {
			this._updateTweenRefs();
			if ( this._runningAnims.length )
				requestAnimationFrame(this.__rafLoop);
			else {
				//console.log("RAF Off");
				this._live = false;
			}
		}
		
		goToMotionStateId( targetId ) {
			let _static = this.constructor,
			    tState  = _static.motionStates[targetId],
			    cState  = this._curMotionStateId;
			if ( !this._rendered )
				return this._delayedMotionTarget = targetId;
			if ( this.running )
				this.running = arguments;
			if (
				!this.running
				&& targetId != this._curMotionStateId
			) {
				if ( !this._tweenRefCSS )
					this.makeTweenable();
				this.running = true;
				let flow     = new taskflow(
					[
						_static.motionStates[this._curMotionStateId] &&
						(( ctx, flow ) => (_static.motionStates[cState].leaving(ctx, flow, cState))),
						() => {
							this._curMotionStateId = targetId
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
			
			if ( !this._tweenRefCSS )
				this.makeTweenable();
			
			if ( !postPone && this.refs[target] ) {
				var node = this.refs[target] instanceof Element
				           ? this.refs[target]
				           : ReactDom.findDOMNode(
						this.refs[target]);
				node && Object.assign(node.style, style);
			}
			this._tweenRefCSS[target] = this._tweenRefCSS[target] || {};
			Object.assign(this._tweenRefCSS[target], style);
		}
		
		resetTweenable( ...targets ) {
			targets.forEach(
				( t ) => {
					// delete this._tweenRefs[t];
					// delete this._tweenRefCSS[t];
					this._tweenRefMaps[t] = { ...this._tweenRefOrigin[t] };
				}
			)
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
				sl = new rtween(sl, this._tweenRefMaps);
			
			
			// console.warn("Should start anim ", sl);
			this.makeTweenable();
			
			
			!skipInit && initial && Object.keys(initial).map(
				( id ) => this.applyTweenState(id, initial[id], anim.reset)
			);
			
			
			sl.run(this._tweenRefMaps, () => {
				var i = this._runningAnims.indexOf(sl);
				if ( i != -1 )
					this._runningAnims.splice(i, 1);
				
				then && then(sl);
				// if (anim.resetAfter)
				//     setTimeout(()=>sl.go(0,me._tweenRefMaps),133);
			});//launch
			this._runningAnims.push(sl);
			
			
			if ( !this._live ) {
				this._live = true;
				//console.log("RAF On");
				requestAnimationFrame(this.__rafLoop = this.__rafLoop || this._rafLoop.bind(this));
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
			    cState  = _static.motionStates && _static.motionStates[this._curMotionStateId];
			
			if ( !this._tweenRefs[id] )
				this._tweenRefTargets.push(id);
			
			if ( cState && cState.refs && cState.refs[id] ) {
				iStyle = iStyle || { ...cState.refs[id][0] };
				iMap   = iMap || { ...cState.refs[id][1] };
			}
			else {
				iStyle = iStyle || {};
				iMap   = iMap || {};
			}
			
			this._tweenRefs[id] = true;
			
			if ( isArray(iMap) ) {
				this._tweenRefUnits[id] = iMap[1];
				iMap                    = iMap[0];
			}
			if ( iMap.getPosAt ) {// typeof rtween
				// debugger;
				
				
				// if (/btn_/.test(id)) debugger;
				iMap = iMap.getPosAt(
					pos,
					!mapReset && this._tweenRefMaps[id]
						|| Object.assign({}, initialTweenable, iMap.scope || {})
				);
				
			}
			else {
				
				mapReset = noref;
				noref    = pos;
				
				this._tweenRefUnits[id] = extractUnits(iMap);
			}
			this._tweenRefOrigin[id] = iMap;
			//this._tweenRefCSS[id]    = this._tweenRefCSS[id] || {};
			if ( !mapReset && this._tweenRefCSS[id] ) {
				this._tweenRefCSS[id] = {
					...iStyle
				}
			}
			else this._tweenRefCSS[id] = iStyle && { ...iStyle } || {}
			iStyle = this._tweenRefCSS[id];
			iMap   = this._tweenRefMaps[id] = !mapReset && this._tweenRefMaps[id]
				|| Object.assign({}, initialTweenable, iMap || {});
			
			utils.mapInBoxCSS(iMap, iStyle, this._box, this._tweenRefUnits[id]);
			
			if ( noref )
				return {
					style: { ...this._tweenRefCSS[id] }
				};
			else
				return {
					style: { ...this._tweenRefCSS[id] },
					ref  : id,
					// __tweenMap : this._tweenRefMaps[id],
					// __tweenCSS : this._tweenRefCSS[id]
				};
		}
		
		makeTweenable() {
			if ( !this._tweenEnabled ) {
				var me                   = this;
				this._rtweensByProp      = {};
				this._rtweensByStateProp = {};
				this._tweenRefCSS        = {};//c rtween styles
				this._tweenRefs          = {};//c rtween styles
				this._tweenRefMaps       = {};//c rtween values
				this._tweenRefUnits      = {};//c rtween values
				this._tweenEnabled       = true;
				this._tweenRefOrigin     = {};
				this._tweenRefTargets    = this._tweenRefTargets || [];
				this._runningAnims       = this._runningAnims || [];
				
				isBrowserSide && window.addEventListener("resize", this._onResize = () => {//@todo
					me._updateBox();
					me._updateTweenRefs()
				});
			}
		}
		
		_updateBox() {
			var node = ReactDom.findDOMNode(this);
			if ( node ) {
				this._box.inited = true;
				this._box.x      = node.offsetWidth;
				this._box.y      = node.offsetHeight;
			}
		}
		
		
		// updateRefMap( target, map ) {
		//     Object.assign(this._tweenRefMaps[target], map);
		// }
		
		getTweenableRef( target ) {
			return this.refs[target] instanceof Element ? this.refs[target]
			                                            : ReactDom.findDOMNode(this.refs[target]);
		}
		
		_updateTweenRefs() {
			// if ( this._tweenEnabled ) {
			
			for ( var i = 0, target, node; i < this._tweenRefTargets.length; i++ ) {
				target = this._tweenRefTargets[i];
				// if ( this._tweenRefUnits[target].height )
				//     debugger;
				utils.mapInBoxCSS(
					this._tweenRefMaps[target],
					this._tweenRefCSS[target],
					this._box,
					this._tweenRefUnits[target]
				);
				node = this._tweenEnabled && target == "__root"
				       ? ReactDom.findDOMNode(this)
				       : this.getTweenableRef(target);
				node && Object.assign(node.style, this._tweenRefCSS[target]);
			}
			// }
		}
		
		componentWillUnmount() {
			
			if ( this._tweenEnabled ) {
				this._tweenEnabled = false;
				window.removeEventListener("resize", this._onResize);
			}
			super.componentWillUnmount && super.componentWillUnmount();
		}
		
		componentDidMount() {
			
			this._rendered = true;
			if ( this._tweenEnabled ) {
				// debugger;
				this._updateBox();
				this._updateTweenRefs();
			}
			if ( this._delayedMotionTarget ) {
				this.goToMotionStateId(this._delayedMotionTarget);
				delete this._delayedMotionTarget;
			}
			super.componentDidMount && super.componentDidMount();
		}
		
		componentDidUpdate( prevProps, prevState ) {
			
			if ( this._tweenEnabled ) {
				this._updateBox();
				this._updateTweenRefs();
				
				this._rtweensByProp
				&& Object.keys(prevProps)
				         .forEach(
					         ( k ) =>
						         this._rtweensByProp[k]
						         && (this.props[k] !== prevProps[k])
						         && this._rtweensByProp[k][this.props[k]]
						         && this.pushAnim(this._rtweensByProp[k][this.props[k]]/*get current pos*/),
					         this
				         );
				this._rtweensByStateProp
				&& prevState
				&& Object.keys(prevState)
				         .forEach(
					         ( k ) =>
						         this._rtweensByStateProp[k]
						         && (this.state[k] !== prevState[k])
						         && this._rtweensByStateProp[k][this.state[k]]
						         && this.pushAnim(this._rtweensByStateProp[k][this.state[k]]/*get current pos*/),
					         this
				         );
			}
			super.componentDidUpdate && super.componentDidUpdate();
			// return;
		}
		
		registerPropChangeAnim( propId, propValue, anims ) {
			this._rtweensByProp                    = this._rtweensByProp || {};
			this._rtween                           = this._rtween || new rtween();
			this._rtweensByProp[propId]            = this._rtweensByProp[propId] || {};
			this._rtweensByProp[propId][propValue] = this._rtweensByProp[propId][propValue] ||
				new rtween();
			
			this._rtweensByProp[propId][propValue].mount(anims);
			
		}
		
		registerStateChangeAnim( propId, propValue, anims ) {
			this._rtweensByStateProp                    = this._rtweensByStateProp || {};
			this._rtween                                = this._rtween || new rtween();
			this._rtweensByStateProp[propId]            = this._rtweensByStateProp[propId] || {};
			this._rtweensByStateProp[propId][propValue] = this._rtweensByStateProp[propId][propValue] ||
				new rtween();
			
			this._rtweensByStateProp[propId][propValue].mount(anims);
			
		}
	}
}
