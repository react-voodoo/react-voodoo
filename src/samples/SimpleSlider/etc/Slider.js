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
import React                                        from "react";
import {asTweener, TweenRef, TweenAxis, tweenTools} from "react-rtween";
import is                                           from "is";

@asTweener({ enableMouseDrag: true })
export default class Slider extends React.Component {
	static defaultProps = {
		defaultIndex   : 0,
		visibleItems   : 10,
		overlaps       : 1 / 4,
		defaultInitial : {},
		defaultEntering: [],
		defaultLeaving : []
	};
	state               = {};
	
	componentDidMount() {
		let { autoScroll, defaultIndex = 0 } = this.props;
		if ( autoScroll ) {
			this._updater = setTimeout(
				tm => this.goNext(),
				autoScroll
			)
		}
	}
	
	goNext() {
		let { step, dec, nbItems } = this.state,
		    nextIndex              = ((nbItems + this.state.index + 1) % nbItems);
		
		if ( this.state.index > nextIndex )
			this.scrollTo(dec + 100 - step, 0, "scrollX");
		
		console.log(nextIndex)
		this.setState({ index: nextIndex })
	}
	
	goTo( index ) {
		
		this.setState({ index })
	}
	
	componentDidUpdate( prevProps, prevState, snapshot ) {
		let { autoScroll, defaultIndex = 0 }               = this.props,
		    { index = this.props.defaultIndex, step, dec } = this.state;
		
		if ( prevState.dec !== dec ) {
			this.scrollTo(this._getAxis("scrollX").scrollPos + dec - prevState.dec, 0, "scrollX");
		}
		if ( prevState.index !== index ) {
			if ( this._wasUserSnap ) {
				this._wasUserSnap = false;
			}
			else {
				this.scrollTo(dec + step * index + 100, 500, "scrollX");
			}
			if ( autoScroll ) {
				clearTimeout(this._updater);
				this._updater = setTimeout(
					tm => this.goNext(),
					autoScroll
				)
			}
		}
	}
	
	componentWillUnmount() {
		clearTimeout(this._updater);
	}
	
	static getDerivedStateFromProps( props, state ) {
		let {
			    defaultIndex = 0,
			    visibleItems = 5,
			    overlaps     = 1 / (visibleItems - (visibleItems % 2)),
			    children: _childs,
			    defaultEntering, defaultLeaving
		    }                        = props,
		    children                 = is.array(_childs) ? _childs : [],
		    { index = defaultIndex } = state,
		    allItems                 = [...children, ...children, ...children].map(( elem, i ) => React.cloneElement(elem, { key: i })),
		    nbGhostItems             = allItems.length,
		    step                     = 100 * overlaps,
		    dec                      = children.length * step;
		
		return {
			allItems,
			nbGhostItems,
			nbItems   : children.length,
			step,
			dec,
			tweenLines: allItems.map(( e, i ) => ({
				scrollX: tweenTools.offset(
					[
						...defaultEntering,
						...tweenTools.offset(defaultLeaving, 100)
					],
					i * step
				)
			})),
			windowSize: children.length * step,
			index
		}
	}
	
	render() {
		let {
			    defaultIndex = 0,
			    defaultInitial,
			    onClick
		    }                                                                                = this.props,
		    { index = defaultIndex, allItems, nbGhostItems, step, dec, tweenLines, nbItems } = this.state;
		
		//console.log("render", index)
		return (
			<div
				className={ "rSlide slider" }
				style={
					{
						userSelect: "none"
					}
				}
			>
				<TweenAxis
					axe={ "scrollX" }
					defaultPosition={ 100 + dec + index * step }
					size={ nbGhostItems * step + 100 }
					scrollableWindow={ 4 * step }
					inertia={
						{
							shouldLoop: ( v ) => {
								let { windowSize } = this.state;
								if ( v > (100 + windowSize * 2) )
									return -windowSize;
								
								if ( v < (100 + windowSize) )
									return windowSize;
							},
							willSnap  : ( i, v ) => {
								let { nbItems }   = this.state;
								this._wasUserSnap = true;
								this.setState({ index: (i) % nbItems })
								//console.log(i % nbItems, v)
							},
							value     : 100 + dec + index * step,
							wayPoints : allItems.map(( child, i ) => ({ at: 100 + i * step }))
						}
					}
				/>
				{
					allItems.map(
						( Child, i ) =>
							<TweenRef
								key={ i }
								initial={
									defaultInitial
								}
								tweenLines={
									tweenLines[i]
								}
							>
								<div className={ "slide" } onClick={ onClick && (e => onClick(e, i % nbItems, this)) }>
									{ Child }
								</div>
							</TweenRef>
					)
				}
			</div>
		);
	}
};