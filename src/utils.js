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

var
	is                 = require('is'),
	floatCut           = function ( v, l ) {
		var p = Math.pow(10, l);
		return Math.round(v * p) / p;
	},
	slice              = Array.prototype.slice,
	splice             = Array.prototype.splice,
	abs                = Math.abs,
	floor              = Math.floor,
	round              = Math.round,
	min                = Math.min,
	max                = Math.max,
	objBuilder         = ({}).constructor,
	_createElementAttr = { style: true, tagName: true, content: true, cls: true, events: true, $id: true },
	_defaultUnits      = { width: 'px', height: 'px', top: 'px' }, __;

export default {
	
	mapInBoxCSS: function ( pos, css, box, units, offset ) {
		
		//if ( is.number(pos.x) || is.number(pos.y))
		var t = '';
		if ( is.number(pos._z) || is.number(pos._x) || is.number(pos._y) || is.number(pos.z) ||
			is.number(pos.x) || is.number(pos.y) )
			t = 'translate3d(' +
				floatCut((pos._x || 0) * (box.x || 0) + (pos.x || 0) + (offset && offset.x || 0), 2) +
				(units && units.x || 'px') + ', ' +
				floatCut((pos._y || 0) * (box.y || 0) + (pos.y || 0) + (offset && offset.y || 0), 2) +
				(units && units.y || 'px') + ', ' +
				floatCut((pos._z || 0) * (box.z || 0) + (pos.z || 0) + (offset && offset.z || 0), 2) +
				(units && units.z || 'px') + '' +
				')';
		
		//@todo matrix
		if ( pos.rotate && is.number(pos.rotate) )
			t += ' rotate(' + floatCut((pos.rotate || 0) % 360, 2) + 'deg)';
		if ( pos.rotateX && is.number(pos.rotateX) )
			t += ' rotateX(' + floatCut((pos.rotateX || 0) % 360, 2) + 'deg)';
		if ( pos.rotateY && is.number(pos.rotateY) )
			t += ' rotateY(' + floatCut((pos.rotateY || 0) % 360, 2) + 'deg)';
		
		if ( is.number(pos.opacity) )
			css.opacity = min(1, max(0, floatCut(pos.opacity, 2)));
		
		css.transform = t;
		
		is.number(pos._width) && (css.width = (pos._width) * (box.x || 0) + 'px');
		is.number(pos._height) && (css.height = (pos._height) * (box.y || 0) + 'px');
		
		is.number(pos.width) && (css.width = (pos.width) + (units && units.x || 'px'));
		is.number(pos.height) && (css.height = (pos.height) + (units && units.y || 'px'));
		
		is.number(pos.zIndex) && (css.zIndex = pos.zIndex);
	},
}