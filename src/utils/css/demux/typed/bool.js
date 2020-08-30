/*
 *
 * Copyright (C) 2020 Nathanael Braun
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
 *
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

const defaultUnits = { opacity: 1 };

export function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	
	if ( !--dataMap[twKey] && !keepValues ) {
		delete tweenableMap[twKey];
		delete dataMap[twKey];
		delete muxerMap[twKey];
		delete cssMap[twKey];
	}
}

export function demux( key, tweenable, target, data, box ) {
	let value = !!(tweenable[key]);
	return target ? target[key] = value : value;
}


export const mux = ( key, value, target, data, initials, noPropLock ) => {
	
	initials[key] = defaultUnits[key] || 0;
	target[key]   = value === false ? 0 : 1;
	data[key]     = data[key] || 0;
	!noPropLock && data[key]++;
	
	return demux;
}