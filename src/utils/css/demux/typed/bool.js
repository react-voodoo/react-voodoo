/*
 * Copyright (c) 2022-2023 Braun Nathanael
 *
 * This project is dual licensed under one of the following licenses:
 * - Creative Commons Attribution-NoDerivatives 4.0 International License.
 * - GNU AFFERO GENERAL PUBLIC LICENSE Version 3
 *
 * You should have received a copy of theses licenses along with this work.
 * If not, see <http://creativecommons.org/licenses/by-nd/4.0/> or <http://www.gnu.org/licenses/agpl-3.0.txt>.
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