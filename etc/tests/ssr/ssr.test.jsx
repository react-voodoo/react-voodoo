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
 * @jest-environment node
 *
 * SSR smoke-tests: verify react-voodoo components render to HTML on the server
 * without touching browser APIs and without running effects.
 *
 * Rules under test:
 *   - renderToString must not throw for any supported component combination.
 *   - CSS-style props (opacity, width, …) appear as inline styles in the output.
 *   - SVG geometry attributes (cx, cy, r, …) are NOT in the output — they are
 *     applied client-side via setAttribute in a useEffect / componentDidMount.
 *   - useEffect / componentDidMount are never called during SSR, so no DOM API
 *     (window, document, requestAnimationFrame, setAttribute …) is invoked.
 */

import React              from 'react';
import { renderToString } from 'react-dom/server';
import Voodoo             from '../../../dist/react-voodoo.js';

// ─── helpers ─────────────────────────────────────────────────────────────────

/** Render a component to an HTML string; re-throws any error. */
function ssr( Comp ) {
	return renderToString(<Comp/>);
}

// ─── basic rendering ──────────────────────────────────────────────────────────

describe('SSR — no errors', () => {
	it('renders a bare ViewBox', () => {
		expect(() => ssr(() => {
			const [, ViewBox] = Voodoo.hook();
			return <ViewBox><span>hello</span></ViewBox>;
		})).not.toThrow();
	});

	it('renders a Node with CSS style props', () => {
		expect(() => ssr(() => {
			const [, ViewBox] = Voodoo.hook();
			return (
				<ViewBox>
					<Voodoo.Node id="card" style={{ opacity: 0, width: '100px' }}>
						<div>content</div>
					</Voodoo.Node>
				</ViewBox>
			);
		})).not.toThrow();
	});

	it('renders an Axis with tween items', () => {
		const tweens = [{ target: 'box', from: 0, duration: 100, apply: { opacity: 1 } }];
		expect(() => ssr(() => {
			const [, ViewBox] = Voodoo.hook();
			return (
				<ViewBox>
					<Voodoo.Axis id="scroll" size={100} items={tweens}/>
					<Voodoo.Node id="box" style={{ opacity: 0 }}>
						<div>box</div>
					</Voodoo.Node>
				</ViewBox>
			);
		})).not.toThrow();
	});

	it('renders an SVG Node with geometry-attribute style props', () => {
		expect(() => ssr(() => {
			const [, ViewBox] = Voodoo.hook();
			return (
				<ViewBox>
					<svg>
						<Voodoo.Node id="dot" style={{ cx: 50, cy: 100 }}>
							<circle/>
						</Voodoo.Node>
					</svg>
				</ViewBox>
			);
		})).not.toThrow();
	});

	it('renders Node.div and Node.g', () => {
		expect(() => ssr(() => {
			const [, ViewBox] = Voodoo.hook();
			return (
				<ViewBox>
					<Voodoo.Node.div id="d" style={{ opacity: 1 }} className="foo"/>
					<svg>
						<Voodoo.Node.g id="g" style={{ opacity: 1 }} className="bar">
							<circle cx="5" cy="5" r="5"/>
						</Voodoo.Node.g>
					</svg>
				</ViewBox>
			);
		})).not.toThrow();
	});
});

// ─── HTML output ─────────────────────────────────────────────────────────────

describe('SSR — HTML output', () => {
	it('includes child text content', () => {
		const html = ssr(() => {
			const [, ViewBox] = Voodoo.hook();
			return <ViewBox><Voodoo.Node id="x" style={{ opacity: 1 }}><div>hello ssr</div></Voodoo.Node></ViewBox>;
		});
		expect(html).toContain('hello ssr');
	});

	it('includes inline opacity style', () => {
		const html = ssr(() => {
			const [, ViewBox] = Voodoo.hook();
			return (
				<ViewBox>
					<Voodoo.Node id="x" style={{ opacity: 0 }}>
						<div id="target">x</div>
					</Voodoo.Node>
				</ViewBox>
			);
		});
		// opacity:0 should appear as an inline style on the rendered element
		expect(html).toMatch(/opacity\s*:\s*0/);
	});

	it('does NOT include SVG geometry attributes (cx, cy, r) — client-only via setAttribute', () => {
		const html = ssr(() => {
			const [, ViewBox] = Voodoo.hook();
			return (
				<ViewBox>
					<svg>
						<Voodoo.Node id="dot" style={{ cx: 50, cy: 100, r: 30 }}>
							<circle/>
						</Voodoo.Node>
					</svg>
				</ViewBox>
			);
		});
		// These are applied via setAttribute in componentDidMount (useEffect) — never during SSR
		expect(html).not.toMatch(/\bcx="50"/);
		expect(html).not.toMatch(/\bcy="100"/);
		expect(html).not.toMatch(/\br="30"/);
	});
});

// ─── no browser APIs called ───────────────────────────────────────────────────

describe('SSR — no browser API side-effects', () => {
	it('does not call requestAnimationFrame', () => {
		const raf = jest.fn();
		global.requestAnimationFrame = raf;
		ssr(() => {
			const [, ViewBox] = Voodoo.hook();
			return <ViewBox><Voodoo.Node id="n" style={{ opacity: 1 }}><div/></Voodoo.Node></ViewBox>;
		});
		expect(raf).not.toHaveBeenCalled();
		delete global.requestAnimationFrame;
	});

	it('does not call window.addEventListener', () => {
		// In node env window is undefined; if Tweener accessed it without a guard
		// this test would throw rather than pass.
		expect(() => ssr(() => {
			const [, ViewBox] = Voodoo.hook();
			return <ViewBox><span/></ViewBox>;
		})).not.toThrow();
	});

	it('componentDidMount is not called during renderToString', () => {
		// tweener._.rendered is set to true only inside componentDidMount.
		// If SSR skips effects correctly it must stay falsy.
		let capturedTweener;
		ssr(() => {
			const [t, ViewBox] = Voodoo.hook();
			capturedTweener = t;
			return <ViewBox><span/></ViewBox>;
		});
		expect(capturedTweener._.rendered).toBeFalsy();
	});
});
