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