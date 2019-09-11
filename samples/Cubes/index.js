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

import React from "react";
import Cube  from "./etc/Cube";

const areaStyle = {
	position: "relative",
	width   : "100%",
	height  : "100%",
	overflow: "hidden",
};
export default class Sample extends React.Component {
	render() {
		return <div className={"Cubes"}
		            ref={this.root}>
			<div className={"description"}>
				Drag cube ( alpha demo )
			</div>
			<div style={areaStyle} className={"area"}>
				<Cube color={"cyan"} defaultPosition={{ x: .5, y: .5 }}/>
				<Cube color={"green"} defaultPosition={{ x: .75, y: .75 }}/>
				<Cube color={"red"} defaultPosition={{ x: .25, y: .25 }}/>
				<Cube color={"darkblue"} defaultPosition={{ x: .25, y: .75 }}/>
				<Cube color={"yellow"} defaultPosition={{ x: .75, y: .25 }}/>
			</div>
		</div>;
	}
}