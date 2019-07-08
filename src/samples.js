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

import "./samples/samples.scss";
import Samples  from "react-voodoo/samples/*/(*).js"


class App extends React.Component {
	state = {
		current: "SimpleHeaderTest"
	};
	
	render() {
		let Comp = Samples[this.state.current];
		return <div className={ "app" } style={ {
			width : "100%",
			height: "100%"
		} }>
			
			<div className={ "sampleLst" } style={ {
				position: "absolute",
				top     : "0px",
				left    : "0px",
				width   : "200px",
				height  : "100%"
			} }>
				{
					Object.keys(Samples).map(
						key => <div onClick={ e => this.setState({ current: key }) } key={ key }>{ key }</div>
					)
				}
			</div>
			<div className={ "sample" } style={ {
				overflow: "hidden",
				position: "absolute",
				top     : "0px",
				left    : "200px",
				width   : "calc( 100% - 200px )",
				height  : "100%"
			} }>
				<Comp/>
			</div>
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