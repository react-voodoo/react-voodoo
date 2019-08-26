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
import {tweenTools} from "react-voodoo";

export const visibleItems = 2;
let area                  = ".8bw",
    itemWidth             = tweenTools.cssMult(area, 1 / (visibleItems)),
    step                  = tweenTools.cssMult(itemWidth, 1),
    zMax                  = tweenTools.cssMult(area, 1.75),
    angle                 = "20deg";


export const enteringSteps = 1;
export const leavingSteps  = 1;
//export const infinite      = true;

export const scrollDir = "scrollX";

export const defaultInitial  = {
	position       : "absolute",
	overflow       : "hidden",
	transformOrigin: "50% 50%",
	height         : "100%",
	width          : itemWidth,
	left           : tweenTools.cssAdd(area, ".1bw", tweenTools.cssMult(itemWidth, -1)),
	top            : "0%",
	zIndex         : 500,
	transform      : [
		{
			perspective: zMax,
			translateZ : "-" + zMax
		},
		{
			rotateY: angle,
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
			left: "-" + area,
		}
	},
];
export const defaultEntering = [
	{
		from    : 100 - (100 / enteringSteps),
		duration: 100 / enteringSteps,
		apply   : {
			zIndex: 500,
			left  : step,
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
					rotateY: "-" + angle,
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
					       rotateY: "-" + angle,
				       }]
		       }
	       }
       ]
;