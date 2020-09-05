/*
 *   The MIT License (MIT)
 *   Copyright (c) 2020. Nathanael Braun
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import deepEqual from "fast-deep-equal";
import PropTypes from "prop-types";
import React     from 'react';

import TweenerContext from "./TweenerContext";

//@todo : rewrite with hooks
export default class Axis extends React.Component {
    static propTypes = {
        id             : PropTypes.string,
        axe            : PropTypes.string,
        items          : PropTypes.array,
        bounds         : PropTypes.object,
        inertia        : PropTypes.any,
        defaultPosition: PropTypes.number,
        size           : PropTypes.any
    };
    state            = {};
    
    componentWillUnmount() {
        
        if ( this._tweenLines ) {
            Object.keys(this._tweenLines)
                  .forEach(axe => this._previousTweener.rmScrollableAnim(this._tweenLines[ axe ], axe));
            
        }
        delete this._previousTweener;
        delete this._previousScrollable;
    }
    
    render() {
        let {
                children,
                id,
                axe   = id,
                scrollFirst, bounds,
                scrollableWindow, inertia, size, defaultPosition,
                items = [],
            } = this.props;
        return <TweenerContext.Consumer>
            {
                tweener => {
                    if ( !this._previousAxis || this._previousAxis !== axe ) {//....
                        this._previousAxis    = axe;
                        this._previousInertia = inertia;
                        tweener.initAxis(axe, {
                            inertia,
                            size,
                            scrollableWindow,
                            defaultPosition,
                            scrollFirst,
                            scrollableBounds: bounds
                        }, true);
                    }
                    else if ( !this._previousInertia || this._previousInertia !== inertia ) {//....
                        this._previousInertia = inertia;
                        this._previousAxis    = axe;
                        tweener.initAxis(axe, {
                            inertia,
                            size,
                            scrollableWindow,
                            defaultPosition,
                            scrollFirst,
                            scrollableBounds: bounds
                        });
                    }
                    if ( !this._previousTweener || this._previousTweener !== tweener ) {// mk axe not modifiable
                        this._previousTweener && this._lastTL && this._previousTweener.rmScrollableAnim(this._lastTL, this._previousAxis);
                        if ( items.length )
                            this._lastTL = tweener.addScrollableAnim(items, axe, size);
                        this._previousTweener = tweener;
                        this._previousTweens  = items;
                    }
                    else if ( this._previousTweens !== items && !( this._previousTweens && deepEqual(items, this._previousTweens) ) ) {
                        this._lastTL && this._previousTweener && this._previousTweener.rmScrollableAnim(this._lastTL, this._previousAxis);
                        this._lastTL = null;
                        if ( items.length )
                            this._lastTL = tweener.addScrollableAnim(items, axe, size);
                        this._previousTweens = items;
                    }
                    return <React.Fragment/>;
                }
            }
        </TweenerContext.Consumer>;
    }
}