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

import is                         from "is";
import {floatCut, units, unitsRe} from "../cssUtils";

const
	defaultUnits    = {
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
	}, defaultValue = {};


export function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	let path = twKey.split('_'), tmpKey;// not optimal at all
	if ( path.length === 4 ) {
		//console.warn("dec", twKey, dataMap[path[0]][path[1]][path[2]])
		// dec count on filter
		if ( !--dataMap[path[0]][path[1]][path[2]] && !keepValues ) {
			delete dataMap[path[0]][path[1]][path[2]];
		}
		//if ( Object.keys(dataMap[path[0]][path[1]]).length === 0 && !keepValues )
		//	delete dataMap[path[0]][path[1]];
		
		// free filter layers
		if ( !keepValues )
			while ( dataMap[path[0]].length && !dataMap[path[0]][dataMap[path[0]].length - 1] )
				dataMap[path[0]].pop();
		
		
		tmpKey = path[0] + "_" + path[1] + "_" + path[2];
		
		if ( !--dataMap[tmpKey][path[3]] && !keepValues ) {
			delete dataMap[tmpKey][path[3]];
			//dataMap[path[0]][path[3]] = undefined;
			delete tweenableMap[twKey];
			//console.log("delete", twKey)
		}
		
		if ( !keepValues )
			while ( dataMap[tmpKey].length && !dataMap[tmpKey][dataMap[tmpKey].length - 1] )
				dataMap[tmpKey].pop();
		
		if ( dataMap[tmpKey].length === 0 && !keepValues )
			delete dataMap[tmpKey];
		
		if ( dataMap[path[0]].length === 0 && !keepValues ) {
			delete dataMap[path[0]];
			delete muxerMap[path[0]];
			delete cssMap[path[0]];
		}
	}
	else {
		console.log("wtf", path)
	}
}

export function demuxOne( unitIndex, dkey, twVal, baseKey, data, box ) {
	let value = twVal,
	    unit  = units[unitIndex] || defaultUnits[baseKey];
	
	//if ( unit === 'box' ) {
	//	value = value * (box[defaultBox[baseKey]] || box.x);
	//	unit  = 'px';
	//}
	if ( unit === 'bw' ) {
		value = value * box.x;
		unit  = 'px';
	}
	if ( unit === 'wh' ) {
		value = value * box.y;
		unit  = 'px';
	}
	if ( unit === 'bz' ) {
		value = value * box.z;
		unit  = 'px';
	}
	
	if ( unit === 'deg' )
		value = value % 360;
	
	return unit ? floatCut(value) + unit : floatCut(value);
}

export function demux( key, tweenable, target, data, box ) {
	//console.log(key)
	let filters                                                    = "",
	    tmpValue                                                   = {};
	let ti = 0, tmap, fkey, unitKey, unitIndex, dkey, u, iValue, y = 0, value;
	for ( ; ti < data[key].length; ti++ ) {
		tmap = data[key][ti];
		for ( fkey in tmap )
			if ( tmap.hasOwnProperty(fkey) ) {
				dkey  = key + '_' + ti + '_' + fkey;
				value = "";
				y     = 0;
				for ( unitIndex = 0; unitIndex < data[dkey].length; unitIndex++ )
					if ( data[dkey][unitIndex] ) {
						unitKey = dkey + "_" + unitIndex;
						//console.log("mux ", key, dkey, unitKey)
						
						//if ( !tweenable[unitKey] )
						//	continue;
						iValue = demuxOne(unitIndex, dkey, tweenable[unitKey], fkey, data, box);
						//console.log(unitKey, tweenable[unitKey], iValue)
						if ( y && iValue[0] === '-' )
							iValue = " - " + iValue.substr(1);
						else if ( y )
							iValue = " + " + iValue;
						value += iValue;
						y++;
					}
				
				if ( y > 1 )
					value = "calc(" + value + ")";
				
				if ( y > 0 )
					filters += fkey + "(" + (value || "0") + ") ";
			}
	}
	target.filter = filters;
	
}

export function muxOne( key, baseKey, value, target, data, initials, noPropLock, seenUnits ) {
	
	let match   = is.string(value) ? value.match(unitsRe) : false,
	    unit    = match && match[2] || defaultUnits[baseKey],
	    unitKey = units.indexOf(unit),
	    realKey = unitKey !== -1 && (key + '_' + unitKey) || key;
	
	initials[realKey]  = defaultValue[baseKey] || 0;
	data[key][unitKey] = data[key][unitKey] || 0;
	//console.log(key, ':', realKey, data[key][unitKey], initials[realKey], noPropLock)
	
	if ( seenUnits && seenUnits[unitKey] ) {
		if ( match ) {
			target[realKey] += parseFloat(match[1]);
		}
		else {
			target[realKey] += parseFloat(value);
		}
	}
	else {
		
		!noPropLock && data[key][unitKey]++;
		if ( match ) {
			target[realKey] = parseFloat(match[1]);
		}
		else {
			target[realKey] = parseFloat(value);
		}
		if ( seenUnits ) seenUnits[unitKey] = true;
	}
	
	return demux;
};
export const mux = ( key, value, target, data, initials, noPropLock, reOrder ) => {
	
	data[key] = data[key] || [];
	//initials[key] = 0;
	
	if ( !is.array(value) )
		value = [value];
	let ti = 0, tmap, tFnKey, baseData, fValue, dkey, u, seenUnits;
	for ( ; ti < value.length; ti++ ) {
		tmap     = value[ti];
		baseData = reOrder ? {} : { ...(data[key][ti] || {}) };
		for ( tFnKey in tmap )
			if ( tmap.hasOwnProperty(tFnKey) ) {
				fValue    = tmap[tFnKey];
				seenUnits = {};
				dkey      = key + '_' + ti + '_' + tFnKey;
				
				baseData[tFnKey] = baseData[tFnKey] || data[key][ti] && data[key][ti][tFnKey] || 0;
				!noPropLock && baseData[tFnKey]++;
				
				//console.warn("set ", key, dkey, noPropLock, baseData[tFnKey])
				
				data[dkey] = data[dkey] || [];
				if ( is.array(fValue) ) {
					for ( u = 0; u < fValue.length; u++ ) {
						muxOne(dkey, tFnKey, fValue[u] || 0, target, data, initials, noPropLock, seenUnits)
					}
				}
				else {
					muxOne(dkey, tFnKey, fValue || 0, target, data, initials, noPropLock)
				}
			}
		data[key][ti] =
			reOrder
			? { ...baseData, ...(data[key][ti] || {}), ...baseData }
			:
			baseData;
		//console.log(key, reOrder, data[key][ti], baseData)
	}
	return demux;
}