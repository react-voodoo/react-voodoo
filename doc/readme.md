<h1 align="center">Drafty react-voodoo doc</h1>

___
- [React Voodoo](#react-voodoo)
    * [How to instantiate](#how-to-instantiate)
        + [Using Hooks : Voodoo.hook & Voodoo.useVoodoo](#using-hooks---voodoohook---voodoousevoodoo)
        + [Using decorators : Voodoo.asTweener](#using-decorators---voodooastweener)
    * [Voodoo data structure formats](#voodoo-data-structure-formats)
        + [CSS-in-JS Style descriptors](#css-in-js-style-descriptors)
        + [Tween / transitions descriptors](#tween---transitions-descriptors)
    * [Components](#components)
        + [Voodoo.Axis](#voodooaxis)
        + [Voodoo.Node](#voodoonode)
        + [Voodoo.Draggable](#voodoodraggable)
    * [tweenTools](#tweentools)
---

* Please check the sample for latest API ( https://github.com/react-voodoo/react-voodoo-samples )

# React Voodoo

## How to instantiate 

### Using Hooks : Voodoo.hook & Voodoo.useVoodoo

React Voodoo can be used via React Hooks style via the "Voodoo.hook" function.

In this case, the hook function will return an array containing 2 objects :
 - The tweener instance in the first index
 - And a ViewBox component to be instantiated at the root of the animated Voodoo.Node(s)

```js
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
			// Give an id ti this tweener so we can access it's axes in the childs components
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
	 * once first render done, axes mainly expose the following :
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
	
	return <ViewBox className={"container"}/>
// ...
}
```
### Using decorators : Voodoo.asTweener 

Return a react-voodoo tweener component composing the target React component

The resulting component will have the tweener hooks

```jsx harmony

import React from "react";
import Voodoo from "react-voodoo";

@Voodoo.tweener(
	{
	    // max click tm in ms before a click become a drag
		maxClickTm        : 200,
		// max drag offset in px before a click become a drag
		maxClickOffset    : 100,
		
		// mouse scroll force
		wheelRatio        : 5,
		
		// only apply 1 drag direction  
		dragDirectionLock : false,
		
		// allow dragging with mouse
		enableMouseDrag   : false
	}
)
export default class MyTweenerComp extends React.Component{
	/**
	* Hook to determine if this component should apply a scroll event
	* ( if not, the parent tweener / scrollable node will apply it )
    * @param axisId
    * @param delta
    * return {boolean|undefined}
    */
	componentShouldScroll(axisId, delta){
		
	}
	/**
	* Hook to change the targets order of scroll & drag events
	*
	* The returning array could also contain tween refs id & dom node id
	*
    * @param targets {array} array of node & react elements (default is all parents of the touch/mouse event)
    * return {array}
    */
	hookScrollableTargets( targets ) {
	    return ["myTweenRefId", ...targets];
	}
	/**
	* did scroll event
    * @param pos
    * @param axisId
    */
	componentDidScroll( pos, axisId ) {
	}
	/**
	* did resize event
    * @param pos
    * @param axisId
    */
	windowDidResize( event ) {
	}
}
```

## Voodoo data structure formats

### CSS-in-JS Style descriptors

We can use most of the CSS properties using the classic camel-cased CSS in JS syntax.

Additionally, Voodoo tweener add 3 optional client side only units ( will not work if used server-side ):
- (float)box : 1box = (width or height) of the 1st parent with [asTweener](readme.md#astweener);
- (float)bh : 1bh = height of the 1st parent with [asTweener](readme.md#astweener);
- (float)bw : 1bw = width of the 1st parent with [asTweener](readme.md#astweener);

* These units are calculated dynamically & updated when the windows trigger resize events

```js

/**
 * Voodoo.Node style property and the tween descriptors use classic CSS-in-JS declaration 
 * exept we can specify values using the "box" unit which is a [0-1] ratio of the ViewBox  
 */

const styleSample = {
	height: "50%",
	
	// the tweener deal with multiple units 
	// it will use css calc fn if there's more than 1 unit used 
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

```

### Tween / transitions descriptors

Axes animate Voodoo.Node basing the tween descriptors. 
Theses descriptors can be passed as parameter on the Voodoo.Node or on the Voodoo.Axis components with the target Node Id.  

```js
const axisSample = [// Examples of tween descriptors
	{
		target  : "someTweenRefId", // target Voodoo.Node id ( ignored if the tween is passed as parameter on a Voodoo.Node as it will directly target it )
		from    : 0,                // tween start position
		duration: 100,              // tween duration
		easeFn  : "easeCircleIn",   // optional easing function or id from [d3-ease](https://github.com/d3/d3-ease)
		
		apply: {// relative css values to be applied  
			// Same CSS-in-JS syntax as the styles
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
```

- target (string, optional):

The id of the target Voodoo.Node component to be affected by this animation. If this property is not provided, the
animation or interaction will be applied to the parent Voodoo.Node component.

- from (number, required):

The starting position of the animation.

- duration (number, required):

The duration of the animation.

- easeFn (string or function, optional):

The easing function to be used when applying the animation CSS values.
This can either be the id of a function from the d3-ease library, or a custom easing function.

- apply (object, optional):

An object containing the CSS properties and values to be applied to the target element during the animation or
interaction. The syntax for this object is the same as the style prop in a Voodoo.Node component.

- entering (function, optional):

A callback function to be triggered when the scrolling axis enters the period of the animation or interaction. The
function will be passed a single argument delta, which is a float value between -1 and 1 representing the change in
position within the period.

- moving (function, optional):

A callback function to be triggered while the scrolling axis is within the period of the animation. The function will be
passed three arguments: newPos, precPos, and delta, which represent the current position within the period, the previous
position within the period, and the change in position within the period, respectively. All three arguments are float
values between 0 and 1.

- leaving (function, optional):

A callback function to be triggered when the scrolling axis leave the period of the animation. The function will be
passed a single argument delta, which is a float value between -1 and 1 representing the change in position within the
period.

## Components

### Voodoo.Axis

In react-voodoo Tween axis are scrollable / swipeable arrays of relatives tween. <br>
Voodoo.Axis creates a "virtual" axis that, when moving its position will tween Voodoo.Node styles according its tween descriptors.

Note that multiple axes orchestrating multiple tween can update the sames CSS properties on the same Voodoo.Node simultaneously.

```js

const Sample = ( {} ) => {
	const [tweener, ViewBox]   = Voodoo.hook();
	
	return <ViewBox className={ "container" }>
		<Voodoo.Axis
			
			id={"scrollY"}          // Tween axis Id
			defaultPosition={0}     // default start position
			
			// Array of tween descriptors with theirs Voodoo.Node target ids 
			items={tweenArrayWithTargets}
			
			// size of the scrollable window for drag synchronisation
			scrollableWindow={ 200 }
			
			// optional default length of this axis
			size={ 1000 }
			
			// optional bounds ( inertia will target them if target pos is out )
			bounds={ { min : 100, max : 900 } }
			
			// inertia cfg ( false to disable it )
			inertia={
				{
					// called when inertia is updated
					// should return instantaneous move to do or null
					shouldLoop: ( currentPos ) => ( currentPos > 500 ? -500 : null ),
					
					// called when inertia know where it will end ( when the user stop dragging )
					willEnd  : ( targetPos, targetDelta, duration ) => {},
					
					// called when inertia know where it will snap ( when the user stop dragging )
					willSnap  : ( currentSnapIndex, targetWayPointObj ) => {},
					
					// called when inertia end
					onStop  : ( pos, targetWayPointObj ) => {},
					
					// called when inertia end on a snap
					onSnap  : ( snapIndex, targetWayPointObj ) => {},
					
					// list of waypoints object ( only support auto snap 50/50 for now )
					wayPoints : [{ at: 100 }, { at: 200 }]
				}
			}
		/>
		</ViewBox>
		}
```

Parameters

- id (string, required):

A unique identifier for the scrolling axis. This is used to reference the axis in other Voodoo components and functions.

- defaultPosition (number, optional):

The default starting position for the scrolling axis. This is a value representing the initial position of the axis. The
default value is 0.

- items (array, optional):

An array of objects describing the transition to be applied while moving this axis position. Each object should have the
properties described in [Tween descriptors](#Tween descriptors).

- scrollableWindow (number, optional):

The size of the axis window; this value and the axis size define the drag force. We can use it to synchronize the drag
amplitude. If this prop is not provided, default is drag synchronization will not be enabled.
(delta / ((xBoxRef||ViewBox).offsetWidth)) * ( axis.scrollableWindow || axis.duration )

- bounds (object, optional):

> { min : (number), max : (number) }

An optional object with the minimal and maximal positions of this axis when moved by Voodoo.Draggable components

- inertia (object, optional)

The inertia to use when moved by Voodoo.Draggable components.

The following options & listeners are available :

- shouldLoop(pos) (function, optional)

> pos (float) : The next position before its application<br>

Should return an instantaneous move to do or null.<br/> 
Use this function to create illusion of infinite scrolling. 

- wayPoints (array, optional)

> [{ at: (number) }, { at: (number) }, ...]

List of waypoints object where inertia should snap ( only support auto snap 50/50 for now )

- willEnd( targetPos, targetDelta, duration ) (function, optional)

> targetPos (float) : The position where inertia will end if no further interactions happen<br>
> targetDelta (float) : The distance of the position where inertia will end if no further interactions happen<br>
> duration (number) : The duration of the inertia if no further interactions happen

Called when inertia know where it will end ( when the user stop dragging )

- willSnap( snapIndex, targetWayPointObj ) (function, optional)

> snapIndex (number) : The WayPoint index where inertia will end if no further interactions happen<br>
> targetWayPointObj (object) : The WayPoint object where inertia will end if no further interactions happen<br>

Called when inertia know where it will snap ( when the user stop dragging )

- onStop( pos, targetWayPointObj ) (function, optional)

> pos (float) : The axis position<br>
> targetWayPointObj (object) : The WayPoint object where inertia ended if there<br>

Called when inertia end
				 
- onSnap( snapIndex, targetWayPointObj )

> snapIndex (number) : The WayPoint index where inertia ended<br>
> targetWayPointObj (object) : The WayPoint object where inertia ended<br>

Called when inertia end on a snap
				
### Voodoo.Node

Component to connect Html node to the Voodoo Axes / animations

```jsx harmony

const Sample = ( {} ) => {
	const [tweener, ViewBox]   = Voodoo.hook();
	
	return <ViewBox className={ "container" }>
		{/*...*/}
		<Voodoo.Node
			id={"testItem"} // optional id
			
			style={styleSample}// styles applied before any style coming from axes : css syntax + voodoo tweener units & transform management
			
			axes={{ scrollY : axisSample }} // Scrollable tweens by axis with no target node id required ( it will be ignored )
			
			onClick={// all unknow props are passed to the child node
				(e)=>{
					// start playing an anim
					tweener.pushAnim(
						// make all tween target "testItem"
						Voodoo.tools.target(pushIn, "testItem")
					).then(
						(tweenAxis) => {
							// doSomething next
						}
					);
				}
			}
		>
				<div>
					Some content to tween
				</div>
		</Voodoo.Node>
	</ViewBox>;
}
```

### Voodoo.Draggable

Component to scroll the Voodoo.Axis positions basing user dragging interactions

## tweenTools

The package expose some tween & css utils

```jsx harmony
/**
 * add any css val with multiple units 
 * @param val1
 * @param val2
 * @returns {Array}
 */
export function cssAdd( val1, val2, ...argz ) {}

/**
 * Multiply any css val with multiple unit
 * @param val1
 * @param val
 * @returns {Array}
 */
export function cssMult( val1, val ) {}

/**
* Apply an offset on all the given tween
* @param items
* @param start
*/
export function offset( items, start = 0 ) {}

/**
* Scale a tween collection to the specified duration 
* @param items
* @param duration
* @param withOffset
* @returns {(T | {duration: number, from: number})[]}
*/
export function scale( items, duration = 0, withOffset ) {}

/**
* Reverse an array of tween ( order & values )
* @param items
* @returns {(T | {apply: (*|string), from: number})[]}
*/
export function reverse( items ) {}

/**
* Add specified target to all tweens
* @param items
* @param target
* @returns {(T | {target: *})[]}
*/
export function target( items, target ) {}


/**
* Shift transforms of the specified tween array
* @param items
* @param shift
*/
export function shiftTransforms( items, shift = 1 ) {}

```

[![*](https://www.google-analytics.com/collect?v=1&tid=UA-82058889-1&cid=555&t=event&ec=project&ea=view&dp=%2Fproject%2Freact-voodoo&dt=doc)](#)
