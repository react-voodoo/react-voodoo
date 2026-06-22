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

import {floatCut} from "../../cssUtils";

/**
 * Handler for SVG geometry attributes (cx, cy, r, rx, ry, x, y, x1, y1, x2, y2, etc.).
 *
 * Unlike CSS properties, SVG geometry attributes cannot be set via element.style —
 * they require element.setAttribute(). To signal this to the Tweener's DOM update
 * loop without restructuring the pipeline, this handler writes values into the CSS
 * map under an "attr_" prefix (e.g. "cx" → "attr_cx"). _updateTweenRef detects
 * that prefix and calls setAttribute instead of assigning to node.style.
 */

export function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	if ( !--dataMap[twKey] && !keepValues ) {
		delete tweenableMap[twKey];
		delete dataMap[twKey];
		delete muxerMap[twKey];
		if ( cssMap ) delete cssMap['attr_' + twKey];
	}
}

export function demux( key, tweenable, target, data, box ) {
	target['attr_' + key] = String(floatCut(tweenable[key]));
}

export const mux = ( key, value, target, data, initials, noPropLock ) => {
	initials[key] = 0;
	target[key]   = parseFloat(value) || 0;
	data[key]     = data[key] || 0;
	!noPropLock && data[key]++;
	return demux;
};
