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


import {addCss}    from "../tweenTools";
import {
	expandShorthandProperty, isShorthandProperty, isValidDeclaration, props
}                  from "./cssUtils";
import cssDemuxers from "./demux/(*).js";
export * as allDemuxers from "./demux/(**/*).js";

import {svgAttr, length, multi, number, ratio, color, any} from "./demux/typed/(*).js";

/**
 * CSS mux/demux layer — the bridge between numeric interpolation and CSS strings.
 *
 * "Demux" (parse → numeric): converts CSS property values in a tween descriptor's
 * `apply` object into additive numeric components stored in `tweenRefMaps`. Each
 * component gets a compound key encoding the property, layer index, transform
 * function, and unit index (e.g. `transform_0_translateX_9`).
 *
 * "Mux" (numeric → CSS string): the inverse pass, called every RAF frame. Reads the
 * accumulated numeric values from `tweenRefMaps` and reconstructs CSS strings
 * (including `calc()` expressions for multi-unit values) into `tweenRefCSS`.
 *
 * Each CSS property has a typed handler registered below in `cssDemux`. Complex
 * properties (transform, boxShadow, filter, backgroundColor, textShadow) have
 * dedicated demux modules under `src/utils/css/demux/`. Simpler properties are
 * handled by the typed primitives: length, number, ratio, color, etc.
 */

/**
 * Maps CSS property names to their demuxer handler objects. Each handler implements
 * at minimum `mux(key, value, target, data, initials, noPropLock, reOrder)` for
 * demuxing (parse time) and `demux(key, tweenable, target, data, box)` for muxing
 * (render time). Additional complex demuxers (transform, filter, etc.) are merged
 * in from the `./demux/` directory via the glob import above.
 */
const cssDemux = {
	...cssDemuxers,
	height           : length,
	width            : length,
	top              : length,
	left             : length,
	right            : length,
	bottom           : length,
	marginTop        : length,
	marginLeft       : length,
	marginRight      : length,
	marginBottom     : length,
	paddingTop       : length,
	paddingLeft      : length,
	paddingRight     : length,
	paddingBottom    : length,
	borderRadius     : length,
	borderTopColor   : color,
	borderLeftColor  : color,
	borderRightColor : color,
	borderBottomColor: color,
	borderTopWidth   : length,
	borderLeftWidth  : length,
	borderRightWidth : length,
	borderBottomWidth: length,
	transformOrigin  : multi(2),
	zIndex           : number,
	opacity          : ratio,
	
	// SVG presentation attributes (set via element.style)
	fill            : color,
	stroke          : color,
	strokeWidth     : length,
	strokeOpacity   : ratio,
	fillOpacity     : ratio,
	strokeDashoffset: length,
	
	// SVG geometry attributes (set via element.setAttribute — see svgAttr handler)
	cx: svgAttr,
	cy: svgAttr,
	r : svgAttr,
	rx: svgAttr,
	ry: svgAttr,
	x : svgAttr,
	y : svgAttr,
	x1: svgAttr,
	y1: svgAttr,
	x2: svgAttr,
	y2: svgAttr,
};

//export const allDemuxers = _allDemuxers;// export for tests

/**
 * Fallback type detection for CSS properties not explicitly listed in cssDemux.
 * Inspects the MDN-sourced `props` database for the property's value types and
 * returns the best matching demuxer handler. Falls back to `any` (string passthrough)
 * for properties whose types are unrecognised or not animatable.
 */
export function getMuxerTypeOfProperty( property ) {
	let type  = props[property],
	    types = type && type.types;
	if ( !types ) {
		return any;
	}
	for ( let i = 0; i < types.length; i++ ) {
		switch ( types[i] ) {
			case "length":
			case "length-percentage-calc":
				return length;
			case "number":
			case "integer":
				return number;
			case "color":
				return color;
		}
	}
	return any;
};

/**
 * Decrement the ref count for a single numeric component and clean up its bookkeeping
 * if the count reaches zero. `twKey` encodes the full property+layer+unit hierarchy
 * (e.g. `transform_0_translateX_9`); the first segment (`path[0]`) identifies the
 * demuxer responsible for this key so the correct `release()` implementation is called.
 *
 * When `keepValues` is true the numeric slot is left in tweenRefMaps so any post-
 * completion CSS snapshot remains accurate (used by pushAnim's keepResults path).
 */
export function clearTweenableValue( cssKey, twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	let path = twKey.split('_'), tmpKey;// not optimal at all
	muxerMap[path[0]]?.release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues)
}

