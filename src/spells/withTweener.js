/*
 * @author : Nathanael BRAUN <pp9ping@gmail.com>
 *
 * Copyright 2026 Nathanael BRAUN
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
