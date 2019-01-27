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
