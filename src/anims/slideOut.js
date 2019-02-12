
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

var easingFn       = require('Comp/utils/easingFn');
var keys = {
    top : '_y',
    bot : '_y',
    right : '_x',
    left : '_x'
}, dirs = {
    top : -1,
    bot : 1,
    right : -1,
    left : 1
};
export default function ( dir, target ) {
    dir = dir || 'top';

    return {
        initial : {
            // [target] : {
            //     [keys[dir]] : -1 * dirs[dir],
            //     opacity       : -1
            // }
        },
        anims   : [
            {
                type     : "Tween",
                target   : target,
                from     : 0,
                duration : 1000,
                easeFn   : easingFn.easeInOutBack,
                apply    : {
                    [keys[dir]] : dirs[dir]
                }
            },
            {
                type     : "Tween",
                target   : target,
                from     : 0,
                duration : 300,
                apply    : {
                    opacity : -1
                }
            },
            {
                type     : "Tween",
                target   : target,
                from     : 1000,
                duration : 1000,
                apply    : {
                    [keys[dir]] : -1 * dirs[dir]
                }
            }
        ]
    };
};
