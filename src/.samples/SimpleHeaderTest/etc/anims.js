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
		target  : "headerBackground",
		from    : 0,
		duration: 50,
		apply   : {
			transform: { translateZ: "100px" }
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