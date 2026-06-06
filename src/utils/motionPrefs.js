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
