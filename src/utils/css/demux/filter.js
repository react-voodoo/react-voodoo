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

function demux( key, tweenable, target, data, box ) {
	
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

export default ( key, value, target, data, initials ) => {
	
	data["filter_head"] = data["filter_head"] || key;
	data[key]           = data[key] || {};
	initials[key]       = 0;
	
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