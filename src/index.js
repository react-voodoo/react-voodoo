/*
 * @author : Nathanael BRAUN <pp9ping@gmail.com>
 *
 * Copyright 2026 Nathanael BRAUN
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React                  from 'react';
import Axis                   from './comps/Axis';
import Context                from './comps/TweenerContext';
import Node                   from './comps/Node';
import Draggable              from './comps/Draggable';
import useVoodoo              from './hooks/useVoodoo';
import useTweener             from './hooks/useTweener';
import useReducedMotion       from './hooks/useReducedMotion';
import tweener                from './spells/asTweener';
import child                  from './spells/withTweener';
import dom                    from './utils/dom.js';
import * as tools             from './utils/tweenTools.js';
import * as _internalCssUtils from './utils/css/index.js';

import TweenAxis   from "tween-axis/dist/TweenAxisWasm";
import * as D3Ease from "d3-ease";

TweenAxis.EasingFunctions = D3Ease;

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
	useReducedMotion,
	tools,
	Draggable,
	Component,
	Node,
	Context,
	Axis,
	dom,
	_internalCssUtils
};
export default {
	tweener,
	child,
	useTweener,
	useVoodoo,
	hook: useVoodoo,
	useReducedMotion,
	tools,
	Draggable,
	Component,
	Node,
	Context,
	Axis,
	dom,
	_internalCssUtils
};
