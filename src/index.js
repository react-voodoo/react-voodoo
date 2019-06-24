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

import {Component}     from 'react';
import asTweener       from './asTweener';
import TweenAxis       from './TweenAxis';
import TweenRef        from './TweenRef';
import withTweener     from './withTweener';
import TweenerContext  from './TweenerContext';
import * as tweenTools from './helpers/tweenTools.js';

@asTweener
class Tweenable extends Component {
	render() {
		return this.props.children;
	}
}


export {asTweener, withTweener, tweenTools, Tweenable, TweenRef, TweenerContext, TweenAxis};
export default Tweenable;