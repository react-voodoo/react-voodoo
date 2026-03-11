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

import is        from "is";
import tweenAxis from "tween-axis/dist/TweenAxisWasm";

/**
 * CssTweenAxis — extends TweenAxis with an object pool and PROC_WASM acceleration.
 *
 * In animated UIs (especially sliders), axes are frequently created and destroyed
 * as slides enter and leave the viewport. Allocating a new TweenAxis for each would
 * trigger garbage collection at the worst possible moment (mid-animation).
 *
 * When `destroy()` is called, the instance is reset to a blank state and pushed
 * into `recyclableTweenAxis[]`. The next `new CssTweenAxis(...)` call pops from
 * the pool and calls `mount()` to re-initialize it — avoiding the allocation
 * entirely. The pool is unbounded and module-level (shared across all Tweeners).
 *
 * PROC_WASM acceleration
 * ──────────────────────
 * For tween descriptors without event callbacks (entering/moving/leaving) and
 * with a mappable easing function, addProcess() registers WASM-side accumulation
 * via addWasmApply(). The WASM accumulates deltas directly into its scope buffer
 * on every goTo() call — zero JS boundary crossings for those properties during
 * the hot animation loop.
 *
 * goTo() is overridden to:
 *   1. clearScope() — zero the WASM accumulation buffer.
 *   2. super.goTo()  — PROC_WASM processes accumulate in WASM; PROC_RESULT
 *                      processes call their JS processors as before.
 *   3. Read each WASM scope slot and add it into tweenRefMaps[target][propKey].
 *
 * The d3-ease functions used by react-voodoo are mapped to WASM built-in easing
 * IDs via a lazy reverse-lookup Map (_fnToWasmId). Descriptors with custom easing
 * functions that have no WASM equivalent fall back to PROC_RESULT automatically.
 */

// ─── d3-ease name → WASM easing ID ──────────────────────────────────────────
// Mirror of the TweenAxisCore EASE_* constants and the d3-ease export names.

const D3_TO_WASM_EASE = {
	easeLinear     : 0,
	easeQuadIn     : 1, easeQuadOut: 2, easeQuadInOut: 3,
	easeCubicIn    : 4, easeCubicOut: 5, easeCubicInOut: 6,
	easeExpIn      : 7, easeExpOut: 8, easeExpInOut: 9,
};

// Lazily built reverse map: function reference → WASM easing ID.
// Populated on first call to _getWasmEasingId() from tweenAxis.EasingFunctions.
let _fnToWasmId = null;

function _getWasmEasingId( easeFn ) {
	if ( !easeFn ) return 0; // no easing → linear (EASE_LINEAR = 0)

	if ( _fnToWasmId === null ) {
		_fnToWasmId     = new Map();
		const efs       = tweenAxis.EasingFunctions;
		for ( const name in D3_TO_WASM_EASE ) {
			if ( efs[name] ) _fnToWasmId.set(efs[name], D3_TO_WASM_EASE[name]);
		}
	}

	// Returns undefined for unknown functions → caller falls back to PROC_RESULT.
	return _fnToWasmId.get(easeFn);
}

// ─── Object pool ──────────────────────────────────────────────────────────────

const recyclableTweenAxis = [];

export default class CssTweenAxis extends tweenAxis {

	// Note: __wasmSlotByKey / __wasmSlotList / __wasmSlotCount are NOT declared as
	// class fields here. Class field initializers run after super() returns, which
	// would overwrite values written by _getOrCreateWasmSlot() when called during
	// super() → mount() → addProcess(). Lazy init in _getOrCreateWasmSlot() handles
	// fresh instances; destroy() resets them for recycled instances.

	constructor( cfg, scope ) {
		// Pool path: if a recycled instance is available, reuse it by calling mount()
		// to load the new tween descriptors into the pre-existing internal arrays.
		if ( recyclableTweenAxis.length ) {
			let recyled   = recyclableTweenAxis.pop();
			recyled.scope = scope;
			if ( is.array(cfg) ) {
				recyled.localLength = 1;
				recyled.mount(cfg, scope);
			}
			else {
				if ( cfg.Axis )
					recyled.mount(cfg.Axis, scope);
			}
			return recyled;
		}
		// No pooled instance available — fall through to the normal TweenAxis constructor.
		super(...arguments)
	}

