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

import is                  from "is";
import {floatCut, unitsRe} from "../cssUtils";

const
	defaultUnits = {
		blur      : 'px',
		brightness: '%',
		contrast  : '%',
		dropShadow: true,
		grayscale : '%',
		hueRotate : 'deg',
		invert    : "%",
		opacity   : "%",
		saturate  : "%",
		sepia     : "%"
	};
const filters    = {};

export function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	let path = twKey.split('_'), tmpKey;// not optimal at all
	console.log("dec", twKey, path)
	if ( path.length === 4 ) {
		if ( !--dataMap[path[0]][path[1]][path[2]] && !keepValues ) {
			delete dataMap[path[0]][path[1]][path[2]];
		}
		
		if ( Object.keys(dataMap[path[0]][path[1]]).length === 0 && !keepValues )
			delete dataMap[path[0]][path[1]];
		
		if ( !keepValues )
			while ( dataMap[path[0]].length && !dataMap[path[0]][dataMap[path[0]].length - 1] )
				dataMap[path[0]].pop();
		
		
		tmpKey = path[0] + "_" + path[1] + "_" + path[2];
		//console.warn("free", dataMap, path, tweenableMap[twKey])
		if ( !--dataMap[tmpKey][path[3]] && !keepValues ) {
			delete dataMap[tmpKey][path[3]];
			delete tweenableMap[twKey];
			console.log("delete", twKey)
		}
		
		if ( !keepValues )
			while ( dataMap[tmpKey].length && !dataMap[tmpKey][dataMap[tmpKey].length - 1] )
				dataMap[tmpKey].pop();
		
		if ( dataMap[path[0] + "_" + path[1] + "_" + path[2]].length === 0 && !keepValues )
			delete dataMap[path[0] + "_" + path[1] + "_" + path[2]];
		
		if ( dataMap[path[0]].length === 0 && !keepValues ) {
			delete dataMap[path[0]];
			delete muxerMap[path[0]];
			delete cssMap[path[0]];
		}
	}
	else {
		console.log("wtf", path)
	}
}

export function demux( key, tweenable, target, data, box ) {
	
	if ( data["filter_head"] === key ) {
		let filters = "";
		Object.keys(data[key]).forEach(
			fkey => {
				let dkey        = key + '_' + fkey;
				data[key][fkey] = true;
				filters += fkey + "(" + floatCut(tweenable[dkey], 2) + data[dkey] + ") ";
			}
		)
		target.filter = filters;
	}
	
}


export const mux = ( key, value, target, data, initials ) => {
	
	data["filter_head"] = data["filter_head"] || key;
	data[key]           = data[key] || {};
	//initials[key]       = 0;
	
	Object.keys(value).forEach(
		fkey => {
			let fValue      = value[fkey],
			    dkey        = key + '_' + fkey,
			    match       = is.string(fValue) ? fValue.match(unitsRe) : false;
			data[key][fkey] = true;
			initials[dkey]  = 0;
			if ( match ) {
				if ( data[dkey] && data[dkey] !== match[2] ) {
					console.warn("Have != units on prop ! Ignore ", dkey, "present:" + data[dkey], "new:" + match[2]);
					target[dkey] = 0;
				}
				else {
					data[dkey]   = match[2];
					target[dkey] = parseFloat(match[1]);
				}
			}
			else {
				target[dkey] = fValue;
				if ( !data[dkey] && fkey in defaultUnits )
					data[dkey] = defaultUnits[fkey];
			}
		}
	)
	return demux;
}