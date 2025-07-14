<h1 align="center">react-voodoo</h1>
<p align="center">Fast, SSR ready, additive & swipeable, tween composition engine for React</p>

___
<p align="center"><img  width="192" src ="https://github.com/react-voodoo/react-voodoo/raw/master/doc/assets/logo-v0.png?sanitize=true" /></p>


<p align="center">
<a href="https://www.npmjs.com/package/react-voodoo">
<img src="https://img.shields.io/npm/v/react-voodoo.svg" alt="Npm version" /></a>
<a href="https://travis-ci.org/react-voodoo/react-voodoo">
<img src="https://travis-ci.org/react-voodoo/react-voodoo.svg?branch=master" alt="Build Status" /></a>
<img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" />
<br/>
<a href="http://creativecommons.org/licenses/by-nd/4.0">
<img src="https://img.shields.io/badge/License-CC%20BY--ND%204.0-lightgrey.svg" alt="License: CC BY-ND 4.0" /></a>
<a href="http://www.gnu.org/licenses/agpl-3.0">
<img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" alt="License: AGPL v3" /></a>
</p>

## Why another animation engine ?

Classic Tween engines can only output absolute values, which quickly results in very complex code when we have to
gradually compose values from multiple sources (e.g. when merging multiple animations based on user drag interactions )
.<br/>

React-Voodoo use a delta-based interpolation engine that solves this problem, it allows:

- Additive tween 
- Swipeable complex animations ( like Android & iOS )
- Fast & direct DOM updates ( not bound to the React rendering loop )
- Server Side Rendering of any scroll / swipe position
- Easily connect sensors / gestures to complex animations
- Hot switching scrollable anims ( responsive )
- Predictive inertia ( knowing where inertia will stop while animating )
- Multitouch dragging ( drag multiple things at once )
- Intuitive & flexible animation system
- Cool ( & performant ) React integration
- Automatically deal with multiple units using css "calc( ... )"
- etc...

## Basic documentation [here](doc/readme.md)

## Live demo & codesandbox [here](https://react-voodoo.github.io/react-voodoo-samples/)

<p align="center"><img src ="https://github.com/react-voodoo/react-voodoo/raw/master/doc/assets/demo.gif?sanitize=true" /></p>

## Samples sources [here](https://github.com/react-voodoo/react-voodoo-samples)

## You... like it / it saved your day / you stole all the code / you want more?

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](#)

BTC     : bc1qh43j8jh6dr8v3f675jwqq3nqymtsj8pyq0kh5a<br/>
Paypal  : <span class="badge-paypal"><a href="https://www.paypal.com/donate/?hosted_button_id=ECHYGKY3GR7CN" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>

## Basics

"all in one" example :

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

## License ?

Using CC BY-ND, you can use it in commercial apps, but you can't distribute modified versions.<br/>
Using AGPL, you can distribute modified versions but theses versions must be AGPL too.


[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](#)
[![*](https://www.google-analytics.com/collect?v=1&tid=UA-82058889-1&cid=555&t=event&ec=project&ea=view&dp=%2Fproject%2Freact-voodoo&dt=readme)](#)
