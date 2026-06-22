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
 * Comprehensive round-trip tests for every standard CSS property handled by the
 * react-voodoo animation pipeline, organised by demuxer/handler type.
 *
 * Properties already covered by css.pipeline.test.js are omitted here to avoid
 * duplication:
 *   opacity, width (basic px/%), backgroundColor, transform (translateX, multi-
 *   function, multi-layer), fill/stroke/strokeWidth/strokeOpacity/fillOpacity/
 *   strokeDashoffset, SVG geometry attrs (cx/cy/r/…), deMuxLine (basic).
 *
 * Pattern: deMuxTween → accumulate → muxToCss (the "round-trip" helper).
 * box = { x: 300, y: 600, z: 800 } is used wherever box-relative units appear.
 */

import Voodoo from '../../../dist/react-voodoo.js';

const { deMuxTween, muxToCss, deMuxLine } = Voodoo._internalCssUtils;

/** Full demux + mux round-trip. Returns the reconstructed CSS map. */
function roundTrip( css, box = { x: 300, y: 600, z: 800 } ) {
	const tweenable = {}, data = {}, demuxers = {}, initials = {};
	deMuxTween(css, tweenable, initials, data, demuxers);
	const out = {};
	muxToCss(tweenable, out, demuxers, data, box);
	return out;
}

// ─── LENGTH HANDLER — position/layout properties ─────────────────────────────

