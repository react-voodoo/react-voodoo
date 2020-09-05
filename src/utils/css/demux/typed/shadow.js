/*
 *   The MIT License (MIT)
 *   Copyright (c) 2020. Nathanael Braun
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import is                         from "is";
import {floatCut, units, unitsRe} from "../../cssUtils";
import {bool, color}              from "./(*).js";


const cssShadowParser = (() => {
	const VALUES_REG = /,(?![^\(]*\))/
	const PARTS_REG  = /\s(?![^(]*\))/
	const LENGTH_REG = /^[0-9]+[a-zA-Z%]+?$/
	
	const parseValue = str => {
		const parts = str.split(PARTS_REG)
		const inset = parts.includes('inset')
		const last  = parts.slice(-1)[0]
		const color = !isLength(last) ? last : undefined
		
		const nums                                         = parts
			.filter(n => n !== 'inset')
			.filter(n => n !== color)
			.map(toNum)
		const [offsetX, offsetY, blurRadius, spreadRadius] = nums
		
		return {
			inset,
			offsetX,
			offsetY,
			blurRadius,
			spreadRadius,
			color
		}
	}
	
	const stringifyValue = obj => {
		const {
			      inset,
			      offsetX    = 0,
			      offsetY    = 0,
			      blurRadius = 0,
			      spreadRadius,
			      color
		      } = obj || {}
		
		return [
			(inset ? 'inset' : null),
			offsetX,
			offsetY,
			blurRadius,
			spreadRadius,
			color
		].filter(v => v !== null && v !== undefined)
		 .map(toPx)
		 .map(s => ('' + s).trim())
		 .join(' ')
	}
	
	const isLength = v => v === '0' || LENGTH_REG.test(v)
	const toNum    = v => {
		if ( !/px$/.test(v) && v !== '0' ) return v
		const n = parseFloat(v)
		return !isNaN(n) ? n : v
	}
	const toPx     = n => typeof n === 'number' && n !== 0 ? (n + 'px') : n
	
	const parse     = str => str.split(VALUES_REG).map(s => s.trim()).map(parseValue)
	const stringify = arr => arr.map(stringifyValue).join(', ')
	
	return {
		parse,
		stringify
	}
})()


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