/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
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
		props.forEach(p => (target.style[p] = 'unset'));
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
						if ( tweenLines && is.array(tweenLines) )
							this._tweenLines = { scrollY: parentTweener.addScrollableAnim(setTarget(tweenLines, id)) };
						else
							this._tweenLines = tweenLines &&
								Object.keys(tweenLines)
								      .reduce(( h, axe ) => (h[axe] = parentTweener.addScrollableAnim(setTarget(tweenLines[axe], id), axe), h), {});
						
						if ( this._currentTweener !== parentTweener )
							this._currentTweener && this._currentTweener.rmTweenRef(this.__tweenableId)
						
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