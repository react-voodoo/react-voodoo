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

import primitiveTypes, {length, multi, number, ratio, color, any} from "./demux/typed/(*).js";

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
};


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

export function clearTweenableValue( cssKey, twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	let path = twKey.split('_'), tmpKey;// not optimal at all
	muxerMap[path[0]]?.release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues)
}

/**
 * Interpolate float/int values to css basing the css prop type
 * @param tweenable {Object} map of tweenable values
 * @param css {Object} map of css value to be push in DOM
 * @param demuxers {Object} map of numeric to css converter
 * @param data {Object} map of converters contexts
 * @param box {Object} xyz of the parent viewbox
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
 * Instanciate interpolators & init css/tweenable values basing the tween
 * @param tween
 * @param deMuxedTween
 * @param initials
 * @param data
 * @param demuxers
 * @param noPropLock
 * @param reOrder
 * @returns {{}}
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
 * Init/update muxers & initial css values of targets in a tween line / axis
 * @param tweenLine
 * @param initials
 * @param data
 * @param demuxers
 * @param noPropLock
 * @returns {*}
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
