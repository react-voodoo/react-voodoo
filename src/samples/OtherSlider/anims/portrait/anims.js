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
import {tweenTools} from "react-voodoo";

export const visibleItems = 7;
let margin                = "5px",
    area                  = "60vh",
    itemHeight            = tweenTools.cssAdd(tweenTools.cssMult(area, 1 / (visibleItems))),
    step                  = tweenTools.cssMult(itemHeight, 1),
    zMax                  = tweenTools.cssMult(area, 1.45),
    angle                 = "27.5deg";


export const enteringSteps = 5;
export const leavingSteps  = 5;
//export const defaultIndex  = 2;
export const infinite      = true;

export const scrollDir = "scrollY";

export const defaultInitial  = {
	position       : "absolute",
	overflow       : "hidden",
	transformOrigin: "50% 50%",
	width          : "100%",
	height         : itemHeight,
	top            : tweenTools.cssAdd(area, tweenTools.cssMult(step, -1), "10vh"),
	left           : "0%",
	zIndex         : 500,
	//opacity  : 0,
	transform      : [
		{
			perspective: zMax,
			translateZ : "-" + zMax
		},
		{
			rotateX: "-" + angle,
		},
		{
			translateZ: zMax,
		}]
};
export const scrollAxis      = [
	{
		from    : 0,
		duration: 100,
		apply   : {
			top: "-" + area,
		}
	},
];
export const defaultEntering = [
	{
		from    : 100 - (100 / enteringSteps),
		duration: 100 / enteringSteps,
		apply   : {
			zIndex: 500,
			top   : step,
		}
	},
	{
		from    : 0,
		duration: 100,
		apply   : {
			zIndex: 500,
			
			transform: [
				{},
				{
					rotateX: angle,
				},
				{}]
		}
	},
];
export const defaultLeaving  = [
	       {
		       from    : 0,
		       duration: 100,
		       apply   : {
			       zIndex   : -500,
			       transform: [
				       {},
				       {
					       rotateX: angle,
				       }]
		       }
	       }
       ]
;
//export default {
//	defaultLeaving,
//	defaultEntering,
//	defaultInitial,
//	scrollY
//}