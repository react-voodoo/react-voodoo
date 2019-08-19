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

//const { JSDOM } = require('jsdom');
//const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
//const { window } = jsdom;
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