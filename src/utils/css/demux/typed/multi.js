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