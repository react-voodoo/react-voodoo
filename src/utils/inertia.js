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

/**
 * Inertia — physics-based momentum engine for scrollable axes.
 *
 * Tracks drag velocity during a hold gesture, then on release computes a deceleration
 * arc using an easing function (default: easePolyOut). If waypoints are configured,
 * `_doSnap()` selects the nearest one and adjusts the target position and duration
 * so the animation lands exactly on a waypoint.
 *
 * The settle easing is configurable via the `settle` option:
 *   settle: "easeCubicOut"                     — any d3-ease function name
 *   settle: fn                                 — custom normalised easing function
 *   settle: { stiffness, damping, mass }       — physical spring: the curve is generated
 *     at release time from the actual gesture velocity & travel distance (closed-form
 *     damped oscillator — see utils/spring.js), giving velocity continuity and an
 *     overshoot/bounce while the predictive waypoint snap stays authoritative.
 * Individual waypoints may override it: wayPoints: [{ at: 100, settle: {...} }] —
 * the elected waypoint's `settle` wins over the axis-level one.
 *
 * The `reducedMotion` option (injected by Tweener) is a callback; when it returns
 * true at release time the settle duration collapses to 1ms so the axis jumps
 * straight to the predicted snap target — all callbacks (willSnap/onSnap/onStop)
 * still fire normally.
 *
 * The engine is poll-based: callers invoke `update()` on each timer tick (every 16ms
 * via `applyInertia()` in Tweener) to retrieve the current position. The engine does
 * not schedule its own timers.
 *
 * Three-phase drag lifecycle:
 *   startMove() — begins a new gesture; resets velocity state
 *   hold(pos)   — called on each pointer-move event; accumulates velocity
 *   release()   — called on pointer-up; commits momentum and triggers snap
 */

