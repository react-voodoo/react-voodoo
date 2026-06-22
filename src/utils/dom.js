/*
 * @author : Nathanael BRAUN <pp9ping@gmail.com>
 *
 * Copyright 2026 Nathanael BRAUN
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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

            desc = me.dragEnabledDesc[ i ];
            // respect the configured mouse button (Draggable `button` prop) : filtering must
            // happen here, at mousedown time — mousemove events always report e.button = 0,
            // so the drag/dropped callbacks can't reliably filter by themselves
            if ( desc.button != null && e instanceof MouseEvent && e.button !== desc.button ) {
                return;
            }
            //e.preventDefault();
            //e.stopPropagation();

            // Arm/reset on EVERY gesture start — deliberately NOT gated on the finger
            // count: addEventListener dedups identical (type, fn, capture) listeners,
            // and a corrupted count must never be able to disable the click machinery.
            // The flag reset is safe ungated: a click always fires before the next
            // mousedown, so a pending legit suppression can't be cleared early.
            me.preventNextClick = false;
            Dom.addEvent(document,
                         {
                             'touchmove': me.dragAnywhere,
                             'mousemove': me.dragAnywhere,
                             'touchend' : me.dropAnywhere,
                             'mouseup'  : me.dropAnywhere,
                         });
            // one-shot post-drag click interceptor — MUST be capture-phase so it
            // runs before any descendant click handler (slide onClick etc.)
            this.addEventListener('click', me.dropWithoutClick, true);
            
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
            // `this` is the DOM node here — remove with the same capture flag used
            // at registration or the listener silently stays attached
            this.removeEventListener('click', __.dropWithoutClick, true);
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
                // only decrement for fingers we actually tracked — an untracked
                // touchend/mouseup (multitouch extra finger, palm…) must not corrupt
                // the count, or the whole gesture machinery silently breaks
                if ( !me.fingers[ finger.identifier ] )
                    continue;
                me.nbFingers--;
                me.fingers[ finger.identifier ].forEach(
                    desc => {
                        
                        
                        desc.nbFingers--;
                        // NOTE: no duration-based suppression here — a motionless press of any
                        // length is still a click (browser semantics). Suppression is movement-
                        // based only, decided by the dropped consumers via desc.preventClick.
                        desc._lastPos.x = _dom.prefix == 'MS' ? finger.x : finger.pageX;
                        desc._lastPos.y = _dom.prefix == 'MS' ? finger.y : finger.pageY;
                        
                        for ( o = 0; o < desc.dropped.length; o++ )
                            desc.dropped[ o ][ 0 ].call(desc.dropped[ o ][ 1 ] ||
                                                        this, e,
                                                        finger, desc);

                        // consumers (Draggable dropped handler) flag real drags via
                        // desc.preventClick — distance-aware, unlike the time-only
                        // fallback above
                        prevent           = prevent || desc.preventClick;
                        desc.preventClick = false;
                    }
                )
                me.fingers[ finger.identifier ] = null;
            }
            if ( prevent ) {
                me.preventNextClick = true;
            }
            if ( me.nbFingers <= 0 ) {
                me.nbFingers = 0;// self-heal any historical count corruption
                Dom.removeEvent(document,
                                {
                                    'touchmove': me.dragAnywhere,
                                    'mousemove': me.dragAnywhere,
                                    'touchend' : me.dropAnywhere,
                                    'mouseup'  : me.dropAnywhere
                                });
            }
        },
        getDraggable     : function ( node, mouseDrag, touchDrag, button ) {
            let i = this.dragEnabled.indexOf(node), desc;
            if ( i === -1 ) {
                this.dragEnabled.push(node);
                this.dragEnabledDesc.push(
                    desc = {
                        mouseDrag,
                        touchDrag,
                        button,
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
        addEvent   : function ( node, type, fn, mouseDrag, touchDrag = true, bubble, button ) {
            if ( is.object(type) ) {
                for ( let o in type )
                    if ( type.hasOwnProperty(o) && type[ o ] )
                        this.addEvent(node, o, type[ o ], mouseDrag, touchDrag, bubble, button);
                return;
            }
            else if ( type === 'dragstart' ) {
                __.getDraggable(node, mouseDrag, touchDrag, button).dragstart.push([fn]);
            }
            else if ( type === 'drag' ) {
                __.getDraggable(node, mouseDrag, touchDrag, button).drag.push([fn]);
            }
            else if ( type === 'dropped' ) {
                __.getDraggable(node, mouseDrag, touchDrag, button).dropped.push([fn]);
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