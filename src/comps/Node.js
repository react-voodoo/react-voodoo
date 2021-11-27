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

import deepEqual from "fast-deep-equal";
import is        from "is";
import React     from 'react';
import shortid   from 'shortid';
import useVoodoo from "../hooks/useVoodoo";

import {isFunctionalComponent} from '../utils/react';

function setTarget( anims, target ) {
	return anims.map(
		tween => ({
			...tween,
			target
		})
	)
}

const Node = ( {
	               children,
	               id = React.useMemo(() => shortid.generate(), []),
	               style, initial, pos, noRef, reset, tweener,
	               isRoot,
	               axes,
	               refProp = "nodeRef",
	               tweenLines = axes,
	               tweenAxis = tweenLines,
	               ...props
               } ) => {
	let µ               = React.useRef({}).current,
	    [parentTweener] = useVoodoo(true);
	
	parentTweener = tweener || parentTweener;
	
	if ( !parentTweener ) {
		console.error("No Voodoo tweener found in the context, is there any parent with asTweener ?")
		return <React.Fragment/>;
	}
	//console.warn("render : ", this.__tweenableId, this._currentTweener,
	// parentTweener, this._currentTweener !== parentTweener)
	let twRef = parentTweener.tweenRef(id, children.props && children.props.style, style || initial,
	                                   pos, noRef),
	    axisItemsChange;
	
	//console.warn("render2 : ", this.__tweenableId,
	// this._currentTweener, parentTweener, this._currentTweener !==
	// parentTweener)
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
	
	if ( µ._currentTweener !== parentTweener || µ._previousScrollable !== tweenAxis ) {
		axisItemsChange = µ._tweenAxis !== tweenAxis && !(µ._tweenAxis && deepEqual(tweenAxis, µ._tweenAxis));
		if ( µ._currentTweener && axisItemsChange ) {
			µ._tweenAxisObj && Object.keys(µ._tweenAxisObj)
			                         .forEach(axe => µ._currentTweener.rmScrollableAnim(µ._tweenAxisObj[axe], axe));
			
		}
		//console.log(twRef, axisItemsChange, µ._tweenAxis, tweenAxis)
		if ( µ._currentTweener && µ._currentTweener !== parentTweener ) {
			µ._currentTweener.rmTweenRef(id);
		}
		if ( axisItemsChange ) {
			µ._tweenAxis = tweenAxis;
			if ( tweenAxis && is.array(tweenAxis) )
				µ._tweenAxisObj = { scrollY: parentTweener.addScrollableAnim(setTarget(tweenAxis, id)) };
			else
				µ._tweenAxisObj = tweenAxis && Object.keys(tweenAxis)
				                                     .reduce(( h, axe ) => (h[axe] = parentTweener.addScrollableAnim(setTarget(tweenAxis[axe], id), axe), h), {});
			twRef = parentTweener.tweenRef(id, children.props && children.props.style, style || initial,
			                               pos, noRef)
		}
		
		twRef.style = { ...parentTweener._updateTweenRef(id, true) };
		
		if ( props.hasOwnProperty("isRoot") ) {
			µ._currentTweener && µ._currentTweener.setRootRef(undefined);
			tweener.setRootRef(id);
		}
		
		µ._currentTweener     = parentTweener;
		µ._previousScrollable = tweenAxis;
		
	}
	else if ( twRef ) {
		twRef.style = { ...parentTweener._updateTweenRef(id, true) };// should renew only if changed
	}
	
	let RefChild = React.Children.only(children);
	
	if ( RefChild && React.isValidElement(RefChild) ) {//todo
		µ._lastRef = twRef;
		
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
		console.error("Invalid voodoo Node child : ", id)
	}
	return <div>Invalid</div>;
}
export default Node;

Node.div = ( { children, className, ...props } ) => {
	return <Node {...props}>
		<div className={className}>{children}</div>
	</Node>;
}