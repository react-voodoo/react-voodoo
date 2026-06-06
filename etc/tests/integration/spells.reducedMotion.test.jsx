/**
 * Integration tests for:
 *  - withTweener (Voodoo.child) & useTweener — context consumers (public API)
 *  - Tweener-level reduced-motion branches: scrollTo() collapses to instant,
 *    pushAnim() jumps to its final state
 *  - Axis lifecycle: items rebuild & unmount without leaking timelines
 */
import React            from 'react';
import { act, render }  from '@testing-library/react';
import '@testing-library/jest-dom';

import Voodoo from '../../../dist/react-voodoo.js';

describe('withTweener (Voodoo.child) & useTweener', () => {
	it('withTweener injects the context tweener into a class component', () => {
		let injected, rootEngine;

		class Probe extends React.Component {
			render() {
				injected = this.props.tweener;
				return <div/>;
			}
		}

		const Child = Voodoo.child(Probe);

		class Root extends React.Component {
			render() {
				rootEngine = this.props.tweener;
				return <Child/>;
			}
		}

		const WRoot = Voodoo.tweener(Root);
		render(<WRoot/>);

		expect(injected).toBe(rootEngine);
		expect(injected?.__isTweener).toBe(true);
	});

	it('useTweener returns the nearest context tweener', () => {
		let fromHook, fromCreator;

		const Child = () => {
			fromHook = Voodoo.useTweener();
			return <div/>;
		};
		const App   = () => {
			const [tweener, ViewBox] = Voodoo.useVoodoo({});
			fromCreator              = tweener;
			return <ViewBox><Child/></ViewBox>;
		};
		render(<App/>);

		expect(fromHook).toBe(fromCreator);
	});
});

describe('Tweener reduced-motion branches', () => {
	function makeApp( reducedMotion ) {
		const ref = {};

		const App = () => {
			const [tweener, ViewBox] = Voodoo.useVoodoo({ reducedMotion });
			ref.tweener              = tweener;
			return <ViewBox>
				<Voodoo.Axis id="scrollY" size={1000} items={[
					{ target: "box", from: 0, duration: 1000, apply: { opacity: -1 } }
				]}/>
				<Voodoo.Node id="box" style={{ opacity: 1 }}>
					<div data-testid="box"/>
				</Voodoo.Node>
			</ViewBox>;
		};

		return { App, ref };
	}

	it("scrollTo() with an easing duration is collapsed to instant when reduced", async () => {
		const { App, ref } = makeApp('always');
		render(<App/>);

		const t0 = Date.now();
		await act(async () => {
			await ref.tweener.scrollTo(500, 800, "scrollY");
		});

		// the 800ms eased scroll resolved (quasi) immediately, at the right position
		expect(Date.now() - t0).toBeLessThan(200);
		expect(ref.tweener.axes.scrollY.scrollPos).toBe(500);
	});

	it("pushAnim() jumps to its final state when reduced", async () => {
		const { App, ref } = makeApp('always');
		const { getByTestId } = render(<App/>);

		const t0 = Date.now();
		await act(async () => {
			await ref.tweener.pushAnim([
				{ target: "box", from: 0, duration: 800, apply: { opacity: -.5 } }
			]);
		});

		expect(Date.now() - t0).toBeLessThan(200);
		// full delta applied: 1 - .5
		expect(parseFloat(getByTestId('box').style.opacity)).toBeCloseTo(.5, 2);
	});

	it("control: 'never' keeps eased scrolls animated", async () => {
		const { App, ref } = makeApp('never');
		render(<App/>);

		let resolved = false;
		await act(async () => {
			const p = ref.tweener.scrollTo(500, 400, "scrollY").then(() => (resolved = true));
			// shortly after start, the eased scroll must still be in flight
			await new Promise(r => setTimeout(r, 50));
			expect(resolved).toBe(false);
			await p;
		});
		expect(ref.tweener.axes.scrollY.scrollPos).toBe(500);
	});
});

describe('Axis lifecycle', () => {
	it('rebuilds cleanly when items change and unmounts without warnings', async () => {
		const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
		try {
			const ref = {};
			const App = ( { items, mounted = true } ) => {
				const [tweener, ViewBox] = Voodoo.useVoodoo({});
				ref.tweener              = tweener;
				return <ViewBox>
					{mounted && <Voodoo.Axis id="scrollY" size={1000} items={items}/>}
					<Voodoo.Node id="box" style={{ opacity: 1 }}>
						<div data-testid="box"/>
					</Voodoo.Node>
				</ViewBox>;
			};

			const itemsA = [{ target: "box", from: 0, duration: 1000, apply: { opacity: -1 } }];
			const itemsB = [{ target: "box", from: 0, duration: 1000, apply: { opacity: -.4 } }];

			const { getByTestId, rerender } = render(<App items={itemsA}/>);

			await act(async () => { await ref.tweener.scrollTo(500, 0, "scrollY"); });
			expect(parseFloat(getByTestId('box').style.opacity)).toBeCloseTo(.5, 2);

			// swap the timeline: old deltas rolled back, new ones applied at current pos
			rerender(<App items={itemsB}/>);
			expect(parseFloat(getByTestId('box').style.opacity)).toBeCloseTo(.8, 2);

			// unmount the axis: timeline removed, styles rolled back to initial
			rerender(<App items={itemsB} mounted={false}/>);
			expect(parseFloat(getByTestId('box').style.opacity)).toBeCloseTo(1, 2);

			expect(warn).not.toHaveBeenCalled();
		}
		finally {
			warn.mockRestore();
		}
	});
});
