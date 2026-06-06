/**
 * Unit tests for prefers-reduced-motion support:
 *  - utils/motionPrefs (shared matchMedia watcher, SSR-safe)
 *  - hooks/useReducedMotion
 *  - Tweener option reducedMotion: 'user' | 'always' | 'never'
 *
 * jsdom does not implement matchMedia; each test installs its own mock before
 * the module under test is (re-)loaded, since the watcher is lazily initialised
 * and cached at module level.
 */
import { act, renderHook } from '@testing-library/react';
// top-level import: shares the top-level React instance with the renderer.
// motionPrefs initialises lazily, so installing the matchMedia mock before the
// first render is enough — no module reset needed for the hook test.
import useReducedMotion    from '../../../src/hooks/useReducedMotion';

// Tweener pulls in utils/css, whose glob imports ("./demux/(*).js") are resolved
// by layer-pack at build time only — stub it (shouldReduceMotion doesn't use it).
jest.mock('../../../src/utils/css', () => ({
	clearTweenableValue: () => {},
	deMuxLine          : () => [],
	deMuxTween         : () => ({}),
	muxToCss           : () => {}
}));
jest.mock('../../../src/utils/CssTweenAxis', () => (class {}));

/** Install a controllable matchMedia mock; returns a trigger to change the value. */
function mockMatchMedia( initial ) {
	let matches  = initial;
	const cbs    = [];
	window.matchMedia = jest.fn().mockImplementation(query => ({
		matches,
		media           : query,
		addEventListener: ( _, cb ) => cbs.push(cb),
		addListener     : cb => cbs.push(cb)
	}));
	return next => {
		matches = next;
		cbs.forEach(cb => cb({ matches: next }));
	};
}

function freshModules() {
	jest.resetModules();
	return {
		motionPrefs     : require('../../../src/utils/motionPrefs'),
		useReducedMotion: require('../../../src/hooks/useReducedMotion').default
	};
}

afterEach(() => {
	delete window.matchMedia;
});

describe('motionPrefs', () => {
	it('reads the media query value', () => {
		mockMatchMedia(true);
		const { motionPrefs } = freshModules();
		expect(motionPrefs.prefersReducedMotion()).toBe(true);
	});

	it('is false when matchMedia is unavailable (SSR-like environments)', () => {
		const { motionPrefs } = freshModules();// no window.matchMedia
		expect(motionPrefs.prefersReducedMotion()).toBe(false);
	});

	it('notifies subscribers on change and supports unsubscribe', () => {
		const trigger         = mockMatchMedia(false);
		const { motionPrefs } = freshModules();
		const cb              = jest.fn();
		const off             = motionPrefs.onReducedMotionChange(cb);

		expect(motionPrefs.prefersReducedMotion()).toBe(false);
		trigger(true);
		expect(cb).toHaveBeenCalledWith(true);
		expect(motionPrefs.prefersReducedMotion()).toBe(true);

		off();
		trigger(false);
		expect(cb).toHaveBeenCalledTimes(1);
	});
});

describe('useReducedMotion', () => {
	it('returns the preference and re-renders on change', () => {
		const trigger = mockMatchMedia(false);

		const { result } = renderHook(() => useReducedMotion());
		expect(result.current).toBe(false);

		act(() => trigger(true));
		expect(result.current).toBe(true);
	});
});

describe('Tweener.shouldReduceMotion', () => {
	function makeTweener( reducedMotion ) {
		const Tweener = require('../../../src/comps/Tweener').default;
		// constructing directly is enough: shouldReduceMotion only reads _.options
		return new Tweener({ tweenerOptions: { reducedMotion } });
	}

	it("'never' / unset → false (default, existing behavior)", () => {
		mockMatchMedia(true);
		jest.resetModules();
		expect(makeTweener(undefined).shouldReduceMotion()).toBe(false);
		expect(makeTweener('never').shouldReduceMotion()).toBe(false);
	});

	it("'always' → true regardless of the OS preference", () => {
		mockMatchMedia(false);
		jest.resetModules();
		expect(makeTweener('always').shouldReduceMotion()).toBe(true);
	});

	it("'user' → follows the OS preference", () => {
		mockMatchMedia(true);
		jest.resetModules();
		expect(makeTweener('user').shouldReduceMotion()).toBe(true);
	});

	it("'user' with no OS preference → false", () => {
		mockMatchMedia(false);
		jest.resetModules();
		expect(makeTweener('user').shouldReduceMotion()).toBe(false);
	});
});
