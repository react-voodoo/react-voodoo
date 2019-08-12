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

import React                            from "react";
import {asTweener, TweenAxis, TweenRef} from "react-voodoo";


/**
 * This is an experimental lib & a very beta demo
 *
 */

const initialBallStyle = {
	position: "absolute",
	display : "inline-block",
	cursor  : "pointer",
	overflow: "hidden",
	top     : "100%",
	left    : "100%",
	
};

@asTweener({ enableMouseDrag: true })
export default class GooBall extends React.Component {
	root = React.createRef();
	
	static defaultProps = {
		defaultPosition: {
			x: .5,
			y: .5
		},
		style          : initialBallStyle,
		color          : "black"
	};
	state               = {};
	currentTarget       = {
		x: .5,
		y: .5
	};
	nextTarget          = {};
	
	constructor( props ) {
		super(...arguments);
		this.currentTarget = {
			x: props.defaultPosition.x,
			y: props.defaultPosition.y
		};
	}
	
	pushGoTo = ( nextTarget ) => {
		let tweener    = this.props.tweener,
		    target     = {
			    y: 200 - nextTarget.scrollY,
			    x: 200 - nextTarget.scrollX
		    },
		    lastTarget = this.currentTarget,
		    tween;
		
		target.y /= 200;
		target.x /= 200;
		target.y           = Math.min(1, Math.max(0, target.y.toFixed(3)));
		target.x           = Math.min(1, Math.max(0, target.x.toFixed(3)));
		this.currentTarget = target;
		
		tween = {
			transform: {
				translateX: (target.x - lastTarget.x) + "box",
				translateY: (target.y - lastTarget.y) + "box"
			}
		};
		//
		//console.log({ ...target })
		tweener.pushAnim(
			[
				{
					target  : "goo3",
					duration: 200,
					apply   : tween
				},
				{
					target  : "goo2",
					duration: 300,
					apply   : tween
				}
			]);
	};
	
	componentDidScroll( pos, axis ) {
		let now               = Date.now();
		this.nextTarget[axis] = pos;
		this._pendingGotoTm && clearTimeout(this._pendingGotoTm);
		// mano debounce
		if ( now - this.lastTm < 50 )
			return this._pendingGotoTm = setTimeout(tm => this.componentDidScroll(pos, axis), 50);
		this.lastTm = now;
		this.pushGoTo(this.nextTarget)
	}
	
	static getDerivedStateFromProps( props, state ) {
		let { color, style, defaultPosition } = props;
		return {
			style    : {
				...style,
				backgroundColor: color,
				transform      : [
					{
						translateX: "0box",
						translateY: "0box",
					},
					{
						translateX: "-50%",
						translateY: "-50%",
					},
				]
			},
			styleBall: {
				...style,
				
				backgroundColor: color,
				top            : "0%",
				left           : "0%",
				transform      : [
					{
						translateX: defaultPosition.x + "box",
						translateY: defaultPosition.y + "box",
					},
					{
						translateX: "-50%",
						translateY: "-50%",
					},
				]
			},
			ballAxis : {
				scrollX: [
					{
						from    : 0,
						duration: 200,
						apply   : {
							transform: {
								translateX: "-1box"
							},
						}
					},
				],
				scrollY: [
					{
						from    : 0,
						duration: 200,
						apply   : {
							transform: {
								translateY: "-1box"
							},
						}
					},
				]
			}
		}
	}
	
	render() {
		let { defaultPosition } = this.props;
		return <div className={"GooBall"}
		            ref={this.root}>
			<TweenAxis
				axe={"scrollY"}
				defaultPosition={200 - defaultPosition.y * 200}
			/>
			<TweenAxis
				axe={"scrollX"}
				defaultPosition={200 - defaultPosition.x * 200}
			/>
			<TweenRef.div id={"goo2"}
			              initial={this.state.styleBall}
			              className={"ball"}/>
			<TweenRef.div id={"goo3"}
			              initial={this.state.styleBall}
			              className={"ball"}/>
			<TweenRef.div id={"goo1"}
			              tweenAxis={this.state.ballAxis}
			              initial={this.state.style}
			              className={"ball"}/>
		</div>;
	}
}