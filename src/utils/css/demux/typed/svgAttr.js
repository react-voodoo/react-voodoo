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
