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
 * Integration tests for the asTweener HOC path (TweenerHost).
 *
 * Since the Tweener engine no longer extends React.Component, asTweener hosts it
 * in a thin function component — these tests cover what the legacy Tweener.render()
 * used to do: tweener prop injection, parent-engine mapping via context, ref
 * forwarding to the wrapped class component, lifecycle & unmount.
 */
import React            from 'react';
import { render, act }  from '@testing-library/react';
import '@testing-library/jest-dom';

import Voodoo from '../../../dist/react-voodoo.js';

describe('asTweener (TweenerHost)', () => {
	it('injects a live tweener engine into the wrapped class component', () => {
		let captured;

		class Probe extends React.Component {
			render() {
				captured = this.props.tweener;
				return <div data-testid="probe">{this.props.children}</div>;
			}
		}

		const Wrapped      = Voodoo.tweener(Probe);
		const { getByTestId, unmount } = render(<Wrapped>hello</Wrapped>);

		expect(getByTestId('probe')).toHaveTextContent('hello');
		expect(captured?.__isTweener).toBe(true);
		// componentDidMount ran (host-driven lifecycle)
		expect(captured._.rendered).toBe(true);

		unmount();
		expect(captured._.tweenEnabled).toBe(false);
	});

	it('maps the parent engine from context (_parentTweener chain)', () => {
		let outer, inner;

		class Outer extends React.Component {
			render() {
				outer = this.props.tweener;
				return <div>{this.props.children}</div>;
			}
		}

		class Inner extends React.Component {
			render() {
				inner = this.props.tweener;
				return <div/>;
			}
		}

		const WOuter = Voodoo.tweener(Outer);
		const WInner = Voodoo.tweener(Inner);

		render(<WOuter><WInner/></WOuter>);

		expect(inner).not.toBe(outer);
		expect(inner._parentTweener).toBe(outer);
		expect(outer._parentTweener).toBe(null);// root: no parent in context
	});

	it('forwards the user ref to the wrapped class component instance', () => {
		class Probe extends React.Component {
			render() {
				return <div/>;
			}
		}

		const Wrapped = Voodoo.tweener(Probe);
		const ref     = React.createRef();
		render(<Wrapped ref={ref}/>);

		expect(ref.current).toBeInstanceOf(Probe);
	});

	it('named lookup via useVoodoo("name") traverses the host-mapped chain', () => {
		let found;

		class Named extends React.Component {
			render() {
				return <div>{this.props.children}</div>;
			}
		}

		const WNamed = Voodoo.tweener(Named, { name: 'rootEngine' });

		const Child = () => {
			const [tweener] = Voodoo.useVoodoo('rootEngine');
			found           = tweener;
			return <div/>;
		};

		render(<WNamed><Child/></WNamed>);

		expect(found?._?.options?.name).toBe('rootEngine');
	});

	it('survives a re-render (componentDidUpdate parity) and updates props', () => {
		let captured;

		class Probe extends React.Component {
			render() {
				captured = this.props.tweener;
				return <div data-testid="probe">{this.props.label}</div>;
			}
		}

		const Wrapped               = Voodoo.tweener(Probe);
		const { getByTestId, rerender } = render(<Wrapped label="a"/>);
		const first                 = captured;

		rerender(<Wrapped label="b"/>);

		expect(getByTestId('probe')).toHaveTextContent('b');
		// the engine instance is stable across re-renders
		expect(captured).toBe(first);
	});
});
