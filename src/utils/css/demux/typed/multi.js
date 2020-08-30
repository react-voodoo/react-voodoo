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

import is          from "is";
import * as number from "./number";

const
	alias = {
		top   : '0%',
		bottom: '100%',
		center: '50%',
		left  : '0%',
		right : '100%'
	};

function demux( key, tweenable, target, data, box, offset ) {
	
	let count = data["_" + key], v = '', nowhere = {};
	
	for ( let i = 0; i < count; i++ ) {
		number.demux(key + '_' + i, tweenable, nowhere, data, box, offset);
		v += nowhere[key + '_' + i] + ' ';
	}
	
	target[key] = v;
}


function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	let path = twKey.split('_'), tmpKey;// not optimal at all
	
	//if ( path.length === 2 ) {
	//	console.log("dec", twKey, dataMap[path[0]][path[1]])
	//	if ( !--dataMap[path[0]][path[1]] && !keepValues ) {
	//		delete tweenableMap[twKey];
	//		delete dataMap[path[0]][path[1]];
	//	}
	//
	//	if ( !keepValues )
	//		while ( dataMap[path[0]].length && !dataMap[path[0]][dataMap[path[0]].length - 1] )
	//			dataMap[path[0]].pop();
	//
	//	if ( dataMap[path[0]].length === 0 && !keepValues ) {
	//		delete dataMap[path[0]];
	//		delete muxerMap[path[0]];
	//		delete cssMap[path[0]];
	//		console.log("delete", path[0])
	//	}
	//}
	//else {
	//console.log("wtf", path)
	//}
}

export default ( count ) => ({
	mux: ( key, value, target, data, initials, noPropLock ) => {
		let values = value.split(' '), v;
		
		data[key] = data[key] || 0;
		noPropLock && data[key]++;
		data["_" + key] = count;
		
		for ( let i = 0; i < count; i++ ) {
			v = values[i % values.length];
			v = is.string(v) && alias[v] || v;
			number.mux(key + '_' + i, v, target, data, initials, noPropLock)
		}
		
		return demux;
	}, demux, release
})