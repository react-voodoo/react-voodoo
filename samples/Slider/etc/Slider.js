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
import is                                           from "is";
import React                                        from "react";
import {asTweener, TweenAxis, TweenRef, tweenTools} from "react-voodoo";

@asTweener({ enableMouseDrag: true })
export default class Slider extends React.Component {
	static defaultProps = {
		defaultIndex   : 0,
		visibleItems   : 4,
		maxJump        : undefined,
		infinite       : false,
		//overlaps       : 1 / 6,
		defaultInitial : {},
		defaultEntering: [],
		defaultLeaving : [],
		scrollY        : [],
		scrollDir      : "scrollX"
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
		let { step, dec, nbItems, scrollDir } = this.state,
		    tweener = this.props.tweener,
		    nextIndex                         = ((nbItems + this.state.index + 1) % nbItems);
		
		if ( this.state.index > nextIndex )
			tweener.scrollTo(dec + 100 - step, 0, scrollDir);
		
		//console.log(nextIndex)
		this.setState({ index: nextIndex })
	}
	
	goTo( index ) {
		
		this.setState({ index })
	}
	
	componentDidUpdate( prevProps, prevState, snapshot ) {
		let { autoScroll, scrollDir, tweener }                      = this.props,
		    { index = this.props.defaultIndex, step, dec } = this.state;
		
		if ( prevState.dec !== dec ) {
			tweener.scrollTo(tweener._getAxis(scrollDir).scrollPos + dec - prevState.dec, 0, scrollDir);
		}
		if ( prevState.index !== index ) {
			if ( this._wasUserSnap ) {
				this._wasUserSnap = false;
			}
			else {
				tweener.scrollTo(dec + step * index + 100, 500, scrollDir);
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
			    visibleItems,
			    overlaps     = 1 / ((visibleItems - (visibleItems % 2)) || 1),
			    children: _childs, scrollDir,
			    defaultEntering, defaultLeaving, scrollY, infinite
		    }                        = props,
		    children                 = is.array(_childs) ? _childs : [],
		    { index = defaultIndex } = state,
		    allItems                 = !infinite
		                               ? [...children]
		                               : [...children, ...children, ...children].map(( elem, i ) => React.cloneElement(elem, { key: i })),
		    nbGhostItems             = allItems.length,
		    step                     = 100 * overlaps,
		    dec                      = infinite ? children.length * step : 0,
		    scrollAxis               = [
			    ...defaultEntering,
			    ...tweenTools.offset(defaultLeaving, 100)
		    ],
		    tweenLines               = allItems.map(( e, i ) => ({
			    [scrollDir]: tweenTools.offset(
				    scrollAxis,
				    i * step
			    )
		    }));
		
		return {
			allItems,
			nbGhostItems,
			nbItems   : children.length,
			step,
			dec,
			tweenLines,
			windowSize: children.length * step,
			index
		}
	}
	
	render() {
		let {
			    defaultIndex = 0,
			    defaultInitial,
			    style        = {},
			    onClick,
			    infinite,
			    maxJump,
			    visibleItems,
			    scrollDir,
			    className    = ""
		    }                                                                                = this.props,
		    { index = defaultIndex, allItems, nbGhostItems, step, dec, tweenLines, nbItems } = this.state;
		
		console.log("render slider", 100 + dec + index * step, tweenLines)
		return (
			<div
				className={"rSlide slider " + className}
				style={
					{
						userSelect: "none",
						...style
					}
				}
			>
				<TweenAxis
					axe={scrollDir}
					defaultPosition={100 + dec + index * step}
					size={nbGhostItems * step + 100}
					scrollableWindow={visibleItems * step}
					
					bounds={
						!infinite && {
							min: 100,
							max: dec + nbGhostItems * step,
						}||undefined
					}
					inertia={
						{
							maxJump,
							shouldLoop: infinite && (( v ) => {
								let { windowSize } = this.state;
								if ( v > (100 + windowSize * 2) )
									return -windowSize;
								
								if ( v < (100 + windowSize) )
									return windowSize;
							}),
							willSnap  : ( i, v ) => {
								let { nbItems }   = this.state;
								this._wasUserSnap = true;
								this.setState({ index: (i) % nbItems })
								//console.log(i % nbItems, v)
							},
							wayPoints : allItems.map(( child, i ) => ({ at: 100 + i * step }))
						}
					}
				/>
				{
					allItems.map(
						( Child, i ) =>
							<TweenRef
								key={i}
								//id={"slider_" + i}
								initial={
									defaultInitial
								}
								tweenLines={
									tweenLines[i]
								}
							>
								<div className={"slide"} onClick={onClick && (e => onClick(e, i % nbItems, this))}>
									{Child}
								</div>
							</TweenRef>
					)
				}
			</div>
		);
	}
};