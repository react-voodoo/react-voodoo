<h1 align="center">react-rtween</h1>
<p align="center">Fast, scalable, multiscope, reversible, delta based, tween composition engine</p>

___

<a href="https://www.npmjs.com/package/react-rtween">
<img src="https://img.shields.io/npm/v/react-rtween.svg" alt="Npm version" /></a>

<p align="center">* Consider this is alpha, don't use it unless you know why you need it *</p>

## rTween what ?

- rTween engine allow to apply forward and backward multiples tweens on same properties and multiple objects
- Allow **live composition of multiple** tweens, circle tweens, SVG Path tweens, rTween objects, etc

## Draft [sample](http://htmlpreview.github.io/?https://github.com/n8tz/react-rtween/blob/master/samples/index.html)

```jsx
import {asTweener, TweenRef} from "react-rtween";

var easingFn = require('d3-ease');

let pushIn        = function ( target ) {
	return [
			{
				type    : "Tween",
				target  : target,
				from    : 0,
				duration: 500,
				easeFn  : easingFn.easeCircleIn,
				apply   : {
					transform: {
						translateZ: "-.2box" // box == tweener offset height/width/perspective
					},
					filter   : {
						sepia: 100
					}
				}
			},
			{
				type    : "Tween",
				target  : target,
				from    : 500,
				duration: 500,
				easeFn  : easingFn.easeCircleIn,
				apply   : {
					transform: {
						translateZ: ".2box"
					},
					filter   : {
						sepia: -100
					}
				}
			},
			{
				type    : "Tween",
				target  : target,
				from    : 250,
				duration: 500,
				easeFn  : easingFn.easeCircle,
				apply   : {
					transform: {
						rotateY: 180,
					},
				}
			}
		];
};

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
@asTweener({ initialScrollPos: { scrollX: 100, scrollY: 100 }, enableMouseDrag: true })
export default class Sample extends React.Component {
	state = {
		count: 0
	};

	componentDidScroll( pos ) {
		this.forceUpdate();
	}

	render() {
		return <div className={ "SimpleTest" } style={ {
			width : "100%",
			height: "100%"
		} }>
			hello ! { this.state.count } concurent anims <br/>
			scrollPos : { this._.scrollPos } / { this._.scrollableArea }

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
				scrollableAnims={ scrollAnims }
			>
				<div
					onClick={ e => {
						this.setState({ count: this.state.count + 1 })
						this.pushAnim(pushIn("testItem"),
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
