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

import React  from "react";
import anims  from "./etc/anims";
import Slider from "./etc/Slider";
import "./sample.scss";

export default class SimpleSlider extends React.Component {
	state = {
		count: 0
	};
	ref   = React.createRef();
	
	componentDidScroll( pos, axe ) {
		console.log('scroll', pos, axe)
		this.forceUpdate();// force update to show scroll pos
	}
	
	render() {
		return <div className={"SimpleSlider"} style={{
			width : "100%",
			height: "100%"
		}}>
			<Slider {...anims} ref={this.ref}>
				<div className={"item"} style={{ background: "url(https://source.unsplash.com/600x400/?logo)" }}>
					drag me
				</div>
				<div className={"item"} style={{ background: "url(https://source.unsplash.com/600x400/?bridge)" }}>
					drag me
				</div>
				<div className={"item"} style={{ background: "url(https://source.unsplash.com/600x400/?sky)" }}>
					drag me
				</div>
				<div className={"item"} style={{ background: "url(https://source.unsplash.com/600x400/?cat)" }}>
					drag me
				</div>
			</Slider>
		</div>;
	}
}