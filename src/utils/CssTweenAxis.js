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

import is        from "is";
import tweenAxis from "tween-axis";
//export default tweenAxis
const recyclableTweenAxis = [];
export default class CssTweenAxis extends tweenAxis {
	
	constructor( cfg, scope ) {
		if ( recyclableTweenAxis.length ) {
			let recyled   = recyclableTweenAxis.pop();
			recyled.scope = scope;
			if ( is.array(cfg) ) {
				recyled.localLength = 1;
				recyled.mount(cfg, scope);
			}
			else {
				if ( cfg.TweenAxis )
					recyled.mount(cfg.TweenAxis, scope);
			}
			return recyled;
		}
		super(...arguments)
	}
	
	destroy() {
		
		this.scope                  = undefined;
		this.__marks.length         = 0;
		this.__marksLength.length   = 0;
		this.__marksKeys.length     = 0;
		this.__processors.length    = 0;
		this.__config.length        = 0;
		this.__activeForks.length   = 0;
		this.__activeProcess.length = 0;
		
		this.__activeProcess.length = 0;
		this.__outgoing.length      = 0;
		this.__incoming.length      = 0;
		this.__cPos                 = 0;
		this.duration               = 0;
		this.__cIndex               = 0;
		this.__cMaxKey              = 1;
		recyclableTweenAxis.push(this);
	}
}