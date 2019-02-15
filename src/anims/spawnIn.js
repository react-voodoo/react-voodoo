
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
export default function ( target ) {
    // dir = dir || 'top';


    return {
        reset : true,
        initial : {

            [target] : {
                opacity : 0,
                _z : -.3,
                rotateY : -180
            }
        },
        anims   : [
            {
                type     : "Tween",
                target   : target,
                from     : 0,
                duration : 750,
                easeFn   : easingFn.easeInOutBack,
                apply    : {
                    _z    : .3,
                    opacity : 1
                }
            },
            {
                type     : "Tween",
                target   : target,
                from     : 0,
                duration : 500,
                apply    : {
                    rotateY : 180
                }
            }
        ]
    };
};
