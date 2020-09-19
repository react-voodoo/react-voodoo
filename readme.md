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

This is advanced beta, but react-voodoo still have missing css interpolator & possibly some bugs.<br/>


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

const styleSample = {
        height : "50%",
        
        // the tweener deal with multiple units 
        // it will use css calc fn if there's more than 1 unit used 
        width : ["50%", "10vw", "-50px", ".2box"],

        // transform can use multiple "layers"
        transform: [
            {
                // use rotate(X|Y|Z) & translate(X|Y|Z)
                rotateX:"25deg"
            }, 
            {
                translateZ: "-.2box"
            }
        ]
};
const axisSample = [{
                   		target: "someTweenRefId",   // target tween ref id ( optional if used as tweenAxis on a TweenRef )
                   		from    : 0,                // tween start position
                   		duration: 100,              // tween duration
                   		easeFn  : "easeCircleIn",   // function or easing fn id from [d3-ease](https://github.com/d3/d3-ease)
                   		
                   		apply   : {// relative css values to be applied  
                   			// Same syntax as the styles
                   			transform: [{}, {
                   				translateZ: "-.2box"
                   			}]
                   		}
                   	}
                   ];

const Sample = ( {} ) => {
    const //[parentTweener]      = Voodoo.hook(true),
          [tweener, ViewBox]   = Voodoo.hook();
    
    // Voodoo.hook({name:"root"}) // tweener instance can be nammed like this
    // Voodoo.hook("root")        // we can then get theirs ref like this 

    React.useEffect(
        e => tweener?.watchAxis("scrollY", (pos)=>doSomething()),
        [tweener]
    )

    // once drawn :
    // tweener.axes.scrollY.scrollPos
    // tweener.scrollTo(targetPos, duration, axisId)

    return <ViewBox className={ "container" }>
        <Voodoo.Axis

            id={"scrollY"}          // Tween axis Id
            defaultPosition={100}   // default start position

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

                        // called when inertia know where it will end ( when the user stop dragging )
                        willEnd  : ( targetPos, targetDelta, duration ) => {},

                        // called when inertia know where it will snap ( when the user stop dragging )
                        willSnap  : ( currentSnapIndex, targetWayPointObj ) => {},

                        // list of waypoints object ( only support auto snap for now )
                        wayPoints : [{ at: 100 }, { at: 200 }]
                    }
                }
        />

        <Voodoo.Node
            id={"testItem"} // optional id

            style={styleSample}// initial styles : css syntax + voodoo tweener units & transform management

            // Scrollable tween with no target node id required ( it will be ignored )
            axes={{ scrollY : sampleAxis }}

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
            <Voodoo.Draggable
                // make drag y move the scrollAnAxis axis
                // xAxis={ "scrollAnAxis" }

                // scale / inverse dispatched delta
                // xHook={(delta)=>modify(delta)} 

                // React ref to the box, default to the parent ViewBox 
                // scale is as follow : (delta / ((xBoxRef||ViewBox).offsetWidth)) * ( axis.scrollableWindow || axis.duration )  
                // xBoxRef={ref} 

                yAxis={ "scrollY" }// make drag y move the scrollY axis
                // yHook={(delta)=>modify(delta)}
                // yBoxRef={ref} 

                // mouseDrag={true} // listen for mouse drag ( default to false )
                // touchDrag={false} // listen for touch drag ( default to true )
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

## todo / roadmap ?

- Allow exporting tweenAxis as tweenable css props for parents 
- Make dynamic animation builder with some tweenRefs query language 
- Finish css support ( background, borders, ... )
- Doc, tests & code cleaning
- lot of various simple and/or smart optims / recycling
- Allow tween-axis to css keyframe anims ? 
- Allow SVG bindings ?


[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](#)
[![*](https://www.google-analytics.com/collect?v=1&tid=UA-82058889-1&cid=555&t=event&ec=project&ea=view&dp=%2Fproject%2Freact-voodoo&dt=readme)](#)