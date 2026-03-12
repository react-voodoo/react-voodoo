# react-voodoo

> **Additive, swipeable, SSR-ready animation engine for React.**
> Axes. Nodes. Physics. No re-renders.

---

![demo](assets/demo.gif)

---

## Why react-voodoo?

Most animation libraries give you two options: either animate *from A to B* imperatively, or declare states and let the library interpolate between them. Both approaches break down when you want to:

- Tie animations directly to a **drag gesture** with realistic momentum
- Run **multiple simultaneous animations on the same CSS property** without conflicts
- Know exactly **where momentum will stop before it gets there** (to preload, prerender, etc.)
- Have all of this **work on the server** with the correct initial styles

React-voodoo takes a different approach: instead of outputting absolute CSS values, its engine computes *deltas* — how much each property changed — and accumulates them additively. Multiple axes can drive the same `transform` or `opacity` simultaneously and they simply add together. DOM writes happen outside React's render loop entirely.

---

## Comparison

| Feature | react-voodoo | Framer Motion | GSAP + ScrollTrigger | react-spring |
|---|:---:|:---:|:---:|:---:|
| Scroll-linked animation | ✅ | ✅ `useScroll` | ✅ | ⚠️ manual |
| Drag-linked animation | ✅ native | ✅ `drag` | ⚠️ manual | ✅ `useDrag` |
| **Additive multi-axis composition** | ✅ | ❌ | ❌ | ❌ |
| Physics / momentum inertia | ✅ predictive | ✅ spring | ❌ | ✅ spring |
| **Predictive snap target** | ✅ | ❌ | ❌ | ❌ |
| **SSR — correct initial styles** | ✅ | ⚠️ flash | ⚠️ flash | ⚠️ flash |
| Bypasses React render loop | ✅ | ✅ | ✅ | ✅ |
| Transform layers (additive) | ✅ | ❌ | ❌ | ❌ |
| SVG geometry attributes | ✅ | ⚠️ limited | ✅ | ❌ |
| Bundle size (approx.) | ~18 kB | ~50 kB | ~75 kB | ~30 kB |
| React version | ≥ 16 | ≥ 18 | any | ≥ 16 |

**When to pick react-voodoo:**
- Swipeable carousels, parallax scroll scenes, pinned scroll sequences with drag control
- Anything that needs multiple animation "tracks" compositing on the same element
- SSR-first projects where the initial paint must match the animated state

**When to look elsewhere:**
- Simple enter/exit transitions → **Framer Motion** (`AnimatePresence` is excellent)
- Complex timeline sequencing without scroll/drag → **GSAP**
- Spring-physics UI micro-interactions → **react-spring**

---

## Installation

```bash
npm install react-voodoo
```

**Peer dependencies:** `react >= 16`, `react-dom >= 16`

---

## Core Concepts

The engine is built around two primitives:

| Primitive | What it is |
|---|---|
| **Axis** | A virtual number line. Moving its position drives CSS animations on nodes. Think of it as a scrubbing timeline you can attach to a drag gesture, a scroll event, or any programmatic value. |
| **Node** | A React element whose styles are controlled by one or more axes. Style updates are written directly to `node.style` — no re-renders. |

The key insight is **additive composition**: each axis contributes a *delta* to each CSS property. A `translateX` driven by a horizontal swipe axis and a `translateX` driven by a parallax axis simply add together. You never have to coordinate which animation "owns" a property.

---

## All-in-one Example

The example below covers all major features in one component.

