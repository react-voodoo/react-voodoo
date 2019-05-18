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
import React    from "react";
import ReactDom from "react-dom";

import "./samples/samples.scss";
import Samples  from "react-rtween/samples/*/(*).js"


class App extends React.Component {
	state = {
		current: "SimpleSlider"
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