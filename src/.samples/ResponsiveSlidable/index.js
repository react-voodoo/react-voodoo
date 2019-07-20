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

import debounce from "debounce";
import React    from "react";
import anims    from "./anims/(*)/anims.js";
import Slider   from "./etc/Slider";
import "./sample.scss";

export default class ResponsiveSlidable extends React.Component {
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
		return <div className={"ResponsiveSlidable"} style={{
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
				<div className={"item"} style={{ backgroundImage: "url(https://source.unsplash.com/600x400/?beer)" }}>
					5
				</div>
				<div className={"item"} style={{ backgroundImage: "url(https://source.unsplash.com/600x400/?dog)" }}>
					6
				</div>
			</Slider>
		</div>;
	}
}