/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */

/**
 * Old school dom stuff
 */
var
	is                 = require('is'),
	merge              = require('merge'),
	floatCut           = function ( v, l ) {
		var p = Math.pow(10, l);
		return Math.round(v * p) / p;
	},
	slice              = Array.prototype.slice,
	splice             = Array.prototype.splice,
	abs                = Math.abs,
	floor              = Math.floor,
	round              = Math.round,
	min                = Math.min,
	max                = Math.max,
	objBuilder         = ({}).constructor,
	_createElementAttr = { style: true, tagName: true, content: true, cls: true, events: true, $id: true },
	_defaultUnits      = { width: 'px', height: 'px', top: 'px' }, __;

/**
 * @class K.Dom
 * @param arg0
 * @returns {*}
 * @constructor
 */
	//define('Dom', function () {
var Browser    = {
		// stacks de request animation frames
		_: {
			__rafStack          : [],
			__rafStackSW        : [],
			__rafThreadIsRunning: false,
			_Frames             : [],
			__lastTm            : 0,
			__originalRAF       : window.requestAnimationFrame
				|| window.webkitRequestAnimationFrame
				|| window.mozRequestAnimationFrame
				|| window.oRequestAnimationFrame
				|| window.msRequestAnimationFrame
				||
				setTimeout,
			__originalCAF       : window.cancelRequestAnimationFrame
				|| window.webkitCancelAnimationFrame
				|| window.webkitCancelRequestAnimationFrame
				|| window.mozCancelRequestAnimationFrame
				|| window.oCancelRequestAnimationFrame
				|| window.msCancelRequestAnimationFrame
				|| clearTimeout
		},
		
		
		requestAnimationFrame: function ( fn ) {
			var t2, t;
			Browser._.__rafStack.push(fn);
			if ( !Browser._.raf_desc ) {
				t2 = Date.now();
				
				t                  = t2 - Browser._.raf_tm;
				Browser._.raf_desc = Browser._.__originalRAF.call(window, Browser.runRAFStack);
			}
		},
		
		/**
		 * The real animation frame function
		 * @private
		 * @return {*}
		 */
		runRAFStack    : function run( t2 ) {// @todo : fix potential ios not launching anim bug
			var s, m, tm, t;
			if ( !Browser._.__rafStack.length ) {
				Browser._.__originalCAF.call(window, Browser._.raf_desc);
				Browser._.raf_desc = null;
				return Browser._.__rafThreadIsRunning = false;
			}
			else if ( !Browser._.__rafThreadIsRunning ) {
				Browser._.raf_tm               = t2 - 1;
				Browser._.__rafThreadIsRunning = true;
			}
			
			t = t2 - Browser._.raf_tm;
			
			
			s                      = Browser._.__rafStack;
			Browser._.__rafStack   = Browser._.__rafStackSW;
			Browser._.__rafStackSW = s;
			
			while ( s.length ) {
				(s.shift())(t);
			}
			
			Browser._.raf_tm   = t2;
			Browser._.raf_desc = Browser._.__originalRAF.call(window, run);
		},
		haveTouchEvents: function haveTouchEvents() {
			if ( typeof this._.isTouchDevice == 'boolean' ) return this._.isTouchDevice;
			var deviceAgent      = navigator.userAgent.toLowerCase();
			this._.isTouchDevice = 'ontouchstart' in window // works on most browsers
				|| 'onmsgesturechange' in window ||
				(deviceAgent.match(/(iphone|ipod|ipad)/) ||
					deviceAgent.match(/(android)/) ||
					deviceAgent.match(/(iemobile)/) ||
					deviceAgent.match(/iphone/i) ||
					deviceAgent.match(/ipad/i) ||
					deviceAgent.match(/ipod/i) ||
					deviceAgent.match(/blackberry/i) ||
					deviceAgent.match(/bada/i));
			return this._.isTouchDevice = this._.isTouchDevice && true || false;
		},
		have3dTransform: function has3d() {
			if ( typeof this._.have3dTransform == 'boolean' ) return this._.have3dTransform;
			var el         = document.createElement('p'),
			    has3d,
			    transforms = {
				    'webkitTransform': '-webkit-transform',
				    'OTransform'     : '-o-transform',
				    'msTransform'    : '-ms-transform',
				    'MozTransform'   : '-moz-transform',
				    'transform'      : 'transform'
			    };
			
			// Add it to the body to get the computed style.
			document.body.insertBefore(el, null);
			
			for ( var t in transforms ) {
				if ( el.style[t] !== undefined ) {
					el.style[t] = "translate3d(1px,1px,1px)";
					has3d       = window.getComputedStyle(el).getPropertyValue(transforms[t]);
				}
			}
			
			document.body.removeChild(el);
			
			return this._.have3dTransform = (has3d && has3d.length > 0 && has3d !== "none");
		}
	},
    Dom        =
	    {
		    // Dom / html
		    createElement: function () {
			    var argz  = slice.call(arguments, 0),
			        _tag  = is.string(argz[0]) && argz.shift() || argz[0].tagName || 'div',
			        _opt  = argz[0] && argz.shift() || {},
			        _refs = argz[0] || null;
			    return __._createElement(_tag, _opt, _refs);
		    },
		    // Dom / html
		    appendContent: function ( parent, content, refs ) {
			    //var argz = slice.call(arguments, 0),
			    //    _tag = is.string(argz[0]) && argz.shift() || argz[0].tagName || 'div',
			    //    _opt = argz[0] && argz.shift() || {},
			    //    _refs = argz[0] || null;
			    return __._createElement(null, { content: content }, refs, parent);
		    },
		
		
		    mapInBoxCSS: function ( pos, css, box, units, offset ) {// @todo : rewrite or use npm
			
			    //if ( is.number(pos.x) || is.number(pos.y))
			    var t = '';
			    if ( is.number(pos._z) || is.number(pos._x) || is.number(pos._y) || is.number(pos.z) ||
				    is.number(pos.x) || is.number(pos.y) )
				    t = 'translate3d(' +
					    floatCut((pos._x || 0) * (box.x || 0) + (pos.x || 0) + (offset && offset.x || 0), 2) +
					    (units && units.x || 'px') + ', ' +
					    floatCut((pos._y || 0) * (box.y || 0) + (pos.y || 0) + (offset && offset.y || 0), 2) +
					    (units && units.y || 'px') + ', ' +
					    floatCut((pos._z || 0) * (box.z || 0) + (pos.z || 0) + (offset && offset.z || 0), 2) +
					    (units && units.z || 'px') + '' +
					    ')';
			
			    //@todo matrix
			    if ( pos.rotate && is.number(pos.rotate) )
				    t += ' rotate(' + floatCut((pos.rotate || 0) % 360, 2) + 'deg)';
			    if ( pos.rotateX && is.number(pos.rotateX) )
				    t += ' rotateX(' + floatCut((pos.rotateX || 0) % 360, 2) + 'deg)';
			    if ( pos.rotateY && is.number(pos.rotateY) )
				    t += ' rotateY(' + floatCut((pos.rotateY || 0) % 360, 2) + 'deg)';
			
			    if ( is.number(pos.alpha) )
				    css.opacity = min(1, max(0, floatCut(pos.alpha, 2)));
			
			    css.transform = t;
			
			    is.number(pos._width) && (css.width = (pos._width) * (box.x || 0) + 'px');
			    is.number(pos._height) && (css.height = (pos._height) * (box.y || 0) + 'px');
			
			    is.number(pos.width) && (css.width = (pos.width) + (units && units.x || 'px'));
			    is.number(pos.height) && (css.height = (pos.height) + (units && units.y || 'px'));
			
			    is.number(pos.zIndex) && (css.zIndex = pos.zIndex);
		    },
		
		
		    mapCSS: function ( pos, css, units ) {// @todo : polymorphik hashmap is bad
			
			    //if ( is.number(pos.x) || is.number(pos.y))
			    var t = '';
			    if ( is.number(pos.z) || is.number(pos.x) || is.number(pos.y) )
				    t = 'translate3d(' +
					    (pos.x || 0) + 'px, ' +
					    (pos.y || 0) + 'px, ' +
					    (pos.z || 0) + 'px)';
			    //if ( is.number(pos._z) || is.number(pos._x) || is.number(pos._y) )
			    //    t = 'translate3d(' +
			    //    (pos._x || 0) * 100 + '%, ' +
			    //    (pos._y || 0) * 100 + '%, ' +
			    //    (pos._z || 0) * 100 + '%)';
			    //console.log(pos);
			
			    //@todo matrix
			    if ( pos.rotate && is.number(pos.rotate) )
				    t += ' rotate(' + floatCut((pos.rotate || 0) % 360, 2) + 'deg)';
			    if ( pos.rotateX && is.number(pos.rotateX) )
				    t += ' rotateX(' + floatCut((pos.rotateX || 0) % 360, 2) + 'deg)';
			    if ( pos.rotateY && is.number(pos.rotateY) )
				    console.log(t += ' rotateY(' + floatCut((pos.rotateY || 0) % 360, 2) + 'deg)');
			
			    if ( is.number(pos.alpha) )
				    css.opacity = min(1, max(0, pos.alpha));
			
			    css.transform = t;
			
			    is.number(pos.width) && (css.width = (pos.width) + (units && units.x || 'px'));
			    is.number(pos.height) && (css.height = (pos.height) + (units && units.x || 'px'));
			
			    is.number(pos.zIndex) && (css.zIndex = pos.zIndex);
		    },
		
		
		    mapFromAttributes: function ( node, match, upcase ) {
			    var map = {}, key;
			    match   = match || /^(.*)$/;
			    for ( var a = 0; a < node.attributes.length; a++ )
				    if ( (key = node.attributes.item(a).name.match(match)) && key )
					    map[upcase && key[1].toUpperCase() || key[1]] = node.attributes.item(a).value;
			    return map;
		    },
		    mapToAttributes  : function ( node, map ) {
			    for ( var o in map )
				    map.hasOwnProperty(o)
				    && this.addAttribute(node, o, map[o])
			    return node;
		    },
		    addAttribute     : function ( node, attr, value ) {
			    attr       = document.createAttribute(attr);
			    attr.value = value;
			    node.setAttributeNode(attr);
			    return attr;
		    },
		
		    getParentWithCls  : function ( node, cls ) {// @todo
			    return this.haveCls(node, cls) && node
				    || (node.parentNode && node.parentNode !== document.body) &&
				    this.getParentWithCls(node.parentNode, cls)
				    || false;
		    },
		    haveCls           : function ( node, cls ) {// @todo
			    return (new RegExp("(^|\\s)" + cls.trim() + "(\\s|$)")).test(node.className);
		    },
		    addCls            : function ( node, cls ) {
			    if ( cls instanceof Array )
				    for ( var i in cls ) this.addCls(node, cls[i]);
			    else if ( !this.haveCls(node, cls) )
				    node.className += ' ' + cls;
		    },
		    rmCls             : function ( node, cls ) {
			
			    if ( cls instanceof Array )
				    for ( var i in cls ) this.rmCls(node, cls[i]);
			    else if ( this.haveCls(node, cls) )
				    node.className = node.className.replace(//@todo
				                                            new RegExp("(?:^|\\s+)" + cls.trim() + "(?:\\s+|$)"),
				                                            ' '
				    );
			
		    },
		    addEvent          : function ( node, type, fn, scope, bubble ) {
			    var desc;
			    if ( is.object(type) ) {
				    for ( var o in type )
					    if ( type.hasOwnProperty(o) )
						    this.addEvent(node, o, type[o], fn);
				    return;
			    }
			    else if ( type == 'dragstart' ) {
				    __.getDraggable(node).dragstart.push([fn, scope]);
				
				
			    }
			    else if ( type == 'drag' ) {
				
				    __.getDraggable(node).drag.push([fn, scope]);
				
				
			    }
			    else if ( type == 'dropped' ) {
				
				    __.getDraggable(node).dropped.push([fn, scope]);
				
			    }
			    else {
				    if ( node.addEventListener ) {
					    node.addEventListener(type, fn, bubble);
				    }
				    else if ( node.attachEvent ) {
					    node.attachEvent('on' + type,
					                     fn.related = function ( e ) {
						                     return fn.call(node, e);
					                     });
				    }
			    }
			
		    },
		    removeEvent       : function ( node, type, fn, scope, bubble ) {
			    var i, desc;
			
			    if ( is.object(type) ) {
				    for ( var o in type )
					    if ( type.hasOwnProperty(o) )
						    this.removeEvent(node, o, type[o], scope);
				
			    }
			    else if ( /^(drag|drop)/.test(type) ) {
				    desc = __.getDraggable(node);
				    __.rmFnScopePair(desc[type], fn, scope);
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
		    offset            : function ( elem ) {// @todo
			    var dims = { top: 0, left: 0, width: elem.offsetWidth, height: elem.offsetHeight };
			    while ( elem ) {
				    dims.top  = dims.top + parseInt(elem.offsetTop);
				    dims.left = dims.left + parseInt(elem.offsetLeft);
				    elem      = elem.offsetParent;
			    }
			    return dims;
		    },
		    applyCssTransition: function ( node, from, to, tm, cb ) {
			    tm      = tm || 500;
			    var me  = this, stm,
			        evt = function evt() {
				        clearTimeout(stm);
				        me.applyCss(node, { transition: null });
				        me.removeEvent(node, 'transitionend', evt);
				        requestAnimationFrame(function () {
					
					        me.applyCss(node, to);
					        cb && cb(node);
				        });
				
			        },
			        tmp = '',
			        o   = ' ' + tm + 'ms';
			    for ( var i in to ) {
				    if ( from[i] !== to[i] ) {
					    tmp += (
						    (this.prefixedProperties[i] ? this.dashedPrefix : '')
						    + i
					    ) + o + ', ';
				    }
			    }
			
			    me.applyCss(node, { transition: null });
			    me.applyCss(node, from);
			    requestAnimationFrame(function () {
				    me.applyCss(node, { transition: tmp });
				    me.addEvent(node, 'transitionend', evt);
				    me.applyCss(node, to);
				    stm = setTimeout(evt, tm * 1.1);
			    });
		    },
		    applyCssAnim      : function ( node, id, tm, cb ) {
			    tm      = tm || 500;
			    var me  = this, stm,
			        evt = function evt( e ) {
				        if ( e && e.target !== node ) {
					        return;
				        }
				        clearTimeout(stm);
				        me.applyCss(node, { animation: null });
				
				        me.removeEvent(node, 'webkitAnimationEnd', evt);
				        me.removeEvent(node, 'oAnimationEnd', evt);
				        me.removeEvent(node, 'animationend', evt);
				        cb && cb(node);
			        };
			
			    me.addEvent(node, 'webkitAnimationEnd', evt);
			    me.addEvent(node, 'oAnimationEnd', evt);
			    me.addEvent(node, 'animationend', evt);
			
			    me.applyCss(node, { animation: id + " " + (tm / 1000) + "s forwards" });
			
			    stm = setTimeout(evt, tm * 1.1);
		    },
		    addWheelEvent     : (function ( window, document ) {
			
			    var prefix = "", _addEventListener, onwheel, support;
			
			    // detect event model
			    if ( window.addEventListener ) {
				    _addEventListener = "addEventListener";
			    }
			    else {
				    _addEventListener = "attachEvent";
				    prefix            = "on";
			    }
			
			    // detect available wheel event
			    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
			              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
			              "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox
			
			    window.addWheelListener = function ( elem, callback, scope, useCapture ) {
				    _addWheelListener(elem, support, callback, scope, useCapture);
				
				    // handle MozMousePixelScroll in older Firefox
				    if ( support == "DOMMouseScroll" ) {
					    _addWheelListener(elem, "MozMousePixelScroll", callback, scope, useCapture);
				    }
			    };
			
			    function _addWheelListener( elem, eventName, callback, scope, useCapture ) {
				    elem[_addEventListener](prefix + eventName, function ( originalEvent ) {
					    !originalEvent && (originalEvent = window.event);
					
					    // create a normalized event object
					    var event = {
						    // keep a ref to the original event object
						    originalEvent : originalEvent,
						    target        : originalEvent.target || originalEvent.srcElement,
						    type          : "wheel",
						    deltaMode     : originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
						    deltaX        : 0,
						    delatZ        : 0,
						    preventDefault: function () {
							    originalEvent.preventDefault ?
							    originalEvent.preventDefault() :
							    originalEvent.returnValue = false;
						    }
					    };
					
					    // calculate deltaY (and deltaX) according to the event
					    if ( support == "mousewheel" ) {
						    event.deltaY = -1 / 40 * originalEvent.wheelDelta;
						    // Webkit also support wheelDeltaX
						    //                            originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 *
						    // originalEvent.wheelDeltaX );
					    }
					    else if ( support == "wheel" && Dom.prefix == "Moz" ) {
						    event.deltaY = originalEvent.deltaY / 3;
					    }
					    else if ( support == "wheel" ) {
						    event.deltaY = originalEvent.deltaY / 100;
					    }
					    else {
						    event.deltaY = originalEvent.deltaY;
					    }
					    //                        if (typeof originalEvent.wheelDeltaY !== 'number')
					    //                            event.wheelDeltaY = originalEvent.deltaY/100;
					
					    //                        event.wheelDelta = deltaY*120;
					
					    // it's time to fire the callback
					    return callback.call(scope || this, event);
					
				    }, useCapture || false);
			    }
			
			    return window.addWheelListener;
		    })(window, document),
		    pageVisibility    : (function () {
			    var pe = {
				    visible     : true,
				    _onPageShown: [
					    [],
					    []
				    ],
				    _onPageHided: [
					    [],
					    []
				    ],
				    follow      : function ( type, fn, scope ) {// @todo
					    if ( type == 'blurred' ) {
						    __onPageHided[0].push(fn);
						    __onPageHided[1].push(scope);
					    }
					    else if ( type == 'focused' ) {
						    __onPageShown[0].push(fn);
						    __onPageShown[1].push(scope);
					    }
				    },
				    unFollow    : function ( type, fn, scope ) {
					    var i;
					    if ( type == 'blurred' ) {
						    if ( -1 === (i = __onPageHided[0].indexOf(fn)) ) return;
						    __onPageHided[0].splice(i, 1);
						    __onPageHided[1].splice(i, 1);
					    }
					    else if ( type == 'focused' ) {
						    if ( -1 === (i = __onPageShown[0].indexOf(fn)) ) return;
						    __onPageShown[0].splice(i, 1);
						    __onPageShown[1].splice(i, 1);
					    }
				    }
			    };
			
			    function onBlur() {
				    pe.visible = false;
				    for ( var i = 0, ln = pe._onPageHided[0].length; i < ln; i++ )
					    pe._onPageHided[0][i].apply(pe._onPageHided[1][i]);
			    };
			
			    function onFocus() {
				    pe.visible = true;
				    for ( var i = 0, ln = pe._onPageShown[0].length; i < ln; i++ )
					    pe._onPageShown[0][i].apply(pe._onPageShown[1][i]);
			    };
			    if ( /*@cc_on!@*/false ) { // check for Internet Explorer
				    document.onfocusin  = onFocus;
				    document.onfocusout = onBlur;
			    }
			    else {
				    window.onfocus = onFocus;
				    window.onblur  = onBlur;
			    }
			
			    return pe;
		    })(),
		    applyCss          : function ( node, style ) {
			    for ( var p in style )
				    if ( this.prefix && this.prefixedProperties[p] )
					    node.style[this.prefix + this.prefixedProperties[p]] = style[p];
				    else
					    node.style[p] = style[p];
		    },
		    prefixedProperties: {
			    'userSelect'              : 'UserSelect',
			    'transform'               : 'Transform',
			    'filter'                  : 'Filter',
			    'transformOrigin'         : 'TransformOrigin',
			    // 'perspective'              : 'Perspective',
			    'transformStyle'          : 'TransformStyle',
			    'transition'              : 'Transition',
			    'transitionProperty'      : 'TransitionProperty',
			    'transitionDuration'      : 'TransitionDuration',
			    'transitionTimingFunction': 'TransitionTimingFunction',
			    'transitionDelay'         : 'TransitionDelay',
			    'animation'               : 'Animation',
			    'animationName'           : 'AnimationName',
			    'animationDuration'       : 'AnimationDuration',
			    'animationIterationCount' : 'AnimationIterationCount',
			    'animationDirection'      : 'AnimationDirection',
			    'animationTimingFunction' : 'AnimationTimingFunction',
			    'animationDelay'          : 'AnimationDelay'
		    },
		    prefix            : (/webkit/i).test(navigator.appVersion) ? 'webkit' :
		                        (/firefox/i).test(navigator.userAgent) ? 'Moz' :
		                        (/trident/i).test(navigator.userAgent) ? 'ms' :
		                        'opera' in window ? 'O' : '',
		    dashedPrefix      : (/webkit/i).test(navigator.appVersion) ? '-webkit-' :
		                        (/firefox/i).test(navigator.userAgent) ? '-moz-' :
		                        (/trident/i).test(navigator.userAgent) ? '-ms-' :
		                        'opera' in window ? '-o-' : ''
		    ,
		
		
		    Browser: Browser
	    };
//);
module.exports = Dom;
__             = {
	onPageHided      : [],
	onPageShown      : [],
	dragging         : [],
	dragEnabled      : [],
	dragEnabledDesc  : [],
	fingers          : {},
	nbFingers        : 0,
	dragstartAnywhere: function ( e ) {
		var o,
		    me            = __,
		    i             = me.dragEnabled.indexOf(this),
		    finger,
		    desc, fingers = [];
		
		if ( i === -1 ) return true;
		
		if ( !me.nbFingers ) {
			Dom.addEvent(document,
			             {
				             'touchmove': me.dragAnywhere,
				             'mousemove': me.dragAnywhere,
				             'touchend' : me.dropAnywhere,
				             'mouseup'  : me.dropAnywhere
			             });
		}
		
		if ( e.changedTouches && e.changedTouches.length ) {
			fingers = e.changedTouches
		}
		else fingers.push(e);
		
		for ( var t = 0, ln = fingers.length; t < ln; t++ ) {
			finger = fingers[t];
			
			
			desc = me.dragEnabledDesc[i];
			
			if ( desc.nbFingers ) continue;
			
			me.nbFingers++;
			
			me.fingers[finger.identifier] = desc;
			
			
			desc.nbFingers++;
			
			desc._startPos.x = Dom.prefix == 'MS' ? finger.x : finger.pageX;
			desc._startPos.y = Dom.prefix == 'MS' ? finger.y : finger.pageY;
			
			if ( !desc ) continue;
			
			desc._lastPos.x = Dom.prefix == 'MS' ? finger.x : finger.pageX;
			desc._lastPos.y = Dom.prefix == 'MS' ? finger.y : finger.pageY;
			
			for ( o = 0; o < desc.dragstart.length; o++ )
				desc.dragstart[o][0].call(desc.dragstart[o][1] ||
					                          this, e, finger, desc);
		}
	},
	dragAnywhere     : function ( e ) {
		var o,
		    me              = __,
		    finger, fingers = [],
		    desc            = __.dragging[0];
		
		
		if ( e.changedTouches && e.changedTouches.length ) {
			fingers = e.changedTouches
		}
		else fingers.push(e);
		
		for ( var i = 0, ln = fingers.length; i < ln; i++ ) {
			finger = fingers[i];
			desc   = me.fingers[finger.identifier];
			
			if ( !desc ) continue;
			
			desc._lastPos.x = Dom.prefix == 'MS' ? finger.x : finger.pageX;
			desc._lastPos.y = Dom.prefix == 'MS' ? finger.y : finger.pageY;
			
			for ( o = 0; o < desc.drag.length; o++ ) desc.drag[o][0].call(desc.drag[o][1] || this, e,
			                                                              finger,
			                                                              desc);
			
		}
	},
	dropAnywhere     : function ( e ) {
		var o,
		    me = __, finger, fingers = [],
		    desc;
		
		if ( e.changedTouches && e.changedTouches.length ) {
			fingers = e.changedTouches
		}
		else fingers.push(e);
		
		for ( var i = 0, ln = fingers.length; i < ln; i++ ) {
			finger = fingers[i];
			desc   = me.fingers[finger.identifier];
			
			
			me.fingers[finger.identifier] = null;
			if ( !desc ) continue;
			me.nbFingers--;
			desc.nbFingers--;
			
			desc._lastPos.x = Dom.prefix == 'MS' ? finger.x : finger.pageX;
			desc._lastPos.y = Dom.prefix == 'MS' ? finger.y : finger.pageY;
			
			for ( o = 0; o < desc.dropped.length; o++ )
				desc.dropped[o][0].call(desc.dropped[o][1] ||
					                        this, e,
				                        finger, desc);
			
			
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
	getDraggable     : function ( node ) {
		var i = this.dragEnabled.indexOf(node), desc;
		if ( i === -1 ) {
			i = this.dragEnabled.length;
			this.dragEnabled.push(node);
			this.dragEnabledDesc.push(
				desc = {
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
				             'mousedown' : this.dragstartAnywhere,
				             'touchstart': this.dragstartAnywhere
			             });
		}
		else desc = this.dragEnabledDesc[i];
		return desc;
	},
	freeDraggable    : function ( node ) {
		var i = this.dragEnabled.indexOf(node), desc;
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
	addOverflowEvent : function addFlowListener( element, fn ) {
		
		var type = 'over', flow = type == 'over';
		
		element.addEventListener('OverflowEvent' in window ? 'overflowchanged' : type + 'flow',
		                         function ( e ) {
			                         if ( e.type == (type + 'flow') ||
				                         ((e.orient == 0 && e.horizontalOverflow == flow) ||
					                         (e.orient == 1 && e.verticalOverflow == flow) ||
					                         (e.orient == 2 && e.horizontalOverflow == flow &&
						                         e.verticalOverflow == flow)) ) {
				                         return fn.call(this, e);
			                         }
		                         }, false);
		
	},
	addEvent         : function ( node, type, fn, bubble ) {
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
	removeEvent      : function ( node, type, fn, bubble ) {
		if ( node.removeEventListener ) {
			node.removeEventListener(type, fn, bubble);
		}
		else if ( node.attachEvent ) {
			node.detachEvent('on' + type, fn.related);
		}
	},
	rmFnScopePair    : function ( arr, fn, scope ) {
		for ( var i = 0, ln = arr.length; i < ln; i++ ) {
			if ( arr[i][0] == fn && arr[i][1] == scope )
				return arr.splice(i, 1);
		}
		
		console.warn("Rm event : Listener not found !!");
	},
	_createElement   : function ( tag, opt, refs, parent ) {
		var a, o, i, ln,
		    node = parent || document.createElement(tag);
		
		//if (parent) opt = {content:opt};
		
		if ( opt )
			for ( o in opt )
				if ( opt.hasOwnProperty(o) && opt[o] !== undefined
					&& !_createElementAttr.hasOwnProperty(o) ) {
					a       = document.createAttribute(o);
					a.value = opt[o];
					node.setAttributeNode(a);
				}
		
		refs && opt.$id && (refs[opt.$id] = node);
		
		opt.style && Dom.applyCss(node, opt.style);
		
		opt.cls && Dom.addCls(node, opt.cls);
		
		if ( opt.events ) {
			for ( o in opt.events )
				if ( opt.events.hasOwnProperty(o) && o !== "$scope" )
					Dom.addEvent(node, o, opt.events[o], opt.events.$scope);
		}
		if ( opt.content ) {
			if ( typeof opt.content === 'string' || typeof opt.content[o] == 'number' ) {
				node.innerHTML = opt.content;
			}
			else if ( opt.content instanceof Array ) {
				for ( i = 0, ln = opt.content.length; i < ln; i++ )
					node.appendChild(
						typeof opt.content[i] == 'string' || typeof opt.content[i] == 'number' || !opt.content[i] ?
						document.createTextNode(opt.content[i] || '') :
						isElement(opt.content[i]) ?
						opt.content[i] :
						__createElement(opt.content[i].tagName || 'div', opt.content[i], refs)
					);
			}
			else {
				node.appendChild(
					opt.content instanceof HTMLElement ?
					opt.content : __createElement(
						opt.content.tagName || 'div', opt.content, refs)
				);
			}
		}
		
		return node;
	}
};
//
//})(typeof global === 'undefined' ? window : require('KamehaNS'),
//   (typeof window !== 'undefined') && window,
//   (typeof document !== 'undefined') && document,
//   (typeof navigator !== 'undefined') && navigator
//);
