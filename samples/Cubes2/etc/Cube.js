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

import "./Cube.scss"

/**
 * This is an experimental lib & a very alpha demo
 * Probably not the simpler methods
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
export default class Cube extends React.Component {
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
	nextTarget          = {};
	
	
	static getDerivedStateFromProps( props, state ) {
		let { color, style, defaultPosition } = props;
		return {
			facesStyle  : {
				front : {
					position       : "absolute",
					width          : "100%",
					height         : "100%",
					backgroundColor: color,
					opacity        : .5,
					transform      : [, { rotateY: 0, translateZ: "6vh" }]
				},
				right : {
					position       : "absolute",
					width          : "100%",
					height         : "100%",
					backgroundColor: color,
					opacity        : .5,
					transform      : [, { rotateY: 90, translateZ: "6vh" }]
				},
				back  : {
					position       : "absolute",
					width          : "100%",
					height         : "100%",
					backgroundColor: color,
					opacity        : .5,
					transform      : [, { rotateY: 180, translateZ: "6vh" }]
				},
				left  : {
					position       : "absolute",
					width          : "100%",
					height         : "100%",
					backgroundColor: color,
					opacity        : .5,
					transform      : [, { rotateY: -90, translateZ: "6vh" }]
				},
				top   : {
					position       : "absolute",
					width          : "100%",
					height         : "100%",
					backgroundColor: color,
					opacity        : .5,
					transform      : [, { rotateX: 90, translateZ: "6vh" }]
				},
				bottom: {
					position       : "absolute",
					width          : "100%",
					height         : "100%",
					backgroundColor: color,
					opacity        : .5,
					transform      : [, { rotateX: -90, translateZ: "6vh" }]
				}
			},
			cubeStyle   : {
				position      : "absolute",
				width         : "10vh",
				height        : "10vh",
				left          : (defaultPosition.x * 100) + "%",
				top           : (defaultPosition.y * 100) + "%",
				transformStyle: "preserve-3d",
				transform     : [
					{
						translateX: "-50%",
						translateY: "-50%",
					}, {
						rotateY: "0deg",
						rotateX: "0deg"
					}
				]
			},
			contentStyle: {
				position : "absolute",
				width    : "8vh",
				height   : "8vh",
				left     : "50%",
				top      : "50%",
				transform: [
					{
						translateX: "-50%",
						translateY: "-50%",
					}, {
						//rotateX: "20deg",
					},
				]
			},
			starsStyle  : {
				position : "absolute",
				width    : "15vh",
				height   : "15vh",
				left     : "50%",
				top      : "0%",
				opacity  : 0,
				transform: [
					{
						translateX: "-80%",
						translateY: "-30%",
					}, {
						//rotateX: "20deg",
					},
				]
			},
			axis        : {
				scrollX: [
					...['front', 'back', 'left', 'right', 'top', 'bottom'].map(
						target => ({
							from    : 0,
							duration: 300,
							target,
							apply   : {
								transform: [{
									rotateY: "-1080deg"
								}],
							}
						})
					),
				],
				scrollY: [
					...['front', 'back', 'left', 'right', 'top', 'bottom'].map(
						target => ({
							from    : 0,
							duration: 300,
							target,
							apply   : {
								transform: [{
									rotateX: "1080deg"
								}],
							}
						})
					),
				],
				freeCat: [
					...['front', 'back', 'left', 'right', 'top', 'bottom'].map(
						target => ({
							from    : 0,
							duration: 150,
							target,
							easeFn  : "easeQuadIn",
							apply   : {
								opacity  : -.5,
								transform: [{}, {
									translateZ: "8vh",
								}],
							}
						})
					),
					{
						from    : 100,
						duration: 100,
						target  : "content",
						easeFn  : "easeQuadOut",
						apply   : {
							zIndex   : 3000,
							width    : "3vh",
							height   : "3vh",
							transform: [, {
								translateY: "-5vh",
							}],
						}
					},
					{
						from    : 100,
						duration: 100,
						target  : "stars",
						easeFn  : "easeQuadOut",
						apply   : {
							opacity  : 1,
							width    : "3vh",
							height   : "3vh",
							transform: [, {
								translateY: "-5vh",
							}],
						}
					}
				]
			}
		}
	}
	
	pams      = 0;
	unPam     = () => {
		this.pams = Math.max(0, this.pams * .4 - 1)
		this.props.tweener.scrollTo(this.pams, 500, "freeCat")
		if ( this.pams )
			this.unPamTm = setTimeout(this.unPam, 200)
		else this.unPamTm = undefined;
	};
	doPam     = () => {
		this.pams += 60;
		this.unPamTm && clearTimeout(this.unPamTm);
		if ( this.pams > 140 )
			this.pams = 200;
		else
			this.unPamTm = setTimeout(this.unPam, 300)
		this.props.tweener.scrollTo(this.pams, 500, "freeCat")
	};
	reset     = () => {
		if ( this.pams !== 200 ) return;
		this.pams = 0;
		this.unPamTm && clearTimeout(this.unPamTm);
		this.props.tweener.scrollTo(this.pams, 500, "freeCat")
	};
	inertia   = {
		snapToBounds: false,
		shouldLoop  : (( v, d ) => {
			if ( d < 0 && ~~(d + v) <= 100 ) {
				return 100;
			}
			if ( d > 0 && ~~(d + v) >= 200 ) {
				return -100;
			}
		}),
	};
	openEvent = () => ({
		type    : 'Event',
		from    : 180,
		duration: .01,
		entering: this.openEventFn
		//leaving : ( pos ) => this.setState({ isOpen: pos === 1 })
	});
	
	openEventFn = ( pos ) => setTimeout(tm => this.setState({ isOpen: pos === 1 }));
	
	render() {
		let { facesStyle, cubeStyle, contentStyle, starsStyle, axis, isOpen } = this.state;
		return <TweenRef.div className={"Cube" + (isOpen ? " open" : "")}
		                     initial={cubeStyle}
		                     onClick={this.doPam}
		                     id={"root"}>
			
			<TweenAxis axe={"freeCat"} defaultPosition={0} items={[...axis.freeCat, this.openEvent()]}/>
			<TweenAxis axe={"scrollY"} defaultPosition={100 + 20 * Math.random()}
			           items={axis.scrollY}
			           scrollableWindow={33}
			           inertia={this.inertia}/>
			<TweenAxis axe={"scrollX"} defaultPosition={100 + 20 * Math.random()}
			           items={axis.scrollX}
			           scrollableWindow={33}
			           inertia={this.inertia}/>
			
			<TweenRef.div id={"front"} initial={facesStyle.front} className={"face"}/>
			<TweenRef.div id={"back"} initial={facesStyle.back} className={"face"}/>
			<TweenRef.div id={"right"} initial={facesStyle.right} className={"face"}/>
			<TweenRef.div id={"left"} initial={facesStyle.left} className={"face"}/>
			<TweenRef.div id={"top"} initial={facesStyle.top} className={"face"}/>
			<TweenRef.div id={"bottom"} initial={facesStyle.bottom} className={"face"}/>
			<TweenRef.div id={"stars"} initial={starsStyle} className={"stars"}
			              onClick={this.reset}/>
			<TweenRef.div id={"content"} initial={contentStyle} className={"content"}
			              onClick={this.reset}/>
		
		</TweenRef.div>;
	}
}