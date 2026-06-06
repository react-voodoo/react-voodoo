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

function App( { onChildClick } ) {
	const [, ViewBox] = useVoodoo({});
	return <ViewBox>
		<Draggable mouseDrag xAxis="x">
			<button data-testid="slide" onClick={onChildClick}>slide</button>
		</Draggable>
	</ViewBox>;
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

function gesture( target, { move = 0 } = {} ) {
	fire(target, 'mousedown', 100);
	if ( move )
		fire(document, 'mousemove', 100 + move);
	fire(document, 'mouseup', 100 + move);
	fire(target, 'click', 100 + move);
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

	it('sub-threshold jitter (< maxClickOffset) still clicks', () => {
		const onChildClick = jest.fn();
		const { getByTestId } = render(<App onChildClick={onChildClick}/>);

		gesture(getByTestId('slide'), { move: 3 });// < 5px default offset

		expect(onChildClick).toHaveBeenCalledTimes(1);
	});
});
