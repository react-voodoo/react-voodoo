/*
 *
 * Copyright (C) 2019 Nathan Braun
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

import React     from 'react';
import asTweener from './asTweener';

const Component = asTweener({})(React.Component);

class TweenableComponent extends Component {
	render() {
		return 'Should have some render fn here in ' + this.constructor.displayName;
	}
}

export {asTweener, Component};
export default TweenableComponent;