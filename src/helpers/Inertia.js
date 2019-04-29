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
		
		this.active   = false;
		_.pos         = opt.value || 0;
		_.refFPS      = 16;
		_.min         = opt.min || 0;
		_.max         = opt.max || 0;
		_.currentStop = 0;
		_.stops       = _.conf.stops;
		_.inertiaFn   = easingFn.easePolyOut;
	}
	
	update( at = Date.now() ) {
		let _ = this._, nextValue;
		if ( !_.inertia )
			return _.pos;
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
		
		if ( _.conf.hookValueUpdate )
			nextValue = _.conf.hookValueUpdate(nextValue);
		
		_.pos = nextValue;
		
		return nextValue;
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
		    pos = _.targetDist + (_.pos - _.lastInertiaPos), target, mid, i
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
			
			//console.log("do snap", i, target);
			target           = target - (_.pos - _.lastInertiaPos);
			_.targetDuration = min(maxDuration, abs((_.targetDuration / _.targetDist) * target));
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
		    iVel         = delta / sinceLastPos;
		
		//console.log(pos);
		_.lastIVelocity = iVel;
		_.lastVelocity  = iVel;
		_.baseTS        = now;
		
		if ( _.conf.hookValueUpdate )
			pos = _.conf.hookValueUpdate(pos);
		
		if ( !_.conf.infinite ) {
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
