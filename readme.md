<h1 align="center">react-voodoo tweener</h1>
<p align="center">Fast, SSR compatible, additive & swipeable, tween composition engine for React</p>

___

<a href="https://www.npmjs.com/package/react-voodoo">
<img src="https://img.shields.io/npm/v/react-voodoo.svg" alt="Npm version" /></a>

<p align="center">/!\ This is beta /!\</p>


## wtf is react-voodoo ?

react-voodoo is an additive tweener for react

It allow :

- Additive tween ( applying forward and backward multiples tween on same properties )
- Scrollable & swipeable animations
- SSR rendering of =! scroll / swipe position
- Hot switching scrollable anims ( responsive )
- Predictive inertia
- etc...

## Draft & minimalist samples [here](http://htmlpreview.github.io/?https://github.com/n8tz/react-voodoo/blob/master/dist.samples/index.html) ( [sources](samples) )

## Draft & minimalist doc [here](doc/readme.md)

## Note

If you're searching production ready animation engine that can do some additive tween see [react-spring](https://github.com/react-spring/react-spring)<br>
react-voodoo seems simpler & have cool features but is not really optimized, have big garbage collects & may have bugs. 

## Basics

```jsx harmony

import React from "react";
import {asTweener, TweenAxis, TweenRef, tweenTools} from "react-voodoo";
import {itemTweenAxis, pageTweenAxisWithTargets} from "./somewhere";

@asTweener
export default class MyTweenerComp extends React.Component{
	
	render() {
		return <div>
			<TweenAxis
				// Tween axis Id 
				// * scrollY & scrollX automatically receive mouse & touch events
				axe={"scrollY"}
				
				// default start position
				defaultPosition={100}

				// Global scrollable tween with theirs TweenRef target ids
				items={pageTweenAxisWithTargets}

				// size of the scrollable window for drag synchronisation
				scrollableWindow={ 200 }
				
				// default length of this scrollable axis
				size={ 1000 }
				 
				// optional bounds ( inertia will target them if target pos is out )
				bounds={ { min : 100, max : 900 } }
				 
				// inertia cfg ( false to disable it ) 
				inertia={
						{
							// called when inertia is updated
							// should return instantaneous move to do if wanted
							shouldLoop: ( currentPos ) => ( currentPos > 500 ? -500 : null ),
							
							// called when inertia know where it will snap ( when the user stop dragging )   
							willSnap  : ( currentSnapIndex, targetWayPointObj ) => {},
							
							// list of waypoints object ( only support auto snap for now ) 
							wayPoints : [{ at: 100 }, { at: 200 }]
						}
					}
			/>
			
		    <TweenRef
			id={"testItem"} // optional id
			initial={
				{
					// css syntax + voodoo tweener units & transform management 
				}
			}
			// Scrollable tween with no id required ( it will be ignored )
			// * will use scrollY axis as default                 
			tweenAxis={
				{
					scrollY : itemTweenAxis
				}
			} 
			// on(Dbl)Click is forwarder with the tweener component as 2nd arg
			onClick={
				(e, tweener)=>{
					// start playing an anim
				    tweener.pushAnim(
					// make all tween target "testItem"
					tweenTools.target(pushIn, "testItem")
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
            </TweenRef>
		</div>;
    }
}

```

## todo / roadmap ?

- Better scroll support / fixs
- Full css support ( full background transitions )
- Doc, tests & code cleaning
- lot of various simple and/or smart optims / recycling
- Allow tween-axis to css keyframe anims ? 
- Allow SVG bindings ?

### License ?

AGPL license

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](#)
