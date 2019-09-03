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

import cssShadowParser            from "css-box-shadow";
import is                         from "is";
import {floatCut, units, unitsRe} from "../../cssUtils";
import {bool, color}              from "./(*).js";

const defaultUnits  = {
	      perspective: 'px',
      },
      defaultBox    = {
	      translateX: 'x',
      },
      defaultMuxers = {
	      //blurRadius  : number,
	      inset: bool,
	      //offsetX     : number,
	      //offsetY     : number,
	      //spreadRadius: number,
	      color: color
      };

export function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	let path = twKey.split('_'), tmpKey;// not optimal at all
	if ( path.length > 2 ) {
		// dec count on transform
		
		tmpKey = path[0] + "_" + path[1] + "_" + path[2];
		if ( defaultMuxers[path[2]] ) {
			defaultMuxers[path[2]].release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues)
			if ( !dataMap[tmpKey] ) {
				//console.log("dec", tmpKey, dataMap[path[0]][path[1]][path[2]])
				if ( !--dataMap[path[0]][path[1]][path[2]] && !keepValues ) {
					delete dataMap[path[0]][path[1]][path[2]];
				}
			}
			
			if ( dataMap[path[0]].length === 0 && !keepValues ) {
				delete dataMap[path[0]];
				delete muxerMap[path[0]];
				delete cssMap[path[0]];
				//console.log("delete color", twKey)
			}
			return;
		}
		
		//console.log("dec", twKey, dataMap[path[0]])
		if ( !--dataMap[path[0]][path[1]][path[2]] && !keepValues ) {
			delete dataMap[path[0]][path[1]][path[2]];
		}
		//if ( Object.keys(dataMap[path[0]][path[1]]).length === 0 && !keepValues )
		//	delete dataMap[path[0]][path[1]];
		
		// free transform layers
		if ( !keepValues )
			while ( dataMap[path[0]].length && !dataMap[path[0]][dataMap[path[0]].length - 1] )
				dataMap[path[0]].pop();
		
		
		//tmpKey = path[0] + "_" + path[1] + "_" + path[2];
		// units
		if ( !--dataMap[tmpKey][path[3]] && !keepValues ) {
			delete dataMap[tmpKey][path[3]];
			//dataMap[path[0]][path[3]] = undefined;
			delete tweenableMap[twKey];
			//console.log("delete", tmpKey)
		}
		
		if ( !keepValues )
			while ( dataMap[tmpKey].length && !dataMap[tmpKey][dataMap[tmpKey].length - 1] )
				dataMap[tmpKey].pop();
		
		if ( dataMap[tmpKey].length === 0 && !keepValues )
			delete dataMap[tmpKey];
		
		if ( !keepValues )
			while ( dataMap[path[0]].length && !Object.keys(dataMap[path[0]][dataMap[path[0]].length - 1]).length )
				dataMap[path[0]].pop();
		
		if ( dataMap[path[0]].length === 0 && !keepValues ) {
			delete dataMap[path[0]];
			delete muxerMap[path[0]];
			delete cssMap[path[0]];
			//console.log("delete", path[0])
		}
	}
	else {
		console.log("wtf", path)
	}
}

export function demuxOne( unitIndex, dkey, twVal, baseKey, data, box ) {
	let value = twVal,
	    unit  = units[unitIndex] || defaultUnits[baseKey];
	
	if ( unit === 'box' ) {
		value = value * (box[defaultBox[baseKey]] || box.x);
		unit  = 'px';
	}
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
	let shadows                                                         = [],
	    tmpValue                                                        = {};
	let ti = 0, shadowMap, fkey, unitKey, unitIndex, dkey, u, iValue, y = 0, value;
	for ( ; ti < data[key].length; ti++ ) {
		shadowMap = data[key][ti];
		tmpValue  = {};
		for ( fkey in shadowMap )
			if ( shadowMap.hasOwnProperty(fkey) ) {
				dkey = key + '_' + ti + '_' + fkey;
				
				
				if ( defaultMuxers[fkey] ) {
					value = defaultMuxers[fkey].demux(dkey, tweenable, undefined, data, box);
					//continue;
					//console.log(dkey, tweenable[dkey])
				}
				else {
					value = "";
					y     = 0;
					for ( unitIndex = 0; unitIndex < data[dkey].length; unitIndex++ )
						if ( data[dkey][unitIndex] ) {
							unitKey = dkey + "_" + unitIndex;
							iValue  = demuxOne(unitIndex, dkey, tweenable[unitKey], fkey, data, box);
							if ( y && iValue[0] === '-' )
								iValue = " - " + iValue.substr(1);
							else if ( y )
								iValue = " + " + iValue;
							value += iValue;
							y++;
						}
					
					if ( y > 1 )
						value = "calc(" + value + ")";
					
				}
				tmpValue[fkey] = (value || 0);
			}
		shadows.push(tmpValue);
	}
	
	target[key] = cssShadowParser.stringify(shadows);
	//console.log(key, shadows, target[key]);
	
}

export function muxOne( key, baseKey, value, target, data, initials, noPropLock, seenUnits ) {
	
	let match   = is.string(value) ? value.match(unitsRe) : false,
	    unit    = match && match[2] || defaultUnits[baseKey] || "px",
	    unitKey = units.indexOf(unit),
	    realKey = unitKey !== -1 && (key + '_' + unitKey) || key;
	
	initials[realKey]  = 0;
	data[key][unitKey] = data[key][unitKey] || 0;
	//console.log(key, ':', data[key][unitKey], value, noPropLock)
	
	if ( seenUnits && seenUnits[unitKey] ) {
		//console.warn(key, ':', data[key][unitKey], value, noPropLock)
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
	let ti = 0, shadowMap, tFnKey, baseData, fValue, dkey, u, seenUnits;
	for ( ; ti < value.length; ti++ ) {
		shadowMap = value[ti];
		if ( is.string(shadowMap) )
			shadowMap = cssShadowParser.parse(shadowMap)[0];
		baseData = reOrder ? {} : { ...(data[key][ti] || {}) };
		for ( tFnKey in shadowMap ) {
			if ( shadowMap.hasOwnProperty(tFnKey) ) {
				fValue = shadowMap[tFnKey];
				dkey   = key + '_' + ti + '_' + tFnKey;
				
				baseData[tFnKey] = baseData[tFnKey] || data[key][ti] && data[key][ti][tFnKey] || 0;
				!noPropLock && baseData[tFnKey]++;
				if ( defaultMuxers[tFnKey] ) {
					defaultMuxers[tFnKey].mux(dkey, fValue, target, data, initials, noPropLock, reOrder);
				}
				else {
					
					seenUnits = {};
					
					
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