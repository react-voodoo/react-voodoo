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
require('webpack-inherit').loadModulePath()

var express      = require("express"),
    path         = require("path"),
    App          = require('./dist/App.server').default,
    fs           = require("fs"),
    server       = express(),
    currentState = null,
    http         = require('http').Server(server),
    argz         = require('minimist')(process.argv.slice(2));

server.use(express.json());       // to support JSON-encoded bodies
server.use(express.urlencoded()); // to support URL-encoded bodies

server.get(
	'/',
	function ( req, res, next ) {
		App.renderSSR(
			{
				url  : req.url,
				state: currentState
			},
			( err, html, nstate ) => {
				if ( nstate )
					currentState = nstate;
				!err ?
				res.send(200, html)
				     :
				res.send(500, err + '')
			}
		)
	}
);

server.post('/', function ( req, res, next ) {
	console.log("New state pushed")
	currentState = req.body;
	res.send(200, 'ok')
});

server.use(express.static('./dist'))

var server_instance = http.listen(parseInt(argz.p || argz.port || 8000), function () {
	console.warn('Running on ', server_instance.address().port)
});