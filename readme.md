<h1 align="center">react-voodoo tweener</h1>
<p align="center">Fast, SSR compatible, additive & swipeable, tween composition engine for React</p>

___
<p align="center"><img  width="192" src ="https://github.com/react-voodoo/react-voodoo/raw/master/doc/assets/logo-v0.png?sanitize=true" /></p>


<p align="center">
<a href="https://www.npmjs.com/package/react-voodoo">
<img src="https://img.shields.io/npm/v/react-voodoo.svg" alt="Npm version" /></a>
<a href="https://travis-ci.org/react-voodoo/react-voodoo">
<img src="https://travis-ci.org/react-voodoo/react-voodoo.svg?branch=master" alt="Build Status" /></a>
<img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" />
</p>

## Welcome to react-voodoo !

react-voodoo is a truly additive & intuitive tween engine for React

Why another animation engine ?

To have some advanced functionalities :

- Additive tween ( simultaneous tween on same properties )
- Swipeable animations ( like Android & iOS )
- Server Side Rendering of any scroll / swipe position
- Hot switching scrollable anims ( responsive )
- Predictive inertia (knowing where inertia will stop after swipe)
- Multitouch dragging ( drag multiple things at once )
- Intuitive & flexible animation system
- Cool ( & performant ) React integration
- Automatically deal with multiple units using css "calc( ... )"
- etc...

## Draft & minimalist samples [here](https://github.com/react-voodoo/react-voodoo-samples)

## Draft & minimalist doc [here](doc/readme.md)

## Note

This is advanced beta, react-voodoo still have missing css interpolator

## How can i help ?

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](#)
[![collaborators welcome](https://img.shields.io/badge/collaborators-welcome-brightgreen.svg?style=flat)](#)
<span class="badge-paypal"><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=THPSUB2U58AYQ&item_name=Dev+react-voodoo&currency_code=EUR&source=url" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>
<a href="https://liberapay.com/Nathan/donate"><img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg"></a>
[![*](https://www.google-analytics.com/collect?v=1&tid=UA-82058889-1&cid=555&t=event&ec=project&ea=view&dp=%2Fproject%2Freact-voodoo&dt=readme)](#)

## Basics

Here a temporary "all in one" example :

```jsx harmony

import React from "react";
import Voodoo from "react-voodoo";
import {itemTweenAxis, tweenArrayWithTargets} from "./somewhere";

const Sample = ( {} ) => {
    const //[parentTweener]      = Voodoo.hook(true),
          [tweener, ViewBox]   = Voodoo.hook();

    React.useEffect(
        e => tweener?.watchAxis("scrollY", (pos)=>doSomething()),
        [tweener]
    )

    // once drawn :
    // tweener.axes.scrollY.scrollPos
    // tweener.scrollTo(targetPos, duration, axisId)

    return <ViewBox className={ "container" }>
        <Voodoo.Axis

            // Tween axis Id
            id={"scrollY"}

            // default start position
            defaultPosition={100}

            // Global scrollable tween with theirs TweenRef target ids
            items={tweenArrayWithTargets}

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
            style={
                {
                    // initial styles : css syntax + voodoo tweener units & transform management
                }
            }
            // Scrollable tween with no target node id required ( it will be ignored )
            axes={
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
            <Voodoo.Draggable
                // make drag y move the scrollAnAxis axis
                // xAxis={ "scrollAnAxis" }
                // xHook={(delta)=>modify(delta)}

                yAxis={ "scrollY" }// make drag y move the scrollY axis
                // yHook={(delta)=>modify(delta)}
                >
                    <div>
                        Some content to tween
                    </div>
            </Voodoo.Draggable>
        </Voodoo.Node>
    </ViewBox>;
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

### Licensing ?

AGPL license


[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](#)
[![*](https://www.google-analytics.com/collect?v=1&tid=UA-82058889-1&cid=555&t=event&ec=project&ea=view&dp=%2Fproject%2Freact-voodoo&dt=readme)](#)