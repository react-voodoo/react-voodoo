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

var
	signOf = function sign( x ) {
		return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? x : NaN : NaN;
	},
	abs    = Math.abs,
	floor  = Math.floor,
	round  = Math.round,
	min    = Math.min,
	max    = Math.max,
	consts = {
		velocityResetTm: 150,
		clickTm        : 250
	};

var is       = require('is');
var easingFn = require('d3-ease');
/**
 * Main slideshow class
 * @class Caipi slideshow
 * @type {module.exports}
 */

export default class Inertia {
	
	constructor( opt ) {
		let _  = this._ = {};
		_.conf = {
			...this.constructor.config,
			...opt
		};
		
		this.active      = false;
		_.pos            = opt.value || 0;
		_.refFPS         = 16;
		_.min            = opt.min || 0;
		_.max            = opt.max || 0;
		_.currentStop    = 0;
		_.lastInertiaPos = 0;
		_.stops          = _.conf.stops;
		_.inertiaFn      = easingFn.easePolyOut;
	}
	
	update( at = Date.now() ) {
		let _ = this._, nextValue, loop;
		if ( !_.inertia ) {
			if ( _.conf.shouldLoop ) {
				while ( (loop = _.conf.shouldLoop(_.pos)) ) {
					this.teleport(loop);
				}
			}
			return _.pos;
		}
		let
			pos          = _.inertiaFn((at - _.inertiaStartTm) / _.targetDuration) * _.targetDist,
			delta        = pos - _.lastInertiaPos;
		_.lastInertiaPos = pos;
		if ( (at - _.inertiaStartTm) >= _.targetDuration ) {
			_.inertia        = this.active = false;
			_.lastInertiaPos = delta = 0;
		}
		delta     = delta || 0;
		//console.log(_.pos + delta);
		nextValue = _.pos + delta;
		
		if ( _.conf.shouldLoop ) {
			
			while ( (loop = _.conf.shouldLoop(nextValue)) ) {
				//console.warn("loop", loop);
				nextValue += loop;
				this.teleport(loop);
			}
		}
		
		_.pos = nextValue;
		
		return nextValue;
	}
	
	teleport( loopDist ) {
		let _ = this._, nextValue;
		if ( !_.inertia )
			return _.pos += loopDist;
		
		_.lastInertiaPos += loopDist;
		_.pos += loopDist
	}
	
	dispatch( delta, tm = 250 ) {
		let _       = this._, now = Date.now(), pos;
		this.active = true;
		if ( !_.inertia || signOf(delta) !== signOf(_.targetDist) ) {
			_.inertia        = true;
			_.lastInertiaPos = 0;
			_.inertiaStartTm =
				_.inertiaLastTm = now;
			
			_.targetDist     = delta;
			_.targetDuration = tm;
		}
		else {
			_.inertiaStartTm =
				_.inertiaLastTm = now;
			_.lastInertiaPos = 0;
			_.targetDist += delta;
			_.targetDuration += tm;
		}
		this._doSnap(signOf(delta), 750)
		
		
		//pos =
		//console.log(_);
	}
	
