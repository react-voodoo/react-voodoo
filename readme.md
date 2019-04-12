<h1 align="center">react-rtween</h1>
<p align="center">Fast, scalable, multiscope, reversible, delta based, tween composition engine</p>

___

<a href="https://www.npmjs.com/package/react-rtween">
<img src="https://img.shields.io/npm/v/react-rtween.svg" alt="Npm version" /></a>


## wtf is react-rTween ?

- rTween engine allow to apply forward and backward multiples tweens on same properties and multiple objects
- Allow **live composition, hot switch of multiple** scrollable animation
- etc


## Draft [sample](http://htmlpreview.github.io/?https://github.com/n8tz/react-rtween/blob/master/samples/index.html)

```jsx
import React                                        from "react";
import {asTweener, TweenRef, TweenAxis, tweenTools} from "react-rtween";


let pushIn        = [
	{
		type    : "Tween",
		from    : 0,
		duration: 500,
		easeFn  : "easeCircleIn",
		apply   : {
			transform: [{}, {
				translateZ: "-.2box"
			}],
			filter   : {
				sepia: 100
			}
		}
	},
	{
		type    : "Tween",
		from    : 500,
		duration: 500,
		easeFn  : "easeCircleIn",
		apply   : {
			transform: [{}, {
				translateZ: ".2box"
			}],
			filter   : {
				sepia: -100
			}
		}
	},
	{
		type    : "Tween",
		from    : 250,
		duration: 500,
		easeFn  : "easeCircle",
		apply   : {
			transform: [{}, {
				rotateY: 180,
			}],
		}
	}
];
const scrollAnims = {
	scrollX: [
		{
			type    : "Tween",
			from    : 0,
			duration: 200,
			apply   : {
				transform: {
					translateX: "-1box"
				},
			}
		},
		{
			type    : "Tween",
			from    : 0,
			duration: 100,
			apply   : {
				transform: {
					rotateX: 30,
				},
			}
		},
		{
			type    : "Tween",
			from    : 100,
			duration: 100,
			apply   : {
				transform: {
					rotateX: 30,
				},
			}
		}
	],
	scrollY: [
		{
			type    : "Tween",
			from    : 0,
			duration: 200,
			apply   : {
				transform: {
					translateY: "-1box"
				},
			}
		},
		{
			type    : "Tween",
			from    : 0,
			duration: 100,
			apply   : {
				transform: {
					rotateY: -30,
				},
			}
		},
		{
			type    : "Tween",
			from    : 100,
			duration: 100,
			apply   : {
				transform: {
					rotateY: -30,
				},
			}
		}
	]
};
@asTweener({ enableMouseDrag: true })
export default class Sample extends React.Component {
	state = {
		count: 0
	};
	
	componentDidScroll( pos ) {
		this.forceUpdate();// force update to show scroll pos
	}
	
	render() {
		return <div className={ "SimpleTest" } style={ {
			width : "100%",
			height: "100%"
		} }>
			<TweenAxis
				axe={ "scrollY" }
				defaultPosition={ 100 }
			/>
			<TweenAxis
				axe={ "scrollX" }
				defaultPosition={ 100 }
			/>
			hello ! { this.state.count } concurent anims <br/>
			scrollPos : <pre>{ JSON.stringify(this.getAxisState(), null, 2) }</pre>
			<br/>y:
			<button onClick={ e => this.scrollTo(0, 500) }>( go to 0 )</button>
			<button onClick={ e => this.scrollTo(200, 500) }>( go to 200 )</button>
			<br/>x:
			<button onClick={ e => this.scrollTo(0, 500, "scrollX") }>( go to 0 )</button>
			<button onClick={ e => this.scrollTo(200, 500, "scrollX") }>( go to 200 )</button>
			
			<TweenRef
				id={ "testItem" }
				initial={ {
					position       : "absolute",
					display        : "inline-block",
					width          : "15em",
					height         : "15em",
					cursor         : "pointer",
					backgroundColor: "red",
					overflow       : "hidden",
					margin         : "-7.5em 0 0 -7.5em",
					top            : "0%",
					left           : "0%",
					
					transform: {
						translateZ: "0box",
						translateX: "1box",
						translateY: "1box",
						rotateX   : -30,
						rotateY   : 30,
					}
				} }
				tweenLines={ scrollAnims }
			>
				<div
					onClick={ e => {
						this.setState({ count: this.state.count + 1 })
						this.pushAnim(tweenTools.target(pushIn, "testItem"),
						              () => {
							              this.setState({ count: this.state.count - 1 })
						              });
					} }
					style={ {} }>click me !
				</div>
			</TweenRef>
		</div>;
	}
}
```

### Todo :

- Nice examples 
- Matrix support
- Better scroll support
- Doc & clean

### License ?

MIT license

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](#)
