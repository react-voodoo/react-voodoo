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

import rgba from "color-rgba";

export function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	let path = twKey.split('_'), tmpKey;// not optimal at all
	
	console.log("wtf", path)
	//}
}
export function demux( key, tweenable, target, data ) {
	let value = "rgba(" + tweenable[key + '$r'] + ", " + tweenable[key + '$g'] + ", " + tweenable[key + '$b'] + ", " + tweenable[key + '$a'] + ")";
	return target ?
	       target[key] = value : value;
}

export function mux( key, value, target, data, initials, noPropLock ) {
	let vect  = rgba(value);
	data[key] = data[key] || 0;
	!noPropLock && data[key]++;
	target[key + '$r'] = vect[0];
	target[key + '$g'] = vect[1];
	target[key + '$b'] = vect[2];
	target[key + '$a'] = vect[3];
	
	initials[key + '$r'] = 0;
	initials[key + '$g'] = 0;
	initials[key + '$b'] = 0;
	initials[key + '$a'] = 1;
	
	return demux;
}
