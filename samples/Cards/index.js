/*
 *
 * Copyright (C) 2019 Nathanael Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React                            from "react";
import {asTweener, TweenAxis, TweenRef} from "react-voodoo";


/**
 * This is an experimental lib
 *
 */
const CardXAxis =
	      [
		      {
			      from    : 0,
			      duration: 50,
			      apply   : {
				      transform: [
					      { translateZ: 50 },
					      { rotateY: "-90deg" }
				      ],
			      }
		      },
		      {
			      from    : 50,
			      duration: .1,
			      apply   : {
				      transform: [
					      {},
					      { rotateY: "180deg" }
				      ],
			      }
		      },
		      {
			      from    : 50,
			      duration: 50,
			      apply   : {
				      transform: [
					      { translateZ: -50 },
					      { rotateY: "-90deg" }
				      ],
			      }
		      },
	      ],
      cardStyle =
	      {
		      position: "relative",
		
		      transform: [
			      {
				      perspective: 500,
				      translateZ : 0
			      }
		      ]
	      };

@asTweener({ enableMouseDrag: true })
class SwipeableCard extends React.Component {
	static defaultProps = {
		swipeAnim: CardXAxis,
		style    : cardStyle,
		showBack : false
	};
	state               = {};
	
	constructor() {
		super(...arguments);
		this._flipEvent = [
			{
				type    : "Event",
				from    : 50,
				duration: .01,
				entering: ( pos ) => this.setState({ showBack: pos === 1 })
			},
		]
	}
	
	mouseEnter = () => {
		let { tweener } = this.props;
		console.warn("enter")
		//tweener.pushAnim(
		//	[
		//		{
		//			from    : 0,
		//			duration: 500,
		//			apply   : {
		//				transform: {
		//					translateZ: 200
		//				}
		//			}
		//		}
		//	]
		//)
	}
	mouseLeave = () => {
		let { tweener } = this.props;
		console.warn("leave")
		//tweener.pushAnim(
		//	[
		//		{
		//			from    : 0,
		//			duration: 500,
		//			apply   : {
		//				transform: {
		//					translateZ: -200
		//				}
		//			}
		//		}
		//	]
		//)
	}
	
	static getDerivedStateFromProps( props, state ) {
		let { swipeAnim, style } = props;
		return {
			swipeAnim: { scrollX: swipeAnim },
			style,
			showBack : state.showBack === undefined ? props.showBack : state.showBack
		}
	}
	
	render() {
		let {
			    swipeAnim, style,
			    showBack
		    } = this.state;
		return <>
			<TweenAxis
				axe={"scrollX"}
				scrollableWindow={100}
				items={this._flipEvent}
				defaultPosition={showBack ? 100 : 0}
				inertia={{
					wayPoints: [{ at: 0 }, { at: 100 }],
				}}
			/>
			<TweenRef id="card"
			          tweenAxis={swipeAnim}
			          initial={style}>
				<div className={"SwipeableCard"} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
					{this.props.children && this.props.children[showBack ? 1 : 0]}
				</div>
			</TweenRef>
		</>;
	}
}


export default class Sample extends React.Component {
	render() {
		return <div className={"SwipeableCards"}>
			{
				Array(20).fill(null).map(
					( e, i ) =>
						<SwipeableCard key={i} showBack={!!(i % 3)}>
							<div className={"frontCard"}>
								<div className={"description"}>front {i}</div>
							</div>
							<div className={"backCard"}>
								<div className={"description"}>back {i}</div>
							</div>
						</SwipeableCard>
				)
			}
		</div>;
	}
}