/**
 * Mux pass — reconstruct CSS strings from accumulated numeric state.
 *
 * Iterates all active demuxer instances for this target and calls each one's
 * `demux()` to write the corresponding CSS string into `css`. This is called
 * every RAF frame (via `_updateTweenRef`) and on every scroll event.
 * The `box` object provides viewport dimensions for box-relative units (bw, bh, bz).
 */
export function muxToCss( tweenable, css, demuxers, data, box ) {
	Object.keys(demuxers)
	      .forEach(
		      ( key ) => {
			      demuxers[key].demux(key, tweenable, css, data, box)
		      }
	      )
}

/**
 * Demux pass — parse a CSS `apply` object into numeric interpolatable components.
 *
 * For each key in `tween` (the `apply` map from a tween descriptor):
 *  - If the key is in cssDemux, the registered handler's `mux()` is called, which
 *    populates `deMuxedTween` with numeric slot entries and `initials` with their
 *    default (zero) values.
 *  - Shorthand properties (e.g. `margin`) are expanded via cssUtils before processing.
 *  - Unknown properties fall through to the `any` handler (string passthrough).
 *
 * Returns `excluded` — an object of properties that could not be demuxed (passed
 * straight into `tweenRefCSS` as literal CSS strings).
 */
export function deMuxTween( tween, deMuxedTween, initials, data, demuxers, noPropLock, reOrder ) {
	let fTween = {}, excluded = {};
	tween && Object.keys(tween)
	               .forEach(
		               ( key ) => {
			               if ( cssDemux[key] )
				               fTween[key] = tween[key];
			               else if ( isValidDeclaration(key, tween[key]) ) {
				               
				               if ( isShorthandProperty(key) ) {
					               expandShorthandProperty(key, tween[key], fTween);
				               }
				               else fTween[key] = tween[key];
			               }
			               else {
				               //excluded[key] = tween[key];
				               fTween[key] = tween[key];
			               }
		               });
	
	fTween && Object.keys(fTween)
	                .forEach(
		                ( key ) => {
			                if ( cssDemux[key] ) {//key, value, target, data, initials
				                (demuxers[key] = cssDemux[key]).mux(key, fTween[key], deMuxedTween, data, initials, noPropLock, reOrder)
			                }
			                else if ( isValidDeclaration(key, tween[key]) )
				                (demuxers[key] = getMuxerTypeOfProperty(key)).mux(key, fTween[key], deMuxedTween, data, initials, noPropLock, reOrder)
			                else
				                (demuxers[key] = any).mux(key, fTween[key], deMuxedTween, data, initials, noPropLock, reOrder)
		                }
	                );
	return excluded;
}

/**
 * Process a full tween line (array of tween descriptors) and register demuxers for
 * every property referenced by any descriptor in the line.
 *
 * `allPropsById` accumulates a merged CSS descriptor per target that covers all
 * properties touched anywhere in the timeline. After processing all descriptors,
 * a second pass calls `deMuxTween(allPropsById[id])` without noPropLock to
 * initialize the prop-lock reference counts — this ensures demuxers know the full
 * set of properties they will need to reconstruct even before the animation reaches
 * a particular keyframe.
 */
export function deMuxLine( tweenLine, initials, data, demuxers, noPropLock ) {
	noPropLock       = noPropLock && {};
	let allPropsById = {},
	    twAxis       = tweenLine.reduce(
		    ( line, tween ) => {
			    let demuxedTween       = {};
			    demuxers[tween.target] = demuxers[tween.target] || {};
			    initials[tween.target] = initials[tween.target] || {};
			    data[tween.target]     = data[tween.target] || {};
			    
			    if ( !tween.type || tween.type === "Tween" ) {
				    !noPropLock && addCss(allPropsById[tween.target] = allPropsById[tween.target] || {}, tween.apply);
				    //console.log("merged", tween.apply)
				    deMuxTween(tween.apply, demuxedTween, initials[tween.target], data[tween.target], demuxers[tween.target], true);
				    line.push(
					    {
						    ...tween,
						    apply: demuxedTween
					    });
			    }
			    else line.push({ ...tween });
			    return line
		    },
		    []
	    );
	!noPropLock && Object.keys(allPropsById)
	                     .forEach(
		                     id => deMuxTween(allPropsById[id], {}, {}, data[id], demuxers[id])
	                     )
	;
	return twAxis;
}
