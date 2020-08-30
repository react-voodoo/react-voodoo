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

import React      from 'react';
import Axis       from './comps/Axis';
import Context    from './comps/TweenerContext';
import Node       from './comps/Node';
import Draggable  from './comps/Draggable';
import useVoodoo  from './hooks/useVoodoo';
import useTweener from './hooks/useTweener';
import tweener    from './spells/asTweener';
import child      from './spells/withTweener';
import dom        from './utils/dom.js';
import * as tools from './utils/tweenTools.js';

@tweener
class Component extends React.Component {
    render() {
        return this.props.children;
    }
}

export {
    tweener,
    child,
    useTweener,
    useVoodoo,
    useVoodoo as hook,
    tools,
    Draggable,
    Component,
    Node,
    Context,
    Axis,
    dom
};
export default {
    tweener,
    child,
    useTweener,
    useVoodoo,
    hook: useVoodoo,
    tools,
    Draggable,
    Component,
    Node,
    Context,
    Axis,
    dom
};