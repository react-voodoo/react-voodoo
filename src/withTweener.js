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
import is    from "is";

import TweenerContext from "./TweenerContext";


const SimpleObjectProto = ({}).constructor;


/**
 * asTweener decorator
 * @param argz
 * @returns {*}
 */
export default function withTweener( ...argz ) {
	
	let BaseComponent = (!argz[0] || argz[0].prototype instanceof React.Component || argz[0] === React.Component) && argz.shift(),
	    opts          = (!argz[0] || argz[0] instanceof SimpleObjectProto) && argz.shift() || {};
	
	if ( !(BaseComponent && (BaseComponent.prototype instanceof React.Component || BaseComponent === React.Component)) ) {
		return function ( BaseComponent ) {
			return withTweener(BaseComponent, opts)
		}
	}
	
	return class TweenerToProps extends React.Component {
		static displayName = (BaseComponent.displayName || BaseComponent.name) + " (withTweener)";
		
		render() {
			return <TweenerContext.Consumer>
				{
					tweener => {
						return <BaseComponent { ...this.props } tweener={ tweener }/>;
					}
				}
			</TweenerContext.Consumer>;
		}
	}
}
