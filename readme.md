<h1 align="center">react-rtween</h1>
<p align="center">Fast, scalable, multiscope, reversible, delta based, tween composition engine</p>

___

<a href="https://www.npmjs.com/package/react-rtween">
<img src="https://img.shields.io/npm/v/react-rtween.svg" alt="Npm version" /></a>
<a href="https://www.npmjs.com/package/react-rtween">
<img src="https://img.shields.io/npm/v/l/react-rtween.svg" alt="Npm version" /></a>

## rTween what ?

- rTween engine allow to apply forward and backward multiples tweens on same properties and multiple objects
- Allow **live composition of multiple** tweens, circle tweens, SVG Path tweens, other Scopelines, etc
- Allow frame pre-generation,

## Draft [sample](http://htmlpreview.github.io/?https://github.com/n8tz/react-rtween/blob/master/samples/index.html)

```jsx
let pushIn  = function ( target ) {
	return {
		anims: [
			{
				type    : "Tween",
				target  : target,
				from    : 0,
				duration: 500,
				easeFn  : easingFn.easeOutSine,
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
				easeFn  : easingFn.easeOutSine,
				apply   : {
					_z: -.2,
				}
			}
		]
	};
};

@asTweener
class Sample extends React.Component {
	state = {
		count: 0
	};

	render() {
		return <div className={ "root" } style={ {
			width : "100%",
			height: "100%"
		} }>
			hello ! { this.state.count } concurent anims
			<div
				onClick={ e => {
					this.setState({ count: this.state.count + 1 })
					this.pushAnim(pushOut("step"),
					              () => {
						              this.pushAnim(pushIn("step"),
						                            () => {
							                            this.setState({ count: this.state.count - 1 })
						                            });

					              });
				} }
				{ ...this.tweenRef("step", {
					                   position  : "absolute",
					                   display   : "inline-block",
					                   width     : "15em",
					                   height    : "15em",
					                   cursor    : "pointer",
					                   background: "red",
					                   overflow  : "hidden",
					                   margin    : "-7.5em 0 0 -7.5em",
					                   top       : 0,
					                   left      : 0
				                   },
				                   { _x: .5, _y: .5, z: 1, alpha: 1 }, 0) }/>
		</div>;
	}
}
```


### Todo :

- Nice examples 
- Doc & clean
- Usability & interpolations helpers ?
- ES6 updates
- Optims updates

### License ?

MIT license

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](#)
