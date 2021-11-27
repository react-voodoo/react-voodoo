/*
 *   The MIT License (MIT)
 *   Copyright (c) 2020. Nathanael Braun
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of context software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and context permission notice shall be included in all
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
