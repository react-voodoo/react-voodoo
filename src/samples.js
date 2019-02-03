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

@asTweener
class Sample extends React.Component {
	render() {
		return <div className={ "root" } style={ {
			width : "100%",
			height: "100%"
		} }>
			hello !
			<div
				onClick={ e => {
					this.pushAnim(require('Comp/anims/pushOut').default("step", 700, 5),
					              () => {
						              this.pushAnim(require('Comp/anims/pushIn').default("step", 700, 5),
						                            () => {
						                            });
						
					              });
					//this.pushAnim(require('Comp/anims/slideOut').default("left", "step", 700, 5),
					//              () => {
					//              });
				} }
				{ ...this.tweenRef("step", {
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

function renderSamples() {
	
	
	ReactDom.render(
		<Sample/>
		, document.getElementById('app'));
	
}

renderSamples()

if ( process.env.NODE_ENV !== 'production' && module.hot ) {
	module.hot.accept('.', renderSamples);
}