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
