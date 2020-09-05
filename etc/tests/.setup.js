/*
 *   The MIT License (MIT)
 *   Copyright (c) 2020. Nathanael Braun
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

const Browser = require('zombie');
const browser = new Browser();

import Enzyme  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React   from 'react';

module.exports = function () {
	return browser.load('<!doctype html><html><body></body></html>')
	              .then(
		              e => {
			              Enzyme.configure({ adapter: new Adapter() });
			              let window = browser.window;
			              window.requestAnimationFrame = setTimeout;
			              window.cancelAnimationFrame  = clearTimeout;
			              global.window    = window;
			              global.document  = window.document;
			              global.navigator = {
				              userAgent: 'node.js',
			              };
			              copyProps(window, global);
		              }
	              )
}

function copyProps( src, target ) {
	const props = Object.getOwnPropertyNames(src)
	                    .filter(prop => typeof target[prop] === 'undefined')
	                    .reduce(( result, prop ) => ({
		                    ...result,
		                    [prop]: Object.getOwnPropertyDescriptor(src, prop),
	                    }), {});
	Object.defineProperties(target, props);
}