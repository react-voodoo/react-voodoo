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
import PropTypes from "prop-types";
import React     from 'react';

import TweenerContext from "./TweenerContext";

export default class Axis extends React.Component {
	static propTypes = {
		axe            : PropTypes.string.isRequired,
		items          : PropTypes.array,
		bounds         : PropTypes.object,
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
			    axe, scrollFirst, bounds,
			    scrollableWindow, inertia, size, defaultPosition,
			    items = [],
		    } = this.props;
		return <TweenerContext.Consumer>
			{
				tweener => {
					if ( !this._previousAxis || this._previousAxis !== axe ) {//....
						this._previousAxis    = axe;
						this._previousInertia = inertia;
						tweener.initAxis(axe, {
							inertia,
							size,
							scrollableWindow,
							defaultPosition,
							scrollFirst,
							scrollableBounds: bounds
						}, true);
					}
					else if ( !this._previousInertia || this._previousInertia !== inertia ) {//....
						this._previousInertia = inertia;
						this._previousAxis    = axe;
						tweener.initAxis(axe, {
							inertia,
							size,
							scrollableWindow,
							defaultPosition,
							scrollFirst,
							scrollableBounds: bounds
						});
					}
					if ( !this._previousTweener || this._previousTweener !== tweener ) {// mk axe not modifiable
						this._previousTweener && this._lastTL && this._previousTweener.rmScrollableAnim(this._lastTL, this._previousAxis);
						if ( items.length )
							this._lastTL = tweener.addScrollableAnim(items, axe, size);
						this._previousTweener = tweener;
						this._previousTweens  = items;
					}
					else if ( this._previousTweens !== items && !(this._previousTweens && deepEqual(items, this._previousTweens)) ) {
						this._lastTL && this._previousTweener && this._previousTweener.rmScrollableAnim(this._lastTL, this._previousAxis);
						this._lastTL = null;
						if ( items.length )
							this._lastTL = tweener.addScrollableAnim(items, axe, size);
						this._previousTweens = items;
					}
					return <React.Fragment/>;
				}
			}
		</TweenerContext.Consumer>;
	}
}