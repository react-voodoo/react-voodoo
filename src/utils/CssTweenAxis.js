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
 * CssTweenAxis — extends TweenAxis with an object pool to avoid GC pressure.
 *
 * In animated UIs (especially sliders), axes are frequently created and destroyed
 * as slides enter and leave the viewport. Allocating a new TweenAxis for each would
 * trigger garbage collection at the worst possible moment (mid-animation).
 *
 * When `destroy()` is called, the instance is reset to a blank state and pushed
 * into `recyclableTweenAxis[]`. The next `new CssTweenAxis(...)` call pops from
 * the pool and calls `mount()` to re-initialize it — avoiding the allocation
 * entirely. The pool is unbounded and module-level (shared across all Tweeners).
 */

const recyclableTweenAxis = [];

export default class CssTweenAxis extends tweenAxis {

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

	destroy() {
		this.scope    = undefined;
		this.duration = 0;
		this.__cPos   = 0;
		this.__cIndex = 0;
		this.__cMaxKey = 1;

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
