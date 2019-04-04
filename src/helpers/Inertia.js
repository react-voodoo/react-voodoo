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
		
		this.active = false;
		_.pos       = opt.value || 0;
		_.refFPS    = 16;
		_.size      = 1000;
		_.inertiaFn = easingFn.easePolyOut;
	}
	
	update( at = Date.now() ) {
		let _ = this._;
		if ( !_.inertia )
			return _.pos;
		let
			pos          = _.inertiaFn((at - _.inertiaStartTm) / _.targetDuration) * _.targetDist,
			delta        = pos - _.lastInertiaPos;
		_.lastInertiaPos = pos;
		if ( (at - _.inertiaStartTm) >= _.targetDuration ) {
			_.inertia = this.active = false;
			delta     = 0;
		}
		delta = delta || 0;
		//console.log(_.pos + delta);
		return _.pos += delta;
	}
	
	dispatch( delta, tm = 250 ) {
		let _       = this._, now = Date.now();
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
			_.targetDist += delta;
			_.targetDuration += tm;
		}
		
		//console.log(_);
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
		    inc, dist, tmp;
		
		//console.log(pos);
		_.pos           = pos;
		_.lastIVelocity = iVel;
		_.lastVelocity  = iVel;
		_.baseTS        = now;
		
		
	}
	
	release() {
		let _       = this._,
		    velSign = signOf(_.lastVelocity);
		
		// calc momentum distance...
		// get nb loop needed to get vel < .05
		_.loopsTarget = floor(Math.log(.05 / abs(_.lastVelocity)) / Math.log(.9));
		
		// get velocity sum basing on nb loops needed
		_.loopsVelSum    = (Math.pow(.9, _.loopsTarget) - abs(_.lastVelocity)) / (.9 - 1);
		// deduce real dist of momentum
		_.targetDist     = (_.loopsVelSum * _.refFPS * velSign) / 1000 || 0;
		_.targetDuration = abs(_.loopsTarget * _.refFPS * velSign) || 0;
		
		//console.log(_);
		_.inertia        = true;
		_.lastInertiaPos = 0;
		_.inertiaStartTm =
			_.inertiaLastTm = Date.now();
		//_.active = false;
	}
	
	
}
