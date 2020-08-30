/*
 *
 * Copyright (C) 2020 Nathanael Braun
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
 *
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import React from "react";
import is    from "is";

import TweenerContext from "../comps/TweenerContext";


const SimpleObjectProto = ({}).constructor;
function isClassComponent(component) {
	return (
		typeof component === 'function' &&
		!!component.prototype.isReactComponent
	)
}
function isFunctionalComponent(Component) {
	return (
		typeof Component === 'function' // can be various things
		&& !(
		Component.prototype // native arrows don't have prototypes
		&& Component.prototype.isReactComponent // special property
		)
	);
}

function isReactComponent(component) {
	return (
		isClassComponent(component) ||
		isFunctionalComponent(component)
	)
}


/**
 * asTweener decorator
 * @param argz
 * @returns {*}
 */
export default function withTweener( ...argz ) {
	
	let BaseComponent = (!argz[0] || isReactComponent(argz[0])) && argz.shift(),
	    opts          = (!argz[0] || argz[0] instanceof SimpleObjectProto) && argz.shift() || {};
	
	if ( !(BaseComponent && (BaseComponent.prototype instanceof React.Component || BaseComponent === React.Component)) ) {
		return function ( BaseComponent ) {
			return withTweener(BaseComponent, opts)
		}
	}
	
	class TweenerToProps extends React.Component {
		static displayName = (BaseComponent.displayName || BaseComponent.name);
		
		render() {
			return <TweenerContext.Consumer>
				{
					tweener => {
						return <BaseComponent { ...this.props } tweener={ tweener } ref={ this.props.forwardedRef }/>;
					}
				}
			</TweenerContext.Consumer>;
		}
	}
	
	
	let withRef         = React.forwardRef(( props, ref ) => {
		return <TweenerToProps { ...props } forwardedRef={ ref }/>;
	});
	withRef.displayName = TweenerToProps.displayName;
	return withRef;
}
