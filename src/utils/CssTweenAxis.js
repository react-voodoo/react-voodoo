/*
 *   The MIT License (MIT)
 *   Copyright (c) 2020. Nathanael Braun
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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