```jsx
import React  from "react";
import Voodoo from "react-voodoo";

// ─────────────────────────────────────────────────────────────────────────────
// TWEEN DESCRIPTORS
// Each descriptor says "while the axis moves from `from` to `from+duration`,
// apply `apply` progressively to node `target`".
// Values in `apply` are *deltas* — they accumulate additively with other axes.
// ─────────────────────────────────────────────────────────────────────────────

const cardTweens = [
  {
    target  : "card",
    from    : 0,          // starts at axis position 0
    duration: 300,        // active over 300 units of axis travel
    easeFn  : "easeCubicOut",
    apply   : {
      opacity  : 1,       // fade from 0 (base style) to 1 (base + delta)
      transform: [
        { translateY: "-120px" },   // layer 0: scroll up 120 px
      ],
    },
  },
  {
    target  : "card",
    from    : 200,        // starts a bit before the first tween ends (overlap)
    duration: 100,
    apply   : {
      transform: [
        {},                          // layer 0: leave untouched
        { scale: 0.15 },             // layer 1: additive scale — does NOT
      ],                             //          conflict with layer 0 translateY
    },
  },
];

const headerTweens = [
  {
    target  : "header",
    from    : 0,
    duration: 150,
    easeFn  : "easeQuadInOut",
    apply   : {
      opacity  : -1,    // fade header OUT as we scroll down
      transform: [{ translateY: "-40px" }],
    },
    // Lifecycle callbacks — great for triggering side-effects
    entering: (delta) => console.log("header tween entered, direction:", delta),
    leaving : (delta) => console.log("header tween left,    direction:", delta),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// INERTIA CONFIG
// After releasing a drag gesture, the axis decelerates and snaps to a waypoint.
// The engine knows the target waypoint *immediately* on release — before the
// animation finishes — enabling predictive preloading.
// ─────────────────────────────────────────────────────────────────────────────

const inertiaConfig = {
  // The axis always lands on one of these positions after a drag release.
  wayPoints: [{ at: 0 }, { at: 300 }],

  // Called immediately on drag release — the engine already knows where it'll stop.
  willSnap: (index, wayPoint) => {
    console.log(`[inertia] will snap to index ${index} (pos: ${wayPoint.at})`);
    // e.g. preload content for the next slide here
  },

  // Called once the axis fully settles.
  onSnap: (index, wayPoint) => {
    console.log(`[inertia] snapped to index ${index}`);
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const Scene = () => {
  // useVoodoo (aliased as Voodoo.hook) creates the animation engine.
  // It returns:
  //   tweener  — the engine instance (scroll, pushAnim, watchAxis, ...)
  //   ViewBox  — a wrapper component that provides the tweener via context
  //              and measures its own dimensions for bw/bh/box units
  const [tweener, ViewBox] = Voodoo.hook({
    dragDirectionLock: true,   // lock drag to one axis (x or y) at a time
  });

  // watchAxis is useful to sync external React state with an axis position
  // (e.g. active dot indicator in a carousel)
  const [slide, setSlide] = React.useState(0);
  React.useEffect(() => {
    return tweener.watchAxis("scrollY", (pos) => {
      setSlide(pos > 150 ? 1 : 0);
    });
  }, [tweener]);

  return (
    // ViewBox must wrap all Voodoo.Node, Voodoo.Axis, and Voodoo.Draggable.
    // Unknown props (style, className, …) are forwarded to the underlying <div>.
    <ViewBox style={{ height: "100vh", overflow: "hidden", position: "relative" }}>

      {/* ── AXIS ──────────────────────────────────────────────────────────
          Declares the "scrollY" timeline.
          · size           — total length of the timeline (axis units)
          · scrollableWindow — how many axis units map to the full height of
                               the drag container (controls drag sensitivity)
          · items          — the tween descriptors to attach to this axis
          · inertia        — physics config (waypoints, callbacks, …)
      ──────────────────────────────────────────────────────────────────── */}
      <Voodoo.Axis
        id="scrollY"
        size={300}
        scrollableWindow={600}
        items={[...cardTweens, ...headerTweens]}
        inertia={inertiaConfig}
      />

      {/* ── NODES ─────────────────────────────────────────────────────────
          Each Node wraps exactly one React child and registers it with the
          tweener. The `style` prop is the *base* (t=0) style — axis deltas
          are added on top of it. Node never re-renders for animation updates;
          styles go straight to node.style via direct DOM writes.
      ──────────────────────────────────────────────────────────────────── */}
      <header style={{ position: "absolute", top: 0, width: "100%" }}>
        <Voodoo.Node
          id="header"
          style={{ opacity: 1, transform: [{ translateY: "0px" }] }}
        >
          <div className="header">My App</div>
        </Voodoo.Node>
      </header>

      <Voodoo.Node
        id="card"
        style={{
          opacity  : 0,
          transform: [
            { translateY: "0px" },   // layer 0 base
            { scale: 1 },            // layer 1 base — independently tweened
          ],
        }}
      >
        <div className="card">Slide {slide + 1}</div>
      </Voodoo.Node>

      {/* ── DRAGGABLE ─────────────────────────────────────────────────────
          Listens for touch/mouse drag on its child and maps pixel movement
          to axis positions. `yAxis` maps vertical drag → "scrollY".
          The Draggable automatically walks up the tweener tree so nested
          draggables in a slider each consume their own axis first, then
          bubble up to the parent if out of bounds.
      ──────────────────────────────────────────────────────────────────── */}
      <Voodoo.Draggable yAxis="scrollY" mouseDrag>
        <div style={{ position: "absolute", inset: 0 }} />
      </Voodoo.Draggable>

      {/* ── PROGRAMMATIC CONTROL ──────────────────────────────────────────
          Axes can also be driven without drag — tweener.scrollTo returns
          a Promise that resolves when the scroll completes.
      ──────────────────────────────────────────────────────────────────── */}
      <div style={{ position: "absolute", bottom: 24, right: 24, display: "flex", gap: 8 }}>
        <button onClick={() => tweener.scrollTo(0,   300, "scrollY", "easeCubicOut")}>
          Slide 1
        </button>
        <button onClick={() => tweener.scrollTo(300, 300, "scrollY", "easeCubicOut")}>
          Slide 2
        </button>
      </div>

    </ViewBox>
  );
};

export default Scene;
```

