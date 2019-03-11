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

let pushIn  = function ( target ) {
	return {
		anims: [
			{
				type    : "Tween",
				target  : target,
				from    : 0,
				duration: 500,
				easeFn  : easingFn.easeCircleIn,
				apply   : {
					_z: .2,
				}
			}
		]
	};
};
let pushOut = function ( target ) {
	return {
		anims: [
			{
				type    : "Tween",
				target  : target,
				from    : 0,
				duration: 500,
				easeFn  : easingFn.easeCubicInOut,
				apply   : {
					_z: -.2,
				}
			}
		]
	};
};

@asTweener
class Sample extends React.Component {
	static scrollableAnim = {
		scrollY: [
			{
				type    : "Tween",
				target  : "testItem",
				from    : 0,
				duration: 150,
				easeFn  : easingFn.easePolyOut,
				apply   : {
					_z: -.2,
				}
			},
			{
				type    : "Tween",
				target  : "testItem",
				from    : 25,
				duration: 150,
				easeFn  : easingFn.easePolyOut,
				apply   : {
					_x: -.5,
				}
			},
			{
				type    : "Tween",
				target  : "testItem",
				from    : 50,
				duration: 150,
				easeFn  : easingFn.easePolyOut,
				apply   : {
					rotateY: -60,
				}
			}
		],
		scrollX: [
			{
				type    : "Tween",
				target  : "testItem",
				from    : 0,
				duration: 150,
				easeFn  : easingFn.easePolyOut,
				apply   : {
					_y: -.25,
				}
			},
			{
				type    : "Tween",
				target  : "testItem",
				from    : 50,
				duration: 150,
				easeFn  : easingFn.easePolyOut,
				apply   : {
					rotateX: -60,
				}
			}
		]
	};
	state                 = {
		count: 0
	};

	render() {
		return <div className={ "root" } style={ {
			width : "100%",
			height: "100%"
		} }>
			hello ! { this.state.count } concurent anims <br/>
			scrollPos : { this._scrollPos } / { this._scrollableArea }
			<button onClick={ e => this.scrollTo(0, 500) }>( go to 0 )</button>

			<TweenRef
				id={ "testItem" }
				initial={ { x: "50vw", y: "50vh", z: 1, opacity: .75 } }
			>
				<div
					onClick={ e => {
						this.setState({ count: this.state.count + 1 })
						this.pushAnim(pushOut("testItem"),
						              () => {
							              this.pushAnim(pushIn("testItem"),
							                            () => {
								                            this.setState({ count: this.state.count - 1 })
							                            });

						              });
					} }
					style={ {
						position  : "absolute",
						display   : "inline-block",
						width     : "15em",
						height    : "15em",
						cursor    : "pointer",
						background: "red",
						overflow  : "hidden",
						margin    : "-7.5em 0 0 -7.5em",
						top       : "0px",
						left      : "0px"
					} }>click me !
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
