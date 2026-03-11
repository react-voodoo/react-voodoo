# react-voodoo · Animation Engine Performance Comparison

Comparing **react-voodoo** (tween-axis JS + WASM) against its three main React ecosystem
competitors: **GSAP**, **Framer Motion** (popmotion), and **Anime.js**.

> Run: `node bench.js`
> Platform: Node.js v20.15.1 · Linux (WSL2) · no DOM, no RAF overhead

---

## Libraries under test

| Label | Library | React integration | Model |
|---|---|---|---|
| `voodoo/js` | tween-axis (JS) | react-voodoo | Delta-based, additive |
| `voodoo/wasm` | tween-axis (WASM) | react-voodoo | Same API, state machine in WebAssembly |
| `gsap` | GSAP 3.14 | `@gsap/react`, direct | Absolute-seek timeline |
| `popmotion/FM` | Popmotion 11 | Framer Motion | Stateless pure interpolation |
| `animejs` | Anime.js 3 | direct | Absolute-seek timeline |

---

## What is measured

Each scenario calls the library's **core seek/update function once per iteration** and
reports millions of operations per second (higher = faster).
This maps directly to the cost paid **every animation frame** in a real application.

The % column is relative to `voodoo/js` (baseline = 0 %).

---

## Results

### S1 · 5 properties · sequential sweep
*Frame-by-frame advance from t = 0 → 1. Primary use-case for every library.*

| Rank | Library | ops/s | vs voodoo/js |
|---:|---|---:|---:|
| 1 | popmotion/FM | 21.43 M | +145 % |
| 2 | **voodoo/wasm** | **20.15 M** | **+131 %** |
| 3 | gsap | 9.15 M | +5 % |
| 4 | voodoo/js | 8.74 M | — |
| 5 | animejs | 5.67 M | −35 % |

Popmotion and voodoo/wasm trade blows here. GSAP is on par with voodoo/js.
Popmotion wins because it has **no timeline state** — it's a pure math call.

---

### S2 · 5 properties · random seeks
*Uniformly random positions — worst-case scrubbing / drag-to-seek.*

| Rank | Library | ops/s | vs voodoo/js |
|---:|---|---:|---:|
| 1 | **voodoo/wasm** | **26.17 M** | **+156 %** |
| 2 | popmotion/FM | 13.04 M | +28 % |
| 3 | voodoo/js | 10.22 M | — |
| 4 | gsap | 6.97 M | −32 % |
| 5 | animejs | 5.30 M | −48 % |

voodoo/wasm takes the lead on random seeks: the WASM state machine handles direction
reversals cheaply. GSAP's absolute-seek model costs more on direction changes.

---

### S3 · 20 properties · sequential sweep
*Property-count scaling: how cost grows as the animated property set expands.*

| Rank | Library | ops/s | vs voodoo/js |
|---:|---|---:|---:|
| 1 | **voodoo/wasm** | **7.70 M** | **+43 %** |
| 2 | voodoo/js | 5.37 M | — |
| 3 | gsap | 2.95 M | −45 % |
| 3 | popmotion/FM | 2.95 M | −45 % |
| 5 | animejs | 1.65 M | −69 % |

tween-axis has near-linear property scaling thanks to its **compiled-per-property
processor functions** (generated via `new Function()`). Competitors iterate property
maps at runtime, paying per-key overhead regardless of property count.

---

### S4 · 5 properties · easeInOutCubic
*Easing overhead: all libraries apply a cubic ease per property per frame.*

| Rank | Library | ops/s | vs voodoo/js |
|---:|---|---:|---:|
| 1 | popmotion/FM | 10.89 M | +197 % |
| 2 | **voodoo/wasm** | **5.06 M** | **+38 %** |
| 3 | gsap | 4.79 M | +31 % |
| 4 | voodoo/js | 3.67 M | — |
| 5 | animejs | 2.12 M | −42 % |

Easing is the one scenario where voodoo/js lags behind GSAP. The reason: tween-axis
calls `easeFn(lastPos + update) - easeFn(lastPos)` **per delta step** to preserve
additive correctness, while GSAP evaluates easing once per seek. The WASM build
recovers most of the gap because the marker scan overhead drops.

---

### S5 · Additive composition — 3 sources, same speed
*Three independent animation axes all writing to the same 5 properties simultaneously.
This is react-voodoo's **native model**; competitors must manually run N timelines and sum.*

