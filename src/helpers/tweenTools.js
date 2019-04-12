/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */

import is from "is";

export function offset( items, start = 0 ) {
	return items.map(
		item => (
			{
				...item,
				from: item.from + start
			}
		)
	)
}

export function scale( items, duration = 0 ) {
	
	// get items current duration
	let iDuration = 0;
	items.forEach(
		item => {
			iDuration = Math.max(iDuration, item.from + item.duration)
		}
	)
	
	return items.map(
		item => (
			{
				...item,
				from    : (item.from / iDuration) * duration,
				duration: (item.duration / iDuration) * duration
			}
		)
	)
}

function inverseValues( v ) {
	if ( is.number(v) )
		return -v;
	if ( is.object(v) )
		return Object.fromEntries(Object.entries(v).map(( [key, v] ) => ([key, inverseValues(v)])));
	if ( is.array(v) )
		return v.map(( item ) => (inverseValues(item)));
	
	let values = v.split(/(\-?\d+(?:\.\d+)?|\-?\.\d+)/ig);
	
	return values.map(
		( val, i ) => (i % 2 ? -parseFloat(val) : val)
	).join("");
}

export function reverse( items ) {
	
	// get items current duration
	let iDuration = 0;
	items.forEach(
		item => {
			iDuration = Math.max(iDuration, item.from + item.duration)
		}
	)
	
	return items.map(
		item => {
			item =
				{
					...item,
					from : iDuration - (item.from + item.duration),
					apply: inverseValues(item.apply)
				};
			return item;
		}
	)
}

export function target( items, target ) {
	return items.map(
		item => (
			{
				...item,
				target
			}
		)
	)
}

export function shiftTransforms( items, shift = 1 ) {
	return items.map(
		item => {
			let t = item.apply && item.apply.transform;
			if ( t ) {
				t = is.array(t) ? t : [t];
				for ( let i = 0; i < shift; i++ )
					t.unshift({});
				
				item = { ...item, apply: { ...item.apply, transform: t } };
			}
			return item;
		}
	)
}