---

## useVoodoo Hook

`Voodoo.hook` (alias: `useVoodoo`) is the primary entry point. It returns `[tweener, ViewBox]`.

### Three usage modes

```jsx
// 1. Create a new tweener — the standard usage
const [tweener, ViewBox] = Voodoo.hook(options?);

// 2. Inherit the nearest parent tweener — used internally by Node, Axis, Draggable
//    Returns the parent tweener from context; ViewBox is a passthrough fragment
const [tweener] = Voodoo.hook(true);

// 3. Find a named ancestor tweener — for cross-subtree coordination
const [tweener] = Voodoo.hook("rootName");
```

### Options

```js
Voodoo.hook({
  name              : "main",   // lets descendants find this tweener by name
  maxClickTm        : 200,      // ms threshold: drag vs click detection
  maxClickOffset    : 10,       // px threshold: drag vs click detection
  dragDirectionLock : false,    // lock gesture to dominant axis (X or Y)
  enableMouseDrag   : false,    // respond to mouse drag events
});
```

### Tweener API

```js
// ─── Reading state ────────────────────────────────────────────────────────
tweener.axes.scrollY.scrollPos          // current position of the "scrollY" axis
tweener.getScrollPos("scrollY")         // same, with null-safety
tweener.getAxisState()                  // → { scrollY: pos, scrollX: pos, ... }

// ─── Programmatic scroll ──────────────────────────────────────────────────
// scrollTo(position, durationMs, axisId, easeFn?) → Promise
tweener.scrollTo(500, 300, "scrollY", "easeCubicInOut")
  .then(() => console.log("done"));

// Instant jump (no animation)
tweener.scrollTo(0, 0, "scrollY");

// Per-axis shorthand — omits the axisId parameter (it is bound to the axis)
// tweener.axes.axisId.scrollTo(position, durationMs, easeFn?) → Promise
tweener.axes.scrollY.scrollTo(500, 300, "easeCubicInOut");

// ─── Watching an axis ─────────────────────────────────────────────────────
// Returns an unsubscribe function — pass it directly to useEffect cleanup
const unwatch = tweener.watchAxis("scrollY", (pos) => {
  setProgress(pos / 1000);
});
// later:
unwatch();

// ─── One-shot animations ──────────────────────────────────────────────────
// pushAnim(tweenArray) → Promise — plays once, then cleans up
tweener.pushAnim(Voodoo.tools.target(myTweens, "card"))
  .then(() => console.log("animation complete"));

// ─── Checking state ───────────────────────────────────────────────────────
tweener.isInertiaActive()               // → boolean — is any axis still decelerating?
tweener.isAxisOut("scrollY", delta)     // → boolean — would moving by delta go out of bounds?

// ─── Imperative style override ────────────────────────────────────────────
// updateRefStyle(id, style) — directly updates a Node's CSS baseline.
// Unlike pushAnim, the change persists (it replaces the baseline, not a delta).
// Useful for non-animated state changes such as showing/hiding a drag placeholder.
// Accepts the same CSS-in-JS object format as Node's `style` prop.
tweener.updateRefStyle("dropZone", { display: "block", opacity: 1 });
tweener.updateRefStyle("dropZone", { display: "none" });

// Batch form — update multiple nodes at once:
tweener.updateRefStyle(["node1", "node2"], { opacity: 0 });          // same style
tweener.updateRefStyle(["node1", "node2"], [style1, style2]);        // per-node styles

// ─── DOM node access ──────────────────────────────────────────────────────
// getTweenableRef(id) — returns the raw DOM element for a registered Node.
// Use sparingly; prefer axes and updateRefStyle for all style changes.
const domNode = tweener.getTweenableRef("card");
```