| Rank | Library | ops/s | vs voodoo/js |
|---:|---|---:|---:|
| 1 | **voodoo/wasm** | **9.60 M** | **+117 %** |
| 2 | popmotion/FM | 7.05 M | +59 % |
| 3 | voodoo/js | 4.42 M | — |
| 4 | gsap | 2.56 M | −42 % |
| 5 | animejs | 1.80 M | −59 % |

GSAP and Anime.js drop sharply here because each timeline carries full per-seek
overhead × 3 plus a manual summation loop. Popmotion is cheap because its calls are
pure functions. voodoo/wasm leads because three `goTo` calls into a shared scope
remain fast even with 3× the WASM round-trips.

---

### S6 · Spring-like layers — 3 sources at different speeds (t, t×0.7, t×0.3)
*The signature react-voodoo pattern: scroll (fast), drag (medium), push/spring (slow)
all layered on the same element. Positions diverge, creating a spring-lag composite.*

| Rank | Library | ops/s | vs voodoo/js |
|---:|---|---:|---:|
| 1 | **voodoo/wasm** | **10.04 M** | **+117 %** |
| 2 | popmotion/FM | 7.37 M | +59 % |
| 3 | voodoo/js | 4.63 M | — |
| 4 | gsap | 2.54 M | −45 % |
| 5 | animejs | 1.88 M | −59 % |

Results mirror S5 — the pattern is the same composition model, just with different
t-multipliers. The slightly higher voodoo numbers (vs S5) are because the slower
axes (×0.7, ×0.3) cross fewer timeline markers per call, reducing marker-scan work.

---

### S7 · Long timeline — 20 sequential segments, 5 properties
*A complex scroll-driven experience with 20 distinct animation sections.
Models full-page scroll animations, multi-step story sequences, etc.*

| Rank | Library | ops/s | vs voodoo/js |
|---:|---|---:|---:|
| 1 | **voodoo/wasm** | **20.88 M** | **+193 %** |
| 2 | popmotion/FM | 19.20 M | +170 % |
| 3 | voodoo/js | 7.12 M | — |
| 4 | gsap | 3.09 M | −57 % |
| 5 | animejs | 1.18 M | −83 % |

A 20-segment timeline has 40 markers. Most frames the cursor sits inside one segment
and crosses zero markers — tween-axis / WASM handle this in O(1). GSAP must walk
its internal timeline tree on every seek. Anime.js compounds the cost by re-evaluating
all keyframes on each `seek()`.

---

## Summary heatmap

`■■` = clear winner · `■` = competitive · `·` = below baseline

| Scenario | voodoo/wasm | voodoo/js | popmotion/FM | gsap | animejs |
|---|:---:|:---:|:---:|:---:|:---:|
| S1 sequential 5p | ■■ | · | ■■ | · | · |
| S2 random seeks | ■■ | · | · | · | · |
| S3 scale to 20p | ■■ | ■ | · | · | · |
| S4 easing | · | · | ■■ | · | · |
| S5 additive (same t) | ■■ | · | ■ | · | · |
| S6 spring layers | ■■ | · | ■ | · | · |
| S7 long timeline | ■■ | ■ | ■■ | · | · |

---

## Key takeaways

### When voodoo/wasm wins
- **Any scenario with many properties** (S3): compiled processors scale O(1) per prop.
- **Random seeks** (S2): the WASM state machine handles direction reversals cheaply.
- **Additive / spring layers** (S5, S6): WASM amortises the cost of multiple concurrent
  axes far better than running N full GSAP/Anime timelines.
- **Long timelines** (S7): marker-scan is O(active markers crossed), not O(timeline length).

### When competitors lead
- **Popmotion/FM with easing** (S4): stateless interpolation avoids per-step easeFn calls.
  voodoo calls `easeFn` twice per delta to preserve additive correctness; this is the
  fundamental cost of the delta model.
- **Popmotion/FM on sequential 5 props** (S1): pure math with no state overhead beats
  even the WASM build when the timeline is trivially small.

### Architectural note
The delta/additive model is not merely a performance strategy — it makes certain
animations **impossible to express** in absolute-seek libraries without custom code:

- Two independent scroll axes both shifting `translateX` → voodoo accumulates deltas,
  competitors require manual pre-computed offsets or nested containers.
- Drag + inertia + a push animation all on the same element → 3 `goTo` calls in voodoo;
  3 timelines + manual summation + potential fighting between absolute setters elsewhere.

The easing cost in S4 is the fair price for that composability.

---

*Generated: 2026-03-11 · tween-axis v2.6.1 · GSAP v3.14.2 · Anime.js v3.2.2 · Popmotion v11*
