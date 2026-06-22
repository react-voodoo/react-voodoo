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

import React                from "react";
import Tweener              from '../comps/Tweener';
import TweenerContext       from '../comps/TweenerContext';
import { isReactComponent } from '../utils/react';

const SimpleObjectProto = ( {} ).constructor;

/**
 * TweenerHost — thin function component hosting a pure Tweener engine.
 *
 * Replaces the legacy Tweener.render() (Tweener no longer extends React.Component):
 *  - maps the parent engine from TweenerContext into engine._parentTweener — a
 *    ref-like idempotent write, read at event time only (drag tree traversal &
 *    named lookup), exactly like the legacy Consumer did
 *  - provides this engine to descendants
 *  - drives the engine lifecycle (componentDidMount/DidUpdate/WillUnmount)
 */
const TweenerHost = ( { oProps, forwardedRef, BaseComponent, tweenerOptions } ) => {
    const parentTweener = React.useContext(TweenerContext),
          engine        = React.useMemo(
              () => new Tweener({ oProps, forwardedRef, BaseComponent, tweenerOptions }),
              []
          ),
          didMount      = React.useRef(false);

    // same ref-like parent mapping the legacy class render() did
    engine._parentTweener = parentTweener;

    React.useEffect(
        () => {
            engine.componentDidMount();
            return () => engine.componentWillUnmount();
        }, []
    );
    // class-lifecycle parity: componentDidUpdate on every update render, not on mount
    React.useEffect(
        () => {
            if ( !didMount.current ) {
                didMount.current = true;
                return;
            }
            engine.componentDidUpdate();
        }
    );

    return <TweenerContext.Provider value={ engine }>
        <BaseComponent { ...oProps } ref={ engine._.rootRef } tweener={ engine }/>
    </TweenerContext.Provider>;
};

/**
 * asTweener decorator
 * @param argz
 * @returns {*}
 */
export default function asTweener( ...argz ) {
    
    let BaseComponent = ( !argz[ 0 ] || isReactComponent(argz[ 0 ]) ) && argz.shift(),
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
        return <TweenerHost oProps={ props } forwardedRef={ ref }
                            BaseComponent={ BaseComponent }
                            tweenerOptions={ options }/>;
    });
    withRef.displayName = String.fromCharCode(0xD83E, 0xDDD9) + ( BaseComponent.displayName || BaseComponent.name );
    return withRef;
}