---

## CSS Descriptors

Voodoo uses CSS-in-JS syntax in both `Node` base styles and tween `apply` objects.

### Supported properties

Most CSS properties work out of the box with camelCase keys. A selection:

```js
{
  // Layout
  opacity: 0.5,
  width: "200px",
  height: "100px",
  top: "20px",

  // Colors
  color           : "rgba(255, 0, 0, 1)",
  backgroundColor : "rgba(0, 128, 255, 0.8)",

  // Transforms (see Transform Layers below)
  transform: [{ translateX: "50px", rotate: "45deg" }],

  // Complex properties
  filter   : [{ blur: "4px" }],
  boxShadow: [{ x: "0px", y: "4px", blur: "8px", color: "rgba(0,0,0,0.3)" }],
}
```

### Custom units

Three box-relative units are available in addition to standard CSS units. They resolve against the parent `ViewBox` dimensions and update on resize.

| Unit | Meaning |
|------|---------|
| `bw` | Width of the parent ViewBox (`1bw` = 100%) |
| `bh` | Height of the parent ViewBox (`1bh` = 100%) |
| `box` | Smaller dimension of the ViewBox (min of width and height) |

```js
{ width: "0.5bw", height: "0.25bh", marginTop: "-0.1box" }
```

### Multi-unit values

Pass an array to combine multiple units. Voodoo compiles it to a CSS `calc()` at runtime. All standard CSS length units (`px`, `%`, `em`, `rem`, `vw`, `vh`, `vmin`, `vmax`, …) plus the custom `bw`/`bh`/`box` units are supported:

```js
// renders as: calc(50% + 10vw - 50px + 20% of ViewBox width)
width: ["50%", "10vw", "-50px", "0.2bw"]

// mixing em and %
width: ["100%", "-3.6em"]

// single-element array also works (passes through calc())
height: ["3.6em"]
```

### Transform layers

Transforms are an **array of layer objects**. Each layer is independent — different axes can control different layers without ever overwriting each other. This is the foundation of additive transform composition.

```js
transform: [
  { translateX: "0px" },       // layer 0 — driven by horizontal drag axis
  { translateY: "0px" },       // layer 1 — driven by vertical scroll axis
  { scale: 1, rotate: "0deg" },// layer 2 — driven by a parallax axis
]
```

When three axes each modify a different layer, the final CSS `transform` property is built as the concatenation of all layers — they never conflict.

Supported transform functions: `translateX`, `translateY`, `translateZ`, `scaleX`, `scaleY`, `scaleZ`, `rotateX`, `rotateY`, `rotateZ`, `skewX`, `skewY`, `perspective`.

---

## Tween Descriptors

A tween descriptor defines what CSS change to apply over a segment of an axis timeline.

