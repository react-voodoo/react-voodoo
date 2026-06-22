/*
 * @author : Nathanael BRAUN <pp9ping@gmail.com>
 *
 * Copyright 2026 Nathanael BRAUN
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import is                         from "is";
import {floatCut, units, unitsRe} from "../cssUtils";

/**
 * Transform demuxer — the most complex CSS property handler in the library.
 *
 * CSS `transform` is represented as an *array of layer objects*, enabling additive
 * multi-layer composition. Each layer is an object whose keys are transform
 * functions (translateX, rotate, etc.) and whose values are either a single CSS
 * value or a multi-unit array. The key hierarchy encoded in tweenRefMaps is:
 *   `transform_<layerIdx>_<fnKey>_<unitIdx>`
 *
 * Example: `transform_0_translateX_9` = layer 0, translateX function, index 9 ('px').
 *
 * Reference counting (stored in `data[key]` and `data[dkey]`) prevents premature
 * deletion of shared slots when multiple tween descriptors animate the same property.
 * When all consumers have released a slot the numeric entry is removed from
 * tweenRefMaps and the layer may be trimmed from the data array.
 *
 * The mux pass reconstructs CSS `transform` strings by iterating layers → functions
 * → units, joining multi-unit values with CSS `calc()` expressions.
 */

const defaultUnits    = {
	      //matrix     : true,
	      //translate  : 'px',
	      translateX: 'px',
	      translateY: 'px',
	      translateZ: 'px',
	      scale     : '',
	      scaleZ    : '',
	      scaleX    : '',
	      scaleY    : '',
	      rotate    : 'deg',
	      //skew       : 'deg',
	      skewX: 'deg',
	      skewY: 'deg',
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

/**
 * Release a single numeric slot referenced by the 4-part key `twKey`.
 *
 * The 4 segments of `twKey` are: [property, layerIdx, fnKey, unitIdx].
 * Two separate ref-count decrements are performed:
 *   1. `dataMap[path[0]][layerIdx][fnKey]` — the per-function ref count within the layer
 *   2. `dataMap[dkey][unitIdx]`            — the per-unit ref count within the function
 *
 * When both reach zero (and keepValues is false) the corresponding entries are
 * deleted from dataMap, tweenableMap, and — if the entire property has no more
 * active slots — from muxerMap and cssMap as well. Empty trailing layer entries are
 * trimmed from the data arrays to keep memory usage proportional to active content.
 */
export function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	let path = twKey.split('_'), tmpKey;
	if ( path.length === 4 ) {
		// Decrement the per-function ref count at the layer level.
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
		console.warn("[react-voodoo] transform.release: unexpected key format (expected 4 segments):", path)
	}
}

/**
 * Convert a single numeric slot value to a CSS unit string.
 *
 * Box-relative units (bw, bh, bz) are resolved here against the current viewport
 * box dimensions (`box.x`, `box.y`, `box.z`) and converted to `px`. This means
 * animations that use `bw` units automatically adapt to viewport resize events
 * because `demuxOne` is called fresh on every mux pass.
 */
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
	if ( unit === 'bh' ) {
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

/**
 * Mux pass for transform — iterates all active layers and their functions, assembles
 * each function's value (calling demuxOne per unit and joining with CSS calc() for
 * multi-unit values), and concatenates the complete transform string.
 * Empty layers (no active functions) are skipped silently.
 */
export function demux( key, tweenable, target, data, box ) {
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

/**
 * Register one unit value for a specific transform function key. Increments the
 * per-unit ref count in `data[key]` (unless `noPropLock` is set, which is used
 * during the prop-lock initialisation pass where counts are managed by the outer
 * `mux()` loop instead). Handles the `seenUnits` guard to accumulate values when
 * the same unit appears multiple times in a multi-value array.
 */
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
/**
 * Demux pass (parse time) for transform — iterates the array of layer objects,
 * registers each transform function's values via `muxOne`, and maintains the
 * per-layer ref-count structure in `data[key]`. The `reOrder` flag is used when
 * re-registering an existing timeline to merge new layer data without discarding
 * previously registered function entries.
 */
export const mux = ( key, value, target, data, initials, noPropLock, reOrder ) => {

	data[key] = data[key] || [];

	if ( !is.array(value) && !is.object(value) ) {
		console.warn("[react-voodoo] transform.mux: unexpected value for '", key, "':", value);
		return demux;
	}
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
