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
 * Integration tests for react-voodoo React components.
 *
 * Tests are written with @testing-library/react and cover the full component
 * tree: useVoodoo hook → ViewBox → Axis / Node / Draggable.
 */

import React                               from 'react';
import { act, render }                     from '@testing-library/react';
import '@testing-library/jest-dom';

// Import from the compiled dist so we exercise the released build.
import Voodoo from '../../../dist/react-voodoo.js';

// ─── useVoodoo / ViewBox ─────────────────────────────────────────────────────

describe('useVoodoo hook', () => {
	it('returns a tweener instance and a ViewBox component', () => {
		let tweener, ViewBox;
		const Comp = () => {
			[tweener, ViewBox] = Voodoo.hook();
			return <ViewBox data-testid="vb"><span>hi</span></ViewBox>;
		};

		const { getByTestId } = render(<Comp/>);
		expect(getByTestId('vb')).toBeInTheDocument();
		expect(tweener).toBeTruthy();
		expect(typeof tweener.scrollTo).toBe('function');
		expect(typeof tweener.watchAxis).toBe('function');
	});

	it('can access a named parent tweener from a child', () => {
		let rootTweener, childTweener;

		const Child = () => {
			[rootTweener] = Voodoo.hook('root');
			return <div/>;
		};
		const Parent = () => {
			const [t, ViewBox] = Voodoo.hook({ name: 'root' });
			childTweener       = t;
			return <ViewBox><Child/></ViewBox>;
		};

		render(<Parent/>);
		expect(rootTweener).toBe(childTweener);
	});
});

// ─── Voodoo.Node — initial styles ────────────────────────────────────────────

