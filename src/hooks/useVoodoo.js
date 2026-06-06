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
import React          from "react";
import is             from "is";
import TweenerContext from "../comps/TweenerContext";
import Tweener        from "../comps/Tweener";

/**
 * useVoodoo — the primary hook for creating or inheriting a Tweener animation engine.
 *
 * Three usage modes:
 *
 *   useVoodoo(options)
 *     Creates a new Tweener instance. Returns [tweener, ViewBox] where ViewBox is a
 *     memoized component that provides TweenerContext and attaches the root DOM ref
 *     used by the Tweener to measure the viewport box (box.x/y/z).
 *
 *   useVoodoo(true)
 *     Inherits the nearest parent Tweener from context. Used internally by Node,
 *     Axis, and Draggable to access the engine without creating a new one.
 *
 *   useVoodoo("name")
 *     Traverses up the tweener tree (via _parentTweener links) to find an ancestor
 *     whose options.name matches the given string. Useful for reaching a specific
 *     engine in deeply nested or portal-based layouts.
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
						      console.warn('[react-voodoo] useVoodoo: no parent tweener found with options.name === "' + tweenerOptions + '"');
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
	
	// Mount/unmount effect: drives the Tweener lifecycle since the Tweener class is
	// not mounted as a React component — useVoodoo owns its mount/unmount calls.
	React.useEffect(
		() => {
			if ( doUseParentTweener )
				return;
			tweener.componentDidMount();
			lastTweener.current = tweener;
			return () => {
				if ( !lastTweener.current?._ )
					return;
				lastTweener.current.componentWillUnmount();
				lastTweener.current = null;
			}
		}, []
	)
	// nodeRef.current effect: fires after the root DOM node becomes available;
	// triggers box measurement and an initial DOM write so CSS is correct
	// before the first visible frame.
	React.useEffect(
		() => {
			
			if ( doUseParentTweener || !lastTweener.current?._ )
				return;
			lastTweener.current._updateBox();
			lastTweener.current._updateTweenRefs();
			
		}
		,
		[nodeRef.current]
	)
	// parentTweener effect: keeps the _parentTweener link up to date as context
	// changes (e.g. when the component is reparented). Draggable uses this link
	// to traverse the tweener tree during drag gestures.
	React.useEffect(
		() => {
			if ( doUseParentTweener || !lastTweener.current?._ )
				return;
			lastTweener.current._parentTweener = parentTweener;
		},
		[parentTweener]
	)
	// tweenerOptions effect: hot-updates options (e.g. drag thresholds, axis config)
	// without destroying or recreating the Tweener instance.
	React.useEffect(
		() => {
			if ( doUseParentTweener || !lastTweener.current?._ )
				return;
			// merge over the current options — a raw assign would wipe the defaults
			// merged by the Tweener constructor (maxClickTm/maxClickOffset…), NaN-
			// poisoning every click-vs-drag threshold comparison downstream
			lastTweener.current._.options = {
				...lastTweener.current._.options,
				...(tweenerOptions || {})
			};
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
