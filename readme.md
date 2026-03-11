<h1 align="center">react-voodoo</h1>
<p align="center"><b>Additive · Swipeable · SSR-ready · Physics-based</b><br/>A delta-driven tween composition engine for React</p>

<p align="center"><img width="192" src="https://github.com/react-voodoo/react-voodoo/raw/master/doc/assets/logo-v0.png?sanitize=true" /></p>

<p align="center">
<a href="https://www.npmjs.com/package/react-voodoo"><img src="https://img.shields.io/npm/v/react-voodoo.svg" alt="npm version" /></a>
<a href="https://travis-ci.org/react-voodoo/react-voodoo"><img src="https://travis-ci.org/react-voodoo/react-voodoo.svg?branch=master" alt="Build Status" /></a>
<img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" />
<br/>
<a href="http://creativecommons.org/licenses/by-nd/4.0"><img src="https://img.shields.io/badge/License-CC%20BY--ND%204.0-lightgrey.svg" alt="License: CC BY-ND 4.0" /></a>
<a href="http://www.gnu.org/licenses/agpl-3.0"><img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="License: AGPL v3" /></a>
</p>

<p align="center">
  <a href="doc/readme.md"><b>Full documentation</b></a> &nbsp;·&nbsp;
  <a href="https://react-voodoo.github.io/react-voodoo-samples/"><b>Live demos & CodeSandbox</b></a> &nbsp;·&nbsp;
  <a href="https://github.com/react-voodoo/react-voodoo-samples"><b>Sample sources</b></a>
</p>

<p align="center"><img src="https://github.com/react-voodoo/react-voodoo/raw/master/doc/assets/demo.gif?sanitize=true" /></p>

---

## Why react-voodoo?

Most animation libraries output **absolute values** — they own a CSS property and write a number to it each frame. That works fine for isolated transitions, but breaks down the moment you need to combine sources: a scroll position driving `translateY`, a drag gesture adding to the same `translateY`, and a parallax offset stacking on top. The libraries fight each other and you end up writing glue code.

React-voodoo takes a different approach: its engine computes **deltas** — the *change* from the previous frame — and accumulates them additively across any number of axes. Multiple animations on the same property simply add together. No ownership, no conflicts.

The engine is built on [tween-axis](../tween-axis/README.md) and uses its WebAssembly backend for hot-path property accumulation with zero JS-boundary crossings per frame.

This unlocks a set of features that are unique to the delta model:

| Feature | How |
|---|---|
| **Additive multi-axis composition** | Each axis contributes a delta; they stack without coordination code. |
| **Swipeable / draggable animations** | Drag gestures are mapped directly to axis positions with realistic momentum. |
| **Predictive inertia** | The engine computes the final snap target *at the moment of release*, before the animation plays out — useful for preloading the next slide. |
| **SSR with correct initial styles** | Axes have a `defaultPosition`; styles are computed server-side and rendered inline — no flash on first paint. |
| **DOM writes bypass React** | Style updates go straight to `node.style` via direct DOM writes, never triggering a re-render. |
| **Multi-unit CSS via `calc()`** | Mix `%`, `px`, `vw`, `bw`/`bh` (box-relative units) in a single value — compiled to `calc()` automatically. |

---

## Comparison

### Feature matrix

| | **react-voodoo** | Framer Motion | GSAP + ScrollTrigger | react-spring | Motion One | anime.js |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Scroll-linked animation | ✅ | ✅ `useScroll` | ✅ | ⚠️ manual | ✅ | ⚠️ manual |
| Drag-linked animation | ✅ native | ✅ `drag` | ⚠️ manual | ✅ `@use-gesture` | ⚠️ manual | ❌ |
| **Additive multi-axis composition** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Physics / momentum inertia | ✅ predictive | ✅ spring | ❌ | ✅ spring | ❌ | ❌ |
| **Predictive snap target** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **SSR — correct initial styles** | ✅ | ⚠️ flash | ⚠️ flash | ⚠️ flash | ⚠️ flash | ❌ |
| Bypasses React render loop | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Transform layer composition | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| SVG geometry attributes | ✅ | ⚠️ limited | ✅ | ❌ | ⚠️ | ✅ |
| Multitouch (drag multiple axes) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Bundle size (approx. gzip) | ~18 kB | ~50 kB | ~75 kB | ~30 kB | ~18 kB | ~14 kB |
| React dependency | ≥ 16 | ≥ 18 | none | ≥ 16 | none | none |

