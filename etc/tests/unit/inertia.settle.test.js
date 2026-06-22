/*
 * @author : Nathanael BRAUN <pp9ping@gmail.com>
 *
 * Copyright 2026 Nathanael BRAUN
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Unit tests for the Inertia settle options:
 *  - settle: "d3EaseName" | fn | { stiffness, damping, mass } (spring)
 *  - per-waypoint settle override ({ at, settle })
 *  - reducedMotion callback → instant jump to the predicted snap target
 *
 * The engine is poll-based and reads Date.now(); time is mocked and advanced
 * manually, and update(at) is driven like Tweener.applyInertia() does (16ms ticks).
 */
import * as d3Ease from 'd3-ease';
import Inertia     from '../../../src/utils/inertia';

let now;

beforeEach(() => {
	now = 100000;
	jest.spyOn(Date, 'now').mockImplementation(() => now);
});

afterEach(() => {
	Date.now.mockRestore();
});

/** Simulate a rightward drag gesture ending around `endPos` with real velocity. */
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

const baseOpts = () => ({
	value    : 0,
	min      : 0,
	max      : 100,
	wayPoints: [{ at: 0 }, { at: 100 }]
});

describe('Inertia settle option', () => {
	it('defaults to easePolyOut (existing behavior preserved)', () => {
		const inertia = new Inertia(baseOpts());
		expect(inertia._.inertiaFn).toBe(d3Ease.easePolyOut);
	});

	it('accepts a d3-ease function name', () => {
		const inertia = new Inertia({ ...baseOpts(), settle: 'easeCubicOut' });
		expect(inertia._.inertiaFn).toBe(d3Ease.easeCubicOut);
	});

	it('warns and falls back on an unknown easing name', () => {
		const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
		try {
			const inertia = new Inertia({ ...baseOpts(), settle: 'easeNope' });
			expect(inertia._.inertiaFn).toBe(d3Ease.easePolyOut);
			expect(warn).toHaveBeenCalled();
		}
		finally {
			warn.mockRestore();
		}
	});

	it('accepts a custom easing function', () => {
		const custom  = x => x;
		const inertia = new Inertia({ ...baseOpts(), settle: custom });
		expect(inertia._.inertiaFn).toBe(custom);
	});

	it('keeps settle through updateConf (axis re-init)', () => {
		const inertia = new Inertia({ ...baseOpts(), settle: 'easeCubicOut' });
		inertia.updateConf({ ...baseOpts(), settle: 'easeCubicOut' });
		expect(inertia._.inertiaFn).toBe(d3Ease.easeCubicOut);
		// and removal restores the default
		inertia.updateConf(baseOpts());
		expect(inertia._.inertiaFn).toBe(d3Ease.easePolyOut);
	});

	it('default settle still lands exactly on the waypoint (regression)', () => {
		const onSnap  = jest.fn();
		const inertia = new Inertia({ ...baseOpts(), onSnap });
		drag(inertia, [30, 60]);
		settle(inertia);
		expect(inertia._.pos).toBe(100);
		expect(onSnap).toHaveBeenCalledWith(1, expect.objectContaining({ at: 100 }));
	});

	describe('spring settle ({ stiffness, damping, mass })', () => {
		it('generates the curve at release and lands exactly on the waypoint', () => {
			const onSnap   = jest.fn();
			const willSnap = jest.fn();
			const inertia  = new Inertia({
				                             ...baseOpts(),
				                             settle: { stiffness: 200, damping: 12 },
				                             onSnap, willSnap
			                             });
			drag(inertia, [30, 60]);

			// curve & duration were generated from the gesture (not the default ease)
			expect(inertia._.inertiaFn).not.toBe(d3Ease.easePolyOut);
			expect(inertia._.targetDuration).toBeGreaterThanOrEqual(50);
			expect(inertia._.targetDuration).toBeLessThanOrEqual(10000);
			// predictive snap is still authoritative & known at release
			expect(willSnap).toHaveBeenCalledWith(1, expect.objectContaining({ at: 100 }));

			settle(inertia);
			expect(inertia._.pos).toBe(100);
			expect(onSnap).toHaveBeenCalledWith(1, expect.objectContaining({ at: 100 }));
		});

		it('bouncy params overshoot the waypoint during the settle', () => {
			const inertia = new Inertia({
				                            ...baseOpts(),
				                            settle: { stiffness: 300, damping: 6 }
			                            });
			drag(inertia, [30, 60]);
			const samples = settle(inertia);
			expect(Math.max(...samples)).toBeGreaterThan(100);
			expect(inertia._.pos).toBe(100);
		});

		it('a waypoint-level settle overrides the axis-level one', () => {
			const inertia = new Inertia({
				                            ...baseOpts(),
				                            // axis level: heavily damped — no overshoot
				                            settle   : { stiffness: 100, damping: 50 },
				                            // waypoint level: bouncy
				                            wayPoints: [{ at: 0 }, { at: 100, settle: { stiffness: 300, damping: 6 } }]
			                            });
			drag(inertia, [30, 60]);
			const samples = settle(inertia);
			expect(Math.max(...samples)).toBeGreaterThan(100);
			expect(inertia._.pos).toBe(100);
		});
	});

	describe('reducedMotion', () => {
		it('release jumps straight to the predicted snap target, all callbacks fire', () => {
			const onSnap   = jest.fn();
			const willSnap = jest.fn();
			const onStop   = jest.fn();
			const inertia  = new Inertia({
				                             ...baseOpts(),
				                             reducedMotion: () => true,
				                             onSnap, willSnap, onStop
			                             });
			drag(inertia, [30, 60]);
			expect(inertia._.targetDuration).toBe(1);

			// first 16ms tick completes the (1ms) animation: exact landing
			now += 16;
			inertia.update(now);
			expect(inertia.active).toBe(false);
			expect(inertia._.pos).toBe(100);
			expect(willSnap).toHaveBeenCalledWith(1, expect.objectContaining({ at: 100 }));
			expect(onSnap).toHaveBeenCalledWith(1, expect.objectContaining({ at: 100 }));
			expect(onStop).toHaveBeenCalled();
		});

		it('inactive reducedMotion leaves the settle animated', () => {
			const inertia = new Inertia({ ...baseOpts(), reducedMotion: () => false });
			drag(inertia, [30, 60]);
			expect(inertia._.targetDuration).toBeGreaterThan(1);
		});

		it('dispatch() is also reduced', () => {
			const inertia = new Inertia({ ...baseOpts(), reducedMotion: () => true });
			inertia.dispatch(60, 500);
			expect(inertia._.targetDuration).toBe(1);
			now += 16;
			inertia.update(now);
			expect(inertia._.pos).toBe(100);
		});

		it('1:1 dragging (hold) is intentionally unaffected', () => {
			const inertia = new Inertia({ ...baseOpts(), reducedMotion: () => true });
			inertia.startMove();
			now += 16;
			inertia.hold(42);
			expect(inertia._.pos).toBe(42);
		});
	});
});
