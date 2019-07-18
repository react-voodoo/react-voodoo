/*
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

import is from "is";
import number from "./typed/number";

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
		scale      : '',
		//scaleX     : 'px',
		//scaleY     : 'px',
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
			( tmap = {}, i ) => Object.keys(tmap).forEach(
				fkey => {
					let dkey = key + '_' + fkey + '_' + i,
					    tmpValue={};
					
					//if ( data[dkey] === 'deg' )
					//	tweenable[dkey] = tweenable[dkey] % 360;
					//debugger
					
					number.demux( dkey, tweenable, tmpValue, data, box )
					//if ( data[dkey] === 'box' ) {
					//	if ( fkey === "translateX" )
					//		value = tweenable[dkey] * box.x;
					//	else if ( fkey === "translateY" )
					//		value = tweenable[dkey] * box.y;
					//	else if ( fkey === "translateZ" )
					//		value = tweenable[dkey] * box.z;
					//	transforms += fkey + "(" + floatCut(value, 2) + "px) ";
					//}
					//else {
					//	value = tweenable[dkey];
						transforms += fkey + "(" + tmpValue[dkey] + ") ";
					//}
					
					
				}
			)
		)
		target.transform = transforms;
	}
	
}

export default ( key, value, target, data, initials, forceUnits ) => {
	
	data["transform_head"] = data["transform_head"] || key;
	data[key]              = data[key] || [{}];
	initials[key]          = 0;
	
	if ( !is.array(value) )
		value = [value];
	
	value.forEach(
		( tmap, i ) => {
			let baseData = {}
			//data[key][i]       = forceUnits ? {} : data[key][i] || {};
			tmap && Object.keys(tmap).forEach(
				fkey => {
					let fValue     = tmap[fkey],
					    dkey       = key + '_' + fkey + '_' + i,
					    match      = is.string(fValue) ? fValue.match(unitsRe) : false;
					number( dkey, fValue, target, data, initials, forceUnits )
					baseData[fkey] = true;
					//initials[dkey] = 0;
					//if ( match ) {
					//	if ( !forceUnits && data[dkey] && data[dkey] !== match[2] ) {
					//		console.warn("Have != units on prop ! Ignore ", dkey, "present:" + data[dkey], "new:" + match[2]);
					//		target[dkey] = 0;
					//	}
					//	else {
					//		data[dkey]   = match[2];
					//		target[dkey] = parseFloat(match[1]);
					//	}
					//}
					//else {
					//	target[dkey] = fValue;
					//	if ( !data[dkey] && fkey in defaultUnits )
					//		data[dkey] = defaultUnits[fkey];
					//}
				}
			)
			data[key][i] =
				forceUnits
				? { ...baseData, ...(data[key][i] || {}) }
				: { ...(data[key][i] || {}), ...baseData };
		}
	)
	return demux;
}