/*
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

import is from "is";

const
	units           = ['box', 'em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'],
	unitsRe         = new RegExp(
		"([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" +
		units.join('|')
		+ ")"
	),
	floatCut        = ( v = 0 ) => v.toFixed(3),
	defaultUnits    = {
		left  : 'px',
		right : 'px',
		top   : 'px',
		bottom: 'px',
		width : 'px',
		height: 'px',
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
	    unit  = data[baseKey][key] || defaultUnits[baseKey];
	
	if ( unit === 'box' ) {
		value = value * (box[defaultBox[baseKey]] || box.x);
		unit  = 'px';
		
	}
	//if ( Math.abs(value) < .0001 && value !== 0 )
	//	debugger
	return unit ? floatCut(value) + unit : floatCut(value);
}

function demux( key, tweenable, target, data, box ) {
	let value, i = 0;
	
	value = "";
	
	for ( let rKey in data[key] )
		if ( data[key].hasOwnProperty(rKey) ) {
			if ( tweenable[rKey] < 0 )
				value += (i ? " - " : "-") + demuxOne(rKey, -tweenable[rKey], key, data, box);
			else
				value += (i ? " + " : "") + demuxOne(rKey, tweenable[rKey], key, data, box);
			i++;
		}
	if ( i > 1 )
		value = "calc(" + value + ")";
	
	return target[key] = value;
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
muxer.demux = demux;
export default muxer;