/**
 * Unit tests for the CSS demux/mux pipeline.
 *
 * Tests cover the round-trip: CSS descriptor → deMuxTween → numeric map →
 * muxToCss → CSS string, for the most important property types.
 *
 * The layer-pack (*).js glob imports are resolved via the Jest moduleNameMapper
 * pointing to etc/tests/__mocks__/cssdemuxers.js and typedhandlers.js.
 */

import Voodoo from '../../../dist/react-voodoo.js';

const { deMuxTween, muxToCss, deMuxLine } = Voodoo._internalCssUtils;

/** Helper: run a full demux + mux round-trip and return the CSS output. */
function roundTrip( css ) {
	const tweenable = {}, data = {}, demuxers = {}, initials = {};
	const box       = { x: 300, y: 600, z: 800 };

	deMuxTween(css, tweenable, initials, data, demuxers);

	const out = {};
	muxToCss(tweenable, out, demuxers, data, box);
	return out;
}

// ─── opacity (ratio handler) ─────────────────────────────────────────────────

describe('opacity', () => {
	it('round-trips a mid-range value', () => {
		const out = roundTrip({ opacity: 0.5 });
		expect(out.opacity).toBe(0.5);
	});

	it('clamps values above 1', () => {
		const out = roundTrip({ opacity: 2 });
		expect(out.opacity).toBe(1);
	});

	it('clamps values below 0', () => {
		const out = roundTrip({ opacity: -0.5 });
		expect(out.opacity).toBe(0);
	});
});

// ─── width (length handler) ───────────────────────────────────────────────────

describe('width', () => {
	it('round-trips a plain pixel value', () => {
		const out = roundTrip({ width: '100px' });
		expect(out.width).toBe('100px');
	});

	it('round-trips a percentage value', () => {
		const out = roundTrip({ width: '50%' });
		expect(out.width).toBe('50%');
	});

	it('produces a calc() expression for multi-unit arrays', () => {
		const out = roundTrip({ width: ['50%', '30px'] });
		expect(out.width).toMatch(/calc\(/);
		expect(out.width).toContain('50%');
		expect(out.width).toContain('30px');
	});

	it('produces a calc() for three units', () => {
		const out = roundTrip({ width: ['50%', '10vw', '-20px'] });
		expect(out.width).toMatch(/calc\(/);
	});
});

// ─── backgroundColor (color handler) ─────────────────────────────────────────

describe('backgroundColor', () => {
	it('round-trips an rgba color string', () => {
		const out = roundTrip({ backgroundColor: 'rgba(255, 0, 0, 1)' });
		// Output must be a valid rgba() string containing the same channels
		expect(out.backgroundColor).toMatch(/rgba\(/);
		expect(out.backgroundColor).toContain('255');
	});

	it('accepts a named colour and converts to rgba', () => {
		const out = roundTrip({ backgroundColor: 'red' });
		expect(out.backgroundColor).toMatch(/rgba\(/);
	});
});

// ─── transform ───────────────────────────────────────────────────────────────

describe('transform', () => {
	it('produces a translateX() expression', () => {
		const out = roundTrip({ transform: [{ translateX: '50px' }] });
		expect(out.transform).toContain('translateX');
		expect(out.transform).toContain('50px');
	});

	it('combines multiple transform functions', () => {
		const out = roundTrip({ transform: [{ translateX: '20px', rotateZ: '45deg' }] });
		expect(out.transform).toContain('translateX');
		expect(out.transform).toContain('rotateZ');
	});

	it('handles multiple transform layers', () => {
		const out = roundTrip({
			transform: [
				{ translateX: '10px' },
				{ scaleY: 2 },
			],
		});
		expect(out.transform).toContain('translateX');
		expect(out.transform).toContain('scaleY');
	});
});

// ─── SVG presentation attributes (style-path) ────────────────────────────────

describe('SVG presentation attributes (element.style path)', () => {
	it('round-trips fill as rgba', () => {
		const out = roundTrip({ fill: 'rgba(0, 128, 255, 1)' });
		expect(out.fill).toMatch(/rgba\(/);
	});

	it('round-trips stroke as rgba', () => {
		const out = roundTrip({ stroke: 'rgba(255, 0, 0, 0.8)' });
		expect(out.stroke).toMatch(/rgba\(/);
	});

	it('round-trips strokeWidth as a length', () => {
		const out = roundTrip({ strokeWidth: '3px' });
		expect(out.strokeWidth).toBe('3px');
	});

	it('round-trips strokeOpacity clamped to [0, 1]', () => {
		const out = roundTrip({ strokeOpacity: 0.6 });
		expect(out.strokeOpacity).toBeCloseTo(0.6);
	});

	it('round-trips fillOpacity clamped to [0, 1]', () => {
		const out = roundTrip({ fillOpacity: 0 });
		expect(out.fillOpacity).toBe(0);
	});

	it('round-trips strokeDashoffset as a length', () => {
		const out = roundTrip({ strokeDashoffset: '10px' });
		expect(out.strokeDashoffset).toBe('10px');
	});
});

// ─── SVG geometry attributes (setAttribute path) ────────────────────────────

describe('SVG geometry attributes (element.setAttribute path)', () => {
	it('writes cx under the attr_ prefix', () => {
		const out = roundTrip({ cx: 100 });
		expect(out['attr_cx']).toBe('100');
		expect(out.cx).toBeUndefined();    // must not appear as a CSS property
	});

	it('writes cy under the attr_ prefix', () => {
		expect(roundTrip({ cy: 200 })['attr_cy']).toBe('200');
	});

	it('writes r under the attr_ prefix', () => {
		expect(roundTrip({ r: 25 })['attr_r']).toBe('25');
	});

	it.each(['rx', 'ry', 'x', 'y', 'x1', 'y1', 'x2', 'y2'])('writes %s under attr_ prefix', (attr) => {
		const out = roundTrip({ [attr]: 42 });
		expect(out[`attr_${attr}`]).toBe('42');
		expect(out[attr]).toBeUndefined();
	});
});

// ─── deMuxLine used in Axis / pushAnim ───────────────────────────────────────

describe('deMuxLine', () => {
	it('processes a tween array with target into numeric tweenables', () => {
		// deMuxLine is already imported at the top from the dist

		const tweens   = [{ target: 'dot', from: 0, duration: 100, apply: { cx: 50, opacity: 0.5 } }];
		const initials = {}, data = {}, demuxers = {};

		const result = deMuxLine(tweens, initials, data, demuxers);

		expect(result).toHaveLength(1);
		expect(result[0].target).toBe('dot');
		// apply should now be a numeric tweenable map, not the original CSS object
		expect(typeof result[0].apply).toBe('object');
		// cx goes through svgAttr handler — tweenable key is 'cx'
		expect(result[0].apply).toHaveProperty('cx');
		// opacity goes through ratio handler — tweenable key is 'opacity'
		expect(result[0].apply).toHaveProperty('opacity');
	});
});
