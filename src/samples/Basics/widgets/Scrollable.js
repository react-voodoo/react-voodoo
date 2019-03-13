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


var easingFn = require('d3-ease');

@asTweener({ initialScrollPos: { scrollX: 100, scrollY: 10 } })
export default class Widget_Scrollable extends React.Component {
	state = {
		count: 0
	};
	
	render() {
		return <div className={ "Widget_Scrollable" } style={ {
			width : "100%",
			height: "100%"
		} }>
			hello ! { this.state.count } concurent anims <br/>
			scrollPos : { this._.scrollPos } / { this._.scrollableArea }
			<br/>
			<button onClick={ e => this.scrollTo(0, 500) }>( go to 0 )</button>
			<button onClick={ e => this.scrollTo(200, 500) }>( go to 200 )</button>
			
			{/*<TweenRef*/}
				{/*id={ "testItem" }*/}
				{/*initial={ { _x: .5, _y: .5, _z: 0, rotateY: 0, opacity: .75 } }*/}
				{/*//scrollableAnims={ scrollAnims }*/}
			{/*>*/}
				{/*<div*/}
					{/*style={ {*/}
						{/*position  : "absolute",*/}
						{/*display   : "inline-block",*/}
						{/*width     : "15em",*/}
						{/*height    : "15em",*/}
						{/*cursor    : "pointer",*/}
						{/*background: "red",*/}
						{/*overflow  : "hidden",*/}
						{/*margin    : "-7.5em 0 0 -7.5em",*/}
						{/*top       : "0px",*/}
						{/*left      : "0px"*/}
					{/*} }>click me !*/}
				{/*</div>*/}
			{/*</TweenRef>*/}
		</div>;
	}
}