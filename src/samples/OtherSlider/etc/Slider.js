/*
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
		enteringSteps  : 1,
		leavingSteps   : 1,
		scrollAxis     : [],
		windowSize     : 100,
		scrollDir      : "scrollY"
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
		let { autoScroll, scrollDir } = this.props,
		    { step, dec, nbItems }    = this.state,
		    nextIndex                 = ((nbItems + this.state.index + 1) % nbItems);
		
		if ( this.state.index > nextIndex )
			this.scrollTo(dec + 100 - step, 0, scrollDir);
		
		//console.log(nextIndex)
		this.setState({ index: nextIndex })
	}
	
	goTo( index ) {
		
		this.setState({ index })
	}
	
	componentDidUpdate( prevProps, prevState, snapshot ) {
		let { autoScroll, scrollDir }                      = this.props,
		    { index = this.props.defaultIndex, step, dec } = this.state;
		
		if ( prevState.dec !== dec ) {
			this.scrollTo(this._getAxis(scrollDir).scrollPos + dec - prevState.dec, 0, scrollDir);
		}
		if ( prevState.index !== index ) {
			if ( this._wasUserSnap ) {
				this._wasUserSnap = false;
			}
			else {
				this.scrollTo(dec + step * index + 100, 500, scrollDir);
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
			    overlaps     = 1 / (visibleItems || 1),
			    children: _childs,
			    scrollAxis,
			    enteringSteps,
			    leavingSteps,
			    defaultEntering,
			    defaultLeaving,
			    scrollDir, windowSize,
			    infinite
		    }                        = props,
		    children                 = is.array(_childs) ? _childs : [],
		    { index = defaultIndex } = state,
		    allItems                 = [...children],
		    nbGhostItems             = allItems.length,
		    step                     = windowSize * overlaps,
		    nbClones                 = 0,
		    dec                      = !infinite ? windowSize : 0;
		
		while ( (visibleItems + enteringSteps + leavingSteps) > (nbGhostItems-visibleItems) ) {
			if ( infinite ) {
				allItems.unshift(...children);
				allItems.push(...children);
				dec += windowSize;
			}
			nbGhostItems += children.length * 2;
			nbClones++;
		}
		allItems = allItems.map(( elem, i ) => React.cloneElement(elem, { key: i }))
		
		console.log('InfiniteList::getDerivedStateFromProps:107: ', nbClones);
		return {
			allItems,
			nbGhostItems,
			nbItems   : children.length,
			step,
			dec,
			nbClones,
			tweenLines: allItems.map(( e, i ) => ({
				[scrollDir]: [
					...tweenTools.offset(
						tweenTools.scale(defaultEntering, step * enteringSteps)
						,
						i * step + nbClones * windowSize - (step * enteringSteps) + step
					),
					...tweenTools.offset(
						[
							...tweenTools.scale(scrollAxis, windowSize),
						],
						i * step + nbClones * windowSize
					),
					...tweenTools.offset(
						tweenTools.scale(defaultLeaving, step * leavingSteps)
						,
						i * step + nbClones * windowSize + windowSize
					),
				],
			})),
			windowSize: 100,
			jumpLength: (children.length) * step,
			index
		}
	}
	
	render() {
		let {
			    defaultIndex = 0,
			    defaultInitial,
			    style        = {},
			    onClick,
			    infinite, windowSize,
			    maxJump, enteringSteps,
			    visibleItems, scrollDir,
			    className    = ""
		    }                                                                                                      = this.props,
		    { index = defaultIndex, nbClones, allItems, nbGhostItems, step, dec, tweenLines, nbItems, jumpLength } = this.state;
		
		return (
			<div
				className={"Slider " + className}
				style={
					{
						userSelect: "none",
						...style
					}
				}
			>
				<TweenAxis
					axe={scrollDir}
					defaultPosition={index * step + nbClones * windowSize + dec}
					size={windowSize + 2 * nbClones * windowSize + 2 * windowSize}
					scrollableWindow={visibleItems * step}
					inertia={
						{
							//maxJump,
							shouldLoop: infinite && (( v ) => {
								let { windowSize } = this.state;
								
								if ( Math.round(v) >= (nbClones * windowSize + 3 * windowSize) )
									return -windowSize;
								
								if ( Math.round(v) < (nbClones * windowSize + 2 * windowSize) )
									return windowSize;
							}),
							willSnap  : ( i, v ) => {
								let { nbItems }   = this.state;
								this._wasUserSnap = true;
								//this.setState({ index: (i) % nbItems })
								//console.log(i % nbItems, v)
							},
							//value     : 100 + dec + index * step,
							wayPoints : allItems.map(( child, i ) => ({ at: i * step + dec }))
						}
					}
				/>
				{
					allItems.map(
						( Child, i ) =>
							<TweenRef
								key={i}
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