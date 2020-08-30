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
import React          from "react";
import TweenerContext from "../comps/TweenerContext";
import Tweener        from "../comps/Tweener";

export default ( RootNodeComp = 'div' ) => {
    const parentTweener = React.useContext(TweenerContext),
          nodeRef       = React.useRef(),
          lastTweener   = React.useRef(),
          tweener       = React.useMemo(
              () => {
                  let tw               = new Tweener({ forwardedRef: nodeRef });
                  tw.isMountedFromHook = true;
                  return tw;
              },
              []
          ),
          ViewBox       = React.useMemo(
              () => (
                  ( { children, ...props } ) => {
                      return <TweenerContext.Provider value={ tweener }>
                          <RootNodeComp ref={ nodeRef } { ...props }>
                              {
                                  children
                              }
                          </RootNodeComp>
                      </TweenerContext.Provider>
                  }
              ),
              []
          )
    
    React.useEffect(
        () => {
            //console.warn("didmount", nodeRef.current, lastTweener.current === TweenerEl)
            tweener.componentDidMount();
            lastTweener.current = tweener;
            return () => {
                //console.warn("unmount")
                lastTweener.current.componentWillUnmount();
                lastTweener.current = null;
            }
        }, []
    )
    React.useEffect(
        () => {
            //console.warn("didupdate", nodeRef.current)
            lastTweener.current._updateBox();
            lastTweener.current._updateTweenRefs();
            
        }
        ,
        [nodeRef.current]
    )
    React.useEffect(
        () => {
            lastTweener.current._parentTweener = parentTweener;
        }
        ,
        [parentTweener]
    )
    return React.useMemo(
        () => ( [ViewBox, tweener] ),
        [ViewBox, tweener]
    );
}