```js
{
  target  : "nodeId",        // which Voodoo.Node to animate
                             // (omit when using Node's `axes` prop)
  from    : 0,               // axis position where this tween begins
  duration: 100,             // how many axis units it lasts
  easeFn  : "easeCircleIn",  // any d3-ease id, or a custom (t: 0→1) => 0→1 fn
  apply   : {                // CSS deltas to apply at full progress
    opacity  : 1,
    transform: [{ translateX: "200px" }],
  },

  // ─── Lifecycle callbacks ───────────────────────────────────────────────
  // `delta` is the direction of axis movement: +1 forward, -1 backward

  // Fired once when the axis enters [from, from+duration]
  entering: (delta) => { /* trigger sound, side effect */ },

  // Fired every frame while inside the range
  // newPos and prevPos are normalized [0, 1] progress within the tween
  moving: (newPos, prevPos, delta) => { /* sync external state */ },

  // Fired once when the axis leaves [from, from+duration]
  leaving: (delta) => { /* cleanup */ },
}
```

### Properties reference

| Property   | Type | Required | Description |
|------------|------|----------|-------------|
| `target`   | `string` | — | ID of the target `Voodoo.Node`. |
| `from`     | `number` | ✅ | Start position on the axis timeline. |
| `duration` | `number` | ✅ | Length of this tween on the axis timeline. |
| `easeFn`   | `string \| function` | — | Easing. Accepts any [d3-ease](https://github.com/d3/d3-ease) id or a custom `t => t` function. |
| `apply`    | `object` | — | CSS-in-JS delta values applied progressively as the axis moves. |
| `entering` | `function` | — | `(delta) => void` — axis just entered this range. |
| `moving`   | `function` | — | `(newPos, prevPos, delta) => void` — called every frame inside range. |
| `leaving`  | `function` | — | `(delta) => void` — axis just left this range. |

---

## Components

### `Voodoo.Axis`

Declares a virtual scrollable timeline. Any movement of its position drives its attached tween descriptors.

```jsx
<Voodoo.Axis
  id="scrollY"
  defaultPosition={0}
  size={1000}
  scrollableWindow={500}
  items={tweenDescriptors}
  bounds={{ min: 0, max: 1000 }}
  inertia={inertiaConfig}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | **Required.** Unique axis identifier. Also accepted as `axe` (deprecated alias). |
| `defaultPosition` | `number` | `0` | Initial position. |
| `size` | `number` | auto | Total timeline length. Defaults to the end of the last tween. |
| `scrollableWindow` | `number` | — | Axis units that map to 100% of the drag container's dimension. Controls drag sensitivity. |
| `items` | `array` | `[]` | Array of tween descriptors (must include `target` fields). |
| `bounds` | `object` | — | `{ min, max }` — hard clamp positions for inertia. |
| `inertia` | `object \| true \| false` | — | Physics config. See [Inertia & Physics](#inertia--physics). Pass `true` for basic deceleration with no snap points. Pass `false` or omit to disable. |

---

### `Voodoo.Node`

Registers an element with the parent tweener and applies axis-driven style updates directly to its DOM node. **`Voodoo.Node` must have exactly one child element.**

```jsx
<Voodoo.Node
  id="hero"
  style={{ opacity: 0, transform: [{ translateY: "50px" }] }}
  axes={{ scrollY: localTweens }}
>
  <div>Animated content</div>   {/* ← exactly one child */}
</Voodoo.Node>
```

When you need multiple children inside an animated node, use **`Voodoo.Node.div`** — it renders itself as the `<div>` container, so its children don't count as `Voodoo.Node`'s children:

```jsx
{/* Voodoo.Node.div IS the div — any number of children is fine */}
<Voodoo.Node.div
  id="hero"
  style={{ opacity: 0, transform: [{ translateY: "50px" }] }}
  axes={{ scrollY: localTweens }}
>
  <h2>Title</h2>
  <p>Paragraph</p>
  <img src="…" />
</Voodoo.Node.div>
```

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier. Referenced by tween `target` fields. Auto-generated when omitted (required only if tweens reference this node by ID). |
| `style` | `object` | Base style (t=0). Axis deltas accumulate on top of this. |
| `axes` | `object` | `{ axisId: tweenArray }` — tweens here don't need a `target`. Also accepted as `tweenLines` or `tweenAxis` (all three are aliases). |
| `tweener` | Tweener | Explicitly attach to a specific tweener instead of the nearest ancestor. |
| `refProp` | `string` | Prop name used to pass the DOM ref to functional child components. |

Extra props (`onClick`, `className`, …) are forwarded to the child element.

**Typed shorthands** — `Voodoo.Node.<tag>` renders as `<tag>` directly, bypassing the single-child requirement:

```jsx
<Voodoo.Node.div id="x" style={…}>     {/* renders a <div> */}
  <span>child 1</span>
  <span>child 2</span>
</Voodoo.Node.div>
<Voodoo.Node.g   id="y" style={…}><circle/></Voodoo.Node.g>  {/* renders a <g> */}
```

---

### `Voodoo.Draggable`

Maps touch and mouse drag gestures to axis positions. Walks the tweener parent chain automatically — nested draggables each consume their own axis first and bubble up when out of bounds.

```jsx
<Voodoo.Draggable
  yAxis="scrollY"
  xAxis="scrollX"
  mouseDrag={true}
>
  <div style={{ width: "100%", height: "100%" }} />
</Voodoo.Draggable>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `xAxis` | `string` | — | Axis ID for horizontal drag. |
| `yAxis` | `string` | — | Axis ID for vertical drag. |
| `xHook` | `function` | — | `(delta) => delta` — transform horizontal delta before applying. |
| `yHook` | `function` | — | `(delta) => delta` — transform vertical delta before applying. |
| `xBoxRef` | React Ref | ViewBox | DOM node whose width is used for drag-to-axis scaling. |
| `yBoxRef` | React Ref | ViewBox | DOM node whose height is used for drag-to-axis scaling. |
| `mouseDrag` | `boolean` | `false` | Respond to mouse drag. |
| `touchDrag` | `boolean` | `true` | Respond to touch drag. |
| `button` | `number` | `0` | Mouse button index for drag activation. |

**Drag scaling:**
```
axisDelta = (pixelDelta / containerDimension) × (axis.scrollableWindow || axis.size)
```

---

## Inertia & Physics

When an axis has an `inertia` config, releasing a drag applies momentum physics that decelerates the axis to a stop. The engine computes the predicted landing position **at the moment of release** — before the animation plays out — which enables predictive patterns like preloading the next slide's content while the swipe is still in flight.

```js
const inertiaConfig = {

  // ── Snap points ─────────────────────────────────────────────────────────
  // The axis always comes to rest at one of these positions.
  wayPoints: [
    { at: 0,    gravity: 1 },  // gravity > 1 makes this waypoint stickier
    { at: 500,  gravity: 1 },
    { at: 1000, gravity: 1.5 },
  ],

  // ── Predictive callbacks ─────────────────────────────────────────────────
  // Both fire at drag release, before the animation completes.

  // Called when the engine determines the final stop position
  willEnd: (targetPos, targetDelta, durationMs) => {
    console.log(`[inertia] landing at ${targetPos} in ${durationMs}ms`);
  },

  // Called when the engine determines it will snap to a waypoint
  willSnap: (snapIndex, wayPoint) => {
    console.log(`[inertia] snapping to index ${snapIndex}`);
  },

  // ── Completion callbacks ─────────────────────────────────────────────────
  onStop: (finalPos, wayPoint) => {},
  onSnap: (snapIndex, wayPoint) => {},

  // ── Bounds snapping ──────────────────────────────────────────────────────
  // When true, any momentum that would overshoot the axis bounds is clamped and
  // snapped back to the nearest bound (min or max). Requires `bounds` on the Axis.
  snapToBounds: true,

  // ── Infinite loop ────────────────────────────────────────────────────────
  // Return a position offset to apply (for looping carousels), or null/0.
  // `delta` is the direction of movement: positive = forward, negative = backward.
  shouldLoop: (pos, delta) => {
    if (pos > 1000) return -1000;
    if (pos < 0)    return  1000;
    return null;
  },
};
```

| Option | Type | Description |
|--------|------|-------------|
| `wayPoints` | `array` | `[{ at: number, gravity?: number }]` — snap positions. |
| `snapToBounds` | `boolean` | Clamp and snap to axis `bounds` if momentum overshoots. Requires `bounds` on the Axis. |
| `willEnd` | `function` | `(pos, delta, ms)` — predictive; fires on release. |
| `willSnap` | `function` | `(index, wayPoint)` — predictive; fires on release. |
| `onStop` | `function` | `(pos, wayPoint)` — fires when fully settled. |
| `onSnap` | `function` | `(index, wayPoint)` — fires when fully settled on a waypoint. |
| `shouldLoop` | `function` | `(pos, delta) => offset \| null` — called each inertia frame for looping. `delta` is direction of movement. |

---

## Tween Tools

`Voodoo.tools` provides pure functions for composing and transforming tween descriptor arrays before passing them to an axis or `pushAnim`. None of them mutate the input.

### `target(items, id)`
Assigns a `target` node ID to every descriptor in the array.
```js
const aimed = Voodoo.tools.target(myTweens, "heroCard");
```

### `offset(items, start)`
Shifts all `from` positions by `start` units.
```js
// Delay the entire animation by 100 axis units
const delayed = Voodoo.tools.offset(myTweens, 100);
```

### `scale(items, duration)`
Proportionally rescales the whole array to fit within `duration` units.
```js
const fitted = Voodoo.tools.scale(myTweens, 500);
```

### `reverse(items)`
Mirrors the timeline and negates all numeric `apply` values — plays the animation backward.
```js
const reversed = Voodoo.tools.reverse(myTweens);
```

### `shiftTransforms(items, shift)`
Prepends `shift` empty transform layer objects to every descriptor. Use when composing tween arrays that each occupy different transform layer slots.
```js
// Push all transforms down by 1 layer slot
const shifted = Voodoo.tools.shiftTransforms(myTweens, 1);
```

### `cssAdd(val1, val2, ...)` / `cssMult(val, factor)`
Arithmetic on CSS values across different unit systems.
```js
Voodoo.tools.cssAdd("50%", "20px", "-0.1bw")
// → ["50%", "20px", "-0.1bw"]  (rendered as calc(...))

Voodoo.tools.cssMult("50px", 2)   // → "100px"
```

---

## One-shot Animations

`tweener.pushAnim` fires a tween array once and resolves when it completes. It composites additively with any running axes.

```jsx
const MyButton = () => {
  const [tweener, ViewBox] = Voodoo.hook();

  const pop = () => {
    tweener.pushAnim(
      Voodoo.tools.target(popAnimation, "btn")
    ).then(() => console.log("done"));
  };

  return (
    <ViewBox>
      <Voodoo.Node id="btn" style={{ transform: [{ scale: 1 }] }}>
        <button onClick={pop}>Pop!</button>
      </Voodoo.Node>
    </ViewBox>
  );
};

const popAnimation = [
  { from: 0,   duration: 100, apply: { transform: [{ scale:  0.2 }] } },
  { from: 100, duration: 100, apply: { transform: [{ scale: -0.2 }] } },
];
```

> **Tip:** Prefer axes over `pushAnim` for interactive animations. Axes give you drag, inertia, scrubbing and reversibility for free.

---

## Advanced Patterns

### Nested tweeners

Each component can own its own tweener while reaching named ancestors:

```jsx
const Parent = () => {
  const [, ViewBox] = Voodoo.hook({ name: "root" });
  return (
    <ViewBox>
      <Voodoo.Axis id="page" size={1000} scrollableWindow={800} />
      <Child />
    </ViewBox>
  );
};

const Child = () => {
  // Read the parent's axis position
  const [parentTweener] = Voodoo.hook("root");
  // Own a separate local tweener
  const [, ViewBox] = Voodoo.hook();
  return <ViewBox>{/* … */}</ViewBox>;
};
```

### Axis synchronization

Drive a local axis from a parent axis — useful for coordinating across components:

```jsx
React.useEffect(() => {
  // Mirror the parent "page" axis into the local "reveal" axis at half speed
  return parentTweener?.watchAxis("page", (pos) => {
    tweener.axes.reveal?.scrollTo(pos * 0.5, 0);
  });
}, [tweener, parentTweener]);
```

### Infinite carousel

```jsx
<Voodoo.Axis
  id="carousel"
  size={3000}
  scrollableWindow={window.innerWidth}
  inertia={{
    shouldLoop: (pos) => {
      if (pos > 2000) return -2000;
      if (pos < 0)    return  2000;
      return null;
    },
    wayPoints: [{ at: 0 }, { at: 1000 }, { at: 2000 }],
  }}
  items={carouselTweens}
/>
```

### Reactive axis progress

```jsx
React.useEffect(() => {
  // watchAxis returns an unsubscribe — return it directly for auto-cleanup
  return tweener?.watchAxis("scrollY", (pos) => {
    setScrollProgress(pos / 1000);
  });
}, [tweener]);
```

---

## SVG Support

React-Voodoo animates SVG elements with the same syntax as HTML. Both style-based presentation attributes and geometry attributes are supported.

### Presentation attributes (via `node.style`)

| Property | Description |
|----------|-------------|
| `fill`, `stroke` | Colors |
| `strokeWidth` | Length |
| `strokeOpacity`, `fillOpacity` | `[0, 1]` |
| `strokeDashoffset` | Length |

### Geometry attributes (via `element.setAttribute`)

Attributes like `cx`, `cy`, `r`, `rx`, `ry`, `x`, `y`, `x1`, `y1`, `x2`, `y2` cannot be set via `element.style` — they require `setAttribute`. Voodoo handles this automatically: any of these keys in a `style` or `apply` object are routed to `setAttribute` behind the scenes. Use unitless numbers.

### Example

```jsx
const tweens = [
  {
    target: "dot",
    from: 0, duration: 300,
    easeFn: "easeCubicInOut",
    apply: {
      cx          : 200,
      cy          : 50,
      r           : 20,
      fill        : "rgba(255, 100, 0, 1)",
      strokeWidth : "3px",
      strokeOpacity: 0.8,
    },
  },
];

const SvgScene = () => {
  const [, ViewBox] = Voodoo.hook();
  return (
    <ViewBox>
      <Voodoo.Axis id="scroll" items={tweens} size={300} scrollableWindow={400} />
      <svg width="400" height="200">
        <Voodoo.Node id="dot" style={{ cx: 50, cy: 100, r: 30, fill: "rgba(0,120,255,1)" }}>
          <circle />
        </Voodoo.Node>
      </svg>
      <Voodoo.Draggable xAxis="scroll">
        <div style={{ position: "absolute", inset: 0 }} />
      </Voodoo.Draggable>
    </ViewBox>
  );
};
```

---

## Legacy: `asTweener` Decorator

> **Deprecated** — use `Voodoo.hook()` for all new code.

`Voodoo.tweener` is a class component decorator for older codebases.

```jsx
@Voodoo.tweener({ maxClickTm: 200, enableMouseDrag: false })
export default class MyScene extends React.Component {
  // Return true to consume a scroll event; false to let it bubble to the parent tweener
  componentShouldScroll(axisId, delta) { return true; }

  // Called after each scroll event
  componentDidScroll(pos, axisId) {}

  // Called after window resize
  windowDidResize(event) {}

  render() { return <div>{/* Axes, Nodes, Draggables */}</div>; }
}
```

`withTweener` injects the nearest tweener as a prop into a class component:

```jsx
import { withTweener } from "react-voodoo";

class Child extends React.Component {
  render() {
    const { tweener } = this.props;
    return <div onClick={() => tweener.scrollTo(0, 300, "scrollY")} />;
  }
}

export default withTweener(Child);
```

---

## License

React-Voodoo is dual-licensed:

- **[CC BY-ND 4.0](http://creativecommons.org/licenses/by-nd/4.0)** — use freely in commercial projects; no distribution of modified versions
- **[AGPL-3.0](http://www.gnu.org/licenses/agpl-3.0)** — distribute modified versions under the same license

© 2022–2026 Braun Nathanael