describe('Voodoo.Node initial styles', () => {
	it('applies a simple width to the child element', () => {
		const Comp = () => {
			const [, ViewBox] = Voodoo.hook();
			return (
				<ViewBox>
					<Voodoo.Node id="card" style={{ width: '120px' }}>
						<div data-testid="card">test</div>
					</Voodoo.Node>
				</ViewBox>
			);
		};

		const { getByTestId } = render(<Comp/>);
		expect(getByTestId('card').style.width).toBe('120px');
	});

	it('sets opacity to 0 when specified', () => {
		const Comp = () => {
			const [, ViewBox] = Voodoo.hook();
			return (
				<ViewBox>
					<Voodoo.Node id="card" style={{ opacity: 0 }}>
						<div data-testid="card">test</div>
					</Voodoo.Node>
				</ViewBox>
			);
		};
		const { getByTestId } = render(<Comp/>);
		// ratio demux produces a number; jsdom serialises 0 as '0'
		expect(getByTestId('card').style.opacity).toBe('0');
	});

	it('produces a calc() expression for multi-unit width', () => {
		const Comp = () => {
			const [, ViewBox] = Voodoo.hook();
			return (
				<ViewBox>
					<Voodoo.Node id="card" style={{ width: ['50%', '20px'] }}>
						<div data-testid="card">test</div>
					</Voodoo.Node>
				</ViewBox>
			);
		};
		const { getByTestId } = render(<Comp/>);
		expect(getByTestId('card').style.width).toMatch(/calc\(/);
		expect(getByTestId('card').style.width).toContain('50%');
		expect(getByTestId('card').style.width).toContain('20px');
	});
});

// ─── Voodoo.Axis — scrollTo updates Node styles ──────────────────────────────

describe('Voodoo.Axis + scrollTo', () => {
	it('applies tween styles after programmatic scrollTo', async () => {
		let tweener;
		const tweens = [{
			target  : 'box',
			from    : 0,
			duration: 100,
			apply   : { opacity: 1 },
		}];

		const Comp = () => {
			const [t, ViewBox] = Voodoo.hook();
			tweener            = t;
			return (
				<ViewBox>
					<Voodoo.Axis id="scroll" size={100} items={tweens}/>
					<Voodoo.Node id="box" style={{ opacity: 0 }}>
						<div data-testid="box">test</div>
					</Voodoo.Node>
				</ViewBox>
			);
		};

		const { getByTestId } = render(<Comp/>);

		// Scroll to the midpoint of the axis (50 / 100 = 0.5 progress)
		await act(async () => {
			tweener.scrollTo(50, 0, 'scroll');
		});

		const opacity = parseFloat(getByTestId('box').style.opacity);
		expect(opacity).toBeGreaterThan(0);
		expect(opacity).toBeLessThanOrEqual(1);
	});

	it('reaches full opacity at the end of the axis', async () => {
		let tweener;
		const tweens = [{ target: 'box', from: 0, duration: 100, apply: { opacity: 1 } }];

		const Comp = () => {
			const [t, ViewBox] = Voodoo.hook();
			tweener            = t;
			return (
				<ViewBox>
					<Voodoo.Axis id="scroll" size={100} items={tweens}/>
					<Voodoo.Node id="box" style={{ opacity: 0 }}>
						<div data-testid="box">test</div>
					</Voodoo.Node>
				</ViewBox>
			);
		};

		const { getByTestId } = render(<Comp/>);

		await act(async () => {
			tweener.scrollTo(100, 0, 'scroll');
		});

		expect(parseFloat(getByTestId('box').style.opacity)).toBeCloseTo(1);
	});
});

// ─── watchAxis ───────────────────────────────────────────────────────────────

describe('tweener.watchAxis', () => {
	it('fires a listener when the axis position changes', async () => {
		let tweener;
		const positions = [];

		const Comp = () => {
			const [t, ViewBox] = Voodoo.hook();
			tweener            = t;
			return (
				<ViewBox>
					<Voodoo.Axis id="scroll" size={200}/>
				</ViewBox>
			);
		};

		render(<Comp/>);

		const unwatch = tweener.watchAxis('scroll', (pos) => positions.push(pos));

		await act(async () => {
			tweener.scrollTo(100, 0, 'scroll');
		});

		unwatch();

		await act(async () => {
			tweener.scrollTo(50, 0, 'scroll');
		});

		// Listener should have fired for the first scroll but not the second
		expect(positions.length).toBeGreaterThan(0);
		expect(positions).not.toContain(50);
	});
});

// ─── SVG geometry attributes (setAttribute) ──────────────────────────────────

describe('SVG geometry attributes via setAttribute', () => {
	it('sets cx and cy on a <circle> using setAttribute after mount', () => {
		const Comp = () => {
			const [, ViewBox] = Voodoo.hook();
			return (
				<ViewBox>
					<svg>
						<Voodoo.Node id="dot" style={{ cx: 50, cy: 100 }}>
							<circle data-testid="dot"/>
						</Voodoo.Node>
					</svg>
				</ViewBox>
			);
		};

		render(<Comp/>);

		const circle = document.querySelector('[data-testid="dot"]');
		expect(circle.getAttribute('cx')).toBe('50');
		expect(circle.getAttribute('cy')).toBe('100');
	});

	it('sets r on a <circle>', () => {
		const Comp = () => {
			const [, ViewBox] = Voodoo.hook();
			return (
				<ViewBox>
					<svg>
						<Voodoo.Node id="circ" style={{ r: 30 }}>
							<circle data-testid="circ"/>
						</Voodoo.Node>
					</svg>
				</ViewBox>
			);
		};

		render(<Comp/>);
		expect(document.querySelector('[data-testid="circ"]').getAttribute('r')).toBe('30');
	});

	it('updates SVG geometry attributes when the axis scrolls', async () => {
		let tweener;
		const tweens = [{ target: 'dot', from: 0, duration: 100, apply: { cx: 100 } }];

		const Comp = () => {
			const [t, ViewBox] = Voodoo.hook();
			tweener            = t;
			return (
				<ViewBox>
					<Voodoo.Axis id="scroll" size={100} items={tweens}/>
					<svg>
						<Voodoo.Node id="dot" style={{ cx: 0 }}>
							<circle data-testid="moving-dot"/>
						</Voodoo.Node>
					</svg>
				</ViewBox>
			);
		};

		render(<Comp/>);

		await act(async () => {
			tweener.scrollTo(100, 0, 'scroll');
		});

		const cx = parseFloat(document.querySelector('[data-testid="moving-dot"]').getAttribute('cx'));
		expect(cx).toBeCloseTo(100);
	});
});

// ─── Node.div convenience ────────────────────────────────────────────────────

describe('Voodoo.Node.div', () => {
	it('renders a <div> child with the given className', () => {
		const Comp = () => {
			const [, ViewBox] = Voodoo.hook();
			return (
				<ViewBox>
					<Voodoo.Node.div id="card" className="my-card" style={{ opacity: 1 }}/>
				</ViewBox>
			);
		};

		const { container } = render(<Comp/>);
		expect(container.querySelector('.my-card')).toBeInTheDocument();
	});
});

// ─── Node.g convenience ──────────────────────────────────────────────────────

describe('Voodoo.Node.g', () => {
	it('renders a <g> element with the given className', () => {
		const Comp = () => {
			const [, ViewBox] = Voodoo.hook();
			return (
				<ViewBox>
					<svg>
						<Voodoo.Node.g id="grp" className="my-group" style={{ opacity: 1 }}>
							<circle cx="10" cy="10" r="5"/>
						</Voodoo.Node.g>
					</svg>
				</ViewBox>
			);
		};

		const { container } = render(<Comp/>);
		expect(container.querySelector('g.my-group')).toBeInTheDocument();
	});
});

// ─── pushAnim ────────────────────────────────────────────────────────────────

describe('tweener.pushAnim', () => {
	it('returns a Promise that resolves when the animation completes', async () => {
		jest.useFakeTimers();

		let tweener;
		const Comp = () => {
			const [t, ViewBox] = Voodoo.hook();
			tweener            = t;
			return (
				<ViewBox>
					<Voodoo.Node id="box" style={{ opacity: 0 }}>
						<div data-testid="box">hi</div>
					</Voodoo.Node>
				</ViewBox>
			);
		};

		render(<Comp/>);

		let resolved = false;
		const p      = tweener.pushAnim(
			Voodoo.tools.target([{ from: 0, duration: 100, apply: { opacity: 1 } }], 'box')
		).then(() => { resolved = true; });

		// Advance through the animation duration
		await act(async () => {
			jest.advanceTimersByTime(200);
		});

		await p;
		expect(resolved).toBe(true);

		jest.useRealTimers();
	});
});
