/*
 *
 * Copyright (C) 2019 Nathanael Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import deepEqual from "fast-deep-equal";
import is        from "is";
import React     from 'react';
import shortid   from 'shortid';

import TweenerContext from "./TweenerContext";

function setTarget( anims, target ) {
	return anims.map(
		tween => ({
			...tween,
			target
		})
	)
}

export default class TweenRef extends React.Component {
	
	static propTypes = {};
	state            = {};
	__tweenableId    = shortid.generate();
	
	componentWillUnmount() {
		if ( this._tweenAxis ) {
			Object.keys(this._tweenAxis)
			      .forEach(axe => this._currentTweener.rmScrollableAnim(this._tweenAxis[axe], axe));
			
		}
		if ( this._currentTweener ) {
			this._currentTweener.rmTweenRef(this.__tweenableId)
			this._currentTweener.setRootRef(undefined);
		}
		delete this._currentTweener;
		delete this._previousScrollable;
	}
	
	//componentDidMount() {
	//	let {
	//		    children,
	//		    id = this.__tweenableId,
	//	    }      = this.props,
	//	    target = this._currentTweener.getTweenableRef(id);
	//	let props  = [...target.style];// should reset ssr initials ?
	//	props.forEach(p => (target.style[p] = undefined));
	//	this._currentTweener._updateTweenRef()
	//}
	
	render() {
		let {
			    children,
			    id            = this.__tweenableId,
			    style, initial, pos, noRef, reset, tweener,
			    isRoot,
			    tweenLines,
			    tweenAxis     = tweenLines,
			    onClick       = children && children.props && children.props.onClick,
			    onDoubleClick = children && children.props && children.props.onDoubleClick
		    } = this.props;
		return <TweenerContext.Consumer>
			{
				parentTweener => {//@todo : must be better method
					
					
					parentTweener = tweener || parentTweener;
					
					if ( !parentTweener ) {
						console.error("No voodoo tweener found in the context, is there any parent with asTweener ?")
						return <React.Fragment/>;
					}
					
					let twRef = parentTweener.tweenRef(id, children.props && children.props.style, style || initial,
					                                   pos, noRef),
					    axisItemsChange;
					
					
					if ( this._currentTweener !== parentTweener || this._previousScrollable !== tweenAxis ) {
						axisItemsChange = this._previousScrollable !== tweenAxis && (!this._previousScrollable || deepEqual(tweenAxis, this._previousScrollable));
						if ( this._currentTweener && axisItemsChange ) {
							Object.keys(this._tweenAxis)
							      .forEach(axe => this._currentTweener.rmScrollableAnim(this._tweenAxis[axe], axe));
							
						}
						//twRef = parentTweener.tweenRef(id, style || children.props && children.props.style, initial,
						// pos, noRef, reset);
						if ( this._currentTweener !== parentTweener ) {
							this._currentTweener && this._currentTweener.rmTweenRef(id);
							//if ( axisItemsChange )
							twRef = parentTweener.tweenRef(id, children.props && children.props.style, style || initial,
							                               pos, noRef)
						}
						if ( axisItemsChange ) {
							if ( tweenAxis && is.array(tweenAxis) )
								this._tweenAxis = { scrollY: parentTweener.addScrollableAnim(setTarget(tweenAxis, id)) };
							else
								this._tweenAxis = tweenAxis &&
									Object.keys(tweenAxis)
									      .reduce(( h, axe ) => (h[axe] = parentTweener.addScrollableAnim(setTarget(tweenAxis[axe], id), axe), h), {});
						}
						
						twRef.style = { ...parentTweener._updateTweenRef(id) };
						
						if ( this.props.hasOwnProperty("isRoot") ) {
							this._currentTweener && this._currentTweener.setRootRef(undefined);
							tweener.setRootRef(id);
						}
						
						this._currentTweener     = parentTweener;
						this._previousScrollable = tweenAxis;
						
					}
					else if ( twRef ) {
						twRef.style = { ...parentTweener._updateTweenRef(id) };
					}
					
					let refChild = React.Children.only(children);
					
					if ( refChild && React.isValidElement(refChild) ) {
						//console.log(twRef)
						refChild      = React.cloneElement(
							refChild,
							{
								...twRef,
								onDoubleClick: onDoubleClick && (e => onDoubleClick(e, parentTweener)),
								onClick      : onClick && (e => onClick(e, parentTweener))
							}
						);
						this._lastRef = twRef;
						return refChild;
					}
					else {
						console.error("Invalid voodoo TweenRef child : ", id)
					}
					return <div>Invalid</div>;
				}
			}
		</TweenerContext.Consumer>;
	}
}

TweenRef.div = ( { children, className, ...props } ) => {
	return <TweenRef {...props}>
		<div className={className}>{children}</div>
	</TweenRef>;
}