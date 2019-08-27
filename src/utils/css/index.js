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


import deepExtend                                                         from "deep-extend";
import {expandShorthandProperty, isShorthandProperty, isValidDeclaration} from "./cssUtils";
import cssDemuxers                                                        from "./demux/(*).js";

import {int, multi, number} from "./demux/typed/(*).js";

const cssDemux = {
	...cssDemuxers,
	height         : number,
	width          : number,
	top            : number,
	left           : number,
	right          : number,
	bottom         : number,
	marginTop      : number,
	marginLeft     : number,
	marginRight    : number,
	marginBottom   : number,
	paddingTop     : number,
	paddingLeft    : number,
	paddingRight   : number,
	paddingBottom  : number,
	transformOrigin: multi(2),
	zIndex         : int,
};

export function clearTweenableValue( cssKey, twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	let path = twKey.split('_'), tmpKey;// not optimal at all
	cssDemux[path[0]]
	&& cssDemux[path[0]].release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues)
}

export function muxToCss( tweenable, css, demuxers, data, box ) {
	Object.keys(demuxers)
	      .forEach(
		      ( key ) => {
			      //if ( key === 'zIndex' ) debugger
			      demuxers[key].demux(key, tweenable, css, data, box)
		      }
	      )
}

export function deMuxTween( tween, deMuxedTween, initials, data, demuxers, noPropLock, reOrder ) {
	let fTween = {}, excluded = {};
	Object.keys(tween)
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
			      else excluded[key] = tween[key];
		      });
	
	Object.keys(fTween)
	      .forEach(
		      ( key ) => {
			      if ( cssDemux[key] ) {//key, value, target, data, initials
				      (demuxers[key] = cssDemux[key]).mux(key, fTween[key], deMuxedTween, data, initials, noPropLock, reOrder)
			      }
			      else
				      (demuxers[key] = number).mux(key, fTween[key], deMuxedTween, data, initials, noPropLock, reOrder)
		      }
	      );
	return excluded;
}

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
				    !noPropLock && deepExtend(allPropsById[tween.target] = allPropsById[tween.target] || {}, tween.apply);
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