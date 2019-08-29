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

import React   from "react";
import GooBall from "./etc/GooBall";

const areaStyle = {
	position: "relative",
	width   : "100%",
	height  : "100%",
	overflow: "hidden",
	
	filter: "url(#goo)"
};
export default class Sample extends React.Component {
	render() {
		return <div className={"MassGoo"}
		            ref={this.root}>
			<svg style={{ position: 'absolute', width: 0, height: 0 }}>
				<filter id="goo">
					<feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30"/>
					<feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"/>
				</filter>
			</svg>
			<div className={"description"}>
				Drag & throw the balls ( alpha demo )
			</div>
			<div style={areaStyle} className={"area"}>
				<GooBall color={"cyan"} defaultPosition={{ x: .5, y: .5 }}/>
				<GooBall color={"green"} defaultPosition={{ x: .75, y: .75 }}/>
				<GooBall color={"red"} defaultPosition={{ x: .25, y: .25 }}/>
				<GooBall color={"darkblue"} defaultPosition={{ x: .25, y: .75 }}/>
				<GooBall color={"yellow"} defaultPosition={{ x: .75, y: .25 }}/>
			</div>
		</div>;
	}
}