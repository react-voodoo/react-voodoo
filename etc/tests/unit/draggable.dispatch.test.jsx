/**
 * Draggable → axis dispatch mechanics:
 *  - pixel deltas are scaled to axis units ((px / box) × scrollableWindow|Area)
 *  - xHook transforms the delta before it moves the axis
 *  - dragDirectionLock locks the gesture to the dominant axis
 */
import React                 from 'react';
import { render, fireEvent } from '@testing-library/react';

jest.mock('../../../src/utils/css', () => ({
	clearTweenableValue: () => {},
	deMuxLine          : () => [],
	deMuxTween         : () => ({}),
	muxToCss           : () => {}
}));
jest.mock('../../../src/utils/CssTweenAxis', () => (class {}));

const useVoodoo = require('../../../src/hooks/useVoodoo').default;
const Draggable = require('../../../src/comps/Draggable').default;

function App( { onTweener, xHook, dragDirectionLock } ) {
	const [tweener, ViewBox] = useVoodoo({ dragDirectionLock });
	React.useMemo(
		() => {
			tweener.initAxis('x', { scrollableArea: 1000 });
			tweener.initAxis('y', { scrollableArea: 1000 });
			onTweener?.(tweener);
		}, []
	);
	return <ViewBox>
		<Draggable mouseDrag xAxis="x" yAxis="y" xHook={xHook}>
			<button data-testid="grip"/>
		</Draggable>
	</ViewBox>;
}

function mockBox( container ) {
	Object.defineProperty(container.firstChild, 'offsetWidth', { value: 500 });
	Object.defineProperty(container.firstChild, 'offsetHeight', { value: 500 });
}

function fire( target, type, x, y = 100 ) {
	const e = new MouseEvent(type, {
		bubbles: true, cancelable: true, button: 0, clientX: x, clientY: y
	});
	Object.assign(e, { pageX: x, pageY: y });
	fireEvent(target, e);
}

function setup( props = {} ) {
	let tweener;
	const utils = render(<App {...props} onTweener={t => (tweener = t)}/>);
	mockBox(utils.container);
	return { ...utils, tweener };
}

describe('Draggable → axis dispatch', () => {
	it('scales pixel deltas to axis units ((px / box) × scrollableArea)', () => {
		const { getByTestId, tweener } = setup();
		const grip = getByTestId('grip');

		fire(grip, 'mousedown', 100);
		// dragging left by 50px on a 500px box over a 1000-unit axis → +100 units
		fire(document, 'mousemove', 50);
		fire(document, 'mouseup', 50);

		expect(tweener.axes.x.inertia._.pos).toBeCloseTo(100, 0);
	});

	it('xHook transforms the delta before it reaches the axis', () => {
		const { getByTestId, tweener } = setup({ xHook: d => d / 2 });
		const grip = getByTestId('grip');

		fire(grip, 'mousedown', 100);
		fire(document, 'mousemove', 50);// raw +100 units → hook → +50
		fire(document, 'mouseup', 50);

		expect(tweener.axes.x.inertia._.pos).toBeCloseTo(50, 0);
	});

	it('dragDirectionLock locks the gesture to the dominant axis', () => {
		const { getByTestId, tweener } = setup({ dragDirectionLock: true });
		const grip = getByTestId('grip');

		// deltas are negated (scroll convention): drag UP to move the y axis forward
		fire(grip, 'mousedown', 100, 300);
		// strongly vertical move: lock chooses Y, X must stay untouched
		fire(document, 'mousemove', 90, 200);
		fire(document, 'mousemove', 88, 150);
		fire(document, 'mouseup', 88, 150);

		expect(tweener.axes.x.inertia._.pos).toBe(0);
		expect(tweener.axes.y.inertia._.pos).toBeGreaterThan(0);
	});

	it('without direction lock, both axes receive their deltas', () => {
		const { getByTestId, tweener } = setup();
		const grip = getByTestId('grip');

		// drag up-left: both deltas positive under the scroll convention
		fire(grip, 'mousedown', 100, 300);
		fire(document, 'mousemove', 50, 250);
		fire(document, 'mouseup', 50, 250);

		expect(tweener.axes.x.inertia._.pos).toBeGreaterThan(0);
		expect(tweener.axes.y.inertia._.pos).toBeGreaterThan(0);
	});
});
