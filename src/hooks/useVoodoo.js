/*
 *   The MIT License (MIT)
 *   Copyright (c) 2020. Nathanael Braun
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
import is             from "is";
import TweenerContext from "../comps/TweenerContext";
import Tweener        from "../comps/Tweener";

/**
 * Wrap & instanciate the Tweener Comp "virtual"
 * @param tweenerOptions
 * @param RootNodeComp
 */
export default ( tweenerOptions, RootNodeComp = 'div' ) => {
	const parentTweener      = React.useContext(TweenerContext),
	      nodeRef            = React.useRef(),
	      lastTweener        = React.useRef(),
	      doUseParentTweener = React.useMemo(
		      () => (tweenerOptions === true || is.string(tweenerOptions)),
		      []
	      ),
	      tweener            = React.useMemo(
		      () => {
			      if ( tweenerOptions === true )// keep tweener from context ( parent )
				      return parentTweener;
			
			      if ( is.string(tweenerOptions) ) {// return named tweener or most root tweener
				      let pTweener = parentTweener;
				
				      while ( pTweener?._ && pTweener._.options.name !== tweenerOptions )
					      if ( pTweener._parentTweener )
						      pTweener = pTweener._parentTweener;
					      else {
						      console.warn('react-voodoo: No parent tweener found with option.key === "' + tweenerOptions + '"');
						      break;
					      }
				
				      return pTweener;
			      }
			
			      let tw               = new Tweener({
				                                         forwardedRef: nodeRef,
				                                         tweenerOptions
			                                         });
			      tw.isMountedFromHook = true;
			      tw._parentTweener    = parentTweener;
			      return tw;
		      },
		      []
	      ),
	      ViewBox            = React.useMemo(
		      () => (
			      React.forwardRef(
				      ( { children, ...props }, ref ) => {
					      return <TweenerContext.Provider value={tweener}>
						      <RootNodeComp
							      ref={!ref
							           ? nodeRef
							           : ( node ) => (ref.current = nodeRef.current = node)} {...props}>
							      {
								      children
							      }
						      </RootNodeComp>
					      </TweenerContext.Provider>
				      }
			      )
		      ),
		      []
	      )
	
	React.useEffect(
		() => {
			if ( doUseParentTweener || !lastTweener.current?._ )
				return;
			//console.warn("didmount", nodeRef.current, lastTweener.current === TweenerEl)
			tweener.componentDidMount();
			lastTweener.current = tweener;
			return () => {
				if ( !lastTweener.current?._ )
					return;
				//console.warn("unmount")
				lastTweener.current.componentWillUnmount();
				lastTweener.current = null;
			}
		}, []
	)
	React.useEffect(
		() => {
			
			if ( doUseParentTweener || !lastTweener.current?._ )
				return;
			//console.warn("didupdate", nodeRef.current)
			lastTweener.current._updateBox();
			lastTweener.current._updateTweenRefs();
			
		}
		,
		[nodeRef.current]
	)
	React.useEffect(
		() => {
			if ( doUseParentTweener || !lastTweener.current?._ )
				return;
			lastTweener.current._parentTweener = parentTweener;
		},
		[parentTweener]
	)
	React.useEffect(
		() => {
			if ( doUseParentTweener || !lastTweener.current?._ )
				return;
			lastTweener.current._.options = tweenerOptions;
			lastTweener.current._updateBox();
			lastTweener.current._updateTweenRefs();
		},
		[tweenerOptions]
	)
	return React.useMemo(
		() => ([tweener, ViewBox]),
		[ViewBox, tweener]
	);
}