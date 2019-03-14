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
		['em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|')
		+ ")"
	),
	floatCut     = function ( v, l ) {
		var p = Math.pow(10, l);
		return Math.round(v * p) / p;
	},
	defaultUnits = {
		left  : 'px',
		right : 'px',
		top   : 'px',
		bottom: 'px',
		width : 'px',
		height: 'px',
	};

function demux( key, tweenable, target, data, box, offset ) {
	let active = data.transform, t = '';
	if ( data.transformApplier === key ) {
		if ( active._z || active._x || active._y || active.z ||
			active.x || active.y )
			t = 'translate3d(' +
				floatCut((tweenable._x || 0) * (box.x || 0) + (tweenable.x || 0) + (offset && offset.x || 0), 2) +
				(data && data.x || 'px') + ', ' +
				floatCut((tweenable._y || 0) * (box.y || 0) + (tweenable.y || 0) + (offset && offset.y || 0), 2) +
				(data && data.y || 'px') + ', ' +
				floatCut((tweenable._z || 0) * (box.z || 0) + (tweenable.z || 0) + (offset && offset.z || 0), 2) +
				(data && data.z || 'px') + '' +
				')';
		
		if ( tweenable.rotate && active.rotate )
			t += ' rotate(' + floatCut((tweenable.rotate || 0) % 360, 2) + 'deg)';
		if ( tweenable.rotateX && active.rotateX )
			t += ' rotateX(' + floatCut((tweenable.rotateX || 0) % 360, 2) + 'deg)';
		if ( tweenable.rotateY && active.rotateY )
			t += ' rotateY(' + floatCut((tweenable.rotateY || 0) % 360, 2) + 'deg)';
		
		active.perspective && (t = "perspective(" + tweenable.perspective + (data.perspective || 'px') + ") " + t)
		
		
		target.transform = t;
	}
}

export default ( key, value, target, data, initials ) => {
	
	
	let match = is.string(value) ? value.match(unitsRe) : false;
	
	//let how = cssAnimProps.getProperty(key);
	//console.log(how);
	data.transform        = data.transform || {};
	data.transformApplier = data.transformApplier || key;
	data.transform[key]   = true;
	initials[key]         = 0;
	if ( match ) {
		data[key]   = match[2];
		target[key] = parseFloat(match[1]);
	}
	else {
		target[key] = value;
		if ( key in defaultUnits )
			data[key] = defaultUnits[key];
	}
	
	return demux;
}