const
	is             = require('is'),
	easingFn       = require('d3-ease'),
	{ springSettle } = require('./spring'),
	signOf         = function sign( x ) {
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
 * Resolve the static part of a `settle` option into an easing function.
 *
 *  - string   → looked up in d3-ease (e.g. "easeCubicOut"); warns & falls back if unknown
 *  - function → used as-is
 *  - object   → spring config; resolved per-release in `_applySettleSpring()` (returns null here)
 */
function resolveSettleEase( settle ) {
	if ( !settle )
		return null;
	if ( is.fn(settle) )
		return settle;
	if ( is.string(settle) ) {
		if ( easingFn[settle] )
			return easingFn[settle];
		console.warn("[react-voodoo] Inertia: unknown settle easing '", settle, "' — falling back to easePolyOut");
		return null;
	}
	return null;
}


/**
 * Compute the momentum distance and duration from the current drag velocity.
 *
 * Uses a geometric series with decay factor 0.9 per frame:
 *   loopsTarget = log(0.05 / |v|) / log(0.9)
 * This gives the number of 16ms steps until velocity decays below 5% of its current
 * value. The sum of the geometric series (loopsVelSum) gives total distance travelled.
 *
 * When disabled (inertia.disabled), all targets are zeroed so the axis stops immediately.
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
		_.inertiaFn           = resolveSettleEase(_.conf.settle) || easingFn.easePolyOut;
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
		_.conf.settle     = opt.settle;
		_.inertiaFn       = resolveSettleEase(opt.settle) || easingFn.easePolyOut;
	}
	
	/**
	 * Begin a new drag gesture. Resets all velocity and momentum state so the
	 * release() calculation starts from a clean baseline. Sets `holding = true`
	 * to keep the inertia loop running while the pointer is held down.
	 */
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
	
	/**
	 * Called on each pointer-move event with the new axis position. Updates the
	 * running velocity estimate used by release() to compute momentum distance.
	 *
	 * Velocity direction change detection: if the pointer reverses direction and
	 * more than `velocityResetTm` (150ms) has elapsed since the last base-point,
	 * the velocity base is reset to the current position/time. This prevents a
	 * brief reversal near the end of a fast swipe from zeroing out accumulated
	 * momentum. The `velocityResetTm` guard makes the direction check "sticky"
	 * enough to ignore micro-jitter from touch digitizers.
	 */
	hold( nextPos ) {
		let _            = this._,
		    delta        = _.lastHoldPos !== undefined ? nextPos - _.lastHoldPos : 0,
		    loop,
		    now          = Date.now() / 1000,
		    sinceLastPos = (now - _.baseTS),
		    pos          = nextPos,
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
	
	/**
	 * Called when the pointer is released. Commits the accumulated velocity into a
	 * momentum arc via `applyInertia()`, then applies snapToBounds correction if the
	 * projected landing position is outside [min, max]. Finally calls `_doSnap()` to
	 * find the nearest waypoint and adjust the target accordingly.
	 */
	release() {
		let _       = this._,
		    velSign = signOf(_.lastVelocity);

		this.holding = false;

		// Compute momentum distance/duration from the last measured velocity.
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
		_.settleLoopDec  = 0;
		_.inertiaStartTm =
			_.inertiaLastTm = Date.now();


		//}
		this._doSnap(null, 500)
		this._applySettleSpring(_.lastVelocity);
		if ( _.conf.reducedMotion?.() )
			_.targetDuration = 1;// jump: the next update tick lands exactly on the snap target
		_.conf.willEnd?.(_.targetDist + _.pos, _.targetDist, _.targetDuration);
	}

	/**
	 * Resolve & apply the settle easing for the starting inertia animation.
	 *
	 * The effective `settle` value is the elected waypoint's own `settle` field if
	 * defined ({ at, gravity, settle }), falling back to the axis-level config —
	 * so individual waypoints can have their own landing feel.
	 *
	 * When the value is a spring config ({ stiffness, damping, mass, restDelta }),
	 * the settle easing is generated from the closed-form damped-spring solution
	 * using the *actual* release velocity and travel distance, and the duration is
	 * derived from the spring's physical settle time.
	 *
	 * Called after _doSnap() so the snap target (waypoint, gravity, maxJump) stays
	 * authoritative — the spring only decides *how* the axis travels there, with
	 * velocity continuity and a possible overshoot/bounce.
	 */
	_applySettleSpring( velocity = 0 ) {
		let _ = this._,
		    s = _.targetWayPoint && _.targetWayPoint.settle !== undefined
		        ? _.targetWayPoint.settle
		        : _.conf.settle;

		// resolve the static part (string/fn — or restore the default when the
		// previous settle came from a waypoint-specific config)
		_.inertiaFn    = resolveSettleEase(s) || easingFn.easePolyOut;
		_.settleCustom = !!s;// activates the loop guard in update()

		if ( !s || is.fn(s) || is.string(s) || !_.targetDist )
			return;

		let { ease, duration } = springSettle(velocity / _.targetDist, s),
		    clamped            = max(50, min(10000, duration));

		// if clamped, remap so the curve is still evaluated on its physical time base
		_.inertiaFn      = clamped === duration ? ease : u => ease(u * clamped / duration);
		_.targetDuration = clamped;
	}
	
	/**
	 * Poll-based position update — called every 16ms by Tweener.applyInertia().
	 *
	 * Applies the easing function to the elapsed time ratio to get a smoothed
	 * position delta, then accumulates it into `_.pos`. When the animation
	 * duration has elapsed, snaps exactly to the target waypoint position (if any)
	 * to eliminate floating-point drift, fires onStop/onSnap callbacks, and sets
	 * `active = false` to stop the 16ms loop.
	 */
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
			// With an overshooting settle easing (spring), the position may briefly cross
			// a loop threshold before bouncing back to the target waypoint. _doSnap() has
			// already accounted the expected loop shifts (snapLoopDec) in the travel
			// distance — allow exactly those, and suppress extra teleports caused by the
			// overshoot so the final exact-snap (targetWayPoint.at) stays consistent.
			// Only active when a custom `settle` is configured (default path unchanged).
			let snapGuard = _.settleCustom && _.inertia && _.targetWayPoint;
			while ( (!snapGuard || _.settleLoopDec !== _.snapLoopDec) && (loop = _.conf.shouldLoop(nextValue, delta)) ) {
				//console.warn("loop update", loop, nextValue);
				nextValue += loop;
				if ( snapGuard )
					_.settleLoopDec += loop;
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
	
	/**
	 * Programmatic momentum injection — e.g. for button-triggered scroll or swipe
	 * animations without a preceding drag gesture. If an inertia animation is already
	 * running in the same direction, the delta is accumulated; if the direction
	 * changes the animation is restarted from the current position.
	 */
	dispatch( delta, tm = 500 ) {
		let _   = this._,
		    now = Date.now(),
		    pos;
		
		this.active = true;
		
		// if no inertia has started || if direction has change
		if ( !_.inertia || signOf(delta) !== signOf(_.targetDist) ) {
			_.inertia        = true;
			_.lastInertiaPos = 0;
			_.settleLoopDec  = 0;
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
		this._applySettleSpring(0);// programmatic momentum: spring starts from rest
		if ( _.conf.reducedMotion?.() )
			_.targetDuration = 1;
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
	
	/**
	 * Select the waypoint that best matches the projected landing position and
	 * adjust `_.targetDist` and `_.targetDuration` to land precisely on it.
	 *
	 * Waypoint selection:
	 *   Binary-search the sorted wayPoints array for the first waypoint beyond `pos`.
	 *   The midpoint between adjacent waypoints `i-1` and `i` (weighted by their
	 *   `gravity` fields, default 1) determines which waypoint "wins". If `forceSnap`
	 *   is set (from dispatch()), the direction overrides the midpoint check.
	 *   `maxJump` caps the maximum index distance from the current waypoint to
	 *   prevent the animation from skipping multiple slides in one gesture.
	 */
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
				// election boundary between wp[i-1] and wp[i], weighted by gravity:
				// a higher gravity PULLS the boundary away from its waypoint, growing
				// its capture zone — "gravity > 1 makes this waypoint stickier"
				mid = (_.wayPoints[i].at - _.wayPoints[i - 1].at) / 2;
				mid = _.wayPoints[i - 1].at + (mid * ((_.wayPoints[i - 1].gravity || 1) / (_.wayPoints[i].gravity || 1)));

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
			_.snapLoopDec         = loopDec;// loop shifts expected during the settle (see update())
		}
		else {
			_.snapLoopDec = 0;
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