### When to pick react-voodoo

- Swipeable carousels and full-page scroll scenes where drag, inertia, and animation must be one system
- Any UI where **multiple animation "tracks"** compose onto the same elements (parallax, pinned sequences, overlapping effects)
- **SSR-first** projects where the initial paint must already reflect the animated state
- Scenarios requiring **predictive callbacks** — e.g. preloading slide N+1 before the swipe animation finishes

### When to look elsewhere

- Simple enter/exit transitions → **Framer Motion** (`AnimatePresence` is excellent for this)
- Complex GSAP-style timeline sequencing without scroll/drag → **GSAP**
- Spring-physics micro-interactions → **react-spring** or **Framer Motion**
- Lightweight imperative animation on non-React pages → **anime.js** or **Motion One**

---

## Installation

```bash
npm install react-voodoo
```

**Peer dependencies:** `react >= 16`, `react-dom >= 16`

---

## All-in-one example

Every major feature in a single component, with comments explaining each part.

```jsx harmony
import React                                  from "react";
import Voodoo                                 from "react-voodoo";
import {itemTweenAxis, tweenArrayWithTargets} from "./somewhere";

const styleSample = {
	/**
	 * Voodoo.Node style property and the tween descriptors use classic CSS-in-JS declaration
	 * exept we can specify values using the "box" unit which is a [0-1] ratio of the parent ViewBox height / width
	 */

	height: "50%",

	// the tweener deal with multiple units
	// it will use css calc fn to add them if there's more than 1 unit used
	width: ["50%", "10vw", "-50px", ".2box"],

	// transform can use multiple "layers"
	transform: [
		{
			// use rotate(X|Y|Z) & translate(X|Y|Z)
			rotateX: "25deg"
		},
		{
			translateZ: "-.2box"
		}
	],

	filter:
		{
			blur: "5px"
		}
};
const axisSample  = [// Examples of tween descriptors
	{
		target  : "someTweenRefId",   // target Voodoo.Node id ( optional if used as parameter on a Voodoo.Node as it will target it )
		from    : 0,                // tween start position
		duration: 100,              // tween duration
		easeFn  : "easeCircleIn",   // function or easing fn id from [d3-ease](https://github.com/d3/d3-ease)

		apply: {// relative css values to be applied
			// Same syntax as the styles
			transform: [{}, {
				translateZ: "-.2box"
			}]
		}
	},
	{
		from    : 40,
		duration: 20,

		// triggered when axis has scrolled in the Event period
		// delta : a float value between [-1,1] is the update inside the Event period
		entering: ( delta ) => false,

		// triggered when axis has scrolled in the Event period
		// newPos, precPos : float values between [0,1] position inside the Event period
		// delta : a float value between  [-1,1] is the update inside the Event period
		moving: ( newPos, precPos, delta ) => false,

		// triggered when axis has scrolled out the Event period
		// delta : a float value between  [-1,1] is the update inside the Event period
		leaving: ( delta ) => false
	}
];

const Sample = ( {} ) => {

	/**
	 * Voodoo tweener instanciation
	 */
		// Classic minimal method
	const [tweener, ViewBox]                   = Voodoo.hook();
	// get the first tweener in parents
	const [parentTweener]                      = Voodoo.hook(true);
	// Create a tweener with options
	const [twenerWithNameAndOptions, ViewBox2] = Voodoo.hook(
		{
			// Give an id to this tweener so we can access it's axes in the childs components
			name: "root",
			// max click tm in ms before a click become a drag
			maxClickTm: 200,
			// max drag offset in px before a click become a drag
			maxClickOffset: 100,
			// lock to only 1 drag direction
			dragDirectionLock: false,
			// allow dragging with mouse
			enableMouseDrag: false
		}
	);
	// get a named parent tweener
	const [nammedParentTweener]                = Voodoo.hook("root")

	/**
	 * once first render done, axes expose the following values & functions :
	 */
	// Theirs actual position in :
	// tweener.axes.(axisId).scrollPos

	// The "scrollTo" function allowing to manually move the axes positions :
	// tweener.axes.(axisId).scrollTo(targetPos, duration, easeFn)
	// tweener.scrollTo(targetPos, duration, axisId, easeFn)

	// They can also be watched using the "watchAxis" function;
	// When called, the returned function will disable the listener if executed :
	React.useEffect(
		e => tweener?.watchAxis("scrollY", ( pos ) => doSomething()),
		[tweener]
	)

	return <ViewBox className={"container"}>
		<Voodoo.Axis

			id={"scrollY"}          // Tween axis Id
			defaultPosition={100}   // optional initial position ( default : 0 )

			// optional Array of tween descriptors with theirs Voodoo.Node target ids ( see axisSample )
			items={tweenArrayWithTargets}

			// optional size of the scrollable window for drag synchronisation
			scrollableWindow={200}

			// optional length of this scrollable axis (default to last tween desciptor position+duration)
			size={1000}

			// optional bounds ( inertia will target them if target pos is out )
			bounds={{ min: 100, max: 900 }}

			// optional inertia cfg ( false to disable it )
			inertia={
				{
					// called when inertia is updated
					// should return instantaneous move to do if wanted
					shouldLoop: ( currentPos ) => (currentPos > 500 ? -500 : null),

					// called when inertia know where it will end ( when the user stop dragging )
					willEnd: ( targetPos, targetDelta, duration ) => {
					},

					// called when inertia know where it will snap ( when the user stop dragging )
					willSnap: ( currentSnapIndex, targetWayPointObj ) => {
					},

					// called when inertia end
					onStop: ( pos, targetWayPointObj ) => {
					},

					// called when inertia end on a snap
					onSnap: ( snapIndex, targetWayPointObj ) => {
					},

					// list of waypoints object ( only support auto snap 50/50 for now )
					wayPoints: [{ at: 100 }, { at: 200 }]
				}
			}
		/>

		<Voodoo.Node
			id={"testItem"} // optional id

			style={styleSample}// optional styles applied before any style coming from axes : css syntax + voodoo tweener units & transform management

			axes={{ scrollY: axisSample }} // optional Array of tween by axis Id with no target node id required ( it will be ignored )

			onClick={// all unknow props are passed to the child node
				( e ) => {
					// start playing an anim ( prefer scrolling Axes )
					tweener.pushAnim(
						// make all tween target "testItem"
						Voodoo.tools.target(pushIn, "testItem")
					).then(
						( tweenAxis ) => {
							// doSomething next
						}
					);
				}
			}
		>
			<Voodoo.Draggable
				// make drag y move the scrollAnAxis axis
				// xAxis={ "scrollAnAxis" }

				// scale / inverse dispatched delta
				// xHook={(delta)=>modify(delta)}

				// React ref to the box, default to the parent ViewBox
				// scale is as follow : (delta / ((xBoxRef||ViewBox).offsetWidth)) * ( axis.scrollableWindow || axis.duration )
				// xBoxRef={ref}

				yAxis={"scrollY"}// make drag y move the scrollY axis
				// yHook={(delta)=>modify(delta)}
				// yBoxRef={ref}

				// mouseDrag={true} // listen for mouse drag ( default to false )
				// touchDrag={false} // listen for touch drag ( default to true )

				// button={1-3} // limit mouse drag to the specified event.button === ( default to 1; the left btn )

				// * actually Draggable create it's own div node
			>
				<div>
					Some content to tween
				</div>
			</Voodoo.Draggable>
		</Voodoo.Node>
	</ViewBox>;
}
```

