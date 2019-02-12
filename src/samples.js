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
				target  : "faceA",
				from    : 0,
				duration: 150,
				easeFn  : easingFn.easeOutSine,
				apply   : {
					_z: -.2,
				}
			},
			{
				type    : "Tween",
				target  : "faceA",
				from    : 50,
				duration: 150,
				easeFn  : easingFn.easeOutSine,
				apply   : {
					x: -50,
				}
			},
			{
				type    : "Tween",
				target  : "faceA",
				from    : 100,
				duration: 100,
				easeFn  : easingFn.easeOutSine,
				apply   : {
					rotateY: -55,
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
					this.pushAnim(pushOut("faceA"),
					              () => {
						              this.pushAnim(pushIn("faceA"),
						                            () => {
							                            this.setState({ count: this.state.count - 1 })
						                            });
						
					              });
				} }
				{ ...this.tweenRef("faceA",
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
				                   { x: "50vw", y: "50vh", z: 1, opacity: .75 }) }/>
		
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