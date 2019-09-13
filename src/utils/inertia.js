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

const
	is       = require('is'),
	easingFn = require('d3-ease'),
	signOf   = function sign( x ) {
		return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? x : NaN : NaN;
	},
	abs      = Math.abs,
	floor    = Math.floor,
	round    = Math.round,
	min      = Math.min,
	max      = Math.max,
	floatCut = ( v = 0 ) => v.toFixed(3),
	
	consts   = {
		velocityResetTm: 150,
		clickTm        : 250
	};

// this is a mess


/**
 * Predict the inertia
 * @param _
 */
export function applyInertia( _ ) {
	let velSign = signOf(_.lastVelocity);
	// calc momentum distance...
	// get nb loop needed to get vel < .05
	_.loopsTarget = floor(Math.log(.05 / abs(_.lastVelocity)) / Math.log(.9));
	
	// get velocity sum basing on nb loops needed
	_.loopsVelSum    = (Math.pow(.9, _.loopsTarget) - abs(_.lastVelocity)) / (.9 - 1);
	// deduce real dist of momentum
	_.targetDist     = (_.loopsVelSum * _.refFPS * velSign) / 1000 || 0;
	_.targetDuration = abs(_.loopsTarget * _.refFPS * velSign) || 0;
}

const inertiaByNode = {
	nodes  : [],
	inertia: []
};
/**
 * Main inertia class
 * @class Caipi slideshow
 * @type {module.exports}
 */
export default class Inertia {
	static config = {
		bounds      : true,
		snapToBounds: true
	};
	
	constructor( opt ) {
		let _  = this._ = {};
		_.conf = {
			...this.constructor.config,
			...opt,
			//get lastInertiaPos() {
			//	return this._lastInertiaPos
			//},
			//set lastInertiaPos( v ) {
			//	if ( v === NaN )
			//		debugger
			//	this._lastInertiaPos = v;
			//}
		};
		
		this.active           = false;
		_.pos                 = opt.value || 0;
		_.refFPS              = 16;
		_.min                 = opt.min || 0;
		_.max                 = opt.max || 0;
		_.currentStop         = 0;
		_.lastInertiaPos      = 0;
		_.stops               = _.conf.stops;
		_.wayPoints           = _.conf.wayPoints;
		_.inertiaFn           = easingFn.easePolyOut;
		_.targetWayPointIndex = 0;
		
		this._detectCurrentSnap()
		
	}
	
	update( at = Date.now() ) {
		let _   = this._, nextValue, loop;
		let
			pos = _.inertiaFn((at - _.inertiaStartTm) / _.targetDuration) * _.targetDist;
		
		if ( !_.inertia ) {
			//if ( _.conf.shouldLoop ) {
			//	while ( (loop = _.conf.shouldLoop(_.pos, 0)) ) {
			//		this.teleport(loop);
			//	}
			//}
			return _.pos;
		}
		let
			delta        = pos - _.lastInertiaPos;
		_.lastInertiaPos = pos;
		
		if ( (at - _.inertiaStartTm) >= _.targetDuration ) {
			_.inertia        = this.active = false;
			_.lastInertiaPos = delta = 0;
			_.targetDist     = 0;
			if ( _.targetWayPoint ) {
				delta                  = _.targetWayPoint.at - _.pos;
				//console.log("snap done ", _.targetWayPoint, _.pos + delta);
				_.currentWayPoint      = _.targetWayPoint;
				_.currentWayPointIndex = _.targetWayPointIndex;
				_.targetWayPoint       = null;
				_.targetWayPointIndex  = null;
				//_.lastSnapTm           = Date.now();
			}
			
			if ( _.conf.onInertiaEnd ) {
				_.conf.onInertiaEnd(_.pos, _.currentWayPoint)
			}
		}
		
		delta     = delta || 0;
		//console.log(_.pos + delta);
		nextValue = _.pos + delta;
		
		if ( delta && _.conf.shouldLoop ) {
			
			while ( (loop = _.conf.shouldLoop(nextValue, delta)) ) {
				//console.warn("loop update", loop);
				nextValue += loop;
				//this.teleport(loop);
			}
		}
		
		_.pos = nextValue;
		
		return nextValue;
	}
	
	setPos( pos ) {
		let _            = this._, nextValue;
		_.inertia        = false;
		this.active      = false;
		_.lastInertiaPos = 0;
		_.targetDist     = 0;
		_.pos            = pos;
		if ( _.conf.bounds ) {
			_.pos = max(_.pos, _.min);
			_.pos = min(_.pos, _.max);
		}
	}
	
	setWayPoints( wayPoints ) {
		let _       = this._, nextValue;
		_.wayPoints = wayPoints;
		this._detectCurrentSnap();
	}
	
	teleport( loopDist ) {
		let _ = this._, nextValue;
		if ( !_.inertia )
			return _.pos += loopDist;
		
		//_.lastInertiaPos += loopDist;
		_.pos += loopDist
		//console.log("setPos", _.lastInertiaPos);
	}
	
	dispatch( delta, tm = 500 ) {
		let _   = this._,
		    now = Date.now(),
		    pos;
		
		this.active = true;
		
		// if no inertia has started || if direction has change
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
		//
		//if ( _.conf.maxJump ) {
		//
		//}
		
		if ( _.conf.bounds ) {
			if ( (_.pos + _.targetDist) > _.max ) {
				
				_.targetDist     = _.max - _.pos;
				_.targetDuration = abs(_.targetDist * 10);
			}
			else if ( (_.pos + _.targetDist) < _.min ) {
				
				_.targetDist     = _.min - _.pos;
				_.targetDuration = abs(_.targetDist * 10);
			}
		}
		this._doSnap(signOf(delta), 750)
	}
	
	
	_detectCurrentSnap() {
		let _   = this._,
		    pos = _.pos,
		    i;
		
		if ( _.wayPoints && _.wayPoints.length ) {
			for ( i = 0; i < _.wayPoints.length; i++ )
				if ( floatCut(_.wayPoints[i].at) === floatCut(pos) ) {
					_.currentWayPoint      = _.wayPoints[i];
					_.currentWayPointIndex = i;
					//console.warn("snap set", i);
					
					return i;
				}
		}
	}
	
