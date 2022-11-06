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
	// register axes if tweener or node axis items change
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
			                               pos, noRef)
		}
		
		// anyway, if there change set the last css values
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