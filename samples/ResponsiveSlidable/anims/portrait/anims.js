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
let area                  = "60vh",
    itemHeight            = tweenTools.cssAdd(tweenTools.cssMult(area, 1 / (visibleItems))),
    step                  = tweenTools.cssMult(itemHeight, 1),
    zMax                  = tweenTools.cssMult(area, 2.05),
    angle                 = "27.5deg";


export const enteringSteps = 1;
export const leavingSteps  = 1;
//export const infinite      = true;

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