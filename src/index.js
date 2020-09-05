/*
 *   The MIT License (MIT)
 *   Copyright (c) 2020. Nathanael Braun
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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