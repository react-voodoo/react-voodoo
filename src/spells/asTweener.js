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

import React   from "react";
import Tweener from '../comps/Tweener';

const SimpleObjectProto = ( {} ).constructor;

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
export default function asTweener( ...argz ) {
    
    let BaseComponent = ( !argz[ 0 ] || isReactComponent(argz[0]) ) && argz.shift(),
        options       = ( !argz[ 0 ] || argz[ 0 ] instanceof SimpleObjectProto ) && argz.shift() || {};
    if ( !BaseComponent ) {
        return function ( BaseComponent ) {
            return asTweener(BaseComponent, options)
        }
    }
    
    options = {
        wheelRatio    : 5,
        maxClickTm    : 200,
        maxClickOffset: 20,
        ...options,
    };
    
    
    let withRef         = React.forwardRef(( props, ref ) => {
        return <Tweener oProps={ props } forwardedRef={ ref }
                        BaseComponent={ BaseComponent }
                        tweenerOptions={ options }/>;
    });
    withRef.displayName = String.fromCharCode(0xD83E, 0xDDD9) + ( BaseComponent.displayName || BaseComponent.name );
    return withRef;
}
