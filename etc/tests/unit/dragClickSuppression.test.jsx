/**
 * Regression tests: the native click that follows a real mouse drag must NOT
 * reach the draggable's descendants (e.g. slider slides with onClick), while a
 * clean tap/click must pass through untouched.
 *
 * Gesture simulation goes through the real dom.js drag system: mousedown on the
 * child → mousemove on document (drag) → mouseup on document → click.
 */
import React                 from 'react';
import { render, fireEvent } from '@testing-library/react';

// Tweener pulls in utils/css whose glob imports are resolved by layer-pack at
// build time only — stub it (the drag/click path doesn't use it).
jest.mock('../../../src/utils/css', () => ({
	clearTweenableValue: () => {},
	deMuxLine          : () => [],
	deMuxTween         : () => ({}),
	muxToCss           : () => {}
}));
jest.mock('../../../src/utils/CssTweenAxis', () => (class {}));

const useVoodoo = require('../../../src/hooks/useVoodoo').default;
const Draggable = require('../../../src/comps/Draggable').default;

function App( { onChildClick, withAxis } ) {
	const [tweener, ViewBox] = useVoodoo({});
	React.useMemo(
		() => {
			// a real scrollable axis so drag deltas are actually dispatched
			// (inertia.hold) — like the slider's slideAxis
			withAxis && tweener.initAxis('x', { scrollableArea: 1000 });
		}, []
	);
	return <ViewBox>
		<Draggable mouseDrag xAxis="x">
			<button data-testid="slide" onClick={onChildClick}>slide</button>
		</Draggable>
	</ViewBox>;
}

/** jsdom reports offsetWidth/Height = 0 → drag→axis scaling would divide by 0 */
function mockBox( container ) {
	Object.defineProperty(container.firstChild, 'offsetWidth', { value: 500 });
	Object.defineProperty(container.firstChild, 'offsetHeight', { value: 500 });
}

/**
 * mousedown on the child, optional move (px) on document, mouseup, then click.
 *
 * The drag system reads finger.pageX/pageY, which jsdom neither implements nor
 * derives from clientX — and fireEvent ignores non-MouseEventInit keys. So the
 * events are built manually and pageX/pageY assigned onto the instance.
 */
function fire( target, type, x ) {
	const e = new MouseEvent(type, {
		bubbles   : true,
		cancelable: true,
		button    : 0,
		clientX   : x,
		clientY   : 100
	});
	Object.assign(e, { pageX: x, pageY: 100 });
	fireEvent(target, e);
}

function gesture( target, { move = 0, path, release } = {} ) {
	const steps = path || (move ? [move] : []);
	let x       = 100;
	fire(target, 'mousedown', 100);
	for ( const step of steps )
		fire(document, 'mousemove', x = 100 + step);
	if ( release !== undefined )
		x = 100 + release;// pointer kept moving between the last move event and the release
	fire(document, 'mouseup', x);
	fire(target, 'click', x);
}

describe('post-drag click suppression', () => {
	it('a real drag does NOT trigger the descendant onClick', () => {
		const onChildClick = jest.fn();
		const { getByTestId } = render(<App onChildClick={onChildClick}/>);

		// 60px drag — way beyond maxClickOffset (5px), fast (< maxClickTm)
		gesture(getByTestId('slide'), { move: -60 });

		expect(onChildClick).not.toHaveBeenCalled();
	});

	it('a clean tap still triggers the descendant onClick', () => {
		const onChildClick = jest.fn();
		const { getByTestId } = render(<App onChildClick={onChildClick}/>);

		gesture(getByTestId('slide'), { move: 0 });

		expect(onChildClick).toHaveBeenCalledTimes(1);
	});

	it('a tap right after a drag is not swallowed (no stale prevent flag)', () => {
		const onChildClick = jest.fn();
		const { getByTestId } = render(<App onChildClick={onChildClick}/>);
		const slide = getByTestId('slide');

		// drag whose click never fires (e.g. released outside) leaves no stale state…
		fire(slide, 'mousedown', 100);
		fire(document, 'mousemove', 40);
		fire(document, 'mouseup', 40);
		// …no click dispatched here (browser fired it on an outside ancestor)

		// next clean tap must pass
		gesture(slide, { move: 0 });

		expect(onChildClick).toHaveBeenCalledTimes(1);
	});

	it('a SLOW motionless press (> maxClickTm) still clicks — duration alone never disqualifies', () => {
		const onChildClick = jest.fn();
		const { getByTestId } = render(<App onChildClick={onChildClick}/>);
		const slide = getByTestId('slide');

		let now = 100000;
		jest.spyOn(Date, 'now').mockImplementation(() => now);
		try {
			fire(slide, 'mousedown', 100);
			now += 400;// press held 400ms, no movement
			fire(document, 'mouseup', 100);
			fire(slide, 'click', 100);
		}
		finally {
			Date.now.mockRestore();
		}

		expect(onChildClick).toHaveBeenCalledTimes(1);
	});

	it('sub-threshold jitter (< maxClickOffset) still clicks', () => {
		const onChildClick = jest.fn();
		const { getByTestId } = render(<App onChildClick={onChildClick}/>);

		gesture(getByTestId('slide'), { move: 3 });// < 5px default offset

		expect(onChildClick).toHaveBeenCalledTimes(1);
	});

	it('a light swipe (12px) does NOT click', () => {
		const onChildClick = jest.fn();
		const { getByTestId, container } = render(<App onChildClick={onChildClick} withAxis/>);
		mockBox(container);

		gesture(getByTestId('slide'), { path: [-4, -8, -12] });

		expect(onChildClick).not.toHaveBeenCalled();
	});

	it('a fast flick whose displacement is only reported at mouseup does NOT click', () => {
		const onChildClick = jest.fn();
		const { getByTestId, container } = render(<App onChildClick={onChildClick} withAxis/>);
		mockBox(container);

		// OS event coalescing: a single in-deadzone move sample, the real
		// displacement only lands in the mouseup coordinates
		gesture(getByTestId('slide'), { path: [-4], release: -25 });

		expect(onChildClick).not.toHaveBeenCalled();
	});

	it('a fast flick with NO intermediate mousemove does NOT click', () => {
		const onChildClick = jest.fn();
		const { getByTestId, container } = render(<App onChildClick={onChildClick} withAxis/>);
		mockBox(container);

		gesture(getByTestId('slide'), { release: -30 });

		expect(onChildClick).not.toHaveBeenCalled();
	});

	it('an out-and-back swipe (net < maxClickOffset) does NOT click — content moved', () => {
		const onChildClick = jest.fn();
		const { getByTestId, container } = render(<App onChildClick={onChildClick} withAxis/>);
		mockBox(container);

		// out 60px (axis dragged) then back near the origin before release
		gesture(getByTestId('slide'), { path: [-30, -60, -30, -2] });

		expect(onChildClick).not.toHaveBeenCalled();
	});
});
