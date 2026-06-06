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

import is        from "is";
import React     from 'react';
import ReactDom  from "react-dom";
import useVoodoo from "../hooks/useVoodoo";
import domUtils  from "../utils/dom";

/**
 * Draggable — captures pointer (touch / mouse) events and maps them to axis positions
 * on the parent Tweener hierarchy.
 *
 * On drag, it walks up the tweener tree via `_parentTweener` links (not the DOM) to
 * find all ancestor tweeners that have the requested axis. This supports nested
 * scrollable regions: the innermost tweener that is still in-bounds consumes the drag;
 * if it hits a bound the event falls through to the next ancestor.
 *
 * Dispatch flow:
 *   dragstart → captures parent tweeners and starts the 16ms inertia loop
 *   drag      → computes delta as a fraction of scrollableWindow/scrollableArea,
 *               calls inertia.hold(newPos) on the first tweener that is in-bounds
 *   dropped   → calls inertia.release() which computes the momentum arc and may
 *               snap to the nearest waypoint
 */
const Draggable = React.forwardRef(( {
	                                     children,
	                                     Comp = 'div',
	                                     nodeRef,
	                                     items = [],
	                                     xAxis, yAxis, yBoxRef,
	                                     xBoxRef, yRef,
	                                     yHook, xHook,
	                                     tweener,
	                                     mouseDrag = false,
	                                     touchDrag = true,
	                                     button = 0,
	                                     ...props
                                     }, ref ) => {
	let root            = React.useRef(),
	    µ               = React.useRef({ root, _: {} }).current,
	    [parentTweener] = useVoodoo(true),
	    api             = React.useMemo(
		    () => ({
			    
			    /**
			     * Traverse the tweener parent chain (not the DOM ancestry) and collect all
			     * ancestor Tweener instances that could potentially consume scroll input.
			     * The result is iterated during drag to find the first in-bounds tweener.
			     */
			    getScrollableNodes( node ) {
				    let scrollable = [], parent = µ._parentTweener;
				    
				    while ( parent ) {
					    scrollable.push(parent);
					    parent = parent._parentTweener;
				    }
				    
				    return scrollable
			    },
			    
			    /**
			     * Attach the touch/mouse event listeners to the root DOM node.
			     * All drag state is captured in closure variables (dX, dY, cLock,
			     * parents, parentsState) so individual handler functions stay small.
			     */
			    _registerScrollListeners() {
				    let rootNode = µ.root?.current,
				        {
					        xAxis, yAxis, yHook, xHook, mouseDrag, touchDrag, tweener, xBoxRef, yBoxRef, button
				        }        = µ.props,
				        lastStartTm,
				        cLock, dX,
				        parents,
				        dY, parentsState, refWidth, refHeight,
				        // true once hold() has been dispatched during the gesture — i.e. the
				        // content actually moved under the pointer. Releasing such a gesture
				        // must never produce a click, regardless of the NET pointer offset
				        // (an out-and-back swipe can end within maxClickOffset).
				        didDrag,
				        _        = tweener._;
				    
				    if ( rootNode ) {
					    domUtils.addEvent(
						    rootNode, µ._.dragList = {
							    'dragstart': ( e, touch, descr ) => {//@todo
								    let pTweener,
								        x,
								        y, i, style;
								    if ( (e) instanceof MouseEvent && e.button !== button ) {// allow undefined so µ work for touch events
									    return;
								    }
								    
								    parents      = api.getScrollableNodes(e.target);
								    lastStartTm  = Date.now();
								    dX           = 0;
								    dY           = 0;
								    didDrag      = false;
								    parentsState = [];
								    refWidth     = (xBoxRef?.current || rootNode)?.offsetWidth;
								    refHeight    = (yBoxRef?.current || rootNode)?.offsetHeight;
								    for ( i = 0; i < parents.length; i++ ) {
									    pTweener = parents[i];
									    pTweener._updateBox();
									    // react comp with tweener support
									    if ( pTweener.__isTweener ) {
										    x = xAxis && pTweener.axes?.[xAxis];
										    y = yAxis && pTweener.axes?.[yAxis];
										    pTweener._updateNodeInertia()
									    }
									    
								    }
								    //tweener._updateNodeInertia()
								    //e.stopPropagation();
								    //e.preventDefault();
							    },
							    'click'    : ( e, touch, descr ) => {//@todo
								    
								    if ( (e) instanceof MouseEvent && e.button !== button ) {// allow undefined so µ work for touch events
									    return;
								    }
								    
								    if ( lastStartTm &&
									    (
										    didDrag ||
										    (Date.now() - lastStartTm > _.options.maxClickTm) ||
										    Math.abs(dY) > _.options.maxClickOffset ||
										    Math.abs(dX) > _.options.maxClickOffset
									    )
								    ) {
									    e.preventDefault();
									    e.stopPropagation();
								    }
								    
							    },
							    // drag: runs on every pointer move. Converts pixel offset to axis units,
							    // applies dragDirectionLock, then dispatches to the first ancestor tweener
							    // whose inertia.isInbound() returns true — preventing over-scroll propagation.
							    'drag': ( e, touch, descr ) => {
								    // no e.button check here : mouse button filtering is done at mousedown time
								    // in domUtils.dragstartAnywhere (e.button is always 0 on mousemove events,
								    // so it can't be tested reliably here)
								    let pTweener,
								        x, deltaX, xDispatched, xBox,
								        y, deltaY, yDispatched, yBox,
								        cState, i;
								    
								    dX = -(descr._lastPos.x - descr._startPos.x);
								    dY = -(descr._lastPos.y - descr._startPos.y);
								    
								    
								    if ( lastStartTm && ((lastStartTm > Date.now() - _.options.maxClickTm) && Math.abs(dY) < _.options.maxClickOffset && Math.abs(dX) < _.options.maxClickOffset) )// skip tap & click
								    {
									    return;
								    }
								    else {
									    
									    xDispatched = !dX;
									    yDispatched = !dY;
									    if ( _.options.dragDirectionLock ) {
										    if ( cLock === "Y" || !cLock && Math.abs(dY * .5) > Math.abs(dX) ) {
											    cLock = "Y";
											    dX    = 0;
											    //xDispatched = true;
										    }
										    else if ( cLock === "X" || !cLock && Math.abs(dX * .5) > Math.abs(dY) ) {
											    cLock = "X";
											    dY    = 0;
											    //yDispatched = true;
										    }
									    }
									    if ( parents )
										    for ( i = 0; i < parents.length; i++ ) {
											    pTweener = parents[i];
											    // react comp with tweener support
											    if ( pTweener.__isTweener ) {
												    
												    x = xAxis && pTweener.axes?.[xAxis];
												    y = yAxis && pTweener.axes?.[yAxis];
												    if ( !x && !y )
													    continue;
												    if ( !parentsState[i] ) {
													    parentsState[i] = {
														    x: x?.scrollPos,
														    y: y?.scrollPos
													    };
													    x?.inertia?.startMove();
													    y?.inertia?.startMove();
													    xAxis && x && !x?.inertiaFrame && pTweener.applyInertia(x, xAxis);
													    yAxis && y && !y?.inertiaFrame && pTweener.applyInertia(y, yAxis);
												    }
												    
												    if ( x ) {
													    xBox   = xBoxRef?.current
													             ? refWidth
													             : pTweener._.box.x
													    deltaX = dX && (dX / xBox) * (
														    x.scrollableWindow ||
														    x.scrollableArea) || 0;
													    if ( xHook )
														    deltaX = xHook(deltaX);
												    }
												    if ( y ) {
													    yBox   = yBoxRef?.current
													             ? refHeight
													             : pTweener._.box.y
													    deltaY = dY && (dY / yBox) * (
														    y.scrollableWindow ||
														    y.scrollableArea) || 0;
													    if ( yHook )
														    deltaY = yHook(deltaY);
												    }
												    
												    if ( x && !xDispatched && deltaX && x?.inertia?.isInbound(parentsState[i].x + deltaX)
													    && (pTweener.componentShouldScroll(xAxis, deltaX)) ) {
													    x.inertia.hold(parentsState[i].x + deltaX);
													    //parentsState[i].x = x.inertia._.pos;
													    xDispatched = didDrag = true;
												    }
												    if ( y && !yDispatched && deltaY && y?.inertia?.isInbound(parentsState[i].y + deltaY)
													    && (pTweener.componentShouldScroll(yAxis, deltaY)) ) {
													    y.inertia.hold(parentsState[i].y + deltaY);
													    //parentsState[i].y = y.inertia._.pos;
													    yDispatched = didDrag = true;
												    }
											    }
											    
										    }
									    else
										    console.warn("React-Voodoo : drag called without dragstart !")
									    if ( yDispatched && xDispatched ) {
										    //e.stopPropagation();
										    //e.cancelable && e.preventDefault();
										    //return;
									    }
									    //dX = 0;
									    //dY = 0;
								    }
							    }
							    
							    ,
							    // dropped: fires when the pointer is released. Calls inertia.release() on each
							    // ancestor tweener that was participating in the drag; inertia then computes
							    // momentum and snaps to the nearest waypoint if configured.
							    'dropped': ( e, touch, descr ) => {
								    let pTweener,
								        x, deltaX, xDispatched, vX,
								        y, deltaY, yDispatched, vY,
								        cState, i;

								    // no e.button check here : domUtils ends the tracked gesture on ANY mouseup,
								    // so inertia must always be released to avoid a stuck hold
								    cLock = undefined;
								    //lastStartTm                     = undefined;
								    //document.body.style.userSelect  = '';
								    //document.body.style.touchAction = '';
								    if ( parents )
								    for ( i = 0; i < parents.length; i++ ) {
									    pTweener = parents[i];
									    // react comp with tweener support
									    if ( pTweener.__isTweener && parentsState[i] ) {
										    pTweener.axes?.[xAxis]?.inertia?.release();
										    pTweener.axes?.[yAxis]?.inertia?.release();
										    //pTweener._updateNodeInertia()
									    }
									    //else if ( is.element(tweener) ) {
									    //	cState = parentsState[i];
									    //	if ( cState ) {
									    //		cState.inertia.x.release();
									    //		cState.inertia.y.release();
									    //	}
									    //}
									    
								    }
								    else
									    console.warn("React-Voodoo : dropped called without dragstart !")
								    if ( lastStartTm && (didDrag || !((lastStartTm > Date.now() - _.options.maxClickTm) && Math.abs(dY)
									    < _.options.maxClickOffset && Math.abs(dX) < _.options.maxClickOffset)) )// skip
								                                                                                // tap
									    // &
									    // click
								    {
									    e.stopPropagation();
									    e.cancelable && e.preventDefault();
									    // real drag: arm the one-shot capture-phase click interceptor
									    // (domUtils.dropWithoutClick) — preventDefault on mouseup does NOT
									    // suppress the native click that follows, unlike touchend
									    descr.preventClick = true;
									    //return;
								    }
								    //else {
								    //}
								    //lastStartTm = 0;
								    parents = parentsState = null;
							    }
						    },
						    null,
						    _.options.enableMouseDrag || mouseDrag,
						    touchDrag,
						    null,
						    button
					    )
					    µ._.doRegister = !!rootNode;
				    }
				    else {
					    µ._.doRegister = true;
				    }
			    }
			    
		    }),
		    []
	    );
	React.useEffect(
		() => {
			api._registerScrollListeners();
			return () => {
				let node = µ.root?.current;
				if ( µ._.scrollEnabled ) {
					µ._.scrollEnabled = false;
					
					node && µ._.dragList && domUtils.removeEvent(node
						, µ._.dragList)
				}
			}
		},
		[]
	)
	React.useEffect(
		() => {
			if ( is.function(nodeRef) )
				nodeRef(root.current)
			if ( is.function(ref) )
				ref(root.current)
			else if ( ref )
				ref.current = root.current;
		},
		[nodeRef, ref]
	)
	µ.props          = {
		xAxis, yAxis, yHook, xHook, mouseDrag, touchDrag, tweener: tweener || parentTweener, xBoxRef, yBoxRef, button
	}
	µ._parentTweener = parentTweener;
	return <Comp ref={root} {...props}>{children}</Comp>;
})
export default Draggable;

Draggable.div = ( props ) => {
	return <Draggable {...props}/>;
}
