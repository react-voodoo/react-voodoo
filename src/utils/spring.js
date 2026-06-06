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
 * springSettle — closed-form damped-spring easing factory.
 *
 * Solves the damped harmonic oscillator m·ẍ + c·ẋ + k·(x−1) = 0 with x(0)=0 and
 * ẋ(0)=v0, i.e. a spring travelling from 0 to a target of 1 with an initial
 * velocity. Because the solution is analytical there is no per-frame integration:
 * the result is a plain easing function usable by the Inertia settle loop, plus
 * the physical settle duration (time until the oscillation envelope falls below
 * `restDelta`). The final exact landing is handled by the caller (Inertia snaps
 * precisely onto the target waypoint on completion).
 *
 * Regimes (ζ = c / 2√(km)):
 *  - under-damped  (ζ < 1) — decaying oscillation: the "bouncy" spring feel
 *  - critically damped (ζ = 1) and over-damped (ζ > 1) — smooth, no overshoot
 *
 * @param {number} v0  initial velocity in normalised distance per second
 *                     (axis velocity / total travel distance)
 * @param {Object} cfg spring parameters
 * @param {number} [cfg.stiffness=100] spring constant k
 * @param {number} [cfg.damping=10]    damping coefficient c
 * @param {number} [cfg.mass=1]        mass m
 * @param {number} [cfg.restDelta=.005] envelope amplitude ending the settle
 * @returns {{ease: function(number):number, duration: number}}
 *          ease: normalised easing (u in [0,1] of `duration`), duration in ms
 */
export function springSettle( v0 = 0, { stiffness = 100, damping = 10, mass = 1, restDelta = .005 } = {} ) {
	// sanitize — a non-positive stiffness/damping/mass has no physical solution
	if ( !(stiffness > 0) || !(damping > 0) || !(mass > 0) ) {
		console.warn("[react-voodoo] springSettle: stiffness, damping & mass must be > 0 — falling back to defaults");
		stiffness = 100;
		damping   = 10;
		mass      = 1;
	}
	if ( !(restDelta > 0) )
		restDelta = .005;

	// cap the normalised velocity so a huge fling over a tiny remaining distance
	// cannot produce an absurdly large overshoot amplitude
	v0 = Math.max(-40, Math.min(40, +v0 || 0));

	const w0   = Math.sqrt(stiffness / mass),
	      zeta = damping / (2 * Math.sqrt(stiffness * mass));
	let ease, duration;

	if ( zeta < 1 ) {
		// under-damped: x(t) = 1 − e^(−ζω0·t)·( cos(ωd·t) − B·sin(ωd·t) )
		const wd  = w0 * Math.sqrt(1 - zeta * zeta),
		      B   = (v0 - zeta * w0) / wd,
		      env = Math.sqrt(1 + B * B);

		duration = Math.log(Math.max(env / restDelta, 1)) / (zeta * w0);

		const T = duration;
		ease    = u => {
			const t = u * T;
			return 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) - B * Math.sin(wd * t));
		};
	}
	else if ( zeta === 1 ) {
		// critically damped: x(t) = 1 − e^(−ω0·t)·(1 − C·t)
		const C = v0 - w0;

		// fixed-point refinement to account for the polynomial term in the envelope
		duration = Math.log(1 / restDelta) / w0;
		duration = Math.log(Math.max((1 + Math.abs(C) * duration) / restDelta, 1)) / w0;

		const T = duration;
		ease    = u => {
			const t = u * T;
			return 1 - Math.exp(-w0 * t) * (1 - C * t);
		};
	}
	else {
		// over-damped: x(t) = 1 + A·e^(r1·t) + B·e^(r2·t)  (r1 = slow root)
		const s  = Math.sqrt(zeta * zeta - 1),
		      r1 = -w0 * (zeta - s),
		      r2 = -w0 * (zeta + s),
		      A  = (v0 + r2) / (r1 - r2),
		      B  = -1 - A;

		duration = Math.log(Math.max((Math.abs(A) + Math.abs(B)) / restDelta, 1)) / -r1;

		const T = duration;
		ease    = u => {
			const t = u * T;
			return 1 + A * Math.exp(r1 * t) + B * Math.exp(r2 * t);
		};
	}

	return { ease, duration: duration * 1000 };
}

export default springSettle;
