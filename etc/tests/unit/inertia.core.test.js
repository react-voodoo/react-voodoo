/**
 * Core inertia physics & waypoint election tests:
 *  - velocity accumulation (hold) → momentum arc (release)
 *  - direction-reversal velocity reset
 *  - waypoint election: midpoint, gravity weighting, maxJump
 *  - programmatic momentum (dispatch): force-snap direction, accumulation, reversal
 *  - bounds clamping (snapToBounds)
 *  - shouldLoop during settle — incl. the spring-overshoot teleport guard
 *  - isInbound / setPos
 *
 * Time is mocked and the 16ms poll loop is driven manually, like
 * Tweener.applyInertia() does.
 */
import Inertia from '../../../src/utils/inertia';

let now;

beforeEach(() => {
	now = 100000;
	jest.spyOn(Date, 'now').mockImplementation(() => now);
});

afterEach(() => {
	Date.now.mockRestore();
});

/** Drag through `positions`, one hold per 16ms tick, then release. */
function drag( inertia, positions ) {
	inertia.startMove();
	for ( const p of positions ) {
		now += 16;
		inertia.hold(p);
	}
	inertia.release();
}

/** Run the 16ms poll loop until the animation completes; returns sampled positions. */
function settle( inertia, maxTicks = 2000 ) {
	const samples = [];
	let ticks     = 0;
	while ( inertia.active && ticks++ < maxTicks ) {
		now += 16;
		samples.push(inertia.update(now));
	}
	expect(ticks).toBeLessThan(maxTicks);
	return samples;
}

describe('momentum physics', () => {
	it('release converts drag velocity into a forward momentum arc', () => {
		const inertia = new Inertia({ value: 0, min: 0, max: 10000 });
		drag(inertia, [30, 60]);// ~937 u/s

		expect(inertia._.targetDist).toBeGreaterThan(0);
		expect(inertia._.targetDuration).toBeGreaterThan(0);

		settle(inertia);
		// momentum carried the axis well beyond the release position
		expect(inertia._.pos).toBeGreaterThan(60);
	});

	it('higher velocity → longer momentum distance', () => {
		const slow = new Inertia({ value: 0, min: 0, max: 10000 });
		drag(slow, [5, 10]);
		const fast = new Inertia({ value: 0, min: 0, max: 10000 });
		drag(fast, [60, 120]);

		expect(Math.abs(fast._.targetDist)).toBeGreaterThan(Math.abs(slow._.targetDist));
	});

	it('direction reversal (held > velocityResetTm) resets the velocity base', () => {
		const inertia = new Inertia({ value: 0, min: -10000, max: 10000 });
		inertia.startMove();
		// forward for ~200ms
		for ( const p of [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260] ) {
			now += 16;
			inertia.hold(p);
		}
		// then backward — direction change after >150ms of forward motion
		now += 16;
		inertia.hold(250);
		inertia.release();

		// the forward momentum was discarded: remaining arc is small
		expect(Math.abs(inertia._.targetDist)).toBeLessThan(50);
	});

	it('snapToBounds clamps the momentum arc to the axis bounds', () => {
		const inertia = new Inertia({ value: 0, min: 0, max: 100 });
		inertia.setPos(40);
		drag(inertia, [70, 100]);// huge fling, would land far past max

		expect(inertia._.targetDist).toBeCloseTo(0, 5);// pos clamped at 100 already
		settle(inertia);
		expect(inertia._.pos).toBeLessThanOrEqual(100);
	});

	it('disabled inertia stops immediately (no momentum)', () => {
		const inertia = new Inertia({ value: 0, min: 0, max: 1000, disabled: true });
		drag(inertia, [30, 60]);
		expect(inertia._.targetDist).toBe(0);
	});
});

describe('waypoint election', () => {
	const wps = () => [{ at: 0 }, { at: 100 }, { at: 200 }, { at: 300 }];

	it('elects the waypoint past the midpoint of the projected landing', () => {
		const willSnap = jest.fn();
		const inertia  = new Inertia({ value: 0, min: 0, max: 300, wayPoints: wps(), willSnap });
		drag(inertia, [30, 60]);// lands ~210 → nearest wp 200

		expect(willSnap).toHaveBeenCalled();
		const [index] = willSnap.mock.calls[0];
		expect(index).toBeGreaterThanOrEqual(1);

		settle(inertia);
		// exact landing on the elected waypoint
		expect([0, 100, 200, 300]).toContain(inertia._.pos);
		expect(inertia._.pos).toBe(wps()[index].at);
	});

	it('maxJump caps how many waypoints a single fling can skip', () => {
		const willSnap = jest.fn();
		const inertia  = new Inertia({
			                             value: 0, min: 0, max: 300,
			                             wayPoints: wps(), maxJump: 1, willSnap
		                             });
		// current waypoint index must be known for maxJump to apply
		expect(inertia._.currentWayPointIndex).toBe(0);

		drag(inertia, [60, 120]);// massive fling, would skip to index 2-3

		expect(willSnap).toHaveBeenCalledWith(1, expect.objectContaining({ at: 100 }));
		settle(inertia);
		expect(inertia._.pos).toBe(100);
	});

	it('gravity > 1 makes a waypoint stickier (larger capture zone)', () => {
		// land between two waypoints, below the neutral midpoint (~35)
		const landBetween = ( gravity ) => {
			const inertia = new Inertia({
				                            value    : 0, min: 0, max: 100,
				                            wayPoints: [{ at: 0 }, { at: 100, gravity }]
			                            });
			drag(inertia, [5, 10]);// momentum lands ~35 — below the neutral mid (50)
			settle(inertia);
			return inertia._.pos;
		};

		// neutral gravity: 35 < mid 50 → elects 0
		expect(landBetween(1)).toBe(0);
		// gravity 3 on the right waypoint pulls the boundary toward the left
		// (mid × g[left]/g[right] ≈ 16.7): the same landing is now captured by
		// the sticky waypoint — the documented semantics
		expect(landBetween(3)).toBe(100);
	});
});

