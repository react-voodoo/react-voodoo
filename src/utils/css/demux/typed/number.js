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
import {floatCut, units, unitsRe} from "../../cssUtils";

const defaultUnits    = {
	      left       : 'px',
	      right      : 'px',
	      top        : 'px',
	      bottom     : 'px',
	      width      : 'px',
	      height     : 'px',
	      perspective: 'px',
      },
      defaultBox      = {
	      left  : 'x',
	      right : 'x',
	      top   : 'y',
	      bottom: 'y',
	      width : 'x',
	      height: 'y',
      }, defaultValue = {
	      opacity: 1
      };

function demuxOne( key, twVal, baseKey, data, box ) {
	let value = twVal,
	    unit  = data[baseKey][key] || defaultUnits[baseKey] || "px";
	
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
	return unit ? floatCut(value) + unit : floatCut(value);
}

function demux( key, tweenable, target, data, box, baseKey ) {
	let value, i = 0;
	
	value = "";
	
	for ( let rKey in data[key] )
		if ( data[key].hasOwnProperty(rKey) ) {
			if ( tweenable[rKey] < 0 )
				value += (i ? " - " : "-") + demuxOne(rKey, -tweenable[rKey], baseKey || key, data, box);
			else
				value += (i ? " + " : "") + demuxOne(rKey, tweenable[rKey], baseKey || key, data, box);
			i++;
		}
	if ( i > 1 )
		value = "calc(" + value + ")";
	
	return target ? target[key] = value : value;
}

function muxer( key, value, target, data, initials, forceUnits ) {
	
	data[key] = data[key] || {};
	if ( is.array(value) ) {
		for ( let i = 0; i < value.length; i++ ) {
			
			muxOne(key, value[i] || 0, target, data, initials, forceUnits)
		}
	}
	else {
		muxOne(key, value || 0, target, data, initials, forceUnits)
	}
	
	return demux;
}

function muxOne( key, value, target, data, initials, forceUnits ) {
	
	
	let match   = is.string(value) ? value.match(unitsRe) : false,
	    unit    = match && match[2] || defaultUnits[key],
	    unitKey = units.indexOf(unit),
	    realKey = unitKey !== -1 && (key + '_' + unitKey) || key;
	
	initials[realKey]  = defaultValue[key] || 0;
	data[key][realKey] = unit;
	
	if ( match ) {
		target[realKey] = parseFloat(match[1]);
	}
	else {
		target[realKey] = parseFloat(value);
	}
	
	return demux;
};
muxer.demux    = demux;
muxer.demuxOne = demuxOne;
export default muxer;