	_doSnap( forceSnap, maxDuration = 2000 ) {
		let _   = this._,
		    pos = _.targetDist + (_.pos - (_.lastInertiaPos || 0)),
		    target,
		    mid,
		    i,
		    i2;
		
		if ( _.wayPoints && _.wayPoints.length ) {
			for ( i = 0; i < _.wayPoints.length; i++ )
				if ( _.wayPoints[i].at > pos )
					break;
			
			if ( i === _.wayPoints.length ) {
				i--
			}
			else if ( i === 0 ) {
				i = 0;
			}
			else {
				mid = _.wayPoints[i - 1].at + (_.wayPoints[i].at - _.wayPoints[i - 1].at) / 2;
				if ( forceSnap ) forceSnap < 0 && i--;
				else if ( pos < mid ) i--;
			}
			
			if ( _.conf.maxJump && is.number(_.currentWayPointIndex) ) {
				let d = (i - _.currentWayPointIndex);
				//console.log('Inertia::_doSnap:154: ', i, d);
				if ( abs(d) > _.conf.maxJump ) {
					//console.log('max: ', i, d);
					i = _.currentWayPointIndex + signOf(d) * _.conf.maxJump;
				}
			}
			target = _.wayPoints[i].at;
			
			if ( _.conf.willSnap ) {
				_.conf.willSnap(i, _.wayPoints[i]);
			}
			
			_.lastInertiaPos      = _.lastInertiaPos || 0;
			target                = target - (_.pos - _.lastInertiaPos);
			_.targetDuration      = max(50, min(maxDuration, abs((_.targetDuration / _.targetDist) * target))) || 0;
			//console.log("do snap", i, target, _.targetDist, _.targetDuration);
			_.targetDist          = target;
			_.targetWayPoint      = _.wayPoints[i];
			_.targetWayPointIndex = i;
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
		//console.log('Inertia::setBounds:245: ', min, max);
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
		this.holding   = true;
		_.inertia      = false;
	}
	
	isInbound( nextPos ) {
		let _     = this._, loop,
		    delta = _.lastHoldPos !== undefined ? nextPos - _.lastHoldPos : 0,
		    pos   = (_.targetDist || 0) + (_.pos - (_.lastInertiaPos || 0)) + delta;
		//if ( _.conf.infinite ) return false;
		//
		//if ( _.conf.shouldLoop ) {
		//	while ( (loop = _.conf.shouldLoop(nextValue)) ) {
		//!(pos >= _.min && pos <= _.max) && console.warn("out", _.pos, pos, delta);
		//		pos += loop;
		//	}
		//}
		return pos >= _.min && pos <= _.max;
	}
	
	hold( nextPos ) {
		let _     = this._,
		    delta = _.lastHoldPos !== undefined ? nextPos - _.lastHoldPos : 0,
		    loop;
		
		//_.holding     = true;
		_.lastHoldPos = nextPos;
		if ( delta && _.conf.shouldLoop ) {
			//while ( (loop = _.conf.shouldLoop(pos, delta)) ) {
			//	//console.warn("loop", loop);
			//	pos += loop;
			//}
			while ( (loop = _.conf.shouldLoop(_.pos, delta)) ) {
				//console.warn("loop", loop);
				_.pos += loop;
			}
		}
		let now          = Date.now() / 1000,//e.timeStamp,
		    sinceLastPos = (now - _.baseTS),
		    pos          = _.pos + delta,
		    iVel         = delta / sinceLastPos;
		
		//if (is.nan(pos))
		//	debugger
		//console.log("hold", pos, iVel);
		_.lastIVelocity       = iVel;
		_.lastVelocity        = iVel;
		_.baseTS              = now;
		_.targetDist          = 0;
		_.lastInertiaPos      = 0;
		// clear snap
		_.targetWayPoint      = undefined;
		_.targetWayPointIndex = undefined;
		
		if ( _.conf.bounds ) {
			if ( pos > _.max ) {
				pos = _.max// + min((pos - _.max) / 10, 10);
			}
			else if ( pos < _.min ) {
				pos = _.min// - min((_.min - pos) / 10, 10);
			}
		}
		
		_.pos = pos;
		
	}
	
	release() {
		let _       = this._,
		    velSign = signOf(_.lastVelocity);
		
		this.holding = false;
		
		// calc momentum distance...
		applyInertia(_);
		
		_.lastHoldPos = undefined;
		
		_.holding = false;
		
		if ( _.conf.bounds && _.conf.snapToBounds ) {
			if ( (_.pos + _.targetDist) > _.max ) {
				_.targetDist     = _.max - _.pos;
				_.targetDuration = abs(_.targetDist * 10);
			}
			else if ( (_.pos + _.targetDist) < _.min ) {
				
				_.targetDist     = _.min - _.pos;
				_.targetDuration = abs(_.targetDist * 10);
			}
		}
		//else {
		if ( !_.targetDuration )
			_.targetDuration = 50;
		
		//console.log(_);
		this.active      = true;
		_.inertia        = true;
		_.lastInertiaPos = 0;
		_.inertiaStartTm =
			_.inertiaLastTm = Date.now();
		//}
		this._doSnap(null, 500)
	}
}
