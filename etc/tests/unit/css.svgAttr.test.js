/**
 * Unit tests for the SVG geometry attribute handler (svgAttr).
 *
 * This handler is responsible for cx, cy, r, rx, ry, x, y, x1, y1, x2, y2.
 * It writes values into the CSS map with an "attr_" prefix so _updateTweenRef
 * can route them to element.setAttribute() instead of element.style.
 */

import Voodoo from '../../../dist/react-voodoo.js';

const { mux, demux, release } = Voodoo._internalCssUtils.allDemuxers.typed.svgAttr;

// ─── mux ────────────────────────────────────────────────────────────────────

describe('svgAttr.mux', () => {
	it('stores the parsed numeric value in the target map', () => {
		const target = {}, data = {}, initials = {};
		mux('cx', 50, target, data, initials, false);
		expect(target.cx).toBe(50);
	});

	it('parses a string value to a float', () => {
		const target = {}, data = {}, initials = {};
		mux('r', '25.5', target, data, initials, false);
		expect(target.r).toBe(25.5);
	});

	it('sets initials[key] to 0', () => {
		const target = {}, data = {}, initials = {};
		mux('cy', 100, target, data, initials, false);
		expect(initials.cy).toBe(0);
	});

	it('increments the ref-count in data when noPropLock is false', () => {
		const target = {}, data = {}, initials = {};
		mux('cx', 10, target, data, initials, false);
		expect(data.cx).toBe(1);
		mux('cx', 20, target, data, initials, false);
		expect(data.cx).toBe(2);
	});

	it('does NOT increment the ref-count when noPropLock is true', () => {
		const target = {}, data = {}, initials = {};
		mux('r', 30, target, data, initials, true);
		expect(data.r).toBe(0);
	});

	it('handles 0 as a valid value', () => {
		const target = {}, data = {}, initials = {};
		mux('x1', 0, target, data, initials, false);
		expect(target.x1).toBe(0);
	});

	it('returns the demux function', () => {
		const target = {}, data = {}, initials = {};
		const result = mux('cx', 10, target, data, initials, false);
		expect(result).toBe(demux);
	});
});

// ─── demux ──────────────────────────────────────────────────────────────────

describe('svgAttr.demux', () => {
	it('writes the value under the "attr_" prefixed key', () => {
		const tweenable = { cx: 50 };
		const css       = {};
		demux('cx', tweenable, css, {});
		expect(css['attr_cx']).toBeDefined();
		expect(css.cx).toBeUndefined();
	});

	it('serialises the value as a string', () => {
		const css = {};
		demux('r', { r: 25 }, css, {});
		expect(typeof css['attr_r']).toBe('string');
	});

	it('rounds to 3 decimal places (floatCut)', () => {
		const css = {};
		demux('cy', { cy: 33.33337 }, css, {});
		// floatCut rounds to 3 significant decimal digits → '33.333'
		expect(css['attr_cy']).toBe('33.333');
	});

	it('correctly maps different attribute names', () => {
		const attrs = ['cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'y1', 'x2', 'y2'];
		attrs.forEach(attr => {
			const css = {};
			demux(attr, { [attr]: 10 }, css, {});
			expect(css[`attr_${attr}`]).toBe('10');
			expect(css[attr]).toBeUndefined();
		});
	});
});

// ─── release ────────────────────────────────────────────────────────────────

describe('svgAttr.release', () => {
	it('removes all entries when ref-count reaches 0', () => {
		const tweenableMap = { cx: 50 };
		const cssMap       = { 'attr_cx': '50' };
		const dataMap      = { cx: 1 };
		const muxerMap     = { cx: { mux, demux, release } };

		release('cx', tweenableMap, cssMap, dataMap, muxerMap, false);

		expect(tweenableMap.cx).toBeUndefined();
		expect(cssMap['attr_cx']).toBeUndefined();
		expect(dataMap.cx).toBeUndefined();
		expect(muxerMap.cx).toBeUndefined();
	});

	it('does not remove entries while ref-count is still > 0', () => {
		const tweenableMap = { cx: 50 };
		const cssMap       = { 'attr_cx': '50' };
		const dataMap      = { cx: 2 };           // two consumers
		const muxerMap     = { cx: { mux, demux, release } };

		release('cx', tweenableMap, cssMap, dataMap, muxerMap, false);

		expect(tweenableMap.cx).toBe(50);          // still alive
		expect(cssMap['attr_cx']).toBe('50');
	});

	it('keeps entries when keepValues is true even at ref-count 1', () => {
		const tweenableMap = { cy: 100 };
		const cssMap       = { 'attr_cy': '100' };
		const dataMap      = { cy: 1 };
		const muxerMap     = { cy: { mux, demux, release } };

		release('cy', tweenableMap, cssMap, dataMap, muxerMap, true);

		// keepValues preserves the tweenable entry (ref is decremented but items kept)
		expect(tweenableMap.cy).toBeDefined();
	});
});
