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

// Import from the compiled dist; tweenTools are exported as Voodoo.tools.
import Voodoo from '../../../dist/react-voodoo.js';

const { cssAdd, cssMult, offset, reverse, scale, shiftTransforms, target } = Voodoo.tools;

// ─── cssAdd ─────────────────────────────────────────────────────────────────

describe('cssAdd', () => {
	it('merges values of the same unit', () => {
		expect(cssAdd('50px', '30px')).toEqual(['80px']);
	});

	it('keeps values of different units separate', () => {
		expect(cssAdd('50%', '30px')).toEqual(expect.arrayContaining(['50%', '30px']));
		expect(cssAdd('50%', '30px')).toHaveLength(2);
	});

	it('accepts arrays as operands', () => {
		const result = cssAdd(['50%', '10px'], '5px');
		expect(result).toContain('50%');
		// 10px + 5px = 15px
		expect(result).toContain('15px');
	});

	it('supports variadic arguments', () => {
		expect(cssAdd('10px', '20px', '30px')).toEqual(['60px']);
	});

	it('handles negative values', () => {
		expect(cssAdd('100px', '-40px')).toEqual(['60px']);
	});
});

// ─── cssMult ────────────────────────────────────────────────────────────────

describe('cssMult', () => {
	it('scales a single-unit value', () => {
		expect(cssMult('50px', 2)).toEqual(['100px']);
	});

	it('scales each unit in a multi-unit array', () => {
		const result = cssMult(['50%', '10px'], 3);
		expect(result).toContain('150%');
		expect(result).toContain('30px');
	});

	it('handles decimal multipliers', () => {
		expect(cssMult('100px', 0.5)).toEqual(['50px']);
	});
});

// ─── offset ─────────────────────────────────────────────────────────────────

describe('offset', () => {
	it('shifts all `from` positions by the given start', () => {
		const items  = [{ from: 10, duration: 20 }, { from: 50, duration: 30 }];
		const result = offset(items, 100);
		expect(result[0].from).toBe(110);
		expect(result[1].from).toBe(150);
	});

	it('does not mutate the original items', () => {
		const items = [{ from: 0, duration: 50 }];
		offset(items, 10);
		expect(items[0].from).toBe(0);
	});

	it('preserves all other tween properties', () => {
		const items  = [{ from: 0, duration: 100, apply: { opacity: 1 }, target: 'card' }];
		const result = offset(items, 50);
		expect(result[0].duration).toBe(100);
		expect(result[0].apply).toEqual({ opacity: 1 });
		expect(result[0].target).toBe('card');
	});

	it('defaults to no shift when start is omitted', () => {
		const items  = [{ from: 20, duration: 10 }];
		const result = offset(items);
		expect(result[0].from).toBe(20);
	});
});

// ─── scale ──────────────────────────────────────────────────────────────────

describe('scale', () => {
	it('scales a timeline to a target duration', () => {
		const items  = [
			{ from: 0, duration: 100 },
			{ from: 100, duration: 100 },
		];
		const result = scale(items, 400);
		// Total source duration = 200; each segment should double.
		expect(result[0].from).toBeCloseTo(0);
		expect(result[0].duration).toBeCloseTo(200);
		expect(result[1].from).toBeCloseTo(200);
		expect(result[1].duration).toBeCloseTo(200);
	});

	it('applies an optional offset after scaling', () => {
		const items  = [{ from: 0, duration: 100 }];
		const result = scale(items, 200, 50);
		expect(result[0].from).toBe(50);
		expect(result[0].duration).toBeCloseTo(200);
	});

	it('does not mutate the original items', () => {
		const items = [{ from: 0, duration: 100 }];
		scale(items, 200);
		expect(items[0].from).toBe(0);
	});
});

// ─── reverse ────────────────────────────────────────────────────────────────

describe('reverse', () => {
	it('reverses a single-tween timeline', () => {
		// Total duration = 100. Reversed from = 100 - (0 + 100) = 0.
		const items  = [{ from: 0, duration: 100, apply: { translateX: '50px' } }];
		const result = reverse(items);
		expect(result[0].from).toBe(0);
		expect(result[0].duration).toBe(100);
		// apply values are negated
		expect(result[0].apply.translateX).toBe('-50px');
	});

	it('reverses position order for a two-tween timeline', () => {
		const items = [
			{ from: 0, duration: 50 },
			{ from: 50, duration: 50 },
		];
		const result = reverse(items);
		// Item that was at [50,100] now at [0, 50]
		expect(result.find(i => i.from === 0)?.duration).toBe(50);
		// Item that was at [0, 50] now at [50, 100]
		expect(result.find(i => i.from === 50)?.duration).toBe(50);
	});

	it('negates numeric apply values', () => {
		const items  = [{ from: 0, duration: 100, apply: { opacity: 0.5 } }];
		const result = reverse(items);
		expect(result[0].apply.opacity).toBe(-0.5);
	});

	it('does not mutate the original items', () => {
		const items = [{ from: 0, duration: 100, apply: { translateX: '20px' } }];
		reverse(items);
		expect(items[0].apply.translateX).toBe('20px');
	});
});

// ─── target ─────────────────────────────────────────────────────────────────

describe('target', () => {
	it('assigns the target id to every tween descriptor', () => {
		const items  = [{ from: 0, duration: 50 }, { from: 50, duration: 50 }];
		const result = target(items, 'card');
		expect(result[0].target).toBe('card');
		expect(result[1].target).toBe('card');
	});

	it('overwrites any existing target field', () => {
		const items  = [{ from: 0, duration: 50, target: 'old' }];
		const result = target(items, 'new');
		expect(result[0].target).toBe('new');
	});

	it('does not mutate the original items', () => {
		const items = [{ from: 0, duration: 50 }];
		target(items, 'card');
		expect(items[0].target).toBeUndefined();
	});
});

// ─── shiftTransforms ────────────────────────────────────────────────────────

describe('shiftTransforms', () => {
	it('prepends one empty transform layer by default', () => {
		const items = [{
			from : 0, duration: 100,
			apply: { transform: [{ translateX: '10px' }] },
		}];
		const result = shiftTransforms(items, 1);
		expect(result[0].apply.transform).toEqual([{}, { translateX: '10px' }]);
	});

	it('prepends the specified number of empty layers', () => {
		const items = [{
			from : 0, duration: 100,
			apply: { transform: [{ rotate: '45deg' }] },
		}];
		const result = shiftTransforms(items, 3);
		expect(result[0].apply.transform[0]).toEqual({});
		expect(result[0].apply.transform[1]).toEqual({});
		expect(result[0].apply.transform[2]).toEqual({});
		expect(result[0].apply.transform[3]).toEqual({ rotate: '45deg' });
	});

	it('wraps a non-array transform in an array before shifting', () => {
		const items = [{
			from : 0, duration: 100,
			apply: { transform: { scaleX: 2 } },
		}];
		const result = shiftTransforms(items, 1);
		expect(result[0].apply.transform).toHaveLength(2);
		expect(result[0].apply.transform[0]).toEqual({});
	});

	it('leaves items without a transform unchanged', () => {
		const items  = [{ from: 0, duration: 100, apply: { opacity: 1 } }];
		const result = shiftTransforms(items, 2);
		expect(result[0].apply.transform).toBeUndefined();
		expect(result[0].apply.opacity).toBe(1);
	});

	it('does not mutate apply.transform of the original', () => {
		const t     = [{ translateX: '5px' }];
		const items = [{ from: 0, duration: 50, apply: { transform: t } }];
		shiftTransforms(items, 1);
		expect(t).toHaveLength(1);
	});
});