For a more complete annotated example with inertia callbacks, `watchAxis`, and programmatic scrolling, see the [full documentation](doc/readme.md).

---

## Core concepts in 30 seconds

**Axis** — a virtual number line. Move its position (by drag, scroll, or code) and it drives CSS animations on any number of nodes.

**Node** — a React element whose styles are controlled by one or more axes. Style updates go straight to `node.style`, no re-renders.

**Delta composition** — each axis contributes a *change* per frame. Stack a horizontal drag axis and a parallax axis on the same `translateX` and they simply add together. No ownership, no conflicts.

```
axis position ──► tween engine ──► Δ per property ──► node.style (direct DOM write)
                                         ▲
                              other axes add their Δ here
```

---

## License

React-voodoo is dual-licensed:

- **[CC BY-ND 4.0](http://creativecommons.org/licenses/by-nd/4.0)** — use freely in commercial projects; distribution of modified versions is not permitted.
- **[AGPL v3](http://www.gnu.org/licenses/agpl-3.0)** — distribute modified versions under the same open-source license.

---

## Support the project

If react-voodoo saved you a day of work, consider supporting it:

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](#)

**BTC** — `bc1qh43j8jh6dr8v3f675jwqq3nqymtsj8pyq0kh5a`
**PayPal** — <a href="https://www.paypal.com/donate/?hosted_button_id=ECHYGKY3GR7CN"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate" /></a>
