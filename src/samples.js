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
import ReactDom from "react-dom";

import {asTweener} from ".";
import "./samples.scss";

console.log("Dev !")

var easingFn = require('Comp/utils/easingFn');

let pushIn  = function ( target ) {
	return {
		anims: [
			{
				type    : "Tween",
				target  : target,
				from    : 0,
				duration: 500,
				easeFn  : easingFn.easeOutSine,
				apply   : {
					_z: .2,
				}
			}
		]
	};
};
let pushOut = function ( target ) {
	return {
		anims: [
			{
				type    : "Tween",
				target  : target,
				from    : 0,
				duration: 500,
				easeFn  : easingFn.easeOutSine,
				apply   : {
					_z: -.2,
				}
			}
		]
	};
};

@asTweener
class Sample extends React.Component {
	static scrollableAnim = {
		anims: [
			{
				type    : "Tween",
				target  : "step",
				from    : 0,
				duration: 150,
				easeFn  : easingFn.easeOutSine,
				apply   : {
					_z: -.2,
				}
			},
			{
				type    : "Tween",
				target  : "step",
				from    : 50,
				duration: 150,
				easeFn  : easingFn.easeOutSine,
				apply   : {
					_x: -.75,
				}
			},
			{
				type    : "Tween",
				target  : "step",
				from    : 100,
				duration: 100,
				easeFn  : easingFn.easeOutSine,
				apply   : {
					rotateY: -60,
				}
			}
		]
	};
	state                 = {
		count: 0
	};
	
	componentDidScroll( pos ) {
		//console.log(pos);
		this.forceUpdate();
	}
	
	// is in view port ?
	shouldApplyScroll( pos ) {
		let node     = ReactDom.findDOMNode(this),
		    bounding = node.getBoundingClientRect();
		if (
			bounding.top >= 0 &&
			bounding.left >= 0 &&
			bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
			bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
		) {
			return true;
		}
		else {
			return false;
		}
		
	}
	
	render() {
		return <div className={ "root" } style={ {
			width : "100%",
			height: "100%"
		} }>
			hello ! { this.state.count } concurent anims <br/>
			scrollPos : { this._scrollPos } / { this._scrollableArea }
			<button onClick={ e => this.scrollTo(0, 500) }>( go to 0 )</button>
			<div
				onClick={ e => {
					this.setState({ count: this.state.count + 1 })
					this.pushAnim(pushOut("step"),
					              () => {
						              this.pushAnim(pushIn("step"),
						                            () => {
							                            this.setState({ count: this.state.count - 1 })
						                            });
						
					              });
				} }
				{ ...this.tweenRef("step",
				                   // initial style
				                   {
					                   position  : "absolute",
					                   display   : "inline-block",
					                   width     : "15em",
					                   height    : "15em",
					                   cursor    : "pointer",
					                   background: "red",
					                   overflow  : "hidden",
					                   margin    : "-7.5em 0 0 -7.5em",
					                   top       : 0,
					                   left      : 0
				                   },
				                   { _x: .5, _y: .5, z: 1, opacity: 1 }, 0) }/>
		
		</div>;
	}
}

class App extends React.Component {
	render() {
		
		return <div className={ "app" } style={ {
			overflow: "scroll",
			width   : "100%",
			height  : "100%"
		} }>
			<Sample/>
			<Sample/>
		</div>
	}
}

function renderSamples() {
	
	
	ReactDom.render(
		<App/>
		, document.getElementById('app'));
	
}

renderSamples()

if ( process.env.NODE_ENV !== 'production' && module.hot ) {
	module.hot.accept('.', renderSamples);
}