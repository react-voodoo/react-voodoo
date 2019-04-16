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

import React                                        from "react";
import {asTweener, TweenRef, TweenAxis, tweenTools} from "react-rtween";
import "./samples.scss";


let pushIn        = function ( target ) {
	return {
		anims: tweenTools.reverse([
			                          {
				                          type    : "Tween",
				                          target  : target,
				                          from    : 0,
				                          duration: 500,
				                          easeFn  : "easeCircleIn",
				                          apply   : {
					                          transform: [{}, {
						                          translateZ: "-.2box"
					                          }],
					                          filter   : {
						                          sepia: 100
					                          }
				                          }
			                          },
			                          {
				                          type    : "Tween",
				                          target  : target,
				                          from    : 500,
				                          duration: 500,
				                          easeFn  : "easeCircleIn",
				                          apply   : {
					                          transform: [{}, {
						                          translateZ: ".2box"
					                          }],
					                          filter   : {
						                          sepia: -100
					                          }
				                          }
			                          },
			                          {
				                          type    : "Tween",
				                          target  : target,
				                          from    : 250,
				                          duration: 500,
				                          easeFn  : "easeCircle",
				                          apply   : {
					                          transform: [{}, {
						                          rotateY: 180,
					                          }],
				                          }
			                          }
		                          ])
	};
};
const scrollAnims = {
	scrollX: [
		{
			type    : "Tween",
			from    : 0,
			duration: 200,
			apply   : {
				transform: {
					translateX: "-1box"
				},
			}
		},
		{
			type    : "Tween",
			from    : 0,
			duration: 100,
			apply   : {
				transform: {
					rotateX: 30,
				},
			}
		},
		{
			type    : "Tween",
			from    : 100,
			duration: 100,
			apply   : {
				transform: {
					rotateX: 30,
				},
			}
		}
	],
	scrollY: [
		{
			type    : "Tween",
			from    : 0,
			duration: 200,
			apply   : {
				transform: {
					translateY: "-1box"
				},
			}
		},
		{
			type    : "Tween",
			from    : 0,
			duration: 100,
			apply   : {
				transform: {
					rotateY: -30,
				},
			}
		},
		{
			type    : "Tween",
			from    : 100,
			duration: 100,
			apply   : {
				transform: {
					rotateY: -30,
				},
			}
		}
	]
};
@asTweener({ enableMouseDrag: true })
export default class Sample extends React.Component {
	state = {
		count: 0
	};
	
	componentDidScroll( pos ) {
		this.forceUpdate();// force update to show scroll pos
	}
	
	render() {
		return <div className={ "SimpleTest" } style={ {
			width : "100%",
			height: "100%"
		} }>
			<TweenAxis
				axe={ "scrollY" }
				defaultPosition={ 100 }
			/>
			<TweenAxis
				axe={ "scrollX" }
				defaultPosition={ 100 }
			/>
			hello ! { this.state.count } concurent anims <br/>
			scrollPos : <pre>{ JSON.stringify(this.getAxisState(), null, 2) }</pre>
			<br/>y:
			<button onClick={ e => this.scrollTo(0, 500) }>( go to 0 )</button>
			<button onClick={ e => this.scrollTo(200, 500) }>( go to 200 )</button>
			<br/>x:
			<button onClick={ e => this.scrollTo(0, 500, "scrollX") }>( go to 0 )</button>
			<button onClick={ e => this.scrollTo(200, 500, "scrollX") }>( go to 200 )</button>
			
			<TweenRef
				id={ "testItem" }
				initial={ {
					position       : "absolute",
					display        : "inline-block",
					width          : "15em",
					height         : "15em",
					cursor         : "pointer",
					backgroundColor: "red",
					overflow       : "hidden",
					margin         : "-7.5em 0 0 -7.5em",
					top            : "0%",
					left           : "0%",
					
					transform: {
						translateZ: "0box",
						translateX: "1box",
						translateY: "1box",
						rotateX   : -30,
						rotateY   : 30,
						//translateZ: "100px"
					}
				} }
				tweenLines={ scrollAnims }
			>
				<div
					onClick={ e => {
						this.setState({ count: this.state.count + 1 })
						this.pushAnim(pushIn("testItem"),
						              () => {
							              this.setState({ count: this.state.count - 1 })
						              });
					} }
					style={ {} }>click me !
				</div>
			</TweenRef>
		</div>;
	}
}