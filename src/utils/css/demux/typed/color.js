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

import rgba from "color-rgba";

export function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	let path   = twKey.split('_'),
	    tmpKey = path.slice(0, path.length - 1).join('_');
	
	//console.log("dec", tmpKey, path, dataMap[twKey])
	if ( !--dataMap[twKey] && !keepValues ) {
		delete tweenableMap[twKey];
		delete dataMap[twKey];
		//delete muxerMap[twKey];
		//delete cssMap[twKey];
		//console.log("delete", twKey, path)
	}
	if ( !--dataMap[tmpKey] && !keepValues ) {
		delete tweenableMap[twKey];
		delete dataMap[twKey];
		//delete muxerMap[twKey];
		//delete cssMap[twKey];
		//console.log("delete", tmpKey)
	}
	//}
}

export function demux( key, tweenable, target, data ) {
	let value = "rgba(" + tweenable[key + '_r'] + ", " + tweenable[key + '_g'] + ", " + tweenable[key + '_b'] + ", " + tweenable[key + '_a'] + ")";
	return target ?
	       target[key] = value : value;
}

export function mux( key, value, target, data, initials, noPropLock ) {
	let vect = rgba(value);
	
	data[key]        = data[key] || 0;
	data[key + '_r'] = data[key + '_r'] || 0;
	data[key + '_g'] = data[key + '_g'] || 0;
	data[key + '_b'] = data[key + '_b'] || 0;
	data[key + '_a'] = data[key + '_a'] || 0;
	if ( !noPropLock ) {
		data[key] += 4;
		data[key + '_r']++;
		data[key + '_g']++;
		data[key + '_b']++;
		data[key + '_a']++;
	}
	
	target[key + '_r'] = vect[0];
	target[key + '_g'] = vect[1];
	target[key + '_b'] = vect[2];
	target[key + '_a'] = vect[3];
	
	initials[key] = 0;
	
	initials[key + '_r'] = 0;
	initials[key + '_g'] = 0;
	initials[key + '_b'] = 0;
	initials[key + '_a'] = 1;
	
	return demux;
}
