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
	unitsRe      = new RegExp(
		"([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" +
		['box', 'em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|')
		+ ")"
	),
	floatCut     = function ( v, l ) {
		let p = Math.pow(10, l);
		return Math.round(v * p) / p;
	},
	defaultUnits = {
		left  : 'px',
		right : 'px',
		top   : 'px',
		bottom: 'px',
		width : 'px',
		height: 'px',
	},
	defaultBox   = {
		left  : 'x',
		right : 'x',
		top   : 'y',
		bottom: 'y',
		width : 'x',
		height: 'y',
	};

function demuxOne( key, twVal, baseKey, data, box ) {
	let value = twVal,
	    unit  = data[key] || defaultUnits[baseKey];
	
	if ( unit === 'box' ) {
		value = floatCut(value * (box[defaultBox[baseKey]] || box.x), 3);
		unit  = 'px';
	}
	
	return unit ? value + unit : floatCut(value, 3);
}

function demux( key, tweenable, target, data, box ) {
	let value;
	
	value = demuxOne(key + "_" + 0, tweenable[key + "_" + 0], key, data, box);
	
	if ( data[key] && data[key].length > 1 ) {
		for ( let i = 1; i < data[key].length; i++ ) {
			if ( tweenable[key + "_" + i] < 0 )
				value += " - " + demuxOne(key + "_" + i, -tweenable[key + "_" + i], key, data, box);
			else
				value += " + " + demuxOne(key + "_" + i, tweenable[key + "_" + i], key, data, box);
		}
		value = "calc(" + value + ")";
	}
	
	target[key] = value;
}

function muxer( key, value, target, data, initials, forceUnits ) {
	
	data[key] = data[key] || [];
	if ( is.array(value) ) {
		for ( let i = 0; i < value.length; i++ ) {
			data[key][i] = true;
			if ( value[i] === "-100%" && key === "height" )
				debugger
			muxOne(key + "_" + i, value[i] || 0, target, key, data, initials, forceUnits)
		}
	}
	else {
		data[key][0] = true;
		muxOne(key + "_" + 0, value || 0, target, key, data, initials, forceUnits)
	}
	
	return demux;
}

function muxOne( key, value, target, baseKey, data, initials, forceUnits ) {
	
	
	let match     = is.string(value) ? value.match(unitsRe) : false;
	initials[key] = 0;
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
};
muxer.demux = demux;
export default muxer;