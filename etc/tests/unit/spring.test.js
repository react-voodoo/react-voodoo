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
 * Unit tests for the closed-form damped-spring easing factory (utils/spring.js).
 *
 * The factory returns a normalised easing x(u) (u ∈ [0,1] of `duration` ms)
 * describing a spring travelling 0 → 1 with a given initial velocity.
 */
import { springSettle } from '../../../src/utils/spring';

const sample = ( ease, n = 200 ) => {
	const out = [];
	for ( let i = 0; i <= n; i++ )
		out.push(ease(i / n));
	return out;
};

describe('springSettle', () => {
	it('starts at 0 and converges to 1 at the end of its duration', () => {
		const { ease } = springSettle(0, { stiffness: 100, damping: 10 });
		expect(ease(0)).toBeCloseTo(0, 6);
		expect(Math.abs(1 - ease(1))).toBeLessThan(0.01);
	});

	it('returns a positive, finite duration in ms', () => {
		const { duration } = springSettle(0, { stiffness: 100, damping: 10 });
		expect(duration).toBeGreaterThan(0);
		expect(Number.isFinite(duration)).toBe(true);
	});

	it('under-damped springs overshoot the target (the bouncy case)', () => {
		// ζ = 5 / (2·√200) ≈ 0.18 — clearly under-damped
		const { ease } = springSettle(0, { stiffness: 200, damping: 5 });
		expect(Math.max(...sample(ease))).toBeGreaterThan(1.001);
	});

	it('over-damped springs never overshoot from rest', () => {
		// ζ = 50 / (2·√100) = 2.5
		const { ease } = springSettle(0, { stiffness: 100, damping: 50 });
		expect(Math.max(...sample(ease))).toBeLessThanOrEqual(1.001);
	});

	it('critically damped springs never overshoot from rest', () => {
		// ζ = 20 / (2·√100) = 1 exactly
		const { ease } = springSettle(0, { stiffness: 100, damping: 20, mass: 1 });
		expect(Math.max(...sample(ease))).toBeLessThanOrEqual(1.001);
	});

	it('honors the initial velocity direction', () => {
		// positive v0 → starts moving toward the target faster than from rest
		const fromRest = springSettle(0, { stiffness: 100, damping: 10 });
		const thrown   = springSettle(10, { stiffness: 100, damping: 10 });
		// compare early progress at the same physical time (durations differ slightly)
		const t        = 20;// ms
		expect(thrown.ease(t / thrown.duration)).toBeGreaterThan(fromRest.ease(t / fromRest.duration));

		// negative v0 (thrown away from the target) → initially moves backward
		const reversed = springSettle(-10, { stiffness: 100, damping: 10 });
		expect(reversed.ease(0.01)).toBeLessThan(0);
	});

	it('caps extreme normalised velocities instead of exploding', () => {
		const { ease, duration } = springSettle(1e6, { stiffness: 100, damping: 10 });
		expect(Number.isFinite(duration)).toBe(true);
		sample(ease).forEach(v => expect(Number.isFinite(v)).toBe(true));
	});

	it('falls back to defaults on non-physical parameters without NaN', () => {
		const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
		try {
			const { ease, duration } = springSettle(0, { stiffness: -5, damping: 0 });
			expect(Number.isFinite(duration)).toBe(true);
			expect(ease(0)).toBeCloseTo(0, 6);
			expect(Math.abs(1 - ease(1))).toBeLessThan(0.01);
			expect(warn).toHaveBeenCalled();
		}
		finally {
			warn.mockRestore();
		}
	});

	it('uses defaults when called without config', () => {
		const { ease, duration } = springSettle();
		expect(ease(0)).toBeCloseTo(0, 6);
		expect(Math.abs(1 - ease(1))).toBeLessThan(0.01);
		expect(duration).toBeGreaterThan(0);
	});
});
