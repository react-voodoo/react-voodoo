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

import rgba from "color-rgba";

function demux( key, tweenable, target, data ) {
	target[key] = "rgba(" + tweenable[key + '_r'] + ", " + tweenable[key + '_g'] + ", " + tweenable[key + '_b'] + ", " + tweenable[key + '_a'] + ")";
}

export default ( key, value, target, data, initials ) => {
	let vect           = rgba(value);
	target[key + '_r'] = vect[0];
	target[key + '_g'] = vect[1];
	target[key + '_b'] = vect[2];
	target[key + '_a'] = vect[3];
	
	initials[key + '_r'] = 0;
	initials[key + '_g'] = 0;
	initials[key + '_b'] = 0;
	initials[key + '_a'] = 1;
	
	return demux;
}