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

import is from "is";

export const re_cssValueWithUnit = new RegExp(
	"([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" +
	['box', 'bz', 'bh', 'bw', 'em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|')
	+ ")"
);

/**
 * add any css val with it unit ( todo: optims&use objects for multi unit
 * @param val1
 * @param val2
 * @returns {Array}
 */
export function cssAdd( val1, val2, ...argz ) {
	if ( !is.array(val1) )
		val1 = [val1];
	if ( !is.array(val2) )
		val2 = [val2];
	
	let units1             = val1.map(v => (v && v.match && v.match(re_cssValueWithUnit) || [, v || 0, 'px'])),
	    units2             = val2.map(v => (v && v.match && v.match(re_cssValueWithUnit) || [, v || 0, 'px'])),
	    remap = {}, result = [], i;
	
	i = 0;
	while ( i < units1.length ) {
		remap[units1[i][2]] = remap[units1[i][2]] || 0;
		remap[units1[i][2]] += parseFloat(units1[i][1]);
		i++;
	}
	i = 0;
	while ( i < units2.length ) {
		remap[units2[i][2]] = remap[units2[i][2]] || 0;
		remap[units2[i][2]] += parseFloat(units2[i][1]);
		i++;
	}
	Object.keys(remap)
	      .forEach(
		      unit => (result.push(remap[unit] + unit))
	      );
	return argz.length ? cssAdd(result, ...argz) : result;
}

/**
 * Multiply any css val with it unit ( todo: optims & use objects for multi unit
 * @param val1
 * @param val2
 * @returns {Array}
 */
export function cssMult( val1, val ) {
	if ( !is.array(val1) )
		val1 = [val1];
	
	let units1             = val1.map(v => (v && v.match && v.match(re_cssValueWithUnit) || [, v || 0, 'px'])),
	    remap = {}, result = [], i;
	
	i = 0;
	while ( i < units1.length ) {
		remap[units1[i][2]] = remap[units1[i][2]] || 1;
		remap[units1[i][2]] = parseFloat(units1[i][1]) * val;
		i++;
	}
	Object.keys(remap)
	      .forEach(
		      unit => (result.push(remap[unit] + unit))
	      );
	return result;
}

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

export function scale( items, duration = 0, withOffset ) {
	items = is.array(items) ? items : items && [items] || items;
	
	// get items current duration
	let iDuration = 0;
	items.forEach(
		item => {
			iDuration = Math.max(iDuration, item.from + item.duration)
		}
	)
	
	items = items.map(
		item => (
			{
				...item,
				from    : (item.from / iDuration) * duration,
				duration: (item.duration / iDuration) * duration
			}
		)
	)
	return withOffset ? offset(items, withOffset) : items
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
					from: iDuration - (item.from + item.duration),
					...(item.apply ? { apply: inverseValues(item.apply) } : undefined)
				};
			return item;
		}
	)
}

const MultiCssProps = { "transform": true, "filter": true, "textShadow": true, "boxShadow": true }

export function addCss( target, ...sources ) {
	let source = sources.shift();
	
	for ( const key in source ) {
		if ( !source.hasOwnProperty(key) )
			continue;
		
		if ( MultiCssProps[key] ) {
			if ( !target[key] ) {
				target[key] = [];
			}
			if ( !is.array(source[key]) ) {
				addCss(target[key], [source[key]]);
			}
			else addCss(target[key], source[key]);
		}
		else {
			// adding units
			if ( is.array(source[key]) ) {
				if ( !target[key] ) {
					target[key] = [];
				}
				if ( !is.array(target[key]) ) {
					target[key] = [...source[key], target[key]];
				}
				else target[key].push(...source[key]);
			}
			else {
				if ( !target[key] ) {
					if ( !is.object(source[key]) ) {
						target[key] = source[key];
					}
					else {
						target[key] = { ...source[key] };
					}
				}
				else if ( is.object(target[key]) && is.object(source[key]) ) {
					addCss(target[key], source[key]);
				}
				else {
					//else target[key].push(...source[key]);
					target[key] = addAllType(target[key], source[key])
					//console.log(key, target[key])
				}
			}
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