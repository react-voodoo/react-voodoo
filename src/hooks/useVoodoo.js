/*
 *   The MIT License (MIT)
 *   Copyright (c) 2019. Wise Wild Web
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
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