	/** @private Assign (or look up) the WASM scope slot for a target+propKey pair. */
	_getOrCreateWasmSlot( target, propKey ) {
		// Lazy init: class fields run after super(), but super() calls mount() → addProcess()
		// → here, so __wasmSlotByKey may not exist yet on the first fresh construction.
		if ( !this.__wasmSlotByKey ) {
			this.__wasmSlotByKey = {};
			this.__wasmSlotList  = [];
			this.__wasmSlotCount = 0;
		}
		const k = target + "\0" + propKey;
		if ( this.__wasmSlotByKey[k] === undefined ) {
			const slot                = this.__wasmSlotCount++;
			this.__wasmSlotByKey[k]   = slot;
			this.__wasmSlotList[slot] = { target, propKey };
		}
		return this.__wasmSlotByKey[k];
	}

	/**
	 * Register a process and, when eligible, switch it to PROC_WASM mode.
	 *
	 * A process is eligible for PROC_WASM when:
	 *   - It has no event callbacks (entering / moving / leaving).
	 *   - Its easing function maps to one of the 10 WASM built-in IDs.
	 *
	 * For eligible processes, addWasmApply() is called for every demuxed property,
	 * which implicitly sets the process mode to PROC_WASM inside the WASM context.
	 * The JS processor stored by super.addProcess() is then never invoked for that
	 * process; the WASM scope buffer accumulates the deltas instead.
	 */
	addProcess( from, to, factory, cfg ) {
		super.addProcess(from, to, factory, cfg);

		if ( !cfg.entering && !cfg.moving && !cfg.leaving && cfg.apply ) {
			const wasmEasingId = _getWasmEasingId(cfg.easeFn);
			if ( wasmEasingId !== undefined ) {
				const key    = this.__cMaxKey - 1; // key assigned by super.addProcess
				const target = cfg.target;
				for ( const propKey in cfg.apply ) {
					if ( !Object.prototype.hasOwnProperty.call(cfg.apply, propKey) ) continue;
					const slot = this._getOrCreateWasmSlot(target, propKey);
					this.addWasmApply(key, slot, cfg.apply[propKey], wasmEasingId);
				}
			}
		}
	}

	/**
	 * Advance the timeline, using the WASM scope for eligible processes.
	 *
	 * Steps:
	 *   1. clearScope() — zero the accumulation buffer so this frame starts fresh.
	 *   2. super.goTo() — PROC_WASM processes accumulate in WASM; PROC_RESULT
	 *                     processes call JS processors as before.
	 *   3. For each registered WASM slot, add the accumulated value into scope.
	 */
	goTo( pos, scope, reset, noEvents ) {
		if ( this.__wasmSlotCount > 0 ) {
			this.clearScope();
		}

		const result = super.goTo(pos, scope, reset, noEvents);

		if ( this.__wasmSlotCount > 0 && scope ) {
			for ( let slot = 0; slot < this.__wasmSlotCount; slot++ ) {
				const { target, propKey } = this.__wasmSlotList[slot];
				const targetScope         = target ? scope[target] : scope;
				if ( targetScope !== undefined ) {
					targetScope[propKey] = (targetScope[propKey] || 0) + this.getScopeValue(slot);
				}
			}
		}

		return result;
	}

	destroy() {
		this.scope    = undefined;
		this.duration = 0;
		this.__cPos   = 0;
		this.__cIndex = 0;
		this.__cMaxKey = 1;

		// Clear WASM-slot tracking for this instance.
		this.__wasmSlotByKey = {};
		this.__wasmSlotList  = [];
		this.__wasmSlotCount = 0;

		// Clear JS-side arrays (present on the plain TweenAxis implementation).
		// Truncating rather than reassigning preserves the existing array references.
		if ( this.__marks )         this.__marks.length         = 0;
		if ( this.__marksLength )   this.__marksLength.length   = 0;
		if ( this.__marksKeys )     this.__marksKeys.length     = 0;
		if ( this.__activeProcess ) this.__activeProcess.length = 0;
		if ( this.__outgoing )      this.__outgoing.length      = 0;
		if ( this.__incoming )      this.__incoming.length      = 0;
		this.__processors.length = 0;
		this.__config.length     = 0;

		// WASM branch: reset the WASM context slot so the index can be reused by
		// the next mount() call. Without this the WASM context pool would leak.
		if ( typeof this.resetWasm === "function" ) this.resetWasm();

		recyclableTweenAxis.push(this);
	}
}
