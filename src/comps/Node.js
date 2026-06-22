/*
 * @author : Nathanael BRAUN <pp9ping@gmail.com>
 *
 * Copyright 2026 Nathanael BRAUN
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import deepEqual from "fast-deep-equal";
import is        from "is";
import React     from 'react';
import shortid   from 'shortid';
import useVoodoo from "../hooks/useVoodoo";

import {isFunctionalComponent} from '../utils/react';

/**
 * Node — wraps a single React child and registers it with the parent Tweener as a
 * tweenable element.
 *
 * On each render, `tweener.tweenRef(id, childStyle, initialMap)` is called. This
 * returns `{ style, ref }` which are spread onto the child: `style` contains the
 * current CSS for the initial render, and `ref` is a callback that gives the Tweener
 * the raw DOM node for subsequent direct writes (bypassing React entirely).
 *
 * Optionally, per-axis tween descriptor arrays can be provided via the `axes` /
 * `tweenLines` prop. Node then also calls `tweener.addScrollableAnim()` so the node
 * participates in scroll-driven animations without needing a separate `<Axis>`.
 *
 * `Node.div` and `Node.g` are convenience wrappers that pre-supply a `<div>` or
 * `<g>` child so consumers don't have to write the child element themselves.
 */

function setTarget( anims, target ) {
	return anims.map(
		tween => ({
			...tween,
			target
		})
	)
}

const Node = React.forwardRef(( {
	                                children,
	                                id = React.useMemo(() => shortid.generate(), []),
	                                style, initial, pos, noRef, reset, tweener,
	                                isRoot,
	                                axes,
	                                refProp = "nodeRef",
	                                tweenLines = axes,
	                                tweenAxis = tweenLines,
	                                ...props
                                }, ref ) => {
	let µ               = React.useRef({}).current,
	    [parentTweener] = useVoodoo(true);
	parentTweener       = tweener || parentTweener;
	
	if ( !parentTweener ) {
		console.error("[react-voodoo] No Tweener found in context — is there a parent ViewBox (useVoodoo) wrapping this Node?")
		return <React.Fragment/>;
	}
	if ( !children ) {
		console.warn("[react-voodoo] No Child node to animate — is there a childNodes to this Node?")
		return <React.Fragment/>;
	}
	if ( children.length>1 ) {
		console.warn("[react-voodoo] Multiple Child node to animate — is there an array of childNodes to this Node?")
		return <React.Fragment/>;
	}
	// Register this node with the tweener. Returns { style, ref }:
	//   style — current CSS computed from initial values; used for the first render
	//   ref   — callback that stores the DOM node in tweener._.refs[id] for direct writes
	let twRef = parentTweener.tweenRef(id, children.props && children.props.style, style || initial,
	                                   pos, ref, noRef),
	    axisItemsChange;
	
	
	// remove refs when unmount
	React.useEffect(
		() => () => {
			if ( µ._tweenAxisObj ) {
				Object.keys(µ._tweenAxisObj)
				      .forEach(axe => µ._currentTweener.rmScrollableAnim(µ._tweenAxisObj[axe], axe));
			}
			if ( µ._currentTweener ) {
				µ._currentTweener.rmTweenRef(µ.__tweenableId)
				µ._currentTweener.setRootRef(undefined);
			}
			delete µ._currentTweener;
			delete µ._tweenAxisObj;
			delete µ._previousScrollable;
		},
		[]
	)
	// Detect whether the per-node axis descriptor changed. Reference-equality is
	// checked first (fast path); deepEqual is the fallback to avoid rebuilding the
	// timeline when the consumer passes a new array literal with identical contents.
	axisItemsChange = µ._tweenAxis !== tweenAxis && !(µ._tweenAxis && deepEqual(tweenAxis, µ._tweenAxis))
		|| (tweenAxis && !µ._tweenAxis);
	if ( axisItemsChange || µ._currentTweener !== parentTweener || µ._previousScrollable !== tweenAxis ) {
		
		// if items changes rm the old items
		if ( µ._currentTweener && axisItemsChange ) {
			µ._tweenAxisObj && Object.keys(µ._tweenAxisObj)
			                         .forEach(axe => µ._currentTweener.rmScrollableAnim(µ._tweenAxisObj[axe], axe));
			
		}
		//console.log(twRef, axisItemsChange, µ._tweenAxis, tweenAxis)
		
		// if tweener changes rm the node ref
		if ( µ._currentTweener && µ._currentTweener !== parentTweener ) {
			µ._currentTweener.rmTweenRef(id);
		}
		
		// if items changes reg the items on the tweener
		if ( axisItemsChange ) {
			µ._tweenAxis = tweenAxis;
			if ( tweenAxis && is.array(tweenAxis) )
				µ._tweenAxisObj = { scrollY: parentTweener.addScrollableAnim(setTarget(tweenAxis, id)) };
			else
				µ._tweenAxisObj = tweenAxis &&
					Object.keys(tweenAxis)
					      .reduce(
						      ( h, axe ) =>
							      (
								      h[axe] = parentTweener.addScrollableAnim(setTarget(tweenAxis[axe], id), axe),
									      h
							      ), {});
			twRef = parentTweener.tweenRef(id, children.props && children.props.style, style || initial,
			                               pos, ref, noRef)
		}
		
		// After any tweener or axis change, force a fresh CSS snapshot so the child
		// receives accurate initial styles on this render even if the Tweener has
		// advanced the position since the last tweenRef call.
		twRef.style = { ...parentTweener._updateTweenRef(id, true) };

		if ( props.hasOwnProperty("isRoot") ) {
			µ._currentTweener && µ._currentTweener.setRootRef(undefined);
			tweener.setRootRef(id);
		}
		
		µ._currentTweener     = parentTweener;
		µ._previousScrollable = tweenAxis;
		
	}
	else if ( twRef ) {
		// No structural change — still refresh style in case the Tweener advanced
		// (e.g. a running animation or scroll event) between renders.
		twRef.style = { ...parentTweener._updateTweenRef(id, true) };
	}
	
	let RefChild = React.Children.only(children);
	
	if ( RefChild && React.isValidElement(RefChild) ) {//todo
		µ._lastRef = twRef;
		
		// Functional components don't accept the standard `ref` prop unless they use
		// forwardRef. Pass the DOM-node callback under the named `refProp` instead
		// (defaults to "nodeRef") so the consumer can opt into ref forwarding manually.
		if ( isFunctionalComponent(RefChild.type) )
			return <RefChild.type
				{...props}
				{...RefChild.props}
				{...twRef}
				ref={undefined}
				{
					...{
						[refProp]: twRef.ref
					}
				}
			/>;

		return <RefChild.type
			{...props}
			{...RefChild.props}
			{...twRef}/>;
		
	}
	else {
		console.error("[react-voodoo] Node requires exactly one valid React element as a child. Node id:", id)
	}
	return <div>Invalid</div>;
})
export default Node;

// Convenience: animatable <div> wrapper — saves typing the child element boilerplate.
Node.div = React.forwardRef(( { children, className, ...props }, ref ) => {
	return <Node {...props} ref={ref}>
		<div className={className}>{children}</div>
	</Node>;
})

// Convenience: animatable SVG <g> wrapper for use inside <svg> trees.
Node.g = React.forwardRef(( { children, className, ...props }, ref ) => {
	return <Node {...props} ref={ref}>
		<g className={className}>{children}</g>
	</Node>;
})
