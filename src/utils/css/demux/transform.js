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

import is                         from "is";
import {floatCut, units, unitsRe} from "../cssUtils";

const defaultUnits    = {
	      //matrix     : true,
	      //translate  : 'px',
	      translateX : 'px',
	      translateY : 'px',
	      translateZ : 'px',
	      scale      : '',
	      scaleZ     : '',
	      scaleX     : '',
	      scaleY     : '',
	      rotate     : 'deg',
	      //skew       : 'deg',
	      skewX      : 'deg',
	      skewY      : 'deg',
	      //matrix3d   : true,
	      //translate3d: true,
	      //scale3d    : true,
	      //rotate3d   : true,
	      rotateX    : 'deg',
	      rotateY    : 'deg',
	      rotateZ    : 'deg',
	      perspective: 'px',
      },
      defaultBox      = {
	      translateX: 'x',
	      translateY: 'y',
	      translateZ: 'z',
	      rotateX   : 'x',
	      rotateY   : 'y',
	      rotateZ   : 'z',
	      left      : 'x',
	      right     : 'x',
	      top       : 'y',
	      bottom    : 'y',
	      width     : 'x',
	      height    : 'y',
      }, defaultValue = {
	      //skew  : 1,
	      //skewX : 1,
	      //skewY : 1,
	      scale : 1,
	      scaleX: 1,
	      scaleY: 1,
	      scaleZ: 1
      };

export function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	let path = twKey.split('_'), tmpKey;// not optimal at all
	if ( path.length === 4 ) {
		//console.warn("dec", twKey, dataMap[path[0]][path[1]][path[2]])
		// dec count on transform
		if ( !--dataMap[path[0]][path[1]][path[2]] && !keepValues ) {
			delete dataMap[path[0]][path[1]][path[2]];
		}
		//if ( Object.keys(dataMap[path[0]][path[1]]).length === 0 && !keepValues )
		//	delete dataMap[path[0]][path[1]];
		
		// free transform layers
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
	let transforms                                                 = "",
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
					transforms += fkey + "(" + (value || "0") + ") ";
			}
	}
	target.transform = transforms;
	
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