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

function demuxOne( key, dkey, twVal, baseKey, data, box ) {
	let value = twVal,
	    unit  = data[dkey][key] || defaultUnits[baseKey];
	
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
	//if ( Math.abs(value) < .0001 && value !== 0 )
	return unit ? floatCut(value) + unit : floatCut(value);
}

function demux( key, tweenable, target, data, box ) {
	
	if ( data["transform_head"] === key ) {
		let transforms = "",
		    tmpValue   = {};
		data[key].forEach(
			( tmap = {}, i ) => Object.keys(tmap).forEach(
				fkey => {
					let dkey     = key + '_' + fkey + '_' + i;
					let value, y = 0;
					
					value = "";
					
					for ( let rKey in data[dkey] )
						if ( data[dkey].hasOwnProperty(rKey) ) {
							if ( tweenable[dkey] < 0 )
								value += (y ? " - " : "-") + demuxOne(rKey, dkey, -tweenable[rKey], fkey, data, box);
							else
								value += (y ? " + " : "") + demuxOne(rKey, dkey, tweenable[rKey], fkey, data, box);
							y++;
						}
					if ( y > 1 )
						value = "calc(" + value + ")";
					transforms += fkey + "(" + value + ") ";
					
					
				}
			)
		)
		target.transform = transforms;
	}
	
}

function muxOne( key, baseKey, value, target, data, initials, forceUnits ) {
	
	let match   = is.string(value) ? value.match(unitsRe) : false,
	    unit    = match && match[2] || defaultUnits[key],
	    unitKey = units.indexOf(unit),
	    realKey = unitKey !== -1 && (key + '_' + unitKey) || key;
	
	initials[realKey] = defaultValue[baseKey] || 0;
	
	data[key][realKey] = unit;
	
	if ( match ) {
		target[realKey] = parseFloat(match[1]);
	}
	else {
		target[realKey] = parseFloat(value);
	}
	
	return demux;
};
export default ( key, value, target, data, initials, forceUnits, reset ) => {
	
	data["transform_head"] = data["transform_head"] || key;
	data[key]              = data[key] || [{}];
	initials[key]          = 0;
	
	if ( !is.array(value) )
		value = [value];
	
	value.forEach(
		( tmap, i ) => {
			let baseData = {};
			tmap && Object.keys(tmap).forEach(
				fkey => {
					let fValue = tmap[fkey],
					    dkey   = key + '_' + fkey + '_' + i;
					
					baseData[fkey] = true;
					
					data[dkey] = data[dkey] || {};
					if ( is.array(fValue) ) {
						for ( let u = 0; u < fValue.length; u++ ) {
							muxOne(dkey, fkey, fValue[u] || 0, target, data, initials, forceUnits)
						}
					}
					else {
						muxOne(dkey, fkey, fValue || 0, target, data, initials, forceUnits)
					}
				}
			)
			data[key][i] =
				forceUnits
				? { ...baseData, ...(data[key][i] || {}) }
				: { ...(data[key][i] || {}), ...baseData };
		}
	)
	return demux;
}