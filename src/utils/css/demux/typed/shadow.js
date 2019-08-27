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

import cssShadowParser from "css-box-shadow";
import is              from "is";
import {color, number} from "./(*).js";

const
	defaultUnits = {
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
	};
const swap       = {};

export function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
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
		console.log("wtf", path)
	//}
}
export function demux( key, tweenable, target, data, box ) {
	//if ( data["filter_head"] === key ) {
	let shadows = [];
	data[key].forEach(
		( shadowData, i ) => {
			let shadowObj = {
				inset       : shadowData.inset,
				color       : color.demux(key + '_' + i + "_color", tweenable, undefined, data, box),
				blurRadius  : number.demux(key + '_' + i + "_blurRadius", tweenable, undefined, data, box),
				offsetX     : number.demux(key + '_' + i + "_offsetX", tweenable, undefined, data, box),
				offsetY     : number.demux(key + '_' + i + "_offsetY", tweenable, undefined, data, box),
				spreadRadius: number.demux(key + '_' + i + "_spreadRadius", tweenable, undefined, data, box)
			}, fKey;
			shadows.push(shadowObj);
		}
	)
	target[key] = cssShadowParser.stringify(shadows);
}


export const mux =  ( key, value, target, data, initials, noPropLock ) => {
	
	//data[key] = data[key] || 0;
	//!noPropLock && data[key]++;
	data[key]        = data[key] || [];
	initials[key]    = 0;
	let parsedValues = value, i;
	if ( is.string(parsedValues) )
		parsedValues = cssShadowParser.parse(parsedValues);
	else if ( !is.array(parsedValues) )
		parsedValues = [parsedValues];
	
	parsedValues.forEach(
		( shadow, i ) => {
			let baseData = {}, fKey;
			
			if ( is.string(shadow) )
				shadow = cssShadowParser.parse(shadow)[0];
			if ( shadow ) {
				//color: "rgba(0, 0, 255, .2)"
				initials[key + '_' + i + "_color"] = "rgba(0,0,0,0)";
				color.mux(key + '_' + i + "_color", shadow.color || "rgba(0,0,0,0)", target, data, initials, noPropLock);
				//blurRadius: 2
				number.mux(key + '_' + i + "_blurRadius", shadow.blurRadius || 0, target, data, initials, noPropLock);
				//inset: false
				baseData.inset = shadow.inset;
				//offsetX: 12
				number.mux(key + '_' + i + "_offsetX", shadow.offsetX || 0, target, data, initials, noPropLock);
				//offsetY: 12
				number.mux(key + '_' + i + "_offsetY", shadow.offsetY || 0, target, data, initials, noPropLock);
				//spreadRadius: 1
				number.mux(key + '_' + i + "_spreadRadius", shadow.spreadRadius || 0, target, data, initials, noPropLock);
			}
			
			data[key][i] = baseData;
		}
	);
	return demux;
}