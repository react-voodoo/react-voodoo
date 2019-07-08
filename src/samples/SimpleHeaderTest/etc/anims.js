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
export const initialPage   = {
	width    : "100%",
	transform: {
		translateY: "250px"
	},
};
export const initialFooter = {
	position : "fixed",
	left     : "0%",
	right    : "0%",
	bottom   : "0px",
	height   : "50px",
	transform: {
		translateY: "50px"
	},
};

export function pushIn( target ) {
	return {
		anims: [
			{
				type    : "Tween",
				target  : target,
				from    : 0,
				duration: 500,
				easeFn  : "easeCircleIn",
				apply   : {
					transform: {
						translateZ: "-.2box"
					},
					filter   : {
						sepia: 100
					}
				}
			},
			{
				type    : "Tween",
				target  : target,
				from    : 500,
				duration: 500,
				easeFn  : "easeCircleIn",
				apply   : {
					transform: {
						translateZ: ".2box"
					},
					filter   : {
						sepia: -100
					}
				}
			},
			{
				type    : "Tween",
				target  : target,
				from    : 250,
				duration: 500,
				easeFn  : "easeCircle",
				apply   : {
					transform: {
						rotateY: 180,
					},
				}
			}
		]
	};
};
export const scrollY = [
	{
		target  : "body",
		from    : 0,
		duration: 50,
		apply   : {
			//paddingTop: -130,
			transform: {
				translateY: "-130px"
			}
		}
	},
	{
		target  : "header",
		from    : 0,
		duration: 50,
		apply   : {
			height: "-130px",
		}
	},
	{
		target  : "logo",
		from    : 0,
		duration: 50,
		apply   : {
			left      : "-50%",
			height    : "-50px",
			marginLeft: "110px",
		}
	},
	
	{
		type    : "Tween",
		target  : "body",
		from    : 50,
		duration: 50,
		//easeFn  : "easePolyOut",
		apply   : {
			//paddingTop   : -50,
			//marginBottom: "50px",
			transform: {
				translateY: "-170px"
			}
		}
	},
	{
		type    : "Tween",
		target  : "footer",
		from    : 50,
		duration: 50,
		//easeFn  : "easePolyOut",
		apply   : {
			transform: {
				translateY: "-50px"
			}
		}
	},
	{
		type    : "Tween",
		target  : "header",
		from    : 50,
		duration: 50,
		apply   : {
			height: -50,
		}
	},
	{
		type    : "Tween",
		target  : "logo",
		from    : 50,
		duration: 50,
		apply   : {
			bottom: -50
		}
	},
];