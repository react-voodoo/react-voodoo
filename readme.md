<h1 align="center">react-voodoo tweener</h1>
<p align="center">Fast, SSR compatible, additive & swipeable, tween composition engine for React</p>

___


<p align="center">
<a href="https://www.npmjs.com/package/react-voodoo">
<img src="https://img.shields.io/npm/v/react-voodoo.svg" alt="Npm version" /></a>
<a href="https://travis-ci.org/react-voodoo/react-voodoo">
<img src="https://travis-ci.org/react-voodoo/react-voodoo.svg?branch=master" alt="Build Status" /></a>
<img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" />
</p>

## wtf is react-voodoo ?

react-voodoo is an additive tweener for react

It allow :

- Additive tween ( applying forward and backward multiples tween on same properties )
- Scrollable & swipeable animations
- SSR rendering of =! scroll / swipe position
- Hot switching scrollable anims ( responsive )
- Predictive inertia
- etc...

## Draft & minimalist samples [here](http://htmlpreview.github.io/?https://github.com/n8tz/react-voodoo-samples/blob/master/index.html) ( [sources](samples) )

## Draft & minimalist doc [here](doc/readme.md)

## Note

If you're searching production ready animation engine that can do some additive tween see [react-spring](https://github.com/react-spring/react-spring) or [gsap](https://github.com/bitworking/react-gsap) 

## Basics

```jsx harmony

import React from "react";
import Voodoo from "react-voodoo";
import {itemTweenAxis, pageTweenAxisWithTargets} from "./somewhere";

@Voodoo.tweener
export default class MyTweenerComp extends React.Component{
	
	render() {
		let {tweener} = this.props;
		return <div>
			<Voodoo.Axis
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
			
		    <Voodoo.Node
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
		</div>;
    }
}

```

## todo / roadmap ?

- Allow exporting tweenAxis as tweenable css props for parents 
- Make dynamic animation builder with some tweenRefs query language 
- Finish css support ( background, borders, ... )
- Doc, tests & code cleaning
- lot of various simple and/or smart optims / recycling
- Allow tween-axis to css keyframe anims ? 
- Allow SVG bindings ?

### License ?

AGPL license

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](#)
[![*](https://www.google-analytics.com/collect?v=1&tid=UA-82058889-1&cid=555&t=event&ec=project&ea=view&dp=%2Fproject%2Freact-voodoo&dt=readme)](#)