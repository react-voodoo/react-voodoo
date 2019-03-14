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
import ReactDom              from "react-dom";
import {asTweener, TweenRef} from "Comp";

let pushIn = function ( target ) {
	return {
		anims: [
			{
				type    : "Tween",
				target  : target,
				from    : 0,
				duration: 500,
				apply   : {}
			},
			{
				type    : "Tween",
				target  : target,
				from    : 500,
				duration: 500,
				apply   : {}
			}
		]
	};
};
@asTweener({ initialScrollPos: { scrollX: 0, scrollY: 0 } })
export default class Widget_Scrollable extends React.Component {
	state = {
		count: 0
	};
	
	render() {
		
		//debugger
		
		return <div className={ "Widget_Scrollable" } style={ {
			width : "100%",
			height: "100%"
		} }>
			
			<TweenRef
				id={ "testItem" }
				initial={ {
					margin         : "0 0 3px 10px",
					//backgroundColor: "rgba(50,50,50,1)",
					opacity        : ".75",
					left           : "5px",
					//transform      : "translate(50px,50px)"
				} }
				//scrollableAnims={ scrollAnims }
			>
				<div
					onClick={ e => {
						this.pushAnim(pushIn("testItem"),
						              () => {
							
						              });
					} }
					style={ {
						display   : "inline-block",
						width     : "5em",
						height    : "5em",
						cursor    : "pointer",
						background: "red",
					} }>click me !
				</div>
			</TweenRef>
		</div>;
	}
}