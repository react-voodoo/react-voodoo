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

export const visibleItems = 5;
let area                  = ".6bw",
    itemWidth             = tweenTools.cssMult(area, 1 / (visibleItems)),
    step                  = tweenTools.cssMult(itemWidth, 1),
    zMax                  = "300px",
    angle                 = "90deg";


export const enteringSteps = 3;
export const leavingSteps  = 3;
export const infinite      = true;

export const scrollDir = "scrollX";

export const slotInitialStyle = {
	position : "absolute",
	//overflow : "hidden",
	height   : "100%",
	width    : itemWidth,
	left     : "0%",
	top      : "0%",
	zIndex   : 500,
	transform: [
		{
			translateX: tweenTools.cssAdd(area, ".2bw", tweenTools.cssMult(itemWidth, -1)),
		}]
};
export const itemInitialStyle = {
	height   : "100%",
	width    : "100%",
	transform: [
		{
			translateX: tweenTools.cssMult(step, -1),
			
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
export const scrollAxis       = [
	{
		from    : 0,
		duration: 100,
		apply   : {
			transform: [
				{
					translateX: "-" + area,
				}]
		}
	},
];
export const defaultEntering  = [
	{
		from    : 100 - (100 / enteringSteps),
		duration: 100 / enteringSteps,
		apply   : {
			//zIndex   : 500,
			transform: [
				{},
				{},
				{
					translateX: step,
				}]
		}
	},
	{
		from    : 0,
		duration: 100,
		apply   : {
			//zIndex: 500,
			
			transform: [
				{},
				{
					rotateY: "-" + angle,
				},
				{}]
		}
	},
];
export const defaultLeaving   = [
	       {
		       from    : 0,
		       duration: 100,
		       apply   : {
			       //zIndex   : -500,
			       transform: [
				       {},
				       {
					       //rotateY: "-" + angle,
				       }]
		       }
	       }
       ]
;