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
