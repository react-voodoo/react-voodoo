
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