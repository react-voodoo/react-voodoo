/*
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

import is      from "is";
import React   from 'react';
import shortid from 'shortid';

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
		
		if ( this._tweenLines ) {
			Object.keys(this._tweenLines)
			      .forEach(axe => this._currentTweener.rmScrollableAnim(this._tweenLines[axe], axe));
			
		}
		if ( this._currentTweener ) {
			this._currentTweener.rmTweenRef(this.__tweenableId)
			this._currentTweener.setRootRef(undefined);
		}
		delete this._currentTweener;
		delete this._previousScrollable;
	}
	
	componentDidMount() {
		let {
			    children,
			    id            = this.__tweenableId,
			    style, initial, pos, noRef, reset, tweener,
			    isRoot,
			    tweenLines,
			    onClick       = children && children.props && children.props.onClick,
			    onDoubleClick = children && children.props && children.props.onDoubleClick
		    }      = this.props,
		    target = this._currentTweener.getTweenableRef(id);
		//debugger
		let props  = [...target.style];
		//console.log(props)
		props.forEach(p => (target.style[p] = undefined));
		this._currentTweener._updateTweenRef()
		//console.log({ ...this._currentTweener.getTweenableRef(id).style }, this._currentTweener)
	}
	
	render() {
		let {
			    children,
			    id            = this.__tweenableId,
			    style, initial, pos, noRef, reset, tweener,
			    isRoot,
			    tweenLines,
			    onClick       = children && children.props && children.props.onClick,
			    onDoubleClick = children && children.props && children.props.onDoubleClick
		    } = this.props;
		return <TweenerContext.Consumer>
			{
				parentTweener => {//@todo : should use didmount ?
					
					
					parentTweener = tweener || parentTweener;
					
					let twRef = parentTweener.tweenRef(id, style || children.props && children.props.style, initial, pos, noRef, reset);
					
					
					if ( this._currentTweener !== parentTweener || this._previousScrollable !== tweenLines ) {
						if ( this._tweenLines ) {
							Object.keys(this._tweenLines)
							      .forEach(axe => this._currentTweener.rmScrollableAnim(this._tweenLines[axe], axe));
							
						}
						//if ( this._currentTweener !== parentTweener )
							this._currentTweener && this._currentTweener.rmTweenRef(id)
						twRef = parentTweener.tweenRef(id, style || children.props && children.props.style, initial,
						                               pos, noRef, this._previousScrollable !== tweenLines)
						
						if ( tweenLines && is.array(tweenLines) )
							this._tweenLines = { scrollY: parentTweener.addScrollableAnim(setTarget(tweenLines, id)) };
						else
							this._tweenLines = tweenLines &&
								Object.keys(tweenLines)
								      .reduce(( h, axe ) => (h[axe] = parentTweener.addScrollableAnim(setTarget(tweenLines[axe], id), axe), h), {});
						
						twRef.style = { ...parentTweener._updateTweenRef(id) };
						
						if ( this.props.hasOwnProperty("isRoot") ) {
							this._currentTweener && this._currentTweener.setRootRef(undefined);
							tweener.setRootRef(id);
						}
						
						this._currentTweener     = parentTweener;
						this._previousScrollable = tweenLines;
						
					}
					if ( React.isValidElement(children) ) {
						children = React.cloneElement(
							children,
							{
								...twRef,
								onDoubleClick: onDoubleClick && (e => onDoubleClick(e, parentTweener)),
								onClick      : onClick && (e => onClick(e, parentTweener))
							}
						);
						
					}
					return children;
				}
			}
		</TweenerContext.Consumer>;
	}
}