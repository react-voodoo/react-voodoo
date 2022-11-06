/*
 * Copyright (c) 2022-2023 Braun Nathanael
 *
 * This project is dual licensed under one of the following licenses:
 * - Creative Commons Attribution-NoDerivatives 4.0 International License.
 * - GNU AFFERO GENERAL PUBLIC LICENSE Version 3
 *
 * You should have received a copy of theses licenses along with this work.
 * If not, see <http://creativecommons.org/licenses/by-nd/4.0/> or <http://www.gnu.org/licenses/agpl-3.0.txt>.
 */

import React from "react";
import is    from "is";

import { isReactComponent } from '../utils/react';
import TweenerContext       from "../comps/TweenerContext";


const SimpleObjectProto = ( {} ).constructor;


/**
 * asTweener decorator
 * @param argz
 * @returns {*}
 */
export default function withTweener( ...argz ) {
    
    let BaseComponent = ( !argz[ 0 ] || isReactComponent(argz[ 0 ]) ) && argz.shift(),
        opts          = ( !argz[ 0 ] || argz[ 0 ] instanceof SimpleObjectProto ) && argz.shift() || {};
    
    if ( !( BaseComponent && ( BaseComponent.prototype instanceof React.Component || BaseComponent === React.Component ) ) ) {
        return function ( BaseComponent ) {
            return withTweener(BaseComponent, opts)
        }
    }
    
    class TweenerToProps extends React.Component {
        static displayName = ( BaseComponent.displayName || BaseComponent.name );
        
        render() {
            return <TweenerContext.Consumer>
                {
                    tweener => {
                        return <BaseComponent { ...this.props } tweener={ tweener }
                                              ref={ this.props.forwardedRef }/>;
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
