
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

var easingFn = require('Comp/utils/easingFn');
export default function ( dir, target ) {
    dir = dir || 'top';


    return {
        initial : {
        },
        anims   : [
            {
                type     : "Tween",
                target   : target,
                from     : 0,
                duration : 300,
                easeFn   : easingFn.easeOutSine,
                apply    : {
                    _z : -.1
                }
            },
            {
                type     : "Tween",
                target   : target,
                from     : 300,
                duration : 700,
                easeFn   : easingFn.easeOutBack,
                apply    : {
                    _z : .1
                }
            }
        ]
    };
};