describe('dispatch (programmatic momentum)', () => {
	it('forces the snap direction even below the midpoint (goNext pattern)', () => {
		const willSnap = jest.fn();
		const inertia  = new Inertia({
			                             value: 0, min: 0, max: 200,
			                             wayPoints: [{ at: 0 }, { at: 100 }, { at: 200 }], willSnap
		                             });
		inertia.dispatch(10, 500);// tiny push, far below mid — direction wins

		expect(willSnap).toHaveBeenCalledWith(1, expect.objectContaining({ at: 100 }));
		settle(inertia);
		expect(inertia._.pos).toBe(100);
	});

	it('accumulates same-direction dispatches, restarts on reversal', () => {
		const inertia = new Inertia({ value: 0, min: -1000, max: 1000 });
		inertia.dispatch(50, 500);
		const d1 = inertia._.targetDist;
		inertia.dispatch(50, 500);
		expect(inertia._.targetDist).toBeGreaterThan(d1);// accumulated

		inertia.dispatch(-50, 500);
		expect(inertia._.targetDist).toBe(-50);// reversed → restarted
	});
});

describe('shouldLoop', () => {
	it('teleports during the settle and still lands exactly on the elected waypoint', () => {
		const onSnap  = jest.fn();
		const inertia = new Inertia({
			                            value     : 0, min: -1000, max: 1000,
			                            wayPoints : [{ at: 0 }, { at: 100 }],
			                            shouldLoop: pos => (pos > 110 ? -100 : pos < -90 ? 100 : null),
			                            onSnap
		                            });
		inertia.setPos(20);
		drag(inertia, [50, 90]);// momentum lands past the 110 threshold

		settle(inertia);
		expect(onSnap).toHaveBeenCalled();
		expect([0, 100]).toContain(inertia._.pos);
	});

	it('spring overshoot past a loop threshold does NOT double-teleport (snap guard)', () => {
		const onSnap     = jest.fn();
		const shouldLoop = jest.fn(pos => (pos > 110 ? -100 : pos < -90 ? 100 : null));
		const inertia    = new Inertia({
			                               value     : 0, min: -1000, max: 1000,
			                               wayPoints : [{ at: 0 }, { at: 100 }],
			                               // bouncy: overshoots the waypoint at 100, crossing 110
			                               settle    : { stiffness: 300, damping: 6 },
			                               shouldLoop,
			                               onSnap
		                               });
		inertia.setPos(20);
		drag(inertia, [50, 90]);

		const samples = settle(inertia);
		// the bounce really went past the threshold at least once
		expect(Math.max(...samples)).toBeGreaterThan(100);
		// and the axis still landed exactly on the elected waypoint
		// (a stray teleport during the bounce would leave it ~100 units away)
		expect(onSnap).toHaveBeenCalledWith(1, expect.objectContaining({ at: 100 }));
		expect(inertia._.pos).toBe(100);
	});
});

describe('state helpers', () => {
	it('isInbound projects the next position during an active hold', () => {
		const inertia = new Inertia({ value: 50, min: 0, max: 100 });
		// nextPos is only projected relative to the last hold position
		inertia.startMove();
		now += 16;
		inertia.hold(60);

		expect(inertia.isInbound(70)).toBe(true);
		expect(inertia.isInbound(160)).toBe(false);
		expect(inertia.isInbound(-40)).toBe(false);
	});

	it('setPos teleports instantly, clamped to bounds, and stops any animation', () => {
		const inertia = new Inertia({ value: 0, min: 0, max: 100 });
		drag(inertia, [30, 60]);
		expect(inertia.active).toBe(true);

		inertia.setPos(250);
		expect(inertia.active).toBe(false);
		expect(inertia._.pos).toBe(100);// clamped to max
	});
});
