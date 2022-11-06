/*
 * Copyright (c) 2022-2023 Braun Nathanael
 *
 * This project is dual licensed under one of the following licenses:
 * - Creative Commons Attribution-NoDerivatives 4.0 International License.
 * - GNU AFFERO GENERAL PUBLIC LICENSE Version 3
 *
 * You should have received a copy of theses licenses along with this work.
 * If not, see <http://creativecommons.org/licenses/by-nd/4.0/> or <http://www.gnu.org/licenses/agpl-3.0.txt>.
 */

import is        from "is";
import tweenAxis from "tween-axis";


const recyclableTweenAxis = [];

/**
 * Override the TweenAxis Objects to automatically deal with recycling
 */
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
				if ( cfg.Axis )
					recyled.mount(cfg.Axis, scope);
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