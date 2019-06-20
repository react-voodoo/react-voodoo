/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */

import is from "is";

const
	unitsRe         = new RegExp(
		"([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" +
		['em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|')
		+ ")"
	),
	abs             = Math.abs,
	floatCut        = function ( v, l ) {
		var p = Math.pow(10, l);
		return Math.round(v * p) / p;
	},
	defaultUnits    = {
		left  : 'px',
		right : 'px',
		top   : 'px',
		bottom: 'px',
		width : 'px',
		height: 'px',
	}, defaultValue = {
		opacity: 1
	};

function demux( key, tweenable, target, data, box ) {
	let value;
	
	value = data[key + "_" + 0] || defaultUnits[key]
	        ? floatCut(tweenable[key + "_" + 0], 2) + (data[key + "_" + 0] || defaultUnits[key])
	        : floatCut(tweenable[key + "_" + 0], 2);
	
	if ( data[key] && data[key].length > 1 ) {
		for ( let i = 1; i < data[key].length; i++ ) {
			if ( tweenable[key + "_" + i] < 0 )
				value += " - " + abs(floatCut(tweenable[key + "_" + i], 2)) + (data[key + "_" + i] || defaultUnits[key]);
			else
				value += " + " + floatCut(tweenable[key + "_" + i], 2) + (data[key + "_" + i] || defaultUnits[key]);
		}
		value = "calc(" + value + ")";
	}
	target[key] = value;
}

export default ( key, value, target, data, initials, forceUnits ) => {
	
	data[key] = data[key] || [];
	if ( is.array(value) ) {
		for ( let i = 0; i < value.length; i++ ) {
			data[key][i] = true;
			mux(key + "_" + i, key, value[i] || 0, target, data, initials, forceUnits)
		}
	}
	else {
		data[key][0] = true;
		mux(key + "_" + 0, key, value || 0, target, data, initials, forceUnits)
	}
	
	return demux;
}

function mux( key, baseKey, value, target, data, initials, forceUnits ) {
	
	let match     = is.string(value) ? value.match(unitsRe) : false;
	initials[key] = is.number(initials[key]) ? initials[key] : defaultValue[baseKey] || 0;
	if ( match ) {
		if ( !forceUnits && data[key] && data[key] !== match[2] ) {
			console.warn("Have != units on prop ! Ignore ", key, "present:" + data[key], "new:" + match[2]);
			target[key] = 0;
		}
		else {
			data[key]   = match[2];
			target[key] = parseFloat(match[1]);
		}
	}
	else {
		target[key] = parseFloat(value);
		//if ( !data[key] && baseKey in defaultUnits )
		//	data[key] = defaultUnits[baseKey];
	}
	
	return demux;
}