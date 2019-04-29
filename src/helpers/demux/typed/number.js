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

function demux( key, tweenable, target, data, box ) {
	target[key] = data[key] ? floatCut(tweenable[key], 2) + data[key] : floatCut(tweenable[key], 2);
}

function muxer( key, value, target, data, initials, forceUnits ) {
	
	
	//if ( cssAnimProps.canAnimate(key) ) {
	let match = is.string(value) ? value.match(unitsRe) : false;
	
	//let how = cssAnimProps.getProperty(key);
	//console.log(how);
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
		if ( !data[key] && key in defaultUnits )
			data[key] = defaultUnits[key];
	}
	//}
	//else {
	//	// just do nothing
	//	//data[key]=
	//}
	
	return demux;
};
muxer.demux = demux;
export default muxer;