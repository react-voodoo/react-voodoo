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

const defaultUnits = {};

export function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	let path = twKey.split('_'), tmpKey;// not optimal at all
	
	if ( path.length === 2 ) {
		console.log("dec", twKey, dataMap[path[0]][path[1]])
		if ( !--dataMap[path[0]][path[1]] && !keepValues ) {
			delete tweenableMap[twKey];
			delete dataMap[path[0]][path[1]];
		}
		
		if ( !keepValues )
			while ( dataMap[path[0]].length && !dataMap[path[0]][dataMap[path[0]].length - 1] )
				dataMap[path[0]].pop();
		
		if ( dataMap[path[0]].length === 0 && !keepValues ) {
			delete dataMap[path[0]];
			delete muxerMap[path[0]];
			delete cssMap[path[0]];
			console.log("delete", path[0])
		}
	}
	else {
		console.log("wtf", path)
	}
}

export function demux( key, tweenable, target, data, box ) {
	target[key] = ~~(tweenable[key]);
}


export const mux = ( key, value, target, data, initials, noPropLock ) => {
	
	
	initials[key] = 0;
	target[key]   = ~~value;
	data[key]     = data[key] || 0;
	!noPropLock && data[key]++;
	
	return demux;
}