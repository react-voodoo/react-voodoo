/*
 *
 * Copyright (C) 2019 Nathan Braun
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

var anims = function ( id, target, ...argz ) {
	if ( is.array(id) ) {
		var p = id.slice();
		id    = p.shift();
		p.unshift(target);
		return anims[id].apply(this, p)
	}
	else if ( is.string(id) )
		return anims[id].call(this, target, ...argz);
	else
		return id;
	
};

function requireAll( r ) {
	r.keys().forEach(( k, i ) => {
		var _k = k.match(/([^\/]+)\.js$/);
		if ( _k[1] != 'index' )
			anims[_k[1]] = anims[_k[1]] || r(k, i)
	});
}

requireAll(require.context('./anims/', true, /([^\/]+)\.js$/));

export default anims;
