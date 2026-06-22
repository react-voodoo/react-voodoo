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
 * prefers-reduced-motion detection — shared, lazily-initialised matchMedia watcher.
 *
 * SSR-safe: on the server (or any environment without window.matchMedia) the
 * preference always reads false. The media query list is created on first use and
 * shared by every Tweener / hook in the page.
 */

let mql, current = false;
const listeners = new Set();

function init() {
	if ( mql !== undefined )
		return;
	mql = (typeof window !== 'undefined' && window.matchMedia)
	      ? window.matchMedia('(prefers-reduced-motion: reduce)')
	      : null;
	if ( mql ) {
		current        = mql.matches;
		const onChange = e => {
			current = e.matches;
			listeners.forEach(l => l(current));
		};
		// Safari < 14 only implements the deprecated addListener API
		mql.addEventListener
		? mql.addEventListener('change', onChange)
		: mql.addListener(onChange);
	}
}

/**
 * @returns {boolean} true when the user's OS requests reduced motion
 */
export function prefersReducedMotion() {
	init();
	return current;
}

/**
 * Subscribe to preference changes.
 * @param {function(boolean)} cb called with the new preference value
 * @returns {function} unsubscribe
 */
export function onReducedMotionChange( cb ) {
	init();
	listeners.add(cb);
	return () => listeners.delete(cb);
}
