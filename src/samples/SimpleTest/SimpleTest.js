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

import React                 from "react";
import ReactDom              from "react-dom";
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
export default class Sample extends React.Component {
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
				_x: -.5,
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
	
	//componentDidScroll( pos ) {
	//	//console.log(pos);
	//	this.forceUpdate();
	//}
	
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
		return <div className={ "SimpleTest" } style={ {
			width : "100%",
			height: "100%"
		} }>
			hello ! { this.state.count } concurent anims <br/>
			scrollPos : { this._.scrollPos } / { this._.scrollableArea }
			<br/>
			<button onClick={ e => this.scrollTo(0, 500) }>( go to 0 )</button>
			<button onClick={ e => this.scrollTo(200, 500) }>( go to 200 )</button>
			
			<TweenRef
				id={ "testItem" }
				initial={ { _x: .5, _y: .5, _z: 0, rotateY: 0, opacity: .75 } }
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