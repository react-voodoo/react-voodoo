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

import React     from 'react';
import shortid   from 'shortid';
import PropTypes from "prop-types";
import is        from "is";

import TweenerContext from "./TweenerContext";

function setTarget( anims, target ) {
	return anims.map(
		tween => ({
			...tween,
			target
		})
	)
}

export default class TweenAxis extends React.Component {
	static propTypes = {
		axe            : PropTypes.string.isRequired,
		items          : PropTypes.array,
		inertia        : PropTypes.any,
		defaultPosition: PropTypes.number,
		size           : PropTypes.any
	};
	state            = {};
	
	componentWillUnmount() {
		
		if ( this._tweenLines ) {
			Object.keys(this._tweenLines)
			      .forEach(axe => this._previousTweener.rmScrollableAnim(this._tweenLines[axe], axe));
			
		}
		delete this._previousTweener;
		delete this._previousScrollable;
	}
	
	render() {
		let {
			    children,
			    axe,
			    stops, inertia, size, defaultPosition,
			    items = [],
		    } = this.props;
		return <TweenerContext.Consumer>
			{
				tweener => {
					//if ( React.isValidElement(children) ) {
					//	children = React.cloneElement(
					//		children,
					//		{
					//			...tweener.tweenRef(id, style || children.props.style, initial, pos, noRef, reset),
					//			onDoubleClick: onDoubleClick && (e => onDoubleClick(e, tweener)),
					//			onClick      : onClick && (e => onClick(e, tweener))
					//		}
					//	);
					//
					//}
					if ( !this._previousInertia || this._previousInertia !== inertia ) {//....
						this._previousInertia = inertia;
						tweener.initAxis(axe, inertia, size, defaultPosition);
					}
					if ( !this._previousTweener || this._previousTweener !== tweener ) {// mk axe not modifiable
						this._previousTweener && this._previousTweener.rmScrollableAnim(this._lastTL, axe);
						this._lastTL          = tweener.addScrollableAnim(items, axe, size);
						this._previousTweener = tweener;
					}
					return <React.Fragment/>;
				}
			}
		</TweenerContext.Consumer>;
	}
}