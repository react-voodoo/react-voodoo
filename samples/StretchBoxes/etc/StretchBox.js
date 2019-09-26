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

import React      from "react";
import {TweenRef} from "react-voodoo";

import "./StretchBox.scss"

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

export default class StretchBox extends React.Component {
	root = React.createRef();
	
	static defaultProps = {
		defaultPosition: {
			x: .5,
			y: .5
		},
		style          : initialBallStyle,
		color          : "black",
		width          : "200px",
		minHeight      : "2em",
		maxHeight      : "200px"
	};
	state               = {};
	nextTarget          = {};
	
	
	static getDerivedStateFromProps( props, state ) {
		let { minHeight, maxHeight, width, defaultPosition } = props;
		return {
			boxStyle    : {
				position      : "absolute",
				width         : width,
				height        : minHeight,
				borderRadius  : "10px",
				overflow      : "hidden",
				left          : (defaultPosition.x * 100) + "%",
				top           : (defaultPosition.y * 100) + "%",
				transformStyle: "preserve-3d",
				transform     : [
					{
						translateX: "-50%",
						translateY: "-50%",
					},
				]
			},
			titleStyle  : {
				position       : "absolute",
				width          : "100%",
				height         : minHeight,
				left           : "0%",
				top            : "0%",
				backgroundColor: "red",
				transform      : [
					{}, {},
				]
			},
			contentStyle: {
				position       : "absolute",
				width          : "100%",
				bottom         : "0%",
				left           : "0%",
				top            : "2em",
				backgroundColor: "green",
				transform      : [
					{}, {},
				]
			},
			axis        : {
				title  : [],
				content: [],
				root   : [
					{
						from    : 0,
						duration: 100,
						apply   : {
							height   : [maxHeight, "-" + minHeight],
							transform: [, , {}],
						}
					},
					{
						from    : 100,
						duration: 100,
						apply   : {
							height   : ["-" + maxHeight, minHeight],
							transform: [, , {}],
						}
					}
				]
			}
		}
	}
	
	render() {
		let { title, children }                          = this.state;
		let { boxStyle, titleStyle, contentStyle, axis } = this.state;
		return <TweenRef.div className={"StretchBox"}
		                     tweenAxis={axis.root}
		                     initial={boxStyle}>
			
			<TweenRef.div initial={titleStyle} className={"title"} tweenAxis={axis.title}>{title}</TweenRef.div>
			<TweenRef.div initial={contentStyle} className={"content"}
			              tweenAxis={axis.content}>{children}</TweenRef.div>
		
		</TweenRef.div>;
	}
}