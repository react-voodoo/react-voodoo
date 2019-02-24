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

import React                 from "react";
import {asTweener, TweenRef} from "Comp";
import "./samples.scss";


var easingFn = require('d3-ease');

let pushIn  = function ( target ) {
	return {
		anims: [
			{
				type    : "Tween",
				target  : target,
				from    : 0,
				duration: 500,
				easeFn  : easingFn.easeCircleIn,
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
				easeFn  : easingFn.easeCubicInOut,
				apply   : {
					_z: -.2,
				}
			}
		]
	};
};

@asTweener
export class Sample extends React.Component {
	static scrollableAnim = [
		{
			type    : "Tween",
			target  : "testItem",
			from    : 0,
			duration: 150,
			easeFn  : easingFn.easePolyOut,
			apply   : {
				_z: -.2,
			}
		},
		{
			type    : "Tween",
			target  : "testItem",
			from    : 25,
			duration: 150,
			easeFn  : easingFn.easePolyOut,
			apply   : {
				x: -50,
			}
		},
		{
			type    : "Tween",
			target  : "testItem",
			from    : 50,
			duration: 150,
			easeFn  : easingFn.easePolyOut,
			apply   : {
				rotateY: -60,
			}
		}
	];
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
			Header is coming ... <br/>
			{/*scrollPos : { this._.scrollPos } / { this._.scrollableArea }*/ }
			{/*<br/>*/ }
			{/*<button onClick={ e => this.scrollTo(0, 500) }>( go to 0 )</button>*/ }
			{/*<button onClick={ e => this.scrollTo(200, 500) }>( go to 200 )</button>*/ }
			
			<TweenRef
				id={ "testItem" }
				initial={ { x: "50vw", y: "50vh", _z: 0, opacity: .75 } }
			>
				<div
					onClick={ e => {
						this.setState({ count: this.state.count + 1 })
						this.pushAnim(pushOut("testItem"),
						              () => {
							              this.pushAnim(pushIn("testItem"),
							                            () => {
								                            this.setState({ count: this.state.count - 1 })
							                            });
							
						              });
					} }
					style={ {
						position  : "absolute",
						display   : "inline-block",
						width     : "15em",
						height    : "15em",
						cursor    : "pointer",
						background: "red",
						overflow  : "hidden",
						margin    : "-7.5em 0 0 -7.5em",
						top       : "0px",
						left      : "0px"
					} }>click me !
				</div>
			</TweenRef>
		</div>;
	}
}