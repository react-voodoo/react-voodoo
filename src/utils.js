/*
 *
 * Copyright (C) 2019 Nathan Braun
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

var
	is       = require('is'),
	floatCut = function ( v, l ) {
		var p = Math.pow(10, l);
		return Math.round(v * p) / p;
	},
	min      = Math.min,
	max      = Math.max,
	Dom      = {
		prefix      : (/webkit/i).test(navigator.appVersion) ? 'webkit' :
		              (/firefox/i).test(navigator.userAgent) ? 'Moz' :
		              (/trident/i).test(navigator.userAgent) ? 'ms' :
		              'opera' in window ? 'O' : '',
		dashedPrefix: (/webkit/i).test(navigator.appVersion) ? '-webkit-' :
		              (/firefox/i).test(navigator.userAgent) ? '-moz-' :
		              (/trident/i).test(navigator.userAgent) ? '-ms-' :
		              'opera' in window ? '-o-' : ''
	}
;


export default {
	
	addWheelEvent: (function ( window, document ) {
		
		var prefix = "", _addEventListener, _rmEventListener, onwheel, support;
		
		// detect event model
		if ( window.addEventListener ) {
			_addEventListener = "addEventListener";
			_rmEventListener  = "removeEventListener";
		}
		else {
			_addEventListener = "attachEvent";
			_rmEventListener  = "detachEvent";
			prefix            = "on";
		}
		
		// detect available wheel event
		support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
		          document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
		          "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox
		
		const addWheelListener = function ( elem, callback, scope, useCapture ) {
			_addWheelListener(elem, support, callback, scope, useCapture);
			
			// handle MozMousePixelScroll in older Firefox
			if ( support == "DOMMouseScroll" ) {
				_addWheelListener(elem, "MozMousePixelScroll", callback, scope, useCapture);
			}
		};
		// Reasonable defaults
		var PIXEL_STEP         = 10;
		var LINE_HEIGHT        = 40;
		var PAGE_HEIGHT        = 800;
		
		function normalizeWheel( /*object*/ event ) /*object*/ {
			var sX = 0, sY = 0,       // spinX, spinY
			    pX         = 0, pY = 0;       // pixelX, pixelY
			
			// Legacy
			if ( 'detail' in event ) {
				sY = event.detail;
			}
			if ( 'wheelDelta' in event ) {
				sY = -event.wheelDelta / 120;
			}
			if ( 'wheelDeltaY' in event ) {
				sY = -event.wheelDeltaY / 120;
			}
			if ( 'wheelDeltaX' in event ) {
				sX = -event.wheelDeltaX / 120;
			}
			
			// side scrolling on FF with DOMMouseScroll
			if ( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
				sX = sY;
				sY = 0;
			}
			
			pX = sX * PIXEL_STEP;
			pY = sY * PIXEL_STEP;
			
			if ( 'deltaY' in event ) {
				pY = event.deltaY;
			}
			if ( 'deltaX' in event ) {
				pX = event.deltaX;
			}
			
			if ( (pX || pY) && event.deltaMode ) {
				if ( event.deltaMode == 1 ) {          // delta in LINE units
					pX *= LINE_HEIGHT;
					pY *= LINE_HEIGHT;
				}
				else {                             // delta in PAGE units
					pX *= PAGE_HEIGHT;
					pY *= PAGE_HEIGHT;
				}
			}
			
			// Fall-back if spin cannot be determined
			if ( pX && !sX ) {
				sX = (pX < 1) ? -1 : 1;
			}
			if ( pY && !sY ) {
				sY = (pY < 1) ? -1 : 1;
			}
			
			return {
				spinX : sX,
				spinY : sY,
				pixelX: pX,
				pixelY: pY
			};
		}
		
		function _addWheelListener( elem, eventName, callback, scope, useCapture ) {
			elem[_addEventListener](prefix + eventName, callback._wheelList = function ( originalEvent ) {
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
					},
					normalized    : normalizeWheel(originalEvent)
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
		
		return addWheelListener;
	})(window, document),
	rmWheelEvent : (function ( window, document ) {
		
		var prefix = "", _rmEventListener, onwheel, support;
		
		// detect event model
		if ( addEventListener ) {
			_rmEventListener = "removeEventListener";
		}
		else {
			_rmEventListener = "detachEvent";
			prefix           = "on";
		}
		
		// detect available wheel event
		support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
		          document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
		          "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox
		
		let rmWheelListener = function ( elem, callback, scope, useCapture ) {
			_EventListener(elem, support, callback, scope, useCapture);
			
			// handle MozMousePixelScroll in older Firefox
			if ( support == "DOMMouseScroll" ) {
				_EventListener(elem, "MozMousePixelScroll", callback, scope, useCapture);
			}
		};
		
		function _EventListener( elem, eventName, callback, scope, useCapture ) {
			elem[_rmEventListener](prefix + eventName, callback._wheelList);
		}
		
		return rmWheelListener;
	})(window, document),
	mapInBoxCSS  : function ( pos, css, box, units, offset ) {
		
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
		
		if ( is.number(pos.opacity) )
			css.opacity = min(1, max(0, floatCut(pos.opacity, 2)));
		
		css.transform = t;
		
		is.number(pos._width) && (css.width = (pos._width) * (box.x || 0) + 'px');
		is.number(pos._height) && (css.height = (pos._height) * (box.y || 0) + 'px');
		
		is.number(pos.width) && (css.width = (pos.width) + (units && units.x || 'px'));
		is.number(pos.height) && (css.height = (pos.height) + (units && units.y || 'px'));
		
		is.number(pos.zIndex) && (css.zIndex = pos.zIndex);
	},
}