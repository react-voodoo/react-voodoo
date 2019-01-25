
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
 *  @contact : caipilabs@gmail.com
 */

var easingFn = require('App/utils/easingFn');
var keys     = {
    top   : '_y',
    bot   : '_y',
    right : '_x',
    left  : '_x'
}, dirs      = {
    top   : -1,
    bot   : 1,
    right : -1,
    left  : 1
};
export default function ( target, dir ) {
    dir = dir || 'right';


    return {
        initial : {
            // [target] : {
            //     [keys[dir]] : -1 * dirs[dir],
            //     alpha       : -1
            // }
        },
        anims   : [
            {
                type     : "Tween",
                target   : target,
                from     : 0,
                duration : 400,
                easeFn   : easingFn.easeOutSine,
                apply    : {
                    _z : .06,
                    rotateY : -25,
                    rotateX : 25
                }
            },
            {
                type     : "Tween",
                target   : target,
                from     : 100,
                duration : 900,
                easeFn   : easingFn.easeOutSine,
                apply    : {
                    [keys[dir]] : dirs[dir]
                }
            },
            {
                type     : "Tween",
                target   : target,
                from     : 100,
                duration : 900,
                easeFn   : easingFn.easeInSine,
                apply    : {
                    y : -300
                }
            },
            {
                type     : "Tween",
                target   : target,
                from     : 400,
                duration : 600,
                easeFn   : easingFn.easeInSine,
                apply    : {
                    _z      : .12,
                    rotateY : -20,
                    rotateX : 20,
                    // rotate : -50
                }
            },
            {
                type     : "Tween",
                target   : target,
                from     : 400,
                duration : 500,
                apply    : {
                    alpha : -1
                }
            }
        ]
    };
};
