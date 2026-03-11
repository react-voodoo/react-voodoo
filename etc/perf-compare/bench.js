#!/usr/bin/env node
/**
 * perf-compare/bench.js
 *
 * Head-to-head performance: react-voodoo (tween-axis) vs its 3 main competitors
 *
 *   • GSAP          — industry-standard timeline (powers many React animation solutions)
 *   • Popmotion     — the engine behind Framer Motion (direct React competitor)
 *   • Anime.js      — lightweight alternative used heavily in React projects
 *
 * What is measured
 * ────────────────
 * Each library animates the same 5 numeric properties (opacity, x, y, scale, rotate)
 * along a 0→100 timeline.  We measure how many "seeks" (moving the playhead to a
 * given position) each engine can perform per second.
 *
 * This is the core hot-path cost that runs every animation frame:
 *   • tween-axis    → axis.goTo(pos, scope)          — delta-based, additive
 *   • GSAP          → timeline.progress(t)            — absolute-seek timeline
 *   • Anime.js      → animation.seek(ms)              — absolute-seek timeline
 *   • Popmotion     → 5× interpolate(t)               — pure stateless interpolation
 *
 * Important note on tween-axis
 * ────────────────────────────
 * tween-axis is delta-based: goTo() emits *deltas* into a scope object rather than
 * setting absolute values.  This enables additive composition (multiple independent
 * axes layered on the same element) — the core feature of react-voodoo.
 * The benchmarks below exercise its primary use case (sequential frame-by-frame
 * advance) AND worst-case scrubbing (random position jumps).
 *
 * Seven scenarios:
 *   1. Sequential sweep     — monotonically advancing positions (60 fps simulation)
 *   2. Random seeks         — uniformly random positions (worst-case scrubbing)
 *   3. 20-property scale    — same as #1 but with 20 animated properties
 *   4. With easing          — easeInOutCubic applied per-property
 *   5. Additive composition — 3 axes all writing to the same 5 props simultaneously
 *   6. Spring-like layers   — 3 axes at different speeds (t, t×0.7, t×0.3) on same 5 props
 *   7. Long timeline        — 20 sequential segments (keyframe-heavy animation)
 *
 * Scenarios 5 & 6 are unique to react-voodoo's delta-based model.
 * Other libraries simulate the same behaviour by running N timelines and manually summing.
 */
"use strict";

const { performance } = require("perf_hooks");

// ─── Constants ────────────────────────────────────────────────────────────────

const WARMUP        = 5_000;   // iterations before timing starts (JIT warm-up)
const RUNS          = 5;       // timed runs per scenario
const CALLS_PER_RUN = 80_000;  // seeks per run

// ─── Helpers ─────────────────────────────────────────────────────────────────

