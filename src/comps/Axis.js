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
	
	if ( !µ.previousAxis || µ.previousAxis !== axe ) {//....
		µ.previousAxis    = axe;
		µ.previousInertia = inertia;
		tweener.initAxis(axe, {
			inertia,
			size,
			scrollableWindow,
			defaultPosition,
			scrollFirst,
			scrollableBounds: bounds
		}, true);
	}
	else if ( !µ.previousInertia || µ.previousInertia !== inertia || µ.previousBounds !== bounds || µ.previousScrollableWindow !== scrollableWindow ) {//....
		µ.previousInertia          = inertia;
		µ.previousAxis             = axe;
		µ.previousBounds           = bounds;
		µ.previousScrollableWindow = scrollableWindow;
		tweener.initAxis(axe, {
			inertia,
			size,
			scrollableWindow,
			defaultPosition,
			scrollFirst,
			scrollableBounds: bounds
		});
	}
	if ( !µ.previousTweener || µ.previousTweener !== tweener ) {// mk axe not modifiable
		µ.previousTweener && µ.lastTL && µ.previousTweener.rmScrollableAnim(µ.lastTL, µ.previousAxis);
		if ( items.length )
			µ.lastTL = tweener.addScrollableAnim(items, axe, size);
		µ.previousTweener = tweener;
		µ.previousTweens  = items;
	}
	else if ( µ.previousTweens !== items && !(µ.previousTweens && deepEqual(items, µ.previousTweens)) ) {// is deepEq really required ?
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
