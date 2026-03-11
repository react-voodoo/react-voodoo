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

import deepEqual from "fast-deep-equal";
import React     from 'react';
import useVoodoo from "../hooks/useVoodoo";

/**
 * Axis — a zero-render declarative component that registers a scrollable animation
 * timeline with the nearest parent Tweener.
 *
 * Unlike most React components, the registration calls (initAxis / addScrollableAnim)
 * happen during render, not inside a useEffect. This is intentional: children that
 * mount in the same render pass (e.g. Node components) need the axis to already exist
 * so their tweenRef calls can resolve initial positions correctly. The component itself
 * renders nothing (`<React.Fragment/>`).
 *
 * Cleanup on unmount is handled by a single effect with an empty dependency array —
 * it removes the axis timeline from the tweener so that its numeric contributions are
 * zeroed and the CssTweenAxis instance is returned to the object pool.
 */
export default ( {
	                 children,
	                 id,
	                 axe = id,
	                 scrollFirst, bounds,
	                 scrollableWindow, inertia, size, defaultPosition,
	                 items = [],
                 } ) => {
	const µ         = React.useRef({}).current,
	      [tweener] = useVoodoo(true);
	
	// First render for this axis id — reset axis to defaultPosition so prior
	// scroll state from a different axis id does not bleed through.
	if ( !µ.previousAxis || µ.previousAxis !== axe ) {
		µ.previousAxis    = axe;
		µ.previousInertia = inertia;
		tweener.initAxis(axe, {
			inertia,
			scrollableArea: size,
			scrollableWindow,
			defaultPosition,
			scrollFirst,
			scrollableBounds: bounds
		}, true);
	}
	// Inertia config, bounds, or viewport window changed — re-init without resetting
	// the scroll position so the user's current scroll is preserved.
	else if ( !µ.previousInertia || µ.previousInertia !== inertia || µ.previousBounds !== bounds || µ.previousScrollableWindow !== scrollableWindow ) {
		µ.previousInertia          = inertia;
		µ.previousAxis             = axe;
		µ.previousBounds           = bounds;
		µ.previousScrollableWindow = scrollableWindow;
		tweener.initAxis(axe, {
			inertia,
			scrollableArea: size,
			scrollableWindow,
			defaultPosition,
			scrollFirst,
			scrollableBounds: bounds
		});
	}
	// Parent tweener changed (component was reparented) — unregister from the old
	// tweener and re-register with the new one to avoid orphaned timeline entries.
	if ( !µ.previousTweener || µ.previousTweener !== tweener ) {
		µ.previousTweener && µ.lastTL && µ.previousTweener.rmScrollableAnim(µ.lastTL, µ.previousAxis);
		if ( items.length )
			µ.lastTL = tweener.addScrollableAnim(items, axe, size);
		µ.previousTweener = tweener;
		µ.previousTweens  = items;
	}
	// Items array changed — rebuild the timeline. deepEqual guards against the common
	// pattern where the consumer creates a new array literal each render with identical
	// contents; without it every re-render would teardown and re-create the axis.
	else if ( µ.previousTweens !== items && !(µ.previousTweens && deepEqual(items, µ.previousTweens)) ) {
		µ.lastTL && µ.previousTweener && µ.previousTweener.rmScrollableAnim(µ.lastTL, µ.previousAxis);
		µ.lastTL = null;
		if ( items.length )
			µ.lastTL = tweener.addScrollableAnim(items, axe, size);
		µ.previousTweens = items;
	}
	
	React.useEffect(
		() => {
			
			return () => {
				µ.lastTL && µ.previousTweener && µ.previousTweener.rmScrollableAnim(µ.lastTL, µ.previousAxis);
				
				delete µ.previousTweener;
				delete µ.previousScrollable;
			}
		}, [])
	return <React.Fragment/>;
}
