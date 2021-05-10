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


/**
 * Old school dom utils & events managers
 */

let
    is        = require('is'),
    isBrowser = typeof window !== 'undefined',
    isTouch   = isBrowser && ( function is_touch_device() {
        var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        var mq       = function ( query ) {
            return window.matchMedia && window.matchMedia(query).matches;
        }
        
        if ( ( 'ontouchstart' in window ) || window.DocumentTouch && document instanceof DocumentTouch ) {
            return true;
        }
        
        // include the 'heartz' as a way to have a non matching MQ to help terminate the
        // join https://git.io/vznFH
        var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return mq(query);
    }() ),
    _dom      = isBrowser ? {
        prefix      : ( /webkit/i ).test(navigator.appVersion) ? 'webkit' :
                      ( /firefox/i ).test(navigator.userAgent) ? 'Moz' :
                      ( /trident/i ).test(navigator.userAgent) ? 'ms' :
                      'opera' in window ? 'O' : '',
        dashedPrefix: ( /webkit/i ).test(navigator.appVersion) ? '-webkit-' :
                      ( /firefox/i ).test(navigator.userAgent) ? '-moz-' :
                      ( /trident/i ).test(navigator.userAgent) ? '-ms-' :
                      'opera' in window ? '-o-' : ''
    } : {
        prefix      : '',
        dashedPrefix: ''
    },
    __        = {
        onPageHided      : [],
        onPageShown      : [],
        dragging         : [],
        dragEnabled      : [],
        dragEnabledDesc  : [],
        fingers          : {},
        nbFingers        : 0,
        dragstartAnywhere: function ( e ) {
            let o,
                me            = __,
                i             = me.dragEnabled.indexOf(this),
                finger,
                desc, fingers = [];
            
            if ( i === -1 ) {
                return;
            }
            //e.preventDefault();
            //e.stopPropagation();
            
            if ( !me.nbFingers ) {
                Dom.addEvent(document,
                             {
                                 'touchmove': me.dragAnywhere,
                                 'mousemove': me.dragAnywhere,
                                 'touchend' : me.dropAnywhere,
                                 'mouseup'  : me.dropAnywhere,
                             });
                Dom.addEvent(this,
                             {
                                 'click': me.dropWithoutClick
                             }, null, null, null, true);
            }
            
            if ( e.changedTouches && e.changedTouches.length ) {
                fingers = e.changedTouches
            }
            else fingers.push(e);
            
            for ( let t = 0, ln = fingers.length; t < ln; t++ ) {
                finger = fingers[ t ];
                
                
                desc = me.dragEnabledDesc[ i ];
                
                if ( desc.nbFingers ) continue;
                
                me.nbFingers++;
                
                me.fingers[ finger.identifier ] = me.fingers[ finger.identifier ] || [];
                me.fingers[ finger.identifier ].push(desc);
                
                
                desc.nbFingers++;
                
                desc._startPos.x = _dom.prefix == 'MS' ? finger.x : finger.pageX;
                desc._startPos.y = _dom.prefix == 'MS' ? finger.y : finger.pageY;
                desc._startTs    = e.timeStamp;
                
                
                desc._lastPos.x = _dom.prefix == 'MS' ? finger.x : finger.pageX;
                desc._lastPos.y = _dom.prefix == 'MS' ? finger.y : finger.pageY;
                
                for ( o = 0; o < desc.dragstart.length; o++ )
                    desc.dragstart[ o ][ 0 ].call(desc.dragstart[ o ][ 1 ] ||
                                                  this, e, finger, desc);
            }
        },
        dragAnywhere     : function ( e ) {
            let o,
                me              = __,
                finger, fingers = [], stopped,
                desc            = __.dragging[ 0 ];
            
            
            if ( e.changedTouches && e.changedTouches.length ) {
                fingers = e.changedTouches
            }
            else fingers.push(e);
            
            for ( let i = 0, ln = fingers.length; i < ln; i++ ) {
                finger = fingers[ i ];
                desc   = me.fingers[ finger.identifier ];
                me.fingers[ finger.identifier ] &&
                me.fingers[ finger.identifier ].forEach(
                    desc => {
                        if ( stopped ) {
                            desc._lastPos.x = desc._startPos.x = _dom.prefix == 'MS'
                                                                 ? finger.x
                                                                 : finger.pageX;
                            desc._lastPos.y = desc._startPos.y = _dom.prefix == 'MS'
                                                                 ? finger.y
                                                                 : finger.pageY;
                            return;
                        }
                        desc._lastPos.x = _dom.prefix == 'MS' ? finger.x : finger.pageX;
                        desc._lastPos.y = _dom.prefix == 'MS' ? finger.y : finger.pageY;
                        
                        for ( o = 0; o < desc.drag.length; o++ )
                            stopped = desc.drag[ o ][ 0 ].call(desc.drag[ o ][ 1 ] || this, e,
                                                               finger,
                                                               desc) === false;
                    }
                )
                
            }
        },
        dropWithoutClick : function ( e ) {
            if ( __.preventNextClick ) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                __.preventNextClick = false;
            }
            Dom.removeEvent(this,
                            {
                                'click': this.dropWithoutClick
                            });
        },
        dropAnywhere     : function ( e ) {
            let o,
                me = __, finger, fingers = [],
                prevent;
            
            if ( e.changedTouches && e.changedTouches.length ) {
                fingers = e.changedTouches
            }
            else fingers.push(e);
            
            for ( let i = 0, ln = fingers.length; i < ln; i++ ) {
                finger = fingers[ i ];
                me.nbFingers--;
                me.fingers[ finger.identifier ] &&
                me.fingers[ finger.identifier ].forEach(
                    desc => {
                        
                        
                        desc.nbFingers--;
                        prevent         = prevent || desc.mouseDrag && ( e.timeStamp - desc._startTs > 250 );
                        desc._lastPos.x = _dom.prefix == 'MS' ? finger.x : finger.pageX;
                        desc._lastPos.y = _dom.prefix == 'MS' ? finger.y : finger.pageY;
                        
                        for ( o = 0; o < desc.dropped.length; o++ )
                            desc.dropped[ o ][ 0 ].call(desc.dropped[ o ][ 1 ] ||
                                                        this, e,
                                                        finger, desc);
                        
                        
                    }
                )
                me.fingers[ finger.identifier ] = null;
            }
            if ( prevent ) {
                me.preventNextClick = true;
            }
            if ( !me.nbFingers ) {
                Dom.removeEvent(document,
                                {
                                    'touchmove': me.dragAnywhere,
                                    'mousemove': me.dragAnywhere,
                                    'touchend' : me.dropAnywhere,
                                    'mouseup'  : me.dropAnywhere
                                });
            }
        },
        getDraggable     : function ( node, mouseDrag, touchDrag ) {
            let i = this.dragEnabled.indexOf(node), desc;
            if ( i === -1 ) {
                this.dragEnabled.push(node);
                this.dragEnabledDesc.push(
                    desc = {
                        mouseDrag,
                        touchDrag,
                        nbFingers: 0,
                        locks    : 0,
                        _startPos: {
                            x: 0,
                            y: 0
                        },
                        _lastPos : {
                            x: 0,
                            y: 0
                        },
                        dragstart: [],
                        drag     : [],
                        dragEnd  : [],
                        dropped  : []
                    }
                );
                //debugger;
                Dom.addEvent(node,
                             {
                                 'mousedown' : mouseDrag && this.dragstartAnywhere,
                                 'touchstart': touchDrag && this.dragstartAnywhere
                             }, null, null, null, true);
            }
            else desc = this.dragEnabledDesc[ i ];
            return desc;
        },
        freeDraggable    : function ( node ) {
            let i = this.dragEnabled.indexOf(node), desc;
            if ( i !== -1 ) {
                this.dragEnabled.splice(i, 1);
                this.dragEnabledDesc.splice(i, 1);
                
                Dom.removeEvent(node,
                                {
                                    'mousedown' : this.dragstartAnywhere,
                                    'touchstart': this.dragstartAnywhere
                                });
            }
        },
        
        addEvent   : function ( node, type, fn, bubble ) {
            if ( node.addEventListener ) {
                node.addEventListener(type, fn, bubble);
            }
            else if ( node.attachEvent ) {
                node.attachEvent('on' + type,
                                 fn.related = function ( e ) {
                                     return fn.call(node, e);
                                 });
            }
        },
        removeEvent: function ( node, type, fn, bubble ) {
            if ( node.removeEventListener ) {
                node.removeEventListener(type, fn, bubble);
            }
            else if ( node.attachEvent ) {
                node.detachEvent('on' + type, fn.related);
            }
        },
        rmDragFn   : function ( arr, fn, scope ) {
            for ( let i = 0, ln = arr.length; i < ln; i++ ) {
                if ( arr[ i ][ 0 ] === fn )
                    return arr.splice(i, 1);
            }
            
            console.warn("Rm event : Listener not found !!");
        },
    },
    Dom       = {
        addEvent   : function ( node, type, fn, mouseDrag, touchDrag = true, bubble ) {
            if ( is.object(type) ) {
                for ( let o in type )
                    if ( type.hasOwnProperty(o) && type[ o ] )
                        this.addEvent(node, o, type[ o ], mouseDrag, touchDrag, bubble);
                return;
            }
            else if ( type === 'dragstart' ) {
                __.getDraggable(node, mouseDrag, touchDrag).dragstart.push([fn]);
            }
            else if ( type === 'drag' ) {
                __.getDraggable(node, mouseDrag, touchDrag).drag.push([fn]);
            }
            else if ( type === 'dropped' ) {
                __.getDraggable(node, mouseDrag, touchDrag).dropped.push([fn]);
            }
            else {
                if ( node.addEventListener ) {
                    node.addEventListener(type, fn, { passive: false });
                }
                else if ( node.attachEvent ) {
                    node.attachEvent('on' + type,
                                     fn.related = function ( e ) {
                                         return fn.call(node, e);
                                     });
                }
            }
            
        },
        removeEvent: function ( node, type, fn, scope, bubble ) {
            let i, desc;
            
            if ( is.object(type) ) {
                for ( let o in type )
                    if ( type.hasOwnProperty(o) )
                        this.removeEvent(node, o, type[ o ], scope);
                
            }
            else if ( /^(drag|drop)/.test(type) ) {
                desc = __.getDraggable(node);
                __.rmDragFn(desc[ type ], fn, scope);
                if ( !desc.dragstart.length
                     && !desc.drag.length
                     && !desc.dragEnd.length
                     && !desc.dropped.length )
                    __.freeDraggable(node);
            }
            else {
                if ( node.removeEventListener ) {
                    node.removeEventListener(type, fn, bubble);
                }
                else if ( node.attachEvent ) {
                    node.detachEvent('on' + type, fn.related);
                }
            }
            
        },
        offset     : function ( elem ) {// @todo
            let dims = {
                top   : 0,
                left  : 0,
                width : elem.offsetWidth,
                height: elem.offsetHeight
            };
            while ( elem ) {
                dims.top  = dims.top + parseInt(elem.offsetTop);
                dims.left = dims.left + parseInt(elem.offsetLeft);
                elem      = elem.offsetParent;
            }
            return dims;
        },
        
        
        /**
         * Find the react component that generate element dom node
         * @param element
         * @returns {[React.Component]}
         */
        findReactParents( element ) {
            let fiberNode, comps = [element];
            for ( const key in element ) {
    
                if ( key.startsWith('__reactInternalInstance$') || key.startsWith('__reactFiber$') ) {
                    fiberNode = element[ key ];
                    while ( fiberNode.return ) {
                        if ( fiberNode.stateNode && !comps.includes(fiberNode.stateNode) )
                            comps.push(fiberNode.stateNode)
                        fiberNode = fiberNode.return;
                    }
                    return comps;
                }
            }
            return element.parentNode && this.findReactParents(element.parentNode);
        }
        
    };
export default Dom;