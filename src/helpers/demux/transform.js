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
		['\\w+', 'cap', 'ch', 'em', 'ic', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|')
		+ ")"
	),
	floatCut     = function ( v, l ) {
		var p = Math.pow(10, l);
		return Math.round(v * p) / p;
	},
	defaultUnits = {
		//matrix     : true,
		//translate  : 'px',
		translateX : 'px',
		translateY : 'px',
		translateZ : 'px',
		scale      : 'px',
		scaleX     : 'px',
		scaleY     : 'px',
		rotate     : 'deg',
		//skew       : 'deg',
		skewX      : 'deg',
		skewY      : 'deg',
		//matrix3d   : true,
		//translate3d: true,
		//scale3d    : true,
		scaleZ     : 'px',
		//rotate3d   : true,
		rotateX    : 'deg',
		rotateY    : 'deg',
		rotateZ    : 'deg',
		perspective: 'px',
	};

function demux( key, tweenable, target, data, box ) {
	
	if ( data["transform_head"] === key ) {
		let transforms = "";
		data[key].forEach(
			( tmap, i ) => Object.keys(tmap).forEach(
				fkey => {
					let dkey = key + '_' + fkey + '_' + i, value;
					
					if ( data[dkey] === 'deg' )
						tweenable[dkey] = tweenable[dkey] % 360;
					
					if ( data[dkey] === 'box' ) {
						if ( fkey === "translateX" )
							value = tweenable[dkey] * box.x;
						else if ( fkey === "translateY" )
							value = tweenable[dkey] * box.y;
						else if ( fkey === "translateZ" )
							value = tweenable[dkey] * box.z;
						transforms += fkey + "(" + floatCut(value, 2) + "px) ";
					}
					else {
						value = tweenable[dkey];
						transforms += fkey + "(" + floatCut(value, 2) + data[dkey] + ") ";
					}
					
					
				}
			)
		)
		target.transform = transforms;
	}
	
}

export default ( key, value, target, data, initials ) => {
	
	data["transform_head"] = data["transform_head"] || key;
	data[key]              = data[key] || [{}];
	initials[key]          = 0;
	
	if ( !is.array(value) )
		value = [value];
	
	value.forEach(
		( tmap, i ) =>
			Object.keys(tmap).forEach(
				fkey => {
					let fValue         = tmap[fkey],
					    dkey           = key + '_' + fkey + '_' + i,
					    match          = is.string(fValue) ? fValue.match(unitsRe) : false;
					data[key][i]       = data[key][i] || {};
					data[key][i][fkey] = true;
					initials[dkey]     = 0;
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
	)
	return demux;
}