	_doSnap( forceSnap, maxDuration = 2000 ) {
		let _   = this._,
		    pos = _.targetDist + (_.pos - (_.lastInertiaPos || 0)), target, mid, i
		;
		
		if ( _.stops && _.stops.length ) {
			for ( i = 0; i < _.stops.length; i++ )
				if ( _.stops[i] > pos )
					break;
			if ( i == _.stops.length ) {
				target = _.stops[i - 1];
			}
			else if ( i === 0 ) {
				target = _.stops[0];
			}
			else {
				mid = _.stops[i - 1] + (_.stops[i] - _.stops[i - 1]) / 2;
				if ( forceSnap )
					target = forceSnap < 0 ? _.stops[i - 1] : _.stops[i];
				else
					target = pos < mid ? _.stops[i - 1] : _.stops[i];
			}
			
			if ( _.conf.willSnap ) {
				_.conf.willSnap(i, target)
			}
			
			_.lastInertiaPos = _.lastInertiaPos || 0;
			console.log("do snap", i, target);
			target           = target - (_.pos - _.lastInertiaPos);
			_.targetDuration = min(maxDuration, abs((_.targetDuration / _.targetDist) * target)) || 0;
			_.targetDist     = target;
		}
		else {
			target = ~~(_.pos - _.lastInertiaPos);
			
			if ( !_.conf.infinite ) {
				if ( target > _.max ) {
					target           = _.max - target;
					_.targetDuration = min(maxDuration, abs((_.targetDuration / _.targetDist) * target));
					_.targetDist     = target;
				}
				else if ( target < _.min ) {
					target           = _.min - target;
					_.targetDuration = min(maxDuration, abs((_.targetDuration / _.targetDist) * target));
					_.targetDist     = target;
				}
			}
			
		}
	}
	
	setBounds( min, max ) {
		let _ = this._;
		_.min = min;
		_.max = max;
	}
	
	startMove() {
		let _          = this._;
		_.baseTS       = _.startTS = Date.now() / 1000;
		_.lastVelocity = _.lastIVelocity = 0;
		_.lastAccel    = 0;
		_.posDiff      = 0;
		this.active    = true;
		_.inertia      = false;
	}
	
	hold( pos ) {
		let _            = this._,
		    now          = Date.now() / 1000,//e.timeStamp,
		    sinceLastPos = (now - _.baseTS),
		    delta        = pos - _.pos,
		    iVel         = delta / sinceLastPos,
		    loop;
		
		//console.log(pos);
		_.lastIVelocity = iVel;
		_.lastVelocity  = iVel;
		_.baseTS        = now;
		
		if ( _.conf.shouldLoop ) {
			while ( (loop = _.conf.shouldLoop(pos)) ) {
				//console.warn("loop", loop);
				pos += loop;
				this.teleport(loop);
			}
		}
		else if ( !_.conf.infinite ) {
			if ( pos > _.max ) {
				pos = _.max + min((pos - _.max) / 10, 10);
			}
			else if ( pos < _.min ) {
				pos = _.min - min((_.min - pos) / 10, 10);
			}
		}
		
		_.pos = pos;
		
	}
	
	release() {
		let _       = this._,
		    velSign = signOf(_.lastVelocity);
		
		if ( _.pos > _.max ) {
			_.inertia        = true;
			_.lastInertiaPos = 0;
			_.inertiaStartTm =
				_.inertiaLastTm = Date.now();
			
			_.targetDist     = _.max - _.pos;
			_.targetDuration = abs(_.targetDist * 10);
		}
		else if ( _.pos < _.min ) {
			_.inertia        = true;
			_.lastInertiaPos = 0;
			_.inertiaStartTm =
				_.inertiaLastTm = Date.now();
			
			_.targetDist     = _.pos - _.min;
			_.targetDuration = abs(_.targetDist * 10);
		}
		else {
			// calc momentum distance...
			// get nb loop needed to get vel < .05
			_.loopsTarget = floor(Math.log(.05 / abs(_.lastVelocity)) / Math.log(.9));
			
			// get velocity sum basing on nb loops needed
			_.loopsVelSum    = (Math.pow(.9, _.loopsTarget) - abs(_.lastVelocity)) / (.9 - 1);
			// deduce real dist of momentum
			_.targetDist     = (_.loopsVelSum * _.refFPS * velSign) / 1000 || 0;
			_.targetDuration = abs(_.loopsTarget * _.refFPS * velSign) || 0;
			
			if ( !_.targetDuration )
				_.targetDuration = 50;
			
			//console.log(_);
			_.inertia        = true;
			_.lastInertiaPos = 0;
			_.inertiaStartTm =
				_.inertiaLastTm = Date.now();
		}
		this._doSnap(null, 500)
	}
}
