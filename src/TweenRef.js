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

import React   from 'react';
import shortid from 'shortid';

import is from "is";

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
	
	static propTypes = {
	};
	state            = {};
	__tweenableId    = shortid.generate();
	
	componentWillUnmount() {
		
		if ( this._tweenLines ) {
			Object.keys(this._tweenLines)
			      .forEach(axe => this._previousTweener.rmScrollableAnim(this._tweenLines[axe], axe));
			
		}
		if ( this._previousTweener ) {
			this._previousTweener.rmTweenRef(this.__tweenableId)
			this._previousTweener.setRootRef(undefined);
		}
		delete this._previousTweener;
		delete this._previousScrollable;
	}
	
	componentDidUpdate( prevProps, prevState, snapshot ) {
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
					
					if ( React.isValidElement(children) ) {
						children = React.cloneElement(
							children,
							{
								...parentTweener.tweenRef(id, style || children.props.style, initial, pos, noRef, reset),
								onDoubleClick: onDoubleClick && (e => onDoubleClick(e, parentTweener)),
								onClick      : onClick && (e => onClick(e, parentTweener))
							}
						);
						
					}
					if ( this._previousTweener !== parentTweener || this._previousScrollable !== tweenLines ) {
						
						if ( this._tweenLines ) {
							Object.keys(this._tweenLines)
							      .forEach(axe => this._previousTweener.rmScrollableAnim(this._tweenLines[axe], axe));
							
						}
						if ( tweenLines && is.array(tweenLines) )
							this._tweenLines = { scrollY: parentTweener.addScrollableAnim(setTarget(tweenLines, id)) };
						else
							this._tweenLines = tweenLines &&
								Object.keys(tweenLines)
								      .reduce(( h, axe ) => (h[axe] = parentTweener.addScrollableAnim(setTarget(tweenLines[axe], id), axe), h), {});
						
						if ( this._previousTweener !== parentTweener )
							this._previousTweener && this._previousTweener.rmTweenRef(this.__tweenableId)
						
						
						if ( this.props.hasOwnProperty("isRoot") ) {
							this._previousTweener && this._previousTweener.setRootRef(undefined);
							tweener.setRootRef(id);
						}
						
						this._previousTweener    = parentTweener;
						this._previousScrollable = tweenLines;
						
					}
					return children;
				}
			}
		</TweenerContext.Consumer>;
	}
}