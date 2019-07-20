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
import {asTweener, TweenAxis, TweenRef, tweenTools} from "react-voodoo";
import "./samples.scss";


let pushIn        = [
	{
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
		from    : 250,
		duration: 500,
		apply   : {
			transform: [{}, {
				rotateY: "180deg",
			}],
		}
	}
];
let goDown        = ( rotateDir = "rotateY", angle = 5, deepness = 30 ) => [
	{
		from    : 0,
		duration: 50,
		apply   : {
			transform: {
				translateZ: -deepness
			},
		}
	},
	{
		from    : 0,
		duration: 25,
		apply   : {
			transform: {
				[rotateDir]: angle,
			},
		}
	},
	{
		from    : 25,
		duration: 25,
		apply   : {
			transform: {
				[rotateDir]: -angle,
			},
		}
	},
	{
		from    : 50,
		duration: 50,
		apply   : {
			transform: {
				translateZ: deepness
			},
		}
	},
	{
		from    : 50,
		duration: 25,
		apply   : {
			transform: {
				[rotateDir]: -angle,
			},
		}
	},
	{
		from    : 75,
		duration: 25,
		apply   : {
			transform: {
				[rotateDir]: angle,
			},
		}
	}];
const scrollAnims = {
	scrollX: [
		{
			from    : 0,
			duration: 200,
			apply   : {
				transform: {
					translateX: "-.8box"
				},
			}
		},
		
		...tweenTools.scale(goDown("rotateY", -4), 200, 0),
		...tweenTools.scale(goDown("rotateY", -4), 50, 0),
		...tweenTools.scale(goDown("rotateY", -4), 50, 50),
		...tweenTools.scale(goDown("rotateY", -4), 50, 100),
		...tweenTools.scale(goDown("rotateY", -4), 50, 150),
	],
	scrollY: [
		{
			from    : 0,
			duration: 200,
			apply   : {
				transform: {
					translateY: "-.8box"
				},
			}
		},
		...tweenTools.scale(goDown("rotateX", 4), 200, 0),
		...tweenTools.scale(goDown("rotateX", 4), 50, 0),
		...tweenTools.scale(goDown("rotateX", 4), 50, 50),
		...tweenTools.scale(goDown("rotateX", 4), 50, 100),
		...tweenTools.scale(goDown("rotateX", 4), 50, 150),
	]
};
@asTweener({ enableMouseDrag: true })
export default class Sample extends React.Component {
	state = {
		count: 0
	};
	
	componentDidScroll( pos, axe ) {
		console.log('scroll', pos, axe)
		this.forceUpdate();// force update to show scroll pos
	}
	
	render() {
		return <div className={"SimpleTest"} style={{
			width : "100%",
			height: "100%"
		}}>
			<TweenAxis
				axe={"scrollY"}
				defaultPosition={100}
			/>
			<TweenAxis
				axe={"scrollX"}
				defaultPosition={100}
			/>
			hello ! {this.state.count} concurent anims <br/>
			scrollPos : <pre>{JSON.stringify(this.getAxisState(), null, 2)}</pre>
			<br/>y:
			<button onClick={e => this.scrollTo(0, 500)}>( go to 0 )</button>
			<button onClick={e => this.scrollTo(200, 500)}>( go to 200 )</button>
			<br/>x:
			<button onClick={e => this.scrollTo(0, 500, "scrollX")}>( go to 0 )</button>
			<button onClick={e => this.scrollTo(200, 500, "scrollX")}>( go to 200 )</button>
			
			<TweenRef
				id={"testItem"}
				initial={{
					position       : "absolute",
					display        : "inline-block",
					width          : "15em",
					height         : "15em",
					cursor         : "pointer",
					backgroundColor: "red",
					overflow       : "hidden",
					margin         : "-7.5em 0 0 -7.5em",
					top            : ".1box",
					left           : ".1box",
					transformOrigin: "50% 50%",
					
					transform: {
						translateZ: "0box",
						translateX: ".8box",
						translateY: ".8box",
						//rotateX   : -30,
						//rotateY   : 30,
						
						//rotateY: 180,
					}
				}}
				tweenLines={scrollAnims}
			>
				<div
					onClick={e => {
						this.setState({ count: this.state.count + 1 })
						this.pushAnim(tweenTools.target(pushIn, "testItem"),
						              () => {
							              this.setState({ count: this.state.count - 1 })
						              });
					}}
					style={{}}>
					<span>drag and/or click me !</span>
				</div>
			</TweenRef>
		</div>;
	}
}