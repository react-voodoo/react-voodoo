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
	items = is.array(items) ? items : items && [items] || items;
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
	items = is.array(items) ? items : items && [items] || items;
	
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
		return Object.keys(v).reduce(( h, key ) => (h[key] = inverseValues(v[key]), h), {});
	if ( is.array(v) )
		return v.map(( item ) => (inverseValues(item)));
	
	let values = v.split(/(\-?\d+(?:\.\d+)?|\-?\.\d+)/ig);
	
	return values.map(
		( val, i ) => (i % 2 ? -parseFloat(val) : val)
	).join("");
}

export function reverse( items ) {
	items         = is.array(items) ? items : items && [items] || items;
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

export function addCss( target, ...sources ) {
	let source = sources.shift();
	for ( const key in source ) {
		if ( !source.hasOwnProperty(key) )
			continue;
		if ( is.object(source[key]) ) {
			if ( !target[key] ) {
				target[key] = {};
			}
			
			addCss(target[key], source[key]);
		}
		else if ( is.array(source[key]) ) {
			if ( !target[key] ) {
				target[key] = [];
			}
			addCss(target[key], source[key]);
		}
		else {
			target[key] = addAllType(target[key], source[key])
		}
	}
	
	return sources.length && addCss(target, ...sources) || target;
}

function addAllType( v1, v2 ) {
	if ( !v1 )
		return v2;
	if ( !v2 )
		return v1;
	let values1 = ('' + v1).split(/(\-?\d+(?:\.\d+)?|\-?\.\d+)/ig),
	    values2 = ('' + v2).split(/(\-?\d+(?:\.\d+)?|\-?\.\d+)/ig),
	    r       = values1.map(
		    ( val, i ) => (i % 2 ? parseFloat(val) + parseFloat(values2[i] || 0) : val)
	    ).filter(i => (i !== ''));
	
	return r.length === 1 ? parseInt(r[0]) : r.join("")
}

export function extractCss( items, inverse ) {
	let css = {};
	items   = is.array(items) ? items : items && [items] || items;
	items.forEach(
		item => {
			addCss(css, item.apply)
		}
	);
	if ( inverse )
		css = inverseValues(css);
	
	
	//if ( inverse && css.hasOwnProperty('opacity') )
	//	css.opacity -= 1;
	return css;
}

export function target( items, target ) {
	items = is.array(items) ? items : items && [items] || items;
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
	items = is.array(items) ? items : items && [items] || items;
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