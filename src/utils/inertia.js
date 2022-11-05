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
		velocityResetTm: .150,
		clickTm        : 250
	};


/**
 * Predict inertia dist & target basing velocity
 * @param _
 */
export function applyInertia( _ ) {
	let velSign = signOf(_.lastVelocity);
	
	if ( _.disabled ) {
		_.loopsTarget    = 0;
		_.loopsVelSum    = 0;
		_.targetDist     = 0;
		_.targetDuration = 0;
	}
	else {
		// calc momentum distance...
		// get nb loop needed to get vel < .05
		_.loopsTarget = floor(Math.log(.05 / abs(_.lastVelocity)) / Math.log(.9));
		
		// get velocity sum basing on nb loops needed
		_.loopsVelSum = (Math.pow(.9, _.loopsTarget) - abs(_.lastVelocity)) / (.9 - 1);
		
		// deduce real dist of momentum
		_.targetDist     = (_.loopsVelSum * _.refFPS * velSign) / 1000 || 0;
		_.targetDuration = abs(_.loopsTarget * _.refFPS * velSign) || 0;
		//console.warn(" _.targetDist", _.targetDist, _.lastVelocity);
	}
}

/**
 * Main inertia class
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
			...opt
		};
		
		this.active           = false;
		_.pos                 = opt.value || 0;
		_.refFPS              = 16;
		_.min                 = opt.min || 0;
		_.max                 = opt.max || 0;
		_.currentStop         = 0;
		_.lastInertiaPos      = 0;
		_.stops               = _.conf.stops;
		_.disabled            = _.conf.disabled;
		_.wayPoints           = _.conf.wayPoints;
		_.inertiaFn           = easingFn.easePolyOut;
		_.targetWayPointIndex = 0;
		
		this._detectCurrentSnap();
	}
	
	updateConf( opt ) {
		let _             = this._;
		_.min             = opt.min || 0;
		_.max             = opt.max || 0;
		_.stops           = opt.stops;
		_.disabled        = opt.disabled;
		_.wayPoints       = opt.wayPoints;
		_.conf.willStop   = opt.willStop;
		_.conf.willSnap   = opt.willSnap;
		_.conf.onStop     = opt.onStop;
		_.conf.onSnap     = opt.onSnap;
		_.conf.shouldLoop = opt.shouldLoop;
	}
	
	startMove() {
		let _          = this._;
		_.baseTS       = _.startTS = Date.now() / 1000;
		_.lastVelocity = _.lastIVelocity = 0;
		_.lastAccel    = 0;
		_.posDiff      = 0;
		_.loopsDiff    = 0;
		this.active    = true;
		this.holding   = true;
		_.inertia      = false;
	}
	
	hold( nextPos ) {
		let _            = this._,
		    delta        = _.lastHoldPos !== undefined ? nextPos - _.lastHoldPos : 0,
		    loop,
		    now          = Date.now() / 1000,//e.timeStamp,
		    sinceLastPos = (now - _.baseTS),
		    pos          = nextPos,//_.lastHoldPos + delta,
		    iVel         = delta / sinceLastPos;
		
		_.lastHoldPos = nextPos;
		//if (is.nan(pos))
		//	debugger
		
		if ( !_.lastBaseTs ) {// create base pts
			_.lastBasePos = nextPos;
			_.lastBaseTs  = _.baseTS;
		}
		
		if ( sinceLastPos < .003 ) {
			//console.log("hold fast", delta, _.baseTS, sinceLastPos);
			// skip/ignore
		}
		else if (// direction changed for velocityResetTm
			(
				(iVel <= 0 && _.lastVelocity > 0)
				||
				(iVel >= 0 && _.lastVelocity < 0)
				||
				abs(iVel) < abs(_.lastVelocity * 0.2)
			) &&
			(now - _.lastBaseTs) > consts.velocityResetTm
		) {
			//console.log("reset", _.lastBaseTs, _.lastVelocity);
			_.lastBasePos    = nextPos;
			_.lastBaseTs     = now;
			_.lastVelocity   = 0;
			_.lastIVelocity  = 0;
			_.baseTS         = now;
			_.targetDist     = 0;
			_.lastInertiaPos = 0;
		}
		else if (// dir changed fast
			(iVel <= 0 && _.lastVelocity > 0)
			||
			(iVel >= 0 && _.lastVelocity < 0)
			||
			abs(iVel) < abs(_.lastVelocity * 0.2)
		) {
			//ignore
		}
		else {
			_.lastIVelocity = iVel;
			_.lastVelocity  = ((pos) - (_.lastBasePos)) / (now - _.lastBaseTs);
			//if ( _.lastVelocity < -50 )
			//	debugger
			_.baseTS              = now;
			_.targetDist          = 0;
			_.lastInertiaPos      = 0;
			// clear snap
			_.targetWayPoint      = undefined;
			_.targetWayPointIndex = undefined;
		}
		
		if ( _.conf.bounds ) {
			if ( pos > _.max ) {
				pos = _.max// + min((pos - _.max) / 10, 10);
			}
			else if ( pos < _.min ) {
				pos = _.min// - min((_.min - pos) / 10, 10);
			}
		}
		
		if ( _.conf.shouldLoop ) {
			while ( (loop = _.conf.shouldLoop(pos, delta)) ) {
				pos += loop;
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
		
		_.lastBasePos = undefined;
		_.lastBaseTs  = undefined;
		_.holding     = false;
		
		//if ( _.conf.shouldLoop ) {
		//	let loop, nPos=_.pos + _.targetDist;
		//	while ( (loop = _.conf.shouldLoop(nPos, 0)) ) {
		//		nPos += loop;
		//		if ( _.inertia ) {
		//			//_.targetDist+=loop;
		//			//_.lastInertiaPos+=loop;
		//		}
		//		//this.teleport(loop);
		//	}
		//	if (nPos!==_.pos + _.targetDist)
		//}
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
		_.conf.willEnd?.(_.targetDist + _.pos, _.targetDist, _.targetDuration);
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
			
			if ( _.conf.onStop ) {
				_.conf.onStop(_.pos, _.currentWayPoint)
			}
			if ( _.conf.onSnap ) {
				_.conf.onSnap(_.currentWayPointIndex, _.currentWayPoint)
			}
		}
		
		delta     = delta || 0;
		//console.log(_.pos + delta);
		nextValue = _.pos + delta;
		
		if ( _.conf.shouldLoop ) {
			let t = nextValue;
			while ( (loop = _.conf.shouldLoop(nextValue, delta)) ) {
				//console.warn("loop update", loop, nextValue);
				nextValue += loop;
				if ( _.inertia ) {
					//_.targetDist+=loop;
					//_.lastInertiaPos+=loop;
				}
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
		_.inertiaStartTm = 0;
		_.inertiaLastTm  = 0;
		_.targetDuration = 0;
		
		if ( _.conf.shouldLoop ) {
			let loop, nextValue = pos;
			while ( (loop = _.conf.shouldLoop(nextValue, _.pos - pos)) ) {
				nextValue += loop;
				//this.teleport(loop);
				//console.warn("loop update", nextValue, pos);
			}
			pos = nextValue;
		}
		_.pos = pos;
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
			//_.inertiaStartTm =
			//_.inertiaLastTm = now;
			//_.lastInertiaPos = 0;
			_.targetDist += delta;
			_.targetDuration += tm / 2;
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
		let _       = this._,
		    pos     = _.targetDist + (_.pos - (_.lastInertiaPos || 0)),
		    lPos    = pos,
		    loopDec = 0,
		    target,
		    mid,
		    i,
		    loop;
		
		if ( _.wayPoints && _.wayPoints.length ) {
			
			// apply loops to do to find the final wayPoint
			if ( _.conf.shouldLoop ) {
				while ( (loop = _.conf.shouldLoop(lPos, 0)) ) {
					lPos += loop;
					loopDec += loop;
				}
			}
			
			for ( i = 0; i < _.wayPoints.length; i++ )
				if ( _.wayPoints[i].at > lPos )
					break;
			
			if ( i === _.wayPoints.length ) {
				i--
			}
			else if ( i === 0 ) {
				i = 0;
			}
			else {
				mid = (_.wayPoints[i].at - _.wayPoints[i - 1].at) / 2;
				mid = _.wayPoints[i - 1].at + (mid * ((_.wayPoints[i].gravity || 1) / (_.wayPoints[i - 1].gravity || 1)));
				
				if ( forceSnap ) forceSnap < 0 && i--;
				else if ( lPos < mid ) i--;
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
			target                = target - (_.pos - _.lastInertiaPos) - loopDec;
			_.targetDuration      = max(50, min(maxDuration, abs((_.targetDuration / _.targetDist) * target))) || 0;
			//console.log("do snap", i, target, loopDec);
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
	
}
