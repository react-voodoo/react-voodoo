<h1 align="center">react-voodoo tweener</h1>

___


## Concepts & syntax

### Tween Axis

In react-voodoo Tween axis are scrollable / swipeable arrays of relatives tween. <br>
All tween are dynamically composed by [tween-axis](https://github.com/n8tz/tween-axis), which make them additive & relative, so they can be applied simultaneously on same values.<br> 
react-voodoo manage theirs application basing on the react bindings & the browser events.<br> 

### Units 

Voodoo tweener add 3 (client side) units : 
 - (float)box : 1box = (width or height) of the 1st parent with [asTweener]();
 - (float)bh : 1bh = height of the 1st parent with [asTweener]();
 - (float)bw : 1bw = width of the 1st parent with [asTweener]();
<!-- - (float)bz : 1bz = perspective of the 1st parent with [asTweener]();-->

* These units are calculated dynamically & updated when the windows trigger resize events

### Styles syntax

All styles use camelcase css in js syntax except for transform & filter.

```jsx harmony
let style = {
        
        height : "50%",
        
        // the tweener deal with multiple units 
        // it will use css calc fn if there's more than 1 unit used 
        width : ["50%", "10vw", "-50px", ".2box"],

        // transform can use multiple "layers"
        transform: [
            {
                // can only use rotate(X|Y|Z) & translate(X|Y|Z) 
                rotateX:"25deg"
            }, 
            {
                translateZ: "-.2box"
            }
        ],
        filter   : {
            sepia: 100
        }
    
}
```

### tween syntax

```jsx harmony
let anim        = [
	{
		// target tween ref id ( optional if used as tweenAxis on a TweenRef ) 
		target: "someTweenRefId",
		
		// tween start position
		from    : 0,
		
		// tween duration 
		duration: 500,
		
		// function or easing fn id from [d3-ease](https://github.com/d3/d3-ease)
		easeFn  : "easeCircleIn",
		
		// relative css values to be applied  
		apply   : {
			// Same syntax as the styles
			transform: [{}, {
				translateZ: "-.2box"
			}]
		}
	}
];
```


## React syntax

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

### asTweener ( hoc )
### withTweener ( hoc )
### TweenRef
### TweenAxis