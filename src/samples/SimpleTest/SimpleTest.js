/*
 *
 * Copyright (C) 2019 Nathanael Braun
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

import React                                        from "react";
import {asTweener, TweenRef, TweenAxis, tweenTools} from "react-rtween";
import "./samples.scss";


let pushIn        = [
	{
		type    : "Tween",
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
		from    : 250,
		duration: 500,
		apply   : {
			transform: [{}, {
				rotateY: 180,
			}],
		}
	}
];
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
					}
				} }
				tweenLines={ scrollAnims }
			>
				<div
					onClick={ e => {
						this.setState({ count: this.state.count + 1 })
						this.pushAnim(tweenTools.target(pushIn, "testItem"),
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