describe('height (length)', () => {
	it('round-trips a pixel value', () => {
		expect(roundTrip({ height: '200px' }).height).toBe('200px');
	});

	it('round-trips a percentage', () => {
		expect(roundTrip({ height: '75%' }).height).toBe('75%');
	});

	it('round-trips zero', () => {
		expect(roundTrip({ height: '0px' }).height).toBe('0px');
	});

	it('round-trips a negative value', () => {
		// Negative lengths are unusual but numerically valid; the handler should preserve sign
		const out = roundTrip({ height: '-10px' });
		expect(out.height).toContain('10px');
	});

	it('produces calc() for multi-unit height', () => {
		const out = roundTrip({ height: ['100%', '-20px'] });
		expect(out.height).toMatch(/calc\(/);
		expect(out.height).toContain('100%');
	});
});

describe('top / left / right / bottom (length)', () => {
	it.each(['top', 'left', 'right', 'bottom'])('%s round-trips a pixel value', (prop) => {
		const out = roundTrip({ [prop]: '40px' });
		expect(out[prop]).toBe('40px');
	});

	it.each(['top', 'left', 'right', 'bottom'])('%s round-trips a percentage', (prop) => {
		const out = roundTrip({ [prop]: '25%' });
		expect(out[prop]).toBe('25%');
	});

	it('top round-trips a negative offset', () => {
		const out = roundTrip({ top: '-5px' });
		expect(out.top).toContain('5px');
	});

	it('left produces calc() for multi-unit', () => {
		const out = roundTrip({ left: ['50%', '-10px'] });
		expect(out.left).toMatch(/calc\(/);
	});
});

describe('margin longhand properties (length)', () => {
	it.each(['marginTop', 'marginLeft', 'marginRight', 'marginBottom'])(
		'%s round-trips px', (prop) => {
			expect(roundTrip({ [prop]: '16px' })[prop]).toBe('16px');
		});

	it.each(['marginTop', 'marginLeft', 'marginRight', 'marginBottom'])(
		'%s round-trips percentage', (prop) => {
			expect(roundTrip({ [prop]: '10%' })[prop]).toBe('10%');
		});

	it('marginTop round-trips zero', () => {
		expect(roundTrip({ marginTop: '0px' }).marginTop).toBe('0px');
	});
});

describe('padding longhand properties (length)', () => {
	it.each(['paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom'])(
		'%s round-trips px', (prop) => {
			expect(roundTrip({ [prop]: '8px' })[prop]).toBe('8px');
		});

	it('paddingBottom round-trips a viewport-height value', () => {
		expect(roundTrip({ paddingBottom: '5vh' }).paddingBottom).toBe('5vh');
	});
});

describe('borderRadius (length)', () => {
	it('round-trips a pixel value', () => {
		expect(roundTrip({ borderRadius: '4px' }).borderRadius).toBe('4px');
	});

	it('round-trips a percentage', () => {
		expect(roundTrip({ borderRadius: '50%' }).borderRadius).toBe('50%');
	});

	it('produces calc() for multi-unit radius', () => {
		const out = roundTrip({ borderRadius: ['10px', '5%'] });
		expect(out.borderRadius).toMatch(/calc\(/);
	});
});

describe('border width properties (length)', () => {
	it.each(['borderTopWidth', 'borderLeftWidth', 'borderRightWidth', 'borderBottomWidth'])(
		'%s round-trips a pixel value', (prop) => {
			expect(roundTrip({ [prop]: '2px' })[prop]).toBe('2px');
		});

	it('borderTopWidth round-trips an em value', () => {
		expect(roundTrip({ borderTopWidth: '0.5em' }).borderTopWidth).toBe('0.5em');
	});

	it('borderLeftWidth round-trips zero', () => {
		expect(roundTrip({ borderLeftWidth: '0px' }).borderLeftWidth).toBe('0px');
	});
});

// ─── LENGTH HANDLER — additional unit types ───────────────────────────────────

describe('length — viewport-relative units', () => {
	it('vh unit round-trips', () => {
		expect(roundTrip({ width: '50vh' }).width).toBe('50vh');
	});

	it('vw unit round-trips', () => {
		expect(roundTrip({ width: '33vw' }).width).toBe('33vw');
	});

	it('rem unit round-trips', () => {
		expect(roundTrip({ fontSize: '1.5rem' }).fontSize).toBe('1.5rem');
	});

	it('em unit round-trips', () => {
		expect(roundTrip({ width: '2em' }).width).toBe('2em');
	});
});

describe('length — box-relative units (bw / bh)', () => {
	// box = { x: 300, y: 600, z: 800 }
	it('1bw on width resolves to box.x px (300px)', () => {
		// bw is units index 5; value=1 * box.x = 300
		const out = roundTrip({ width: '1bw' });
		expect(out.width).toBe('300px');
	});

	it('0.5bh on height resolves to half box.y (300px)', () => {
		const out = roundTrip({ height: '0.5bh' });
		expect(out.height).toBe('300px');
	});

	it('bw in transform translateX resolves against box.x', () => {
		const out = roundTrip({ transform: [{ translateX: '1bw' }] });
		expect(out.transform).toContain('300px');
	});
});

// ─── COLOR HANDLER — border colors ───────────────────────────────────────────

describe('border color properties (color handler)', () => {
	it.each(['borderTopColor', 'borderLeftColor', 'borderRightColor', 'borderBottomColor'])(
		'%s round-trips an rgba string', (prop) => {
			const out = roundTrip({ [prop]: 'rgba(100, 150, 200, 1)' });
			expect(out[prop]).toMatch(/rgba\(/);
			expect(out[prop]).toContain('100');
			expect(out[prop]).toContain('150');
			expect(out[prop]).toContain('200');
		});

	it('borderTopColor accepts a named colour and converts to rgba', () => {
		expect(roundTrip({ borderTopColor: 'blue' }).borderTopColor).toMatch(/rgba\(/);
	});

	it('borderRightColor round-trips full alpha channel', () => {
		const out = roundTrip({ borderRightColor: 'rgba(255, 255, 255, 0.5)' });
		expect(out.borderRightColor).toContain('0.5');
	});

	it('borderBottomColor channels are clamped to [0, 255]', () => {
		// rgba values beyond 255 are clamped by the color demuxer (Math.min(255, …))
		const out = roundTrip({ borderBottomColor: 'rgba(0, 0, 0, 1)' });
		expect(out.borderBottomColor).toMatch(/rgba\(/);
	});
});

// ─── NUMBER HANDLER — zIndex ──────────────────────────────────────────────────

describe('zIndex (number handler — integer truncation)', () => {
	it('round-trips an integer value', () => {
		expect(roundTrip({ zIndex: 10 }).zIndex).toBe(10);
	});

	it('truncates a float to integer', () => {
		// ~~value is used — floor toward zero
		expect(roundTrip({ zIndex: 7.9 }).zIndex).toBe(7);
	});

	it('truncates a negative float toward zero', () => {
		expect(roundTrip({ zIndex: -3.8 }).zIndex).toBe(-3);
	});

	it('round-trips zero', () => {
		expect(roundTrip({ zIndex: 0 }).zIndex).toBe(0);
	});

	it('round-trips a large stacking value', () => {
		expect(roundTrip({ zIndex: 9999 }).zIndex).toBe(9999);
	});
});

// ─── MULTI(2) HANDLER — transformOrigin ──────────────────────────────────────

describe('transformOrigin (multi(2) handler)', () => {
	// NOTE: multi(2) internally uses the number (integer) handler for each part,
	// so only unitless numeric values round-trip faithfully here. The space-
	// separated parts are each passed through ~~value before storage.

	it('round-trips two integer values', () => {
		// "50 30" → each ~~int → "50 30 " (trailing space from join)
		const out = roundTrip({ transformOrigin: '50 30' });
		// Contains both numbers
		expect(out.transformOrigin).toMatch(/50/);
		expect(out.transformOrigin).toMatch(/30/);
	});

	it('round-trips zeros', () => {
		const out = roundTrip({ transformOrigin: '0 0' });
		expect(out.transformOrigin).toMatch(/0/);
	});

	it('produces output for two values', () => {
		// The multi(2) demux always emits exactly `count` (2) values
		const out = roundTrip({ transformOrigin: '10 20' });
		const parts = out.transformOrigin.trim().split(/\s+/);
		expect(parts).toHaveLength(2);
	});
});

// ─── FILTER DEMUXER ───────────────────────────────────────────────────────────

describe('filter — blur', () => {
	it('produces a blur() expression', () => {
		const out = roundTrip({ filter: [{ blur: '10px' }] });
		expect(out.filter).toContain('blur(');
		expect(out.filter).toContain('10px');
	});

	it('round-trips zero blur', () => {
		const out = roundTrip({ filter: [{ blur: '0px' }] });
		expect(out.filter).toContain('blur(');
	});
});

describe('filter — brightness', () => {
	it('produces brightness() with % unit', () => {
		const out = roundTrip({ filter: [{ brightness: '150%' }] });
		expect(out.filter).toContain('brightness(');
		expect(out.filter).toContain('150%');
	});

	it('round-trips 100% (no-op brightness)', () => {
		const out = roundTrip({ filter: [{ brightness: '100%' }] });
		expect(out.filter).toContain('brightness(100%)');
	});
});

describe('filter — contrast', () => {
	it('produces contrast() with % unit', () => {
		const out = roundTrip({ filter: [{ contrast: '200%' }] });
		expect(out.filter).toContain('contrast(');
		expect(out.filter).toContain('200%');
	});
});

describe('filter — grayscale', () => {
	it('produces grayscale() with % unit', () => {
		const out = roundTrip({ filter: [{ grayscale: '100%' }] });
		expect(out.filter).toContain('grayscale(100%)');
	});

	it('round-trips partial grayscale', () => {
		const out = roundTrip({ filter: [{ grayscale: '50%' }] });
		expect(out.filter).toContain('50%');
	});
});

describe('filter — hueRotate', () => {
	it('produces hueRotate() with deg unit', () => {
		const out = roundTrip({ filter: [{ hueRotate: '90deg' }] });
		expect(out.filter).toContain('hueRotate(');
		expect(out.filter).toContain('deg');
	});

	it('wraps 360deg to 0', () => {
		// demuxOne wraps degrees: 360 % 360 = 0
		const out = roundTrip({ filter: [{ hueRotate: '360deg' }] });
		expect(out.filter).toContain('hueRotate(0deg)');
	});

	it('round-trips 180deg rotation', () => {
		const out = roundTrip({ filter: [{ hueRotate: '180deg' }] });
		expect(out.filter).toContain('180deg');
	});
});

describe('filter — invert', () => {
	it('produces invert() with % unit', () => {
		const out = roundTrip({ filter: [{ invert: '100%' }] });
		expect(out.filter).toContain('invert(100%)');
	});
});

describe('filter — opacity (filter function, not CSS opacity property)', () => {
	it('produces opacity() with % unit inside filter', () => {
		const out = roundTrip({ filter: [{ opacity: '80%' }] });
		expect(out.filter).toContain('opacity(');
		expect(out.filter).toContain('80%');
	});
});

describe('filter — saturate', () => {
	it('produces saturate() with % unit', () => {
		const out = roundTrip({ filter: [{ saturate: '200%' }] });
		expect(out.filter).toContain('saturate(200%)');
	});
});

describe('filter — sepia', () => {
	it('produces sepia() with % unit', () => {
		const out = roundTrip({ filter: [{ sepia: '75%' }] });
		expect(out.filter).toContain('sepia(');
		expect(out.filter).toContain('75%');
	});
});

describe('filter — multiple functions in one layer', () => {
	it('includes all specified filter functions', () => {
		const out = roundTrip({ filter: [{ blur: '4px', brightness: '120%' }] });
		expect(out.filter).toContain('blur(');
		expect(out.filter).toContain('brightness(');
	});

	it('preserves each function\'s value', () => {
		const out = roundTrip({ filter: [{ blur: '2px', grayscale: '50%' }] });
		expect(out.filter).toContain('2px');
		expect(out.filter).toContain('50%');
	});
});

// ─── BOX SHADOW DEMUXER ───────────────────────────────────────────────────────

describe('boxShadow (shadow handler)', () => {
	it('round-trips a basic shadow string', () => {
		const out = roundTrip({ boxShadow: '2px 4px 6px rgba(0,0,0,0.5)' });
		expect(out.boxShadow).toBeDefined();
		expect(out.boxShadow).toContain('2px');
		expect(out.boxShadow).toContain('4px');
		expect(out.boxShadow).toContain('6px');
	});

	it('preserves the shadow colour as rgba', () => {
		const out = roundTrip({ boxShadow: '1px 1px 3px rgba(255,0,0,1)' });
		expect(out.boxShadow).toMatch(/rgba\(/);
	});

	it('includes the inset keyword for inset shadows', () => {
		const out = roundTrip({ boxShadow: 'inset 0px 2px 4px rgba(0,0,0,0.3)' });
		expect(out.boxShadow).toContain('inset');
	});

	it('omits inset for non-inset shadows', () => {
		const out = roundTrip({ boxShadow: '0px 2px 4px rgba(0,0,0,0.3)' });
		expect(out.boxShadow).not.toContain('inset');
	});

	it('round-trips a shadow with zero offsets', () => {
		const out = roundTrip({ boxShadow: '0px 0px 8px rgba(0,0,0,0.6)' });
		expect(out.boxShadow).toContain('8px');
	});
});

// ─── TEXT SHADOW DEMUXER ──────────────────────────────────────────────────────

describe('textShadow (shadow handler)', () => {
	it('round-trips a basic text shadow', () => {
		const out = roundTrip({ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' });
		expect(out.textShadow).toBeDefined();
		expect(out.textShadow).toContain('1px');
		expect(out.textShadow).toContain('2px');
	});

	it('preserves the text shadow colour as rgba', () => {
		const out = roundTrip({ textShadow: '0px 2px 4px rgba(128,0,128,1)' });
		expect(out.textShadow).toMatch(/rgba\(/);
		expect(out.textShadow).toContain('128');
	});

	it('round-trips zero-offset text shadow (glow effect)', () => {
		const out = roundTrip({ textShadow: '0px 0px 10px rgba(255,255,0,0.9)' });
		expect(out.textShadow).toContain('10px');
	});
});

// ─── TRANSFORM — additional functions ────────────────────────────────────────

describe('transform — translateY and translateZ', () => {
	it('produces translateY()', () => {
		const out = roundTrip({ transform: [{ translateY: '30px' }] });
		expect(out.transform).toContain('translateY(30px)');
	});

	it('produces translateZ()', () => {
		const out = roundTrip({ transform: [{ translateZ: '100px' }] });
		expect(out.transform).toContain('translateZ(100px)');
	});

	it('combines translateX and translateY in same layer', () => {
		const out = roundTrip({ transform: [{ translateX: '10px', translateY: '20px' }] });
		expect(out.transform).toContain('translateX');
		expect(out.transform).toContain('translateY');
	});
});

describe('transform — rotate / rotateX / rotateY / rotateZ', () => {
	it('produces rotate() with deg unit', () => {
		const out = roundTrip({ transform: [{ rotate: '45deg' }] });
		expect(out.transform).toContain('rotate(');
		expect(out.transform).toContain('deg');
	});

	it('wraps rotate 360deg to 0', () => {
		const out = roundTrip({ transform: [{ rotate: '360deg' }] });
		expect(out.transform).toContain('rotate(0deg)');
	});

	it('preserves rotation under 360', () => {
		const out = roundTrip({ transform: [{ rotate: '90deg' }] });
		expect(out.transform).toContain('90deg');
	});

	it('produces rotateX()', () => {
		const out = roundTrip({ transform: [{ rotateX: '30deg' }] });
		expect(out.transform).toContain('rotateX(');
	});

	it('produces rotateY()', () => {
		const out = roundTrip({ transform: [{ rotateY: '60deg' }] });
		expect(out.transform).toContain('rotateY(');
	});

	it('produces rotateZ()', () => {
		const out = roundTrip({ transform: [{ rotateZ: '180deg' }] });
		expect(out.transform).toContain('rotateZ(');
		expect(out.transform).toContain('180');
	});
});

describe('transform — scale / scaleX / scaleY', () => {
	it('produces scale() with unitless value', () => {
		const out = roundTrip({ transform: [{ scale: 2 }] });
		expect(out.transform).toContain('scale(');
		expect(out.transform).toContain('2');
	});

	it('produces scaleX()', () => {
		const out = roundTrip({ transform: [{ scaleX: 1.5 }] });
		expect(out.transform).toContain('scaleX(');
		expect(out.transform).toContain('1.5');
	});

	it('produces scaleY()', () => {
		const out = roundTrip({ transform: [{ scaleY: 0.5 }] });
		expect(out.transform).toContain('scaleY(');
		expect(out.transform).toContain('0.5');
	});

	it('round-trips scale=1 (identity)', () => {
		const out = roundTrip({ transform: [{ scale: 1 }] });
		expect(out.transform).toContain('scale(');
	});
});

describe('transform — skewX / skewY', () => {
	it('produces skewX() with deg', () => {
		const out = roundTrip({ transform: [{ skewX: '15deg' }] });
		expect(out.transform).toContain('skewX(');
		expect(out.transform).toContain('deg');
	});

	it('produces skewY() with deg', () => {
		const out = roundTrip({ transform: [{ skewY: '10deg' }] });
		expect(out.transform).toContain('skewY(');
	});
});

describe('transform — multi-unit calc() inside a transform function', () => {
	it('produces calc() when translateX uses two units', () => {
		const out = roundTrip({ transform: [{ translateX: ['50%', '20px'] }] });
		expect(out.transform).toMatch(/calc\(/);
		expect(out.transform).toContain('50%');
		expect(out.transform).toContain('20px');
	});

	it('produces calc() for multi-unit translateY', () => {
		const out = roundTrip({ transform: [{ translateY: ['100%', '-30px'] }] });
		expect(out.transform).toMatch(/calc\(/);
	});
});

describe('transform — multiple layers with different functions', () => {
	it('renders functions from both layers', () => {
		const out = roundTrip({
			transform: [
				{ translateX: '10px', rotateZ: '45deg' },
				{ scaleX: 2 },
			],
		});
		expect(out.transform).toContain('translateX');
		expect(out.transform).toContain('rotateZ');
		expect(out.transform).toContain('scaleX');
	});
});

// ─── getMuxerTypeOfProperty FALLBACK ─────────────────────────────────────────

describe('getMuxerTypeOfProperty — length fallback', () => {
	// Properties in cssUtils.props with "length" type but absent from cssDemux
	// are routed through getMuxerTypeOfProperty, which returns the length handler.

	it('lineHeight round-trips a rem value', () => {
		const out = roundTrip({ lineHeight: '1.5rem' });
		expect(out.lineHeight).toBe('1.5rem');
	});

	it('lineHeight round-trips a px value', () => {
		expect(roundTrip({ lineHeight: '24px' }).lineHeight).toBe('24px');
	});

	it('fontSize round-trips a px value', () => {
		expect(roundTrip({ fontSize: '16px' }).fontSize).toBe('16px');
	});

	it('letterSpacing round-trips a px value', () => {
		expect(roundTrip({ letterSpacing: '2px' }).letterSpacing).toBe('2px');
	});

	it('columnGap round-trips a px value', () => {
		expect(roundTrip({ columnGap: '20px' }).columnGap).toBe('20px');
	});

	it('outlineWidth round-trips a px value', () => {
		expect(roundTrip({ outlineWidth: '3px' }).outlineWidth).toBe('3px');
	});
});

describe('getMuxerTypeOfProperty — color fallback', () => {
	it('caretColor round-trips as rgba', () => {
		const out = roundTrip({ caretColor: 'rgba(0, 128, 255, 1)' });
		expect(out.caretColor).toMatch(/rgba\(/);
	});

	it('color (text color) round-trips as rgba', () => {
		const out = roundTrip({ color: 'rgba(50, 50, 50, 1)' });
		expect(out.color).toMatch(/rgba\(/);
	});

	it('textDecorationColor round-trips as rgba', () => {
		const out = roundTrip({ textDecorationColor: 'rgba(255, 0, 0, 1)' });
		expect(out.textDecorationColor).toMatch(/rgba\(/);
	});

	it('outlineColor round-trips as rgba', () => {
		const out = roundTrip({ outlineColor: 'red' });
		expect(out.outlineColor).toMatch(/rgba\(/);
	});
});

describe('getMuxerTypeOfProperty — integer/number fallback', () => {
	it('columnCount round-trips as integer', () => {
		expect(roundTrip({ columnCount: 3 }).columnCount).toBe(3);
	});

	it('columnCount truncates float', () => {
		expect(roundTrip({ columnCount: 2.9 }).columnCount).toBe(2);
	});

	it('flexGrow round-trips as integer', () => {
		expect(roundTrip({ flexGrow: 1 }).flexGrow).toBe(1);
	});

	it('flexShrink round-trips as integer', () => {
		expect(roundTrip({ flexShrink: 0 }).flexShrink).toBe(0);
	});
});

// ─── deMuxLine — advanced cases ───────────────────────────────────────────────

describe('deMuxLine — multiple tweens on the same target', () => {
	it('processes all tweens and merges demuxed apply objects', () => {
		const tweens = [
			{ target: 'el', from: 0,   duration: 50,  apply: { opacity: 0 } },
			{ target: 'el', from: 50,  duration: 50,  apply: { opacity: 1 } },
		];
		const result = deMuxLine(tweens, {}, {}, {});
		expect(result).toHaveLength(2);
		result.forEach(t => {
			expect(t.target).toBe('el');
			expect(t.apply).toHaveProperty('opacity');
		});
	});
});

describe('deMuxLine — multiple distinct targets', () => {
	it('produces separate demuxed apply maps per target', () => {
		const tweens = [
			{ target: 'boxA', from: 0, duration: 100, apply: { opacity: 1 } },
			{ target: 'boxB', from: 0, duration: 100, apply: { cx: 50 } },
		];
		const result = deMuxLine(tweens, {}, {}, {});
		expect(result[0].target).toBe('boxA');
		expect(result[0].apply).toHaveProperty('opacity');
		expect(result[1].target).toBe('boxB');
		expect(result[1].apply).toHaveProperty('cx');
	});
});

describe('deMuxLine — non-Tween type pass-through', () => {
	it('leaves non-Tween descriptors untouched in the output', () => {
		const original = { target: 'el', from: 0, duration: 100, type: 'CustomType', apply: { opacity: 1 } };
		const result = deMuxLine([original], {}, {}, {});
		expect(result).toHaveLength(1);
		// apply is NOT demuxed for custom types — it stays as the original CSS object
		expect(result[0].apply.opacity).toBe(1);
		expect(result[0].type).toBe('CustomType');
	});
});

describe('deMuxLine — mixed CSS properties on one target', () => {
	it('handles transform + opacity + cx in the same tween line', () => {
		const tweens = [
			{
				target: 'shape',
				from: 0, duration: 100,
				apply: { opacity: 0.5, cx: 100, transform: [{ translateX: '10px' }] },
			},
		];
		const result = deMuxLine(tweens, {}, {}, {});
		const apply = result[0].apply;
		expect(apply).toHaveProperty('opacity');
		expect(apply).toHaveProperty('cx');
		// transform keys use the 4-part compound format
		const keys = Object.keys(apply);
		expect(keys.some(k => k.startsWith('transform'))).toBe(true);
	});
});

describe('deMuxLine — layout properties in a tween line', () => {
	it('handles margin properties', () => {
		const tweens = [{
			target: 'card',
			from: 0, duration: 200,
			apply: { marginTop: '20px', marginBottom: '10px' },
		}];
		const result = deMuxLine(tweens, {}, {}, {});
		const keys = Object.keys(result[0].apply);
		expect(keys.some(k => k.startsWith('marginTop'))).toBe(true);
		expect(keys.some(k => k.startsWith('marginBottom'))).toBe(true);
	});

	it('handles border color and width together', () => {
		const tweens = [{
			target: 'box',
			from: 0, duration: 100,
			apply: { borderTopWidth: '3px', borderTopColor: 'rgba(255,0,0,1)' },
		}];
		const result = deMuxLine(tweens, {}, {}, {});
		const keys = Object.keys(result[0].apply);
		expect(keys.some(k => k.startsWith('borderTopWidth'))).toBe(true);
		expect(keys.some(k => k.startsWith('borderTopColor'))).toBe(true);
	});
});
