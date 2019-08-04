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

export const pushIn    = [
	{
		from    : 0,
		duration: 500,
		easeFn  : "easeCircleIn",
		apply   : {
			transform: [{}, {
				translateZ: "-.2box"
			}],
			filter   : {
				sepia: 100
			}
		}
	},
	{
		from    : 500,
		duration: 500,
		easeFn  : "easeCircleIn",
		apply   : {
			transform: [{}, {
				translateZ: ".2box"
			}],
			filter   : {
				sepia: -100
			}
		}
	},
	{
		from    : 250,
		duration: 500,
		apply   : {
			transform: [{}, {
				rotateY: "180deg",
			}],
		}
	}
];
let goDown             = ( rotateDir = "rotateY", angle = 5, deepness = 30 ) => [
	{
		from    : 0,
		duration: 50,
		apply   : {
			transform: {
				translateZ: -deepness
			},
		}
	},
	{
		from    : 0,
		duration: 25,
		apply   : {
			transform: {
				[rotateDir]: angle,
			},
		}
	},
	{
		from    : 25,
		duration: 25,
		apply   : {
			transform: {
				[rotateDir]: -angle,
			},
		}
	},
	{
		from    : 50,
		duration: 50,
		apply   : {
			transform: {
				translateZ: deepness
			},
		}
	},
	{
		from    : 50,
		duration: 25,
		apply   : {
			transform: {
				[rotateDir]: -angle,
			},
		}
	},
	{
		from    : 75,
		duration: 25,
		apply   : {
			transform: {
				[rotateDir]: angle,
			},
		}
	}];
export const tweenAxis = {
	scrollX: [
		{
			from    : 0,
			duration: 200,
			apply   : {
				transform: {
					translateX: "-.8box"
				},
			}
		},
		
		...tweenTools.scale(goDown("rotateY", -4), 200, 0),
		...tweenTools.scale(goDown("rotateY", -4), 50, 0),
		...tweenTools.scale(goDown("rotateY", -4), 50, 50),
		...tweenTools.scale(goDown("rotateY", -4), 50, 100),
		...tweenTools.scale(goDown("rotateY", -4), 50, 150),
	],
	scrollY: [
		{
			from    : 0,
			duration: 200,
			apply   : {
				transform: {
					translateY: "-.8box"
				},
			}
		},
		...tweenTools.scale(goDown("rotateX", 4), 200, 0),
		...tweenTools.scale(goDown("rotateX", 4), 50, 0),
		...tweenTools.scale(goDown("rotateX", 4), 50, 50),
		...tweenTools.scale(goDown("rotateX", 4), 50, 100),
		...tweenTools.scale(goDown("rotateX", 4), 50, 150),
	]
};