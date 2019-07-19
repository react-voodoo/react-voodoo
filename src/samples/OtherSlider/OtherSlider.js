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

import React  from "react";
import anims  from "./anims/(*)/anims.js";
import debounce  from "debounce";
import Slider from "./etc/Slider";
import "./samples.scss";

export default class OtherSlider extends React.Component {
	state = {
		responsiveMode: "landscape"
	};
	
	//
	componentWillMount() {
		this._applyResponsive()
	}
	
	componentDidMount() {
		window.addEventListener(
			"resize",
			this._applyResponsive);
	}
	
	componentWillUnmount() {
		window.removeEventListener(
			"resize",
			this._applyResponsive);
	}
	
	_applyResponsive = debounce(() => {
		let width          = window.innerWidth,
		    height         = window.innerHeight,
		    responsiveMode = "landscape";
		
		if ( width < height )
			responsiveMode = "portrait"
		console.log(width, height, responsiveMode)
		this.setState({ responsiveMode })
	}, 10)
	
	componentDidScroll( pos, axe ) {
		this.forceUpdate();// force update to show scroll pos
	}
	
	render() {
		const responsiveMode = this.state.responsiveMode;
		return <div className={"OtherSlider"} style={{
			width : "100%",
			height: "100%"
		}}>
			<Slider {...anims[responsiveMode]}>
				<div className={"item"} style={{ backgroundImage: "url(https://source.unsplash.com/600x400/?logo)" }}>
					1
				</div>
				<div className={"item"} style={{ backgroundImage: "url(https://source.unsplash.com/600x400/?bridge)" }}>
					2
				</div>
				<div className={"item"} style={{ backgroundImage: "url(https://source.unsplash.com/600x400/?sky)" }}>
					3
				</div>
				<div className={"item"} style={{ backgroundImage: "url(https://source.unsplash.com/600x400/?cat)" }}>
					4
				</div>
			</Slider>
		</div>;
	}
}