function median(arr) {
	const s = [...arr].sort((a, b) => a - b);
	const m = Math.floor(s.length / 2);
	return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function fmtOps(ops) {
	if (ops >= 1e6) return (ops / 1e6).toFixed(2) + "M";
	if (ops >= 1e3) return (ops / 1e3).toFixed(1) + "K";
	return ops.toFixed(0);
}

/**
 * Run a sequential-sweep benchmark.
 * setup() must return fn(t: 0..1) that performs one seek.
 */
function runBench(label, setup, cleanup, calls = CALLS_PER_RUN) {
	const fn = setup();
	for (let i = 0; i < WARMUP; i++) fn(i / WARMUP);

	const times = [];
	for (let r = 0; r < RUNS; r++) {
		const t0 = performance.now();
		for (let i = 0; i < calls; i++) fn(i / calls);
		times.push(performance.now() - t0);
	}

	if (cleanup) cleanup();

	const med   = median(times);
	const total = times.reduce((a, b) => a + b, 0);
	const opsPS = (calls * 1000) / (total / RUNS);
	return { label, med, opsPS };
}

/**
 * Run a random-seek benchmark.
 * Positions are pre-generated so the RNG is not in the hot path.
 */
function runRandomBench(label, setup, cleanup, calls = CALLS_PER_RUN) {
	const positions = new Float64Array(calls);
	for (let i = 0; i < calls; i++) positions[i] = Math.random();

	const fn = setup();
	for (let i = 0; i < WARMUP; i++) fn(positions[i % calls]);

	const times = [];
	for (let r = 0; r < RUNS; r++) {
		const t0 = performance.now();
		for (let i = 0; i < calls; i++) fn(positions[i]);
		times.push(performance.now() - t0);
	}

	if (cleanup) cleanup();

	const med   = median(times);
	const total = times.reduce((a, b) => a + b, 0);
	const opsPS = (calls * 1000) / (total / RUNS);
	return { label, med, opsPS };
}

/**
 * Print a sorted comparison table.  tween-axis is always the reference.
 */
function printResults(results) {
	const sorted   = [...results].sort((a, b) => b.opsPS - a.opsPS);
	const maxOps   = sorted[0].opsPS;
	const baseline = results.find(r => r.label === "voodoo/js").opsPS;

	for (const r of sorted) {
		const bar   = "█".repeat(Math.max(1, Math.round(r.opsPS / maxOps * 28))).padEnd(28);
		const ratio = r.opsPS / baseline;
		const rel   = ratio >= 1
			? ("+" + ((ratio - 1) * 100).toFixed(0) + "% vs voodoo").padEnd(18)
			: ("-" + ((1 - ratio) * 100).toFixed(0) + "% vs voodoo").padEnd(18);
		console.log(
			`  ${r.label.padEnd(13)} ${bar}  ` +
			`${(fmtOps(r.opsPS) + " ops/s").padEnd(14)}  ` +
			`med ${r.med.toFixed(1).padStart(7)} ms   ${rel}`
		);
	}
}

// ─── Library Setup ────────────────────────────────────────────────────────────

// Minimal DOM polyfill — anime.js references NodeList / document at module load time
const noop = () => {};
global.NodeList       = global.NodeList       || class NodeList {};
global.HTMLCollection = global.HTMLCollection || class HTMLCollection {};
global.SVGElement     = global.SVGElement     || class SVGElement {};
global.Element        = global.Element        || class Element {};
global.document       = global.document       || { querySelectorAll: () => [], addEventListener: noop };
global.window         = global.window         || { requestAnimationFrame: noop, cancelAnimationFrame: noop };

async function main() {

	// 1a. tween-axis JS (react-voodoo's engine) ────────────────────────────────
	const TweenAxis     = require("../tween-axis/dist/TweenAxis.js").default;
	// 1b. tween-axis WASM ───────────────────────────────────────────────────────
	const TweenAxisWasm = require("../tween-axis/dist/TweenAxisWasm.js").default;

	/** Create a WASM-backed axis and wait for the module to be ready. */
	async function makeWasmAxis(descriptors) {
		const ax = new TweenAxisWasm(descriptors);
		await ax._ready;
		return ax;
	}

	// 2. GSAP ───────────────────────────────────────────────────────────────────
	const { gsap } = require("gsap");

	// 3. Anime.js ───────────────────────────────────────────────────────────────
	const anime = require("animejs");

	// 4. Popmotion (powers Framer Motion) ───────────────────────────────────────
	// v11 is ESM-only — use dynamic import
	const { interpolate: pmInterp } = await import("popmotion");

	// ─── Shared property sets ─────────────────────────────────────────────────

	const PROPS_5 = { opacity: 1, x: 200, y: 100, scale: 2, rotate: 360 };
	const INIT_5  = { opacity: 0, x: 0,   y: 0,   scale: 1, rotate: 0   };
	// tween-axis apply values are full-range deltas:
	//   opacity 0→1  : delta = 1
	//   scale   1→2  : delta = 1  (base 1 is external; axis only tracks the +1 change)
	//   others match absolute targets
	const APPLY_5 = { opacity: 1, x: 200, y: 100, scale: 1, rotate: 360 };

	function make20Props() {
		const from  = {}, to = {}, apply = {};
		for (let i = 0; i < 20; i++) {
			from["p"  + i] = 0;
			to["p"    + i] = (i + 1) * 10;
			apply["p" + i] = (i + 1) * 10;
		}
		return { from, to, apply };
	}

	// Pre-build WASM axes (await _ready once; goTo is synchronous afterwards)
	const wasm5  = await makeWasmAxis([{ from: 0, duration: 100, apply: APPLY_5 }]);
	// Three independent axes for additive / spring scenarios (share APPLY_5 descriptor)
	const wasmAdd = [
		await makeWasmAxis([{ from: 0, duration: 100, apply: APPLY_5 }]),
		await makeWasmAxis([{ from: 0, duration: 100, apply: APPLY_5 }]),
		await makeWasmAxis([{ from: 0, duration: 100, apply: APPLY_5 }]),
	];
	const { from: p20from, to: p20to, apply: p20apply } = make20Props();
	const wasm20 = await makeWasmAxis([{ from: 0, duration: 100, apply: p20apply }]);

	// ═══════════════════════════════════════════════════════════════════════════
	// SCENARIO 1 — 5 properties, sequential sweep (primary use case)
	// ═══════════════════════════════════════════════════════════════════════════

	console.log("\n" + "═".repeat(82));
	console.log("  Scenario 1 · 5 props · sequential sweep  (t: 0→1, frame-by-frame advance)");
	console.log("═".repeat(82));

	const s1 = [
		runBench("voodoo/js", () => {
			const axis  = new TweenAxis([{ from: 0, duration: 100, apply: APPLY_5 }]);
			const scope = { opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 };
			return (t) => axis.goTo(t * 100, scope);
		}),

		runBench("voodoo/wasm", () => {
			const scope = { opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 };
			return (t) => wasm5.goTo(t * 100, scope);
		}),

		runBench("gsap", () => {
			const obj = { ...INIT_5 };
			const tl  = gsap.timeline({ paused: true });
			tl.to(obj, { ...PROPS_5, duration: 1 }, 0);
			return (t) => tl.progress(t);
		}, () => gsap.globalTimeline.clear()),

		runBench("animejs", () => {
			const obj  = { ...INIT_5 };
			const anim = anime({ targets: obj, ...PROPS_5, duration: 1000, autoplay: false, easing: "linear" });
			return (t) => anim.seek(t * 1000);
		}),

		runBench("popmotion/FM", () => {
			const iOp  = pmInterp([0, 1], [0, 1]);
			const iX   = pmInterp([0, 1], [0, 200]);
			const iY   = pmInterp([0, 1], [0, 100]);
			const iSc  = pmInterp([0, 1], [1, 2]);
			const iRot = pmInterp([0, 1], [0, 360]);
			const out  = {};
			return (t) => {
				out.opacity = iOp(t); out.x = iX(t); out.y = iY(t);
				out.scale = iSc(t);   out.rotate = iRot(t);
			};
		}),
	];
	printResults(s1);

	// ═══════════════════════════════════════════════════════════════════════════
	// SCENARIO 2 — 5 properties, random seeks (worst-case scrubbing)
	// ═══════════════════════════════════════════════════════════════════════════

	console.log("\n" + "═".repeat(82));
	console.log("  Scenario 2 · 5 props · random seeks       (worst-case position scrubbing)");
	console.log("═".repeat(82));

	const s2 = [
		runRandomBench("voodoo/js", () => {
			const axis  = new TweenAxis([{ from: 0, duration: 100, apply: APPLY_5 }]);
			const scope = { opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 };
			return (t) => axis.goTo(t * 100, scope);
		}),

		runRandomBench("voodoo/wasm", () => {
			const scope = { opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 };
			return (t) => wasm5.goTo(t * 100, scope);
		}),

		runRandomBench("gsap", () => {
			const obj = { ...INIT_5 };
			const tl  = gsap.timeline({ paused: true });
			tl.to(obj, { ...PROPS_5, duration: 1 }, 0);
			return (t) => tl.progress(t);
		}, () => gsap.globalTimeline.clear()),

		runRandomBench("animejs", () => {
			const obj  = { ...INIT_5 };
			const anim = anime({ targets: obj, ...PROPS_5, duration: 1000, autoplay: false, easing: "linear" });
			return (t) => anim.seek(t * 1000);
		}),

		runRandomBench("popmotion/FM", () => {
			const iOp  = pmInterp([0, 1], [0, 1]);
			const iX   = pmInterp([0, 1], [0, 200]);
			const iY   = pmInterp([0, 1], [0, 100]);
			const iSc  = pmInterp([0, 1], [1, 2]);
			const iRot = pmInterp([0, 1], [0, 360]);
			const out  = {};
			return (t) => {
				out.opacity = iOp(t); out.x = iX(t); out.y = iY(t);
				out.scale = iSc(t);   out.rotate = iRot(t);
			};
		}),
	];
	printResults(s2);

	// ═══════════════════════════════════════════════════════════════════════════
	// SCENARIO 3 — 20 properties, sequential sweep (property-count scaling)
	// ═══════════════════════════════════════════════════════════════════════════

	console.log("\n" + "═".repeat(82));
	console.log("  Scenario 3 · 20 props · sequential sweep  (property-count scaling)");
	console.log("═".repeat(82));

	const CALLS_20 = 40_000;

	const s3 = [
		runBench("voodoo/js", () => {
			const axis  = new TweenAxis([{ from: 0, duration: 100, apply: p20apply }]);
			const scope = { ...p20from };
			return (t) => axis.goTo(t * 100, scope);
		}, null, CALLS_20),

		runBench("voodoo/wasm", () => {
			const scope = { ...p20from };
			return (t) => wasm20.goTo(t * 100, scope);
		}, null, CALLS_20),

		runBench("gsap", () => {
			const obj = { ...p20from };
			const tl  = gsap.timeline({ paused: true });
			tl.to(obj, { ...p20to, duration: 1 }, 0);
			return (t) => tl.progress(t);
		}, () => gsap.globalTimeline.clear(), CALLS_20),

		runBench("animejs", () => {
			const obj  = { ...p20from };
			const anim = anime({ targets: obj, ...p20to, duration: 1000, autoplay: false, easing: "linear" });
			return (t) => anim.seek(t * 1000);
		}, null, CALLS_20),

		runBench("popmotion/FM", () => {
			const keys    = Object.keys(p20from);
			const interps = keys.map(k => pmInterp([0, 1], [p20from[k], p20to[k]]));
			const out     = {};
			return (t) => { for (let i = 0; i < 20; i++) out[keys[i]] = interps[i](t); };
		}, null, CALLS_20),
	];
	printResults(s3);

	// ═══════════════════════════════════════════════════════════════════════════
	// SCENARIO 4 — 5 properties, easeInOutCubic (easing overhead)
	// ═══════════════════════════════════════════════════════════════════════════

	console.log("\n" + "═".repeat(82));
	console.log("  Scenario 4 · 5 props · easeInOutCubic     (easing overhead)");
	console.log("═".repeat(82));

	const easeInOutCubic = t =>
		t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

	const wasm5ease = await makeWasmAxis([{ from: 0, duration: 100, apply: APPLY_5, easeFn: easeInOutCubic }]);

	const s4 = [
		runBench("voodoo/js", () => {
			const axis  = new TweenAxis([{ from: 0, duration: 100, apply: APPLY_5, easeFn: easeInOutCubic }]);
			const scope = { opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 };
			return (t) => axis.goTo(t * 100, scope);
		}),

		runBench("voodoo/wasm", () => {
			const scope = { opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 };
			return (t) => wasm5ease.goTo(t * 100, scope);
		}),

		runBench("gsap", () => {
			const obj = { ...INIT_5 };
			const tl  = gsap.timeline({ paused: true });
			tl.to(obj, { ...PROPS_5, duration: 1, ease: "power2.inOut" }, 0);
			return (t) => tl.progress(t);
		}, () => gsap.globalTimeline.clear()),

		runBench("animejs", () => {
			const obj  = { ...INIT_5 };
			const anim = anime({ targets: obj, ...PROPS_5, duration: 1000, autoplay: false, easing: "easeInOutCubic" });
			return (t) => anim.seek(t * 1000);
		}),

		// popmotion interpolate is linear — apply easing manually for a fair comparison
		runBench("popmotion/FM", () => {
			const iOp  = pmInterp([0, 1], [0, 1]);
			const iX   = pmInterp([0, 1], [0, 200]);
			const iY   = pmInterp([0, 1], [0, 100]);
			const iSc  = pmInterp([0, 1], [1, 2]);
			const iRot = pmInterp([0, 1], [0, 360]);
			const out  = {};
			return (t) => {
				const e     = easeInOutCubic(t);
				out.opacity = iOp(e); out.x = iX(e); out.y = iY(e);
				out.scale = iSc(e);   out.rotate = iRot(e);
			};
		}),
	];
	printResults(s4);

	// ═══════════════════════════════════════════════════════════════════════════
	// SCENARIO 5 — Additive composition: 3 axes × same 5 props, same speed
	// ═══════════════════════════════════════════════════════════════════════════
	// All three sources advance at the same rate (t) but each contributes its own
	// delta into the shared scope.  voodoo handles this natively; other libraries
	// must manually run N timelines and sum results.

	console.log("\n" + "═".repeat(82));
	console.log("  Scenario 5 · additive (3 sources, same t) — voodoo's native model");
	console.log("═".repeat(82));

	// Contributions for axes 2 & 3 (70% and 40% of APPLY_5 magnitudes)
	const APPLY_5b = { opacity: 0.7, x: 140, y: 70, scale: 0.7, rotate: 252 };
	const APPLY_5c = { opacity: 0.4, x: 80,  y: 40, scale: 0.4, rotate: 144 };
	const INIT_5b  = { opacity: 0, x: 0, y: 0, scale: 0.7, rotate: 0 };
	const INIT_5c  = { opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 };
	const PROPS_5b = { opacity: 0.7, x: 140, y: 70, scale: 1.7, rotate: 252 };
	const PROPS_5c = { opacity: 0.4, x: 80,  y: 40, scale: 1.4, rotate: 144 };

	const wasmAdd5b = await makeWasmAxis([{ from: 0, duration: 100, apply: APPLY_5b }]);
	const wasmAdd5c = await makeWasmAxis([{ from: 0, duration: 100, apply: APPLY_5c }]);

	const s5 = [
		runBench("voodoo/js", () => {
			const a1 = new TweenAxis([{ from: 0, duration: 100, apply: APPLY_5  }]);
			const a2 = new TweenAxis([{ from: 0, duration: 100, apply: APPLY_5b }]);
			const a3 = new TweenAxis([{ from: 0, duration: 100, apply: APPLY_5c }]);
			const scope = { opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 };
			return (t) => { a1.goTo(t * 100, scope); a2.goTo(t * 100, scope); a3.goTo(t * 100, scope); };
		}),

		runBench("voodoo/wasm", () => {
			const scope = { opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 };
			return (t) => { wasm5.goTo(t * 100, scope); wasmAdd5b.goTo(t * 100, scope); wasmAdd5c.goTo(t * 100, scope); };
		}),

		runBench("gsap", () => {
			const o1 = { ...INIT_5 }, o2 = { ...INIT_5b }, o3 = { ...INIT_5c };
			const tl1 = gsap.timeline({ paused: true });
			const tl2 = gsap.timeline({ paused: true });
			const tl3 = gsap.timeline({ paused: true });
			tl1.to(o1, { ...PROPS_5,  duration: 1 }, 0);
			tl2.to(o2, { ...PROPS_5b, duration: 1 }, 0);
			tl3.to(o3, { ...PROPS_5c, duration: 1 }, 0);
			const out = {};
			return (t) => {
				tl1.progress(t); tl2.progress(t); tl3.progress(t);
				out.opacity = o1.opacity + o2.opacity + o3.opacity;
				out.x       = o1.x + o2.x + o3.x;
				out.y       = o1.y + o2.y + o3.y;
				out.scale   = o1.scale + o2.scale + o3.scale;
				out.rotate  = o1.rotate + o2.rotate + o3.rotate;
			};
		}, () => gsap.globalTimeline.clear()),

		runBench("animejs", () => {
			const o1 = { ...INIT_5 }, o2 = { ...INIT_5b }, o3 = { ...INIT_5c };
			const an1 = anime({ targets: o1, ...PROPS_5,  duration: 1000, autoplay: false, easing: "linear" });
			const an2 = anime({ targets: o2, ...PROPS_5b, duration: 1000, autoplay: false, easing: "linear" });
			const an3 = anime({ targets: o3, ...PROPS_5c, duration: 1000, autoplay: false, easing: "linear" });
			const out = {};
			return (t) => {
				an1.seek(t * 1000); an2.seek(t * 1000); an3.seek(t * 1000);
				out.opacity = o1.opacity + o2.opacity + o3.opacity;
				out.x       = o1.x + o2.x + o3.x;
				out.y       = o1.y + o2.y + o3.y;
				out.scale   = o1.scale + o2.scale + o3.scale;
				out.rotate  = o1.rotate + o2.rotate + o3.rotate;
			};
		}),

		runBench("popmotion/FM", () => {
			const interps = [
				[pmInterp([0,1],[0,1]),    pmInterp([0,1],[0,200]),  pmInterp([0,1],[0,100]),  pmInterp([0,1],[1,2]),   pmInterp([0,1],[0,360])],
				[pmInterp([0,1],[0,0.7]),  pmInterp([0,1],[0,140]),  pmInterp([0,1],[0,70]),   pmInterp([0,1],[0,0.7]), pmInterp([0,1],[0,252])],
				[pmInterp([0,1],[0,0.4]),  pmInterp([0,1],[0,80]),   pmInterp([0,1],[0,40]),   pmInterp([0,1],[0,0.4]), pmInterp([0,1],[0,144])],
			];
			const out = {};
			return (t) => {
				out.opacity = interps[0][0](t) + interps[1][0](t) + interps[2][0](t);
				out.x       = interps[0][1](t) + interps[1][1](t) + interps[2][1](t);
				out.y       = interps[0][2](t) + interps[1][2](t) + interps[2][2](t);
				out.scale   = interps[0][3](t) + interps[1][3](t) + interps[2][3](t);
				out.rotate  = interps[0][4](t) + interps[1][4](t) + interps[2][4](t);
			};
		}),
	];
	printResults(s5);

	// ═══════════════════════════════════════════════════════════════════════════
	// SCENARIO 6 — Spring-like layers: 3 axes at different speeds on same 5 props
	// ═══════════════════════════════════════════════════════════════════════════
	// Mimics the react-voodoo pattern where scroll (fast), drag (medium) and a
	// push/spring animation (slow) all layer on the same element simultaneously.
	// The different speeds create the "spring lag" feel.

	console.log("\n" + "═".repeat(82));
	console.log("  Scenario 6 · spring-like (3 sources at t, t×0.7, t×0.3) — layered speeds");
	console.log("═".repeat(82));

	const wasmSp = [
		await makeWasmAxis([{ from: 0, duration: 100, apply: APPLY_5  }]),
		await makeWasmAxis([{ from: 0, duration: 100, apply: APPLY_5b }]),
		await makeWasmAxis([{ from: 0, duration: 100, apply: APPLY_5c }]),
	];

	const s6 = [
		runBench("voodoo/js", () => {
			const a1 = new TweenAxis([{ from: 0, duration: 100, apply: APPLY_5  }]);
			const a2 = new TweenAxis([{ from: 0, duration: 100, apply: APPLY_5b }]);
			const a3 = new TweenAxis([{ from: 0, duration: 100, apply: APPLY_5c }]);
			const scope = { opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 };
			return (t) => { a1.goTo(t * 100, scope); a2.goTo(t * 70, scope); a3.goTo(t * 30, scope); };
		}),

		runBench("voodoo/wasm", () => {
			const scope = { opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 };
			return (t) => { wasmSp[0].goTo(t * 100, scope); wasmSp[1].goTo(t * 70, scope); wasmSp[2].goTo(t * 30, scope); };
		}),

		runBench("gsap", () => {
			const o1 = { ...INIT_5 }, o2 = { ...INIT_5b }, o3 = { ...INIT_5c };
			const tl1 = gsap.timeline({ paused: true });
			const tl2 = gsap.timeline({ paused: true });
			const tl3 = gsap.timeline({ paused: true });
			tl1.to(o1, { ...PROPS_5,  duration: 1 }, 0);
			tl2.to(o2, { ...PROPS_5b, duration: 1 }, 0);
			tl3.to(o3, { ...PROPS_5c, duration: 1 }, 0);
			const out = {};
			return (t) => {
				tl1.progress(t); tl2.progress(t * 0.7); tl3.progress(t * 0.3);
				out.opacity = o1.opacity + o2.opacity + o3.opacity;
				out.x       = o1.x + o2.x + o3.x;
				out.y       = o1.y + o2.y + o3.y;
				out.scale   = o1.scale + o2.scale + o3.scale;
				out.rotate  = o1.rotate + o2.rotate + o3.rotate;
			};
		}, () => gsap.globalTimeline.clear()),

		runBench("animejs", () => {
			const o1 = { ...INIT_5 }, o2 = { ...INIT_5b }, o3 = { ...INIT_5c };
			const an1 = anime({ targets: o1, ...PROPS_5,  duration: 1000, autoplay: false, easing: "linear" });
			const an2 = anime({ targets: o2, ...PROPS_5b, duration: 1000, autoplay: false, easing: "linear" });
			const an3 = anime({ targets: o3, ...PROPS_5c, duration: 1000, autoplay: false, easing: "linear" });
			const out = {};
			return (t) => {
				an1.seek(t * 1000); an2.seek(t * 700); an3.seek(t * 300);
				out.opacity = o1.opacity + o2.opacity + o3.opacity;
				out.x       = o1.x + o2.x + o3.x;
				out.y       = o1.y + o2.y + o3.y;
				out.scale   = o1.scale + o2.scale + o3.scale;
				out.rotate  = o1.rotate + o2.rotate + o3.rotate;
			};
		}),

		runBench("popmotion/FM", () => {
			const interps = [
				[pmInterp([0,1],[0,1]),    pmInterp([0,1],[0,200]),  pmInterp([0,1],[0,100]),  pmInterp([0,1],[1,2]),   pmInterp([0,1],[0,360])],
				[pmInterp([0,1],[0,0.7]),  pmInterp([0,1],[0,140]),  pmInterp([0,1],[0,70]),   pmInterp([0,1],[0,0.7]), pmInterp([0,1],[0,252])],
				[pmInterp([0,1],[0,0.4]),  pmInterp([0,1],[0,80]),   pmInterp([0,1],[0,40]),   pmInterp([0,1],[0,0.4]), pmInterp([0,1],[0,144])],
			];
			const out = {};
			return (t) => {
				const t2 = Math.min(t * 0.7, 1), t3 = Math.min(t * 0.3, 1);
				out.opacity = interps[0][0](t) + interps[1][0](t2) + interps[2][0](t3);
				out.x       = interps[0][1](t) + interps[1][1](t2) + interps[2][1](t3);
				out.y       = interps[0][2](t) + interps[1][2](t2) + interps[2][2](t3);
				out.scale   = interps[0][3](t) + interps[1][3](t2) + interps[2][3](t3);
				out.rotate  = interps[0][4](t) + interps[1][4](t2) + interps[2][4](t3);
			};
		}),
	];
	printResults(s6);

	// ═══════════════════════════════════════════════════════════════════════════
	// SCENARIO 7 — Long timeline: 20 sequential segments, 5 props
	// ═══════════════════════════════════════════════════════════════════════════
	// Models a complex scroll-driven animation with many keyframes —
	// e.g. a full-page scroll experience with 20 distinct animation sections.

	console.log("\n" + "═".repeat(82));
	console.log("  Scenario 7 · long timeline (20 sequential segments, 5 props)");
	console.log("═".repeat(82));

	// Build 20 alternating tween descriptors (full → zero → full → ...)
	const APPLY_5_inv = { opacity: -1, x: -200, y: -100, scale: -1, rotate: -360 };
	const longDescs = [];
	for (let i = 0; i < 20; i++) {
		longDescs.push({ duration: 100, apply: i % 2 === 0 ? APPLY_5 : APPLY_5_inv });
	}
	const wasmLong = await makeWasmAxis(longDescs);

	// GSAP: 20 chained .to() calls alternating full ↔ zero
	function makeGsapLong() {
		const obj = { ...INIT_5 };
		const tl  = gsap.timeline({ paused: true });
		for (let i = 0; i < 20; i++) {
			const target = i % 2 === 0 ? PROPS_5 : INIT_5;
			tl.to(obj, { ...target, duration: 1 });
		}
		return { obj, tl };
	}

	// Anime.js: keyframes alternating full ↔ zero (20 entries)
	const animeKeyframes = [];
	for (let i = 0; i < 20; i++) {
		animeKeyframes.push(i % 2 === 0
			? { opacity: 1, x: 200, y: 100, scale: 2, rotate: 360 }
			: { opacity: 0, x: 0,   y: 0,   scale: 1, rotate: 0   }
		);
	}

	// Popmotion: 20-segment piecewise interpolator (manual dispatch)
	function makePopmotionLong() {
		const N     = 20;
		const iOp   = pmInterp([0, 1], [0,   1  ]);
		const iX    = pmInterp([0, 1], [0,   200]);
		const iY    = pmInterp([0, 1], [0,   100]);
		const iSc   = pmInterp([0, 1], [1,   2  ]);
		const iRot  = pmInterp([0, 1], [0,   360]);
		// Each segment occupies 1/N of [0,1]; odd segments run backwards
		const out   = {};
		return (t) => {
			const seg = Math.min(Math.floor(t * N), N - 1);
			const u   = (t * N) - seg;                 // local [0,1] within segment
			const v   = seg % 2 === 0 ? u : 1 - u;    // alternate direction
			out.opacity = iOp(v);
			out.x       = iX(v);
			out.y       = iY(v);
			out.scale   = iSc(v);
			out.rotate  = iRot(v);
		};
	}

	const CALLS_LONG = 40_000;

	const s7 = [
		runBench("voodoo/js", () => {
			const axis  = new TweenAxis(longDescs);
			const scope = { opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 };
			return (t) => axis.goTo(t * 2000, scope);
		}, null, CALLS_LONG),

		runBench("voodoo/wasm", () => {
			const scope = { opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 };
			return (t) => wasmLong.goTo(t * 2000, scope);
		}, null, CALLS_LONG),

		runBench("gsap", () => {
			const { obj, tl } = makeGsapLong();
			return (t) => tl.progress(t);
		}, () => gsap.globalTimeline.clear(), CALLS_LONG),

		runBench("animejs", () => {
			const obj  = { ...INIT_5 };
			const anim = anime({
				targets: obj, keyframes: animeKeyframes,
				duration: 20000, autoplay: false, easing: "linear"
			});
			return (t) => anim.seek(t * 20000);
		}, null, CALLS_LONG),

		runBench("popmotion/FM", makePopmotionLong, null, CALLS_LONG),
	];
	printResults(s7);

	// ─── Footer ───────────────────────────────────────────────────────────────

	console.log("\n" + "─".repeat(82));
	console.log("  Notes");
	console.log("─".repeat(82));
	console.log("  • voodoo/js   (tween-axis JS)   — delta-based; additive multi-axis composition");
	console.log("  • voodoo/wasm (tween-axis WASM) — same API; core state machine in WebAssembly");
	console.log("  • GSAP                          — absolute-seek timeline; industry standard");
	console.log("  • Anime.js                      — lightweight absolute-seek timeline");
	console.log("  • Popmotion / Framer Motion     — stateless pure interpolation; no timeline state");
	console.log("  • All tests run in Node.js — no DOM, no RAF, no React render overhead");
	console.log("  • Node version: " + process.version);
	console.log();
}

main().catch(err => {
	console.error("\nBenchmark failed:", err.message);
	console.error(err.stack);
	process.exit(1);
});
