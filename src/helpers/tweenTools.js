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