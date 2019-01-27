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
/******/
(function ( modules ) { // webpackBootstrap
	/******/ 	// The module cache
	/******/
	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/
	function __webpack_require__( moduleId ) {
		/******/
		/******/ 		// Check if module is in cache
		/******/
		if ( installedModules[moduleId] ) {
			/******/
			return installedModules[moduleId].exports;
			/******/
		}
		/******/ 		// Create a new module (and put it into the cache)
		/******/
		var module = installedModules[moduleId] = {
			/******/            i      : moduleId,
			/******/            l      : false,
			/******/            exports: {}
			/******/
		};
		/******/
		/******/ 		// Execute the module function
		/******/
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		/******/
		/******/ 		// Flag the module as loaded
		/******/
		module.l = true;
		/******/
		/******/ 		// Return the exports of the module
		/******/
		return module.exports;
		/******/
	}
	
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/
	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/
	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// define getter function for harmony exports
	/******/
	__webpack_require__.d = function ( exports, name, getter ) {
		/******/
		if ( !__webpack_require__.o(exports, name) ) {
			/******/
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
			/******/
		}
		/******/
	};
	/******/
	/******/ 	// define __esModule on exports
	/******/
	__webpack_require__.r = function ( exports ) {
		/******/
		if ( typeof Symbol !== 'undefined' && Symbol.toStringTag ) {
			/******/
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
			/******/
		}
		/******/
		Object.defineProperty(exports, '__esModule', { value: true });
		/******/
	};
	/******/
	/******/ 	// create a fake namespace object
	/******/ 	// mode & 1: value is a module id, require it
	/******/ 	// mode & 2: merge all properties of value into the ns
	/******/ 	// mode & 4: return value when already ns object
	/******/ 	// mode & 8|1: behave like require
	/******/
	__webpack_require__.t = function ( value, mode ) {
		/******/
		if ( mode & 1 ) value = __webpack_require__(value);
		/******/
		if ( mode & 8 ) return value;
		/******/
		if ( (mode & 4) && typeof value === 'object' && value && value.__esModule ) return value;
		/******/
		var ns = Object.create(null);
		/******/
		__webpack_require__.r(ns);
		/******/
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		/******/
		if ( mode & 2 && typeof value != 'string' ) for ( var key in value ) __webpack_require__.d(ns, key, function ( key ) {
			return value[key];
		}.bind(null, key));
		/******/
		return ns;
		/******/
	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/
	__webpack_require__.n = function ( module ) {
		/******/
		var getter = module && module.__esModule ?
			/******/            function getDefault() {
				return module['default'];
			} :
			/******/            function getModuleExports() {
				return module;
			};
		/******/
		__webpack_require__.d(getter, 'a', getter);
		/******/
		return getter;
		/******/
	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/
	__webpack_require__.o = function ( object, property ) {
		return Object.prototype.hasOwnProperty.call(object, property);
	};
	/******/
	/******/ 	// __webpack_public_path__
	/******/
	__webpack_require__.p = "/";
	/******/
	/******/
	/******/ 	// Load entry module and return exports
	/******/
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
	/******/
})
/************************************************************************/
/******/({
	
	         /***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
	/*!******************************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
	 \******************************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		function _arrayWithoutHoles( arr ) {
			if ( Array.isArray(arr) ) {
				for ( var i = 0, arr2 = new Array(arr.length); i < arr.length; i++ ) {
					arr2[i] = arr[i];
				}
				
				return arr2;
			}
		}
		
		module.exports = _arrayWithoutHoles;
		
		/***/
	}),
	
	         /***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
	/*!**********************************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
	 \**********************************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		function _assertThisInitialized( self ) {
			if ( self === void 0 ) {
				throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			}
			
			return self;
		}
		
		module.exports = _assertThisInitialized;
		
		/***/
	}),
	
	         /***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
	/*!***************************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
	 \***************************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		function _classCallCheck( instance, Constructor ) {
			if ( !(instance instanceof Constructor) ) {
				throw new TypeError("Cannot call a class as a function");
			}
		}
		
		module.exports = _classCallCheck;
		
		/***/
	}),
	
	         /***/ "./node_modules/@babel/runtime/helpers/createClass.js":
	/*!************************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
	 \************************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		function _defineProperties( target, props ) {
			for ( var i = 0; i < props.length; i++ ) {
				var descriptor          = props[i];
				descriptor.enumerable   = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ( "value" in descriptor ) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}
		
		function _createClass( Constructor, protoProps, staticProps ) {
			if ( protoProps ) _defineProperties(Constructor.prototype, protoProps);
			if ( staticProps ) _defineProperties(Constructor, staticProps);
			return Constructor;
		}
		
		module.exports = _createClass;
		
		/***/
	}),
	
	         /***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
	/*!***************************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
	 \***************************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		function _defineProperty( obj, key, value ) {
			if ( key in obj ) {
				Object.defineProperty(obj, key, {
					value       : value,
					enumerable  : true,
					configurable: true,
					writable    : true
				});
			}
			else {
				obj[key] = value;
			}
			
			return obj;
		}
		
		module.exports = _defineProperty;
		
		/***/
	}),
	
	         /***/ "./node_modules/@babel/runtime/helpers/get.js":
	/*!****************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/get.js ***!
	 \****************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports, __webpack_require__ ) {
		
		var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
		
		var superPropBase = __webpack_require__(/*! ./superPropBase */ "./node_modules/@babel/runtime/helpers/superPropBase.js");
		
		function _get( target, property, receiver ) {
			if ( typeof Reflect !== "undefined" && Reflect.get ) {
				module.exports = _get = Reflect.get;
			}
			else {
				module.exports = _get = function _get( target, property, receiver ) {
					var base = superPropBase(target, property);
					if ( !base ) return;
					var desc = Object.getOwnPropertyDescriptor(base, property);
					
					if ( desc.get ) {
						return desc.get.call(receiver);
					}
					
					return desc.value;
				};
			}
			
			return _get(target, property, receiver || target);
		}
		
		module.exports = _get;
		
		/***/
	}),
	
	         /***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
	/*!***************************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
	 \***************************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		function _getPrototypeOf( o ) {
			module.exports = _getPrototypeOf = Object.setPrototypeOf
			                                   ? Object.getPrototypeOf
			                                   : function _getPrototypeOf( o ) {
					return o.__proto__ || Object.getPrototypeOf(o);
				};
			return _getPrototypeOf(o);
		}
		
		module.exports = _getPrototypeOf;
		
		/***/
	}),
	
	         /***/ "./node_modules/@babel/runtime/helpers/inherits.js":
	/*!*********************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
	 \*********************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports, __webpack_require__ ) {
		
		var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");
		
		function _inherits( subClass, superClass ) {
			if ( typeof superClass !== "function" && superClass !== null ) {
				throw new TypeError("Super expression must either be null or a function");
			}
			
			subClass.prototype = Object.create(superClass && superClass.prototype, {
				constructor: {
					value       : subClass,
					writable    : true,
					configurable: true
				}
			});
			if ( superClass ) setPrototypeOf(subClass, superClass);
		}
		
		module.exports = _inherits;
		
		/***/
	}),
	
	         /***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
	/*!****************************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
	 \****************************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		function _iterableToArray( iter ) {
			if ( Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]" ) return Array.from(iter);
		}
		
		module.exports = _iterableToArray;
		
		/***/
	}),
	
	         /***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
	/*!******************************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
	 \******************************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		function _nonIterableSpread() {
			throw new TypeError("Invalid attempt to spread non-iterable instance");
		}
		
		module.exports = _nonIterableSpread;
		
		/***/
	}),
	
	         /***/ "./node_modules/@babel/runtime/helpers/objectSpread.js":
	/*!*************************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/objectSpread.js ***!
	 \*************************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports, __webpack_require__ ) {
		
		var defineProperty = __webpack_require__(/*! ./defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
		
		function _objectSpread( target ) {
			for ( var i = 1; i < arguments.length; i++ ) {
				var source  = arguments[i] != null ? arguments[i] : {};
				var ownKeys = Object.keys(source);
				
				if ( typeof Object.getOwnPropertySymbols === 'function' ) {
					ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function ( sym ) {
						return Object.getOwnPropertyDescriptor(source, sym).enumerable;
					}));
				}
				
				ownKeys.forEach(function ( key ) {
					defineProperty(target, key, source[key]);
				});
			}
			
			return target;
		}
		
		module.exports = _objectSpread;
		
		/***/
	}),
	
	         /***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
	/*!**************************************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
	 \**************************************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports, __webpack_require__ ) {
		
		var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
		
		var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
		
		function _possibleConstructorReturn( self, call ) {
			if ( call && (_typeof(call) === "object" || typeof call === "function") ) {
				return call;
			}
			
			return assertThisInitialized(self);
		}
		
		module.exports = _possibleConstructorReturn;
		
		/***/
	}),
	
	         /***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
	/*!***************************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
	 \***************************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		function _setPrototypeOf( o, p ) {
			module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf( o, p ) {
				o.__proto__ = p;
				return o;
			};
			
			return _setPrototypeOf(o, p);
		}
		
		module.exports = _setPrototypeOf;
		
		/***/
	}),
	
	         /***/ "./node_modules/@babel/runtime/helpers/superPropBase.js":
	/*!**************************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/superPropBase.js ***!
	 \**************************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports, __webpack_require__ ) {
		
		var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
		
		function _superPropBase( object, property ) {
			while ( !Object.prototype.hasOwnProperty.call(object, property) ) {
				object = getPrototypeOf(object);
				if ( object === null ) break;
			}
			
			return object;
		}
		
		module.exports = _superPropBase;
		
		/***/
	}),
	
	         /***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
	/*!******************************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
	 \******************************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports, __webpack_require__ ) {
		
		var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");
		
		var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");
		
		var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");
		
		function _toConsumableArray( arr ) {
			return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
		}
		
		module.exports = _toConsumableArray;
		
		/***/
	}),
	
	         /***/ "./node_modules/@babel/runtime/helpers/typeof.js":
	/*!*******************************************************!*\
	 !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
	 \*******************************************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		function _typeof2( obj ) {
			if ( typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ) {
				_typeof2 = function _typeof2( obj ) {
					return typeof obj;
				};
			}
			else {
				_typeof2 = function _typeof2( obj ) {
					return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
					       ? "symbol"
					       : typeof obj;
				};
			}
			return _typeof2(obj);
		}
		
		function _typeof( obj ) {
			if ( typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ) {
				module.exports = _typeof = function _typeof( obj ) {
					return _typeof2(obj);
				};
			}
			else {
				module.exports = _typeof = function _typeof( obj ) {
					return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
					       ? "symbol"
					       : _typeof2(obj);
				};
			}
			
			return _typeof(obj);
		}
		
		module.exports = _typeof;
		
		/***/
	}),
	
	         /***/ "./node_modules/merge/merge.js":
	/*!*************************************!*\
	 !*** ./node_modules/merge/merge.js ***!
	 \*************************************/
	/*! no static exports found */
	/***/ (function ( module, exports, __webpack_require__ ) {
		
		/* WEBPACK VAR INJECTION */
		(function ( module ) {/*!
		 * @name JavaScript/NodeJS Merge v1.2.1
		 * @author yeikos
		 * @repository https://github.com/yeikos/js.merge
		 
		 * Copyright 2014 yeikos - MIT license
		 * https://raw.github.com/yeikos/js.merge/master/LICENSE
		 */
			
			;(function ( isNode ) {
				
				/**
				 * Merge one or more objects
				 * @param bool? clone
				 * @param mixed,... arguments
				 * @return object
				 */
				
				var Public    = function ( clone ) {
					
					return merge(clone === true, false, arguments);
					
				}, publicName = 'merge';
				
				/**
				 * Merge two or more objects recursively
				 * @param bool? clone
				 * @param mixed,... arguments
				 * @return object
				 */
				
				Public.recursive = function ( clone ) {
					
					return merge(clone === true, true, arguments);
					
				};
				
				/**
				 * Clone the input removing any reference
				 * @param mixed input
				 * @return mixed
				 */
				
				Public.clone = function ( input ) {
					
					var output = input,
					    type   = typeOf(input),
					    index, size;
					
					if ( type === 'array' ) {
						
						output = [];
						size   = input.length;
						
						for ( index = 0; index < size; ++index )
							
							output[index] = Public.clone(input[index]);
						
					}
					else if ( type === 'object' ) {
						
						output = {};
						
						for ( index in input )
							
							output[index] = Public.clone(input[index]);
						
					}
					
					return output;
					
				};
				
				/**
				 * Merge two objects recursively
				 * @param mixed input
				 * @param mixed extend
				 * @return mixed
				 */
				
				function merge_recursive( base, extend ) {
					
					if ( typeOf(base) !== 'object' )
						
						return extend;
					
					for ( var key in extend ) {
						
						if ( typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object' ) {
							
							base[key] = merge_recursive(base[key], extend[key]);
							
						}
						else {
							
							base[key] = extend[key];
							
						}
						
					}
					
					return base;
					
				}
				
				/**
				 * Merge two or more objects
				 * @param bool clone
				 * @param bool recursive
				 * @param array argv
				 * @return object
				 */
				
				function merge( clone, recursive, argv ) {
					
					var result = argv[0],
					    size   = argv.length;
					
					if ( clone || typeOf(result) !== 'object' )
						
						result = {};
					
					for ( var index = 0; index < size; ++index ) {
						
						var item = argv[index],
						
						    type = typeOf(item);
						
						if ( type !== 'object' ) continue;
						
						for ( var key in item ) {
							
							if ( key === '__proto__' ) continue;
							
							var sitem = clone ? Public.clone(item[key]) : item[key];
							
							if ( recursive ) {
								
								result[key] = merge_recursive(result[key], sitem);
								
							}
							else {
								
								result[key] = sitem;
								
							}
							
						}
						
					}
					
					return result;
					
				}
				
				/**
				 * Get type of variable
				 * @param mixed input
				 * @return string
				 *
				 * @see http://jsperf.com/typeofvar
				 */
				
				function typeOf( input ) {
					
					return ({}).toString.call(input).slice(8, -1).toLowerCase();
					
				}
				
				if ( isNode ) {
					
					module.exports = Public;
					
				}
				else {
					
					window[publicName] = Public;
					
				}
				
			})(true && module && typeof module.exports === 'object' && module.exports);
			/* WEBPACK VAR INJECTION */
		}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))
		
		/***/
	}),
	
	         /***/ "./node_modules/taskflows/index.js":
	/*!*****************************************!*\
	 !*** ./node_modules/taskflows/index.js ***!
	 \*****************************************/
	/*! no static exports found */
	/***/ (function ( module, exports, __webpack_require__ ) {
		
		"use strict";
		/**
		 * @author Nathanael BRAUN
		 *
		 * Date: 16/12/2015
		 * Time: 09:37
		 */
		
		/**
		 * @author N.Braun
		 *
		 * Date: 03/09/14
		 * Time: 11:00
		 */
		/**
		 *
		 * Promise / semaphore manager & task sequencer
		 *
		 *
		 * @class TaskFlow
		 */
		
		
		
		var
			isArray    = __webpack_require__(/*! isarray */ "undefined?1c47"),
			isFunction = __webpack_require__(/*! isfunction */ "undefined?44a8"),
			isNumber   = __webpack_require__(/*! isnumber */ "undefined?5e51"),
			isString   = __webpack_require__(/*! isstring */ "undefined?ce7d"),
			merge      = __webpack_require__(/*! merge */ "./node_modules/merge/merge.js"),
			slice      = Array.prototype.slice,
			splice     = Array.prototype.splice;
		
		/**
		 * TaskFlow
		 * @param todo
		 * @param scope
		 * @param followers
		 * @param name
		 * @constructor
		 */
		
		
		var TaskFlowLib    = {},
		    TaskFlow       = function ( todo, scope, followers, name ) {
			    this.scope       = scope || {};
			    this.todo        = isArray(todo) ? todo : todo && [todo] || [];
			    this.doAfter     = [];
			    //this.overides = {};
			    this.locks       = 0;
			    this.fails       = 0;
			    this._complete   = false;
			    this._followers  = followers instanceof Array ? followers : [followers];
			    this._onfail     = null;
			    this.displayName = name;
			
			    this.release   = this.success = this.release.bind(this);
			    this.asyncFail = this.fail.bind(this);
		    };
		TaskFlow.Task      = function () {
		};
		TaskFlow.Catch     = function () {
		};
		module.exports     = TaskFlow;
		TaskFlow.prototype =
			{
				kill       : function () {
					this.doAfter = this.scope = this._onfail = this._followers = 0;
					this.dead    = true;
				},
				reset      : function () {
					if ( this.dead ) return;
					this._complete = false;
					this._pos      = 0;
				},
				/**
				 * Add one shot success call back / TaskFlow
				 * Passed wf will be released (so it will start running if there no others locks)
				 * @param cb {function||TaskFlow}
				 * @returns {TaskFlow}
				 */
				then       : function () {
					if ( this.dead ) return;
					this._followers = (this._followers instanceof Array) && this._followers || [];
					for ( var i = 0, ln = arguments.length; i < ln; i++ ) {
						if ( arguments[i] instanceof Array ) this.then.apply(this, arguments[i]);
						else {
							this._followers.push(arguments[i]);
							if ( arguments[i] instanceof TaskFlow )// @todo in wait ?
								arguments[i].locks++;
						}
					}
					if ( this._complete ) {
						this.locks++;
						this.release();
					}
					return this;
				},
				/**
				 * Add one shot fail call back
				 * @param cb {function||TaskFlow||array}
				 * @returns {TaskFlow}
				 */
				catchFail  : function () {
					if ( this.dead ) return;
					var done     = this.fails && this._complete;
					this._onfail = this._onfail || [];
					for ( var i = 0, ln = arguments.length; i < ln; i++ ) {
						if ( arguments[i] instanceof Array ) this.catchFail.apply(this, arguments[i]);
						else {
							if ( !done )
								this._onfail.push(arguments[i]);
							else arguments[i]();
						}
					}
					return this;
				},
				/**
				 * make this wf fall in failure, triggering one shot cb
				 * @todo
				 * @param cause
				 */
				fail       : function ( cause ) {
					if ( this.dead ) return;
					var tmp, i = 0;
					this._fail = cause;
					if ( this._onfail )
						while ( i < this._onfail.length ) {
							tmp = this._onfail[i++];
							if ( tmp instanceof Function ) tmp(this.scope, cause, this);
							else if ( tmp instanceof TaskFlow ) tmp.release();
						}
				},
				/**
				 * Push a task & start running the wf (or restart it from last pos) if no remaining locks
				 * @param {fn|TaskFlow} the tasks
				 * @returns {TaskFlow}
				 */
				push       : function () {
					if ( this.dead ) return;
					this.locks++;
					this._complete = false;
					this.todo.push.apply(this.todo, arguments);
					this.release();
					return this;
				},
				/**
				 * Add a lock
				 * @param previous optional wf to wait (when previous will be done this will be unlocked
				 * @returns {TaskFlow}
				 */
				wait       : function ( previous ) {
					if ( this.dead ) return;
					if ( isArray(previous) )
						return previous.map(this.wait.bind(this));
					if ( previous ) {
						previous.then(this);
					}
					else this.locks++;
					return this;
				},
				/**
				 * Decrease locks for this wf, if it reach 0 all stuff passed to "then" call back will be exec /
				 * released
				 * @param desync
				 * @returns {*}
				 */
				release    : function ( desync ) {
					var me = this;
					if ( this.dead ) return;
					if ( desync && this.locks > 0 ) return setTimeout(this.success) && this;
					var tmp;
					
					if ( !--this.locks ) {
						if ( this.doAfter.length || this.todo.length > this._pos ) {
							//tmp            = this._nextTask;
							//this._nextTask = null;
							
							this.run(tmp);
							
							return;
						}
						//console.log('run '+this.locks)
						this._complete = true;
						this.running   = false;
						
						if ( this._followers instanceof Array ) {
							while ( this._followers.length ) {
								tmp = this._followers.shift();
								
								if ( tmp instanceof Function ) tmp(this.scope, this);
								else if ( tmp instanceof TaskFlow ) tmp.release();
							}
						}
						else {
							tmp = this._followers;
							
							if ( tmp instanceof Function ) tmp(this.scope, this);
							else if ( tmp instanceof TaskFlow ) tmp.release();
						}
					}
					return this;
				},
				_pos       : 0,
				_nextTask  : 0,
				pushSubTask: function ( task ) {
					if ( this.dead ) return;
					this.doAfter.push(task);
				},
				// override    : function ( taskName, fn ) {
				//
				//     this.overrides[taskName] = this.overrides[taskName] || [];
				//     this.overrides[taskName].push(fn);
				// },
				
				/**
				 * Start this wf execution
				 * @returns {*}
				 */
				run: function ( step, force, releaseAfter ) {
					if ( this.dead ) return;
					if ( !step && !this.locks && !this.doAfter.length && (this._pos >= this.todo.length) ) {
						this.locks++;
						this.running = false;
						this.release();
						return this;
					}
					if ( !force && this.locks ) return step && this.pushSubTask(step);
					
					this.running = true;
					
					
					step = step || this.doAfter.length && this.doAfter.shift() || this.todo[this._pos++];
					
					this.locks++;
					if ( isString(step) ) {
						
						if ( !this._succesfull ) {
							// there was a fail
						}
						if ( this.scope[step] instanceof Function ) {
							step = this.scope[step](null, this.scope, this);
							
						}
						else step = this.scope[step];
					}
					else if ( step instanceof Function ) {
						
						this._succesfull = true;
						step             = step(this.scope, this);
						this._succesfull = false;
						
					}
					else if ( step instanceof TaskFlow ) {// sync wf
						step.then(this);
						step = null;
					}
					else if ( step instanceof Array ) {//async pool
						this.locks++;
						for ( var i = 0; i < step.length; i++, this.locks++ )
							setTimeout(this.run.bind(this, step[i], true, true));
						setTimeout(this.success);
						step = null;
					}
					else {
						step = null;
					}
					
					!step && releaseAfter && this.release();
					this.run(step, step && force, step && releaseAfter);
					this.release();
					
					return this;
				}
			};
		
		/***/
	}),
	
	         /***/ "./node_modules/webpack/buildin/module.js":
	/*!***********************************!*\
	 !*** (webpack)/buildin/module.js ***!
	 \***********************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		module.exports = function ( module ) {
			if ( !module.webpackPolyfill ) {
				module.deprecate = function () {
				};
				module.paths     = [];
				// module.parent = undefined by default
				if ( !module.children ) module.children = [];
				Object.defineProperty(module, "loaded", {
					enumerable: true,
					get       : function () {
						return module.l;
					}
				});
				Object.defineProperty(module, "id", {
					enumerable: true,
					get       : function () {
						return module.i;
					}
				});
				module.webpackPolyfill = 1;
			}
			return module;
		};
		
		
		/***/
	}),
	
	         /***/ "./src/anims/pushIn.js":
	/*!*****************************!*\
	 !*** ./src/anims/pushIn.js ***!
	 \*****************************/
	/*! exports provided: default */
	/***/ (function ( module, __webpack_exports__, __webpack_require__ ) {
		
		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony import */
		var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
		/* harmony import */
		var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
		
		
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
		 *  @contact : caipilabs@gmail.com
		 */
		var easingFn = __webpack_require__(/*! Comp/utils/easingFn */ "./src/utils/easingFn.js");
		
		/* harmony default export */
		__webpack_exports__["default"] = (function ( target ) {
			// dir = dir || 'top';
			return {
				reset  : true,
				initial: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, target, {
					alpha  : 0,
					_z     : -.2,
					rotateY: 0
				}),
				anims  : [{
					type    : "Tween",
					target  : target,
					from    : 0,
					duration: 500,
					easeFn  : easingFn.easeOutSine,
					apply   : {
						_z   : .2,
						alpha: 1
					}
				}]
			};
		});
		;
		
		/***/
	}),
	
	         /***/ "./src/anims/pushOut.js":
	/*!******************************!*\
	 !*** ./src/anims/pushOut.js ***!
	 \******************************/
	/*! exports provided: default */
	/***/ (function ( module, __webpack_exports__, __webpack_require__ ) {
		
		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony import */
		var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
		/* harmony import */
		var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
		
		
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
		 *  @contact : caipilabs@gmail.com
		 */
		var easingFn = __webpack_require__(/*! Comp/utils/easingFn */ "./src/utils/easingFn.js");
		
		/* harmony default export */
		__webpack_exports__["default"] = (function ( target ) {
			// dir = dir || 'top';
			return {
				reset  : true,
				initial: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, target, {
					alpha  : 1,
					_z     : 0,
					rotateY: 0
				}),
				anims  : [{
					type    : "Tween",
					target  : target,
					from    : 0,
					duration: 500,
					easeFn  : easingFn.easeOutSine,
					apply   : {
						_z   : -.2,
						alpha: -1
					}
				}]
			};
		});
		;
		
		/***/
	}),
	
	         /***/ "./src/asTweener.js":
	/*!**************************!*\
	 !*** ./src/asTweener.js ***!
	 \**************************/
	/*! exports provided: default */
	/***/ (function ( module, __webpack_exports__, __webpack_require__ ) {
		
		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export (binding) */
		__webpack_require__.d(__webpack_exports__, "default", function () {
			return asTweener;
		});
		/* harmony import */
		var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
		/* harmony import */
		var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
		/* harmony import */
		var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__);
		/* harmony import */
		var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
		/* harmony import */
		var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);
		/* harmony import */
		var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
		/* harmony import */
		var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
		/* harmony import */
		var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
		/* harmony import */
		var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
		/* harmony import */
		var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
		/* harmony import */
		var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
		/* harmony import */
		var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
		/* harmony import */
		var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
		/* harmony import */
		var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js");
		/* harmony import */
		var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7__);
		/* harmony import */
		var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
		/* harmony import */
		var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__);
		/* harmony import */
		var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "undefined?588e");
		/* harmony import */
		var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
		/* harmony import */
		var is__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! is */ "undefined?63a5");
		/* harmony import */
		var is__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_10__);
		/* harmony import */
		var react_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-dom */ "undefined?5e9a");
		/* harmony import */
		var react_dom__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_11__);
		
		
		/*
		 * The MIT License (MIT)
		 * Copyright (c) 2019. Wise Wild Web
		 *
		 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, Object.assign, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
		 *
		 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
		 *
		 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
		 *
		 *  @author : Nathanael Braun
		 *  @contact : caipilabs@gmail.com
		 */
		
		
		var rtween           = __webpack_require__(/*! rtween */ "undefined?929e"),
		    Dom              = __webpack_require__(/*! Comp/utils/Dom */ "./src/utils/Dom.js"),
		    isArray          = is__WEBPACK_IMPORTED_MODULE_10___default.a.array,
		    taskflow         = __webpack_require__(/*! taskflows */ "./node_modules/taskflows/index.js"),
		    defaultAnims     = {
			    // while no matrix..
			    hide: __webpack_require__(/*! Comp/anims/pushOut */ "./src/anims/pushOut.js"),
			    show: __webpack_require__(/*! Comp/anims/pushIn */ "./src/anims/pushIn.js")
		    },
		    initialTweenable = {
			    // while no matrix..
			    x      : 0,
			    y      : 0,
			    z      : 0,
			    _x     : 0,
			    _y     : 0,
			    _z     : 0,
			    // alpha   : 1,
			    rotateY: 0,
			    rotateX: 0,
			    rotate : 0
		    },
		    unitsRe          = new RegExp("([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" + ['em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|') + ")"),
		    extractUnits     = function extractUnits( map ) {
			    var r = {};
			    Object.keys(map).map(function ( k ) {
				    if ( unitsRe.test((map[k] + '').trim()) ) {
					    r[k]   = (map[k] + '').trim().replace(unitsRe, '$2');
					    map[k] = parseFloat((map[k] + '').trim().replace(unitsRe, '$1'));
				    }
			    });
			    return r;
		    };
		
		var SimpleObjectProto = {}.constructor;
		
		function asTweener() {
			for ( var _len = arguments.length, argz = new Array(_len), _key = 0; _key < _len; _key++ ) {
				argz[_key] = arguments[_key];
			}
			
			var BaseComponent = (!argz[0] || argz[0].prototype instanceof react__WEBPACK_IMPORTED_MODULE_9___default.a.Component || argz[0] === react__WEBPACK_IMPORTED_MODULE_9___default.a.Component) && argz.shift(),
			    opts          = (!argz[0] || argz[0] instanceof SimpleObjectProto) && argz.shift();
			
			if ( !(BaseComponent && (BaseComponent.prototype instanceof react__WEBPACK_IMPORTED_MODULE_9___default.a.Component || BaseComponent === react__WEBPACK_IMPORTED_MODULE_9___default.a.Component)) ) {
				return function ( BaseComponent ) {
					return asTweener(BaseComponent, opts);
				};
			}
			
			return (
				/*#__PURE__*/
				function ( _BaseComponent ) {
					_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(TweenableComp, _BaseComponent);
					
					function TweenableComp() {
						var _this;
						
						_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, TweenableComp);
						
						_this                   = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(TweenableComp).apply(this, arguments));
						var _static             = _this.constructor;
						_this._box              = {
							x: 100,
							y: 100,
							z: 800
						};
						_this._curMotionStateId = _static.InitialMotionState || "stand";
						return _this;
					}
					
					_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(TweenableComp, [{
						key  : "_rafLoop",
						value: function _rafLoop() {
							var updates = {};
							
							this._updateTweenRefs();
							
							if ( this._runningAnims.length ) Dom.Browser.requestAnimationFrame(this.__rafLoop); else {
								console.log("RAF Off");
								this._live = false;
							}
						}
					}, {
						key  : "goToMotionStateId",
						value: function goToMotionStateId( targetId ) {
							var _this2 = this;
							
							var _static = this.constructor,
							    tState  = _static.motionStates[targetId],
							    cState  = this._curMotionStateId;
							if ( !this._rendered ) return this._delayedMotionTarget = targetId;
							if ( this.running ) this.running = arguments;
							
							if ( !this.running && targetId != this._curMotionStateId ) {
								if ( !this._tweenRefCSS ) this.makeTweenable();
								this.running = true;
								var flow     = new taskflow([_static.motionStates[this._curMotionStateId] && function ( ctx, flow ) {
									return _static.motionStates[cState].leaving(ctx, flow, cState);
								}, function () {
									_this2._curMotionStateId = targetId;
									if ( _this2.running !== true ) setTimeout(function () {
										return _this2.goToMotionStateId.apply(_this2, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(_this2.running));
									});
									_this2.running = false;
								}, tState && function ( ctx, flow ) {
									return tState.entering(ctx, flow, cState);
								}, function () {
									tState.refs && Object.keys(tState.refs).map(function ( k ) {
										_this2.updateRefStyle(k, tState.refs[k][0]);
										
										_this2.applyTweenState(k, tState.refs[k][1]);
									});
								}], this);
								flow.run();
							}
						}
					}, {
						key  : "applyTweenState",
						value: function applyTweenState( id, map, reset ) {
							var me = this;
							Object.keys(map).map(function ( p ) {
								return me._tweenRefMaps[id][p] = (!reset && me._tweenRefMaps[id][p] || 0) + map[p];
							});
						}
					}, {
						key  : "updateRefStyle",
						value: function updateRefStyle( target, style, postPone ) {
							var _this3 = this;
							
							if ( isArray(target) && isArray(style) ) return target.map(function ( m, i ) {
								return _this3.updateRefStyle(m, style[i], postPone);
							});
							if ( isArray(target) ) return target.map(function ( m ) {
								return _this3.updateRefStyle(m, style, postPone);
							});
							if ( !this._tweenRefCSS ) this.makeTweenable();
							
							if ( !postPone && this.refs[target] ) {
								var node = this.refs[target] instanceof Element
								           ? this.refs[target]
								           : react_dom__WEBPACK_IMPORTED_MODULE_11___default.a.findDOMNode(this.refs[target]);
								node && Dom.applyCss(node, style);
							}
							
							this._tweenRefCSS[target] = this._tweenRefCSS[target] || {};
							Object.assign(this._tweenRefCSS[target], style);
						}
					}, {
						key  : "resetTweenable",
						value: function resetTweenable() {
							var _this4 = this;
							
							for ( var _len2 = arguments.length, targets = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++ ) {
								targets[_key2] = arguments[_key2];
							}
							
							targets.forEach(function ( t ) {
								// delete this._tweenRefs[t];
								// delete this._tweenRefCSS[t];
								_this4._tweenRefMaps[t] = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, _this4._tweenRefOrigin[t]);
							});
						}
					}, {
						key  : "pushAnim",
						value: function pushAnim( anim, then, skipInit ) {
							var sl, initial;
							
							if ( isArray(anim) ) {
								sl = anim;
							}
							else {
								sl      = anim.anims;
								initial = anim.initial;
							}
							
							var me = this;
							if ( !(sl instanceof rtween) ) sl = new rtween(sl, this._tweenRefMaps); // console.warn("Should
							                                                                        // start anim ",
							                                                                        // sl);
							
							this.makeTweenable();
							!skipInit && initial && Object.keys(initial).map(function ( id ) {
								return me.applyTweenState(id, initial[id], anim.reset);
							});
							sl.run(this._tweenRefMaps, function () {
								var i = me._runningAnims.indexOf(sl);
								
								if ( i != -1 ) me._runningAnims.splice(i, 1);
								then && then(sl); // if (anim.resetAfter)
								//     setTimeout(()=>sl.go(0,me._tweenRefMaps),133);
							}); //launch
							
							this._runningAnims.push(sl);
							
							if ( !this._live ) {
								this._live = true;
								console.log("RAF On");
								Dom.Browser.requestAnimationFrame(this.__rafLoop = this.__rafLoop || this._rafLoop.bind(this));
							}
							
							return sl;
						}
						/*
						 motionRef( id, css, listen, rtween, from, to )
						 motionRef( id, css, state, listen, rtween, from, to )
						 motionRef( id, css, state, rtween, at )
						 motionRef( id, css, state, rtween, units, at )
						 motionRef( id, css, rtween, at )
						 motionRef( id, css, rtween, units, at )
						 motionRef( id, css, watchRefs )
						 
						 motionRef( string, object )// tween ref
						 motionRef( string, object, object )
						 motionRef( string, object, object, rtween, int )// tween ref with pos
						 motionRef( string, object, object, rtween, object, int )
						 motionRef( string, object, string, rtween, int, int )  // tween ref watching cursor
						 motionRef( string, object, object, string, rtween, int, int )
						 motionRef( string, object, rtween, int )// tween ref with pos
						 motionRef( string, object, rtween, object, int )
						 motionRef( string, object, array )// stacked ref types
						 
						 watchRefs = [
						 {
						 listen:"some_parent_thread",
						 anim : somertween,
						 from,to
						 },
						 {
						 anim : somertween,
						 at : anim_state_position
						 },
						 {
						 state : {},// rtween values
						 }
						 ]
						 */
						
					}, {
						key  : "tweenable",
						value: function tweenable( id, css, watchRefs ) {
							// ref initial style
							var argz = Array.prototype.slice.call(arguments),
							    p    = argz.map(function ( v ) {
								    return v instanceof rtween && "rtween" || v instanceof Array && "array" || _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(v);
							    }); // if ( p[3] == "object" && p[3] == "object" )
							// debugger;
							
							return {};
						}
					}, {
						key  : "tweenRef",
						value: function tweenRef( id, iStyle, iMap, pos, noref, mapReset ) {
							// ref initial style
							// if (mapReset) debugger;
							this.makeTweenable();
							var _static = this.constructor,
							    cState  = _static.motionStates && _static.motionStates[this._curMotionStateId];
							if ( !this._tweenRefs[id] ) this._tweenRefTargets.push(id);
							
							if ( cState && cState.refs && cState.refs[id] ) {
								iStyle = iStyle || _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, cState.refs[id][0]);
								iMap   = iMap || _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, cState.refs[id][1]);
							}
							else {
								iStyle = iStyle || {};
								iMap   = iMap || {};
							}
							
							this._tweenRefs[id] = true;
							
							if ( isArray(iMap) ) {
								this._tweenRefUnits[id] = iMap[1];
								iMap                    = iMap[0];
							}
							
							if ( iMap.getPosAt ) {
								// typeof rtween
								// debugger;
								// if (/btn_/.test(id)) debugger;
								iMap = iMap.getPosAt(pos, !mapReset && this._tweenRefMaps[id] || Object.assign({}, initialTweenable, iMap.scope || {}));
							}
							else {
								mapReset                = noref;
								noref                   = pos;
								this._tweenRefUnits[id] = extractUnits(iMap);
							}
							
							this._tweenRefOrigin[id] = iMap;
							iStyle                   = this._tweenRefCSS[id] = !mapReset && this._tweenRefCSS[id] && Object.assign(this._tweenRefCSS[id], iStyle || {}) || iStyle || {};
							iMap                     = this._tweenRefMaps[id] = !mapReset && this._tweenRefMaps[id] || Object.assign({}, initialTweenable, iMap || {});
							!__SERVER__ && Dom.mapInBoxCSS(iMap, iStyle, this._box, this._tweenRefUnits[id]);
							if ( noref ) return {
								style: this._tweenRefCSS[id]
							}; else return {
								style: this._tweenRefCSS[id],
								ref  : id // __tweenMap : this._tweenRefMaps[id],
								// __tweenCSS : this._tweenRefCSS[id]
								
							};
						}
					}, {
						key  : "makeTweenable",
						value: function makeTweenable() {
							if ( !this._tweenEnabled ) {
								var me                   = this;
								this._rtweensByProp      = {};
								this._rtweensByStateProp = {};
								this._tweenRefCSS        = {}; //c rtween styles
								
								this._tweenRefs = {}; //c rtween styles
								
								this._tweenRefMaps = {}; //c rtween values
								
								this._tweenRefUnits = {}; //c rtween values
								
								this._tweenEnabled    = true;
								this._tweenRefOrigin  = {};
								this._tweenRefTargets = this._tweenRefTargets || [];
								this._runningAnims    = this._runningAnims || [];
								!__SERVER__ && Dom.addEvent(window, "resize", this._onResize = function () {
									//@todo
									me._updateBox();
									
									me._updateTweenRefs();
								});
							}
						}
					}, {
						key  : "_updateBox",
						value: function _updateBox() {
							var node = react_dom__WEBPACK_IMPORTED_MODULE_11___default.a.findDOMNode(this);
							
							if ( node ) {
								this._box.inited = true;
								this._box.x      = node.offsetWidth;
								this._box.y      = node.offsetHeight;
							}
						} // updateRefMap( target, map ) {
						//     Object.assign(this._tweenRefMaps[target], map);
						// }
						
					}, {
						key  : "getTweenableRef",
						value: function getTweenableRef( target ) {
							return this.refs[target] instanceof Element
							       ? this.refs[target]
							       : react_dom__WEBPACK_IMPORTED_MODULE_11___default.a.findDOMNode(this.refs[target]);
						}
					}, {
						key  : "_updateTweenRefs",
						value: function _updateTweenRefs() {
							// if ( this._tweenEnabled ) {
							for ( var i = 0, target, node; i < this._tweenRefTargets.length; i++ ) {
								target = this._tweenRefTargets[i]; // if ( this._tweenRefUnits[target].height )
								//     debugger;
								
								Dom.mapInBoxCSS(this._tweenRefMaps[target], this._tweenRefCSS[target], this._box, this._tweenRefUnits[target]);
								node = this._tweenEnabled && target == "__root"
								       ? react_dom__WEBPACK_IMPORTED_MODULE_11___default.a.findDOMNode(this)
								       : this.getTweenableRef(target);
								node && Dom.applyCss(node, this._tweenRefCSS[target]);
							} // }
							
						}
					}, {
						key  : "componentWillUnmount",
						value: function componentWillUnmount() {
							if ( this._tweenEnabled ) {
								this._tweenEnabled = false;
								Dom.removeEvent(window, "resize", this._onResize);
							}
							
							_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(TweenableComp.prototype), "componentWillUnmount", this) && _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(TweenableComp.prototype), "componentWillUnmount", this).call(this);
						}
					}, {
						key  : "componentDidMount",
						value: function componentDidMount() {
							this._rendered = true;
							
							if ( this._tweenEnabled ) {
								// debugger;
								this._updateBox();
								
								this._updateTweenRefs();
							}
							
							if ( this._delayedMotionTarget ) {
								this.goToMotionStateId(this._delayedMotionTarget);
								delete this._delayedMotionTarget;
							}
							
							_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(TweenableComp.prototype), "componentDidMount", this) && _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(TweenableComp.prototype), "componentDidMount", this).call(this);
						}
					}, {
						key  : "componentDidUpdate",
						value: function componentDidUpdate( prevProps, prevState ) {
							var _this5 = this;
							
							if ( this._tweenEnabled ) {
								this._updateBox();
								
								this._updateTweenRefs();
								
								this._rtweensByProp && Object.keys(prevProps).forEach(function ( k ) {
									return _this5._rtweensByProp[k] && _this5.props[k] !== prevProps[k] && _this5._rtweensByProp[k][_this5.props[k]] && _this5.pushAnim(_this5._rtweensByProp[k][_this5.props[k]]
									                                                                                                                                    /*get current pos*/
									);
								}, this);
								this._rtweensByStateProp && prevState && Object.keys(prevState).forEach(function ( k ) {
									return _this5._rtweensByStateProp[k] && _this5.state[k] !== prevState[k] && _this5._rtweensByStateProp[k][_this5.state[k]] && _this5.pushAnim(_this5._rtweensByStateProp[k][_this5.state[k]]
									                                                                                                                                              /*get current pos*/
									);
								}, this);
							}
							
							_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(TweenableComp.prototype), "componentDidUpdate", this) && _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(TweenableComp.prototype), "componentDidUpdate", this).call(this); // return;
						}
					}, {
						key  : "registerPropChangeAnim",
						value: function registerPropChangeAnim( propId, propValue, anims ) {
							this._rtweensByProp                    = this._rtweensByProp || {};
							this._rtween                           = this._rtween || new rtween();
							this._rtweensByProp[propId]            = this._rtweensByProp[propId] || {};
							this._rtweensByProp[propId][propValue] = this._rtweensByProp[propId][propValue] || new rtween();
							
							this._rtweensByProp[propId][propValue].mount(anims);
						}
					}, {
						key  : "registerStateChangeAnim",
						value: function registerStateChangeAnim( propId, propValue, anims ) {
							this._rtweensByStateProp                    = this._rtweensByStateProp || {};
							this._rtween                                = this._rtween || new rtween();
							this._rtweensByStateProp[propId]            = this._rtweensByStateProp[propId] || {};
							this._rtweensByStateProp[propId][propValue] = this._rtweensByStateProp[propId][propValue] || new rtween();
							
							this._rtweensByStateProp[propId][propValue].mount(anims);
						}
					}]);
					
					return TweenableComp;
				}(BaseComponent)
			);
		}
		
		/***/
	}),
	
	         /***/ "./src/index.js":
	/*!**********************!*\
	 !*** ./src/index.js ***!
	 \**********************/
	/*! exports provided: asTweener, Component, default */
	/***/ (function ( module, __webpack_exports__, __webpack_require__ ) {
		
		"use strict";
		__webpack_require__.r(__webpack_exports__);
		/* harmony export (binding) */
		__webpack_require__.d(__webpack_exports__, "Component", function () {
			return Component;
		});
		/* harmony import */
		var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
		/* harmony import */
		var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
		/* harmony import */
		var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
		/* harmony import */
		var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
		/* harmony import */
		var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
		/* harmony import */
		var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
		/* harmony import */
		var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
		/* harmony import */
		var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
		/* harmony import */
		var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
		/* harmony import */
		var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
		/* harmony import */
		var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "undefined?588e");
		/* harmony import */
		var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
		/* harmony import */
		var _asTweener__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./asTweener */ "./src/asTweener.js");
		/* harmony reexport (safe) */
		__webpack_require__.d(__webpack_exports__, "asTweener", function () {
			return _asTweener__WEBPACK_IMPORTED_MODULE_6__["default"];
		});
		
		
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
		 *  @contact : caipilabs@gmail.com
		 */
		
		
		var Component = Object(_asTweener__WEBPACK_IMPORTED_MODULE_6__["default"])({})(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);
		
		var TweenableComponent =
			    /*#__PURE__*/
			    function ( _Component ) {
				    _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(TweenableComponent, _Component);
				
				    function TweenableComponent() {
					    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TweenableComponent);
					
					    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(TweenableComponent).apply(this, arguments));
				    }
				
				    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TweenableComponent, [{
					    key  : "render",
					    value: function render() {
						    return 'Should have some render fn here in ' + this.constructor.displayName;
					    }
				    }]);
				
				    return TweenableComponent;
			    }(Component);
		
		
		/* harmony default export */
		__webpack_exports__["default"] = (TweenableComponent);
		
		/***/
	}),
	
	         /***/ "./src/utils/Dom.js":
	/*!**************************!*\
	 !*** ./src/utils/Dom.js ***!
	 \**************************/
	/*! no static exports found */
	/***/ (function ( module, exports, __webpack_require__ ) {
		
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
		 *  @contact : caipilabs@gmail.com
		 */
		
		/**
		 * Old school dom stuff
		 */
		var is                 = __webpack_require__(/*! is */ "undefined?63a5"),
		    merge              = __webpack_require__(/*! merge */ "./node_modules/merge/merge.js"),
		    floatCut           = function floatCut( v, l ) {
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
		    objBuilder         = {}.constructor,
		    _createElementAttr = {
			    style  : true,
			    tagName: true,
			    content: true,
			    cls    : true,
			    events : true,
			    $id    : true
		    },
		    _defaultUnits      = {
			    width : 'px',
			    height: 'px',
			    top   : 'px'
		    },
		    __;
		/**
		 * @class K.Dom
		 * @param arg0
		 * @returns {*}
		 * @constructor
		 */
		    //define('Dom', function () {
		
		
		var Browser            = {
			    // stacks de request animation frames
			    _                    : {
				    __rafStack          : [],
				    __rafStackSW        : [],
				    __rafThreadIsRunning: false,
				    _Frames             : [],
				    __lastTm            : 0,
				    __originalRAF       : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || setTimeout,
				    __originalCAF       : window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
			    },
			    requestAnimationFrame: function requestAnimationFrame( fn ) {
				    var t2, t;
				
				    Browser._.__rafStack.push(fn);
				
				    if ( !Browser._.raf_desc ) {
					    t2                 = Date.now();
					    t                  = t2 - Browser._.raf_tm;
					    Browser._.raf_desc = Browser._.__originalRAF.call(window, Browser.runRAFStack);
				    }
			    },
			
			    /**
			     * The real animation frame function
			     * @private
			     * @return {*}
			     */
			    runRAFStack    : function run( t2 ) {
				    // @todo : fix potential ios not launching anim bug
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
				
				    t                      = t2 - Browser._.raf_tm;
				    s                      = Browser._.__rafStack;
				    Browser._.__rafStack   = Browser._.__rafStackSW;
				    Browser._.__rafStackSW = s;
				
				    while ( s.length ) {
					    s.shift()(t);
				    }
				
				    Browser._.raf_tm   = t2;
				    Browser._.raf_desc = Browser._.__originalRAF.call(window, run);
			    },
			    haveTouchEvents: function haveTouchEvents() {
				    if ( typeof this._.isTouchDevice == 'boolean' ) return this._.isTouchDevice;
				    var deviceAgent      = navigator.userAgent.toLowerCase();
				    this._.isTouchDevice = 'ontouchstart' in window // works on most browsers
					    || 'onmsgesturechange' in window || deviceAgent.match(/(iphone|ipod|ipad)/) || deviceAgent.match(/(android)/) || deviceAgent.match(/(iemobile)/) || deviceAgent.match(/iphone/i) || deviceAgent.match(/ipad/i) || deviceAgent.match(/ipod/i) || deviceAgent.match(/blackberry/i) || deviceAgent.match(/bada/i);
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
				        }; // Add it to the body to get the computed style.
				
				    document.body.insertBefore(el, null);
				
				    for ( var t in transforms ) {
					    if ( el.style[t] !== undefined ) {
						    el.style[t] = "translate3d(1px,1px,1px)";
						    has3d       = window.getComputedStyle(el).getPropertyValue(transforms[t]);
					    }
				    }
				
				    document.body.removeChild(el);
				    return this._.have3dTransform = has3d && has3d.length > 0 && has3d !== "none";
			    }
		    },
		    Dom                = {
			    // Dom / html
			    createElement     : function createElement() {
				    var argz  = slice.call(arguments, 0),
				        _tag  = is.string(argz[0]) && argz.shift() || argz[0].tagName || 'div',
				        _opt  = argz[0] && argz.shift() || {},
				        _refs = argz[0] || null;
				
				    return __._createElement(_tag, _opt, _refs);
			    },
			    // Dom / html
			    appendContent     : function appendContent( parent, content, refs ) {
				    //var argz = slice.call(arguments, 0),
				    //    _tag = is.string(argz[0]) && argz.shift() || argz[0].tagName || 'div',
				    //    _opt = argz[0] && argz.shift() || {},
				    //    _refs = argz[0] || null;
				    return __._createElement(null, {
					    content: content
				    }, refs, parent);
			    },
			    mapInBoxCSS       : function mapInBoxCSS( pos, css, box, units, offset ) {
				    // @todo : rewrite or use npm
				    //if ( is.number(pos.x) || is.number(pos.y))
				    var t = '';
				    if ( is.number(pos._z) || is.number(pos._x) || is.number(pos._y) || is.number(pos.z) || is.number(pos.x) || is.number(pos.y) ) t = 'translate3d(' + floatCut((pos._x || 0) * (box.x || 0) + (pos.x || 0) + (offset && offset.x || 0), 2) + (units && units.x || 'px') + ', ' + floatCut((pos._y || 0) * (box.y || 0) + (pos.y || 0) + (offset && offset.y || 0), 2) + (units && units.y || 'px') + ', ' + floatCut((pos._z || 0) * (box.z || 0) + (pos.z || 0) + (offset && offset.z || 0), 2) + (units && units.z || 'px') + '' + ')'; //@todo matrix
				
				    if ( pos.rotate && is.number(pos.rotate) ) t += ' rotate(' + floatCut((pos.rotate || 0) % 360, 2) + 'deg)';
				    if ( pos.rotateX && is.number(pos.rotateX) ) t += ' rotateX(' + floatCut((pos.rotateX || 0) % 360, 2) + 'deg)';
				    if ( pos.rotateY && is.number(pos.rotateY) ) t += ' rotateY(' + floatCut((pos.rotateY || 0) % 360, 2) + 'deg)';
				    if ( is.number(pos.alpha) ) css.opacity = min(1, max(0, floatCut(pos.alpha, 2)));
				    css.transform = t;
				    is.number(pos._width) && (css.width = pos._width * (box.x || 0) + 'px');
				    is.number(pos._height) && (css.height = pos._height * (box.y || 0) + 'px');
				    is.number(pos.width) && (css.width = pos.width + (units && units.x || 'px'));
				    is.number(pos.height) && (css.height = pos.height + (units && units.y || 'px'));
				    is.number(pos.zIndex) && (css.zIndex = pos.zIndex);
			    },
			    mapCSS            : function mapCSS( pos, css, units ) {
				    // @todo : polymorphik hashmap is bad
				    //if ( is.number(pos.x) || is.number(pos.y))
				    var t = '';
				    if ( is.number(pos.z) || is.number(pos.x) || is.number(pos.y) ) t = 'translate3d(' + (pos.x || 0) + 'px, ' + (pos.y || 0) + 'px, ' + (pos.z || 0) + 'px)'; //if ( is.number(pos._z) || is.number(pos._x) || is.number(pos._y) )
				    //    t = 'translate3d(' +
				    //    (pos._x || 0) * 100 + '%, ' +
				    //    (pos._y || 0) * 100 + '%, ' +
				    //    (pos._z || 0) * 100 + '%)';
				    //console.log(pos);
				    //@todo matrix
				
				    if ( pos.rotate && is.number(pos.rotate) ) t += ' rotate(' + floatCut((pos.rotate || 0) % 360, 2) + 'deg)';
				    if ( pos.rotateX && is.number(pos.rotateX) ) t += ' rotateX(' + floatCut((pos.rotateX || 0) % 360, 2) + 'deg)';
				    if ( pos.rotateY && is.number(pos.rotateY) ) console.log(t += ' rotateY(' + floatCut((pos.rotateY || 0) % 360, 2) + 'deg)');
				    if ( is.number(pos.alpha) ) css.opacity = min(1, max(0, pos.alpha));
				    css.transform = t;
				    is.number(pos.width) && (css.width = pos.width + (units && units.x || 'px'));
				    is.number(pos.height) && (css.height = pos.height + (units && units.x || 'px'));
				    is.number(pos.zIndex) && (css.zIndex = pos.zIndex);
			    },
			    mapFromAttributes : function mapFromAttributes( node, match, upcase ) {
				    var map = {},
				        key;
				    match   = match || /^(.*)$/;
				
				    for ( var a = 0; a < node.attributes.length; a++ ) {
					    if ( (key = node.attributes.item(a).name.match(match)) && key ) map[upcase && key[1].toUpperCase() || key[1]] = node.attributes.item(a).value;
				    }
				
				    return map;
			    },
			    mapToAttributes   : function mapToAttributes( node, map ) {
				    for ( var o in map ) {
					    map.hasOwnProperty(o) && this.addAttribute(node, o, map[o]);
				    }
				
				    return node;
			    },
			    addAttribute      : function addAttribute( node, attr, value ) {
				    attr       = document.createAttribute(attr);
				    attr.value = value;
				    node.setAttributeNode(attr);
				    return attr;
			    },
			    getParentWithCls  : function getParentWithCls( node, cls ) {
				    // @todo
				    return this.haveCls(node, cls) && node || node.parentNode && node.parentNode !== document.body && this.getParentWithCls(node.parentNode, cls) || false;
			    },
			    haveCls           : function haveCls( node, cls ) {
				    // @todo
				    return new RegExp("(^|\\s)" + cls.trim() + "(\\s|$)").test(node.className);
			    },
			    addCls            : function addCls( node, cls ) {
				    if ( cls instanceof Array ) for ( var i in cls ) {
					    this.addCls(node, cls[i]);
				    } else if ( !this.haveCls(node, cls) ) node.className += ' ' + cls;
			    },
			    rmCls             : function rmCls( node, cls ) {
				    if ( cls instanceof Array ) for ( var i in cls ) {
					    this.rmCls(node, cls[i]);
				    } else if ( this.haveCls(node, cls) ) node.className = node.className.replace( //@todo
				                                                                                   new RegExp("(?:^|\\s+)" + cls.trim() + "(?:\\s+|$)"), ' ');
			    },
			    addEvent          : function addEvent( node, type, fn, scope, bubble ) {
				    var desc;
				
				    if ( is.object(type) ) {
					    for ( var o in type ) {
						    if ( type.hasOwnProperty(o) ) this.addEvent(node, o, type[o], fn);
					    }
					
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
						    node.attachEvent('on' + type, fn.related = function ( e ) {
							    return fn.call(node, e);
						    });
					    }
				    }
			    },
			    removeEvent       : function removeEvent( node, type, fn, scope, bubble ) {
				    var i, desc;
				
				    if ( is.object(type) ) {
					    for ( var o in type ) {
						    if ( type.hasOwnProperty(o) ) this.removeEvent(node, o, type[o], scope);
					    }
				    }
				    else if ( /^(drag|drop)/.test(type) ) {
					    desc = __.getDraggable(node);
					
					    __.rmFnScopePair(desc[type], fn, scope);
					
					    if ( !desc.dragstart.length && !desc.drag.length && !desc.dragEnd.length && !desc.dropped.length ) __.freeDraggable(node);
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
			    offset            : function offset( elem ) {
				    // @todo
				    var dims = {
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
			    applyCssTransition: function applyCssTransition( node, from, to, tm, cb ) {
				    tm = tm || 500;
				
				    var me  = this,
				        stm,
				        evt = function evt() {
					        clearTimeout(stm);
					        me.applyCss(node, {
						        transition: null
					        });
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
						    tmp += (this.prefixedProperties[i] ? this.dashedPrefix : '') + i + o + ', ';
					    }
				    }
				
				    me.applyCss(node, {
					    transition: null
				    });
				    me.applyCss(node, from);
				    requestAnimationFrame(function () {
					    me.applyCss(node, {
						    transition: tmp
					    });
					    me.addEvent(node, 'transitionend', evt);
					    me.applyCss(node, to);
					    stm = setTimeout(evt, tm * 1.1);
				    });
			    },
			    applyCssAnim      : function applyCssAnim( node, id, tm, cb ) {
				    tm = tm || 500;
				
				    var me  = this,
				        stm,
				        evt = function evt( e ) {
					        if ( e && e.target !== node ) {
						        return;
					        }
					
					        clearTimeout(stm);
					        me.applyCss(node, {
						        animation: null
					        });
					        me.removeEvent(node, 'webkitAnimationEnd', evt);
					        me.removeEvent(node, 'oAnimationEnd', evt);
					        me.removeEvent(node, 'animationend', evt);
					        cb && cb(node);
				        };
				
				    me.addEvent(node, 'webkitAnimationEnd', evt);
				    me.addEvent(node, 'oAnimationEnd', evt);
				    me.addEvent(node, 'animationend', evt);
				    me.applyCss(node, {
					    animation: id + " " + tm / 1000 + "s forwards"
				    });
				    stm = setTimeout(evt, tm * 1.1);
			    },
			    addWheelEvent     : function ( window, document ) {
				    var prefix = "",
				        _addEventListener,
				        onwheel,
				        support; // detect event model
				
				
				    if ( window.addEventListener ) {
					    _addEventListener = "addEventListener";
				    }
				    else {
					    _addEventListener = "attachEvent";
					    prefix            = "on";
				    } // detect available wheel event
				
				
				    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
				              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
				              "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox
				
				    window.addWheelListener = function ( elem, callback, scope, useCapture ) {
					    _addWheelListener(elem, support, callback, scope, useCapture); // handle MozMousePixelScroll in
					                                                                   // older Firefox
					
					
					    if ( support == "DOMMouseScroll" ) {
						    _addWheelListener(elem, "MozMousePixelScroll", callback, scope, useCapture);
					    }
				    };
				
				    function _addWheelListener( elem, eventName, callback, scope, useCapture ) {
					    elem[_addEventListener](prefix + eventName, function ( originalEvent ) {
						    !originalEvent && (originalEvent = window.event); // create a normalized event object
						
						    var event = {
							    // keep a ref to the original event object
							    originalEvent : originalEvent,
							    target        : originalEvent.target || originalEvent.srcElement,
							    type          : "wheel",
							    deltaMode     : originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
							    deltaX        : 0,
							    delatZ        : 0,
							    preventDefault: function preventDefault() {
								    originalEvent.preventDefault
								    ? originalEvent.preventDefault()
								    : originalEvent.returnValue = false;
							    }
						    }; // calculate deltaY (and deltaX) according to the event
						
						    if ( support == "mousewheel" ) {
							    event.deltaY = -1 / 40 * originalEvent.wheelDelta; // Webkit also support wheelDeltaX
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
						    } //                        if (typeof originalEvent.wheelDeltaY !== 'number')
						    //                            event.wheelDeltaY = originalEvent.deltaY/100;
						    //                        event.wheelDelta = deltaY*120;
						    // it's time to fire the callback
						
						
						    return callback.call(scope || this, event);
					    }, useCapture || false);
				    }
				
				    return window.addWheelListener;
			    }(window, document),
			    pageVisibility    : function () {
				    var pe = {
					    visible     : true,
					    _onPageShown: [[], []],
					    _onPageHided: [[], []],
					    follow      : function follow( type, fn, scope ) {
						    // @todo
						    if ( type == 'blurred' ) {
							    __onPageHided[0].push(fn);
							
							    __onPageHided[1].push(scope);
						    }
						    else if ( type == 'focused' ) {
							    __onPageShown[0].push(fn);
							
							    __onPageShown[1].push(scope);
						    }
					    },
					    unFollow    : function unFollow( type, fn, scope ) {
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
					
					    for ( var i = 0, ln = pe._onPageHided[0].length; i < ln; i++ ) {
						    pe._onPageHided[0][i].apply(pe._onPageHided[1][i]);
					    }
				    }
				
				    ;
				
				    function onFocus() {
					    pe.visible = true;
					
					    for ( var i = 0, ln = pe._onPageShown[0].length; i < ln; i++ ) {
						    pe._onPageShown[0][i].apply(pe._onPageShown[1][i]);
					    }
				    }
				
				    ;
				
				    if (
					    /*@cc_on!@*/
					    false ) {
				    }
				    else {
					    window.onfocus = onFocus;
					    window.onblur  = onBlur;
				    }
				
				    return pe;
			    }(),
			    applyCss          : function applyCss( node, style ) {
				    for ( var p in style ) {
					    if ( this.prefix && this.prefixedProperties[p] ) node.style[this.prefix + this.prefixedProperties[p]] = style[p]; else node.style[p] = style[p];
				    }
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
			    prefix            : /webkit/i.test(navigator.appVersion)
			                        ? 'webkit'
			                        : /firefox/i.test(navigator.userAgent)
			                          ? 'Moz'
			                          : /trident/i.test(navigator.userAgent) ? 'ms' : 'opera' in window ? 'O' : '',
			    dashedPrefix      : /webkit/i.test(navigator.appVersion)
			                        ? '-webkit-'
			                        : /firefox/i.test(navigator.userAgent)
			                          ? '-moz-'
			                          : /trident/i.test(navigator.userAgent) ? '-ms-' : 'opera' in window ? '-o-' : '',
			    Browser           : Browser
		    }; //);
		
		module.exports = Dom;
		__             = {
			onPageHided      : [],
			onPageShown      : [],
			dragging         : [],
			dragEnabled      : [],
			dragEnabledDesc  : [],
			fingers          : {},
			nbFingers        : 0,
			dragstartAnywhere: function dragstartAnywhere( e ) {
				var o,
				    me      = __,
				    i       = me.dragEnabled.indexOf(this),
				    finger,
				    desc,
				    fingers = [];
				if ( i === -1 ) return true;
				
				if ( !me.nbFingers ) {
					Dom.addEvent(document, {
						'touchmove': me.dragAnywhere,
						'mousemove': me.dragAnywhere,
						'touchend' : me.dropAnywhere,
						'mouseup'  : me.dropAnywhere
					});
				}
				
				if ( e.changedTouches && e.changedTouches.length ) {
					fingers = e.changedTouches;
				}
				else fingers.push(e);
				
				for ( var t = 0, ln = fingers.length; t < ln; t++ ) {
					finger = fingers[t];
					desc   = me.dragEnabledDesc[i];
					if ( desc.nbFingers ) continue;
					me.nbFingers++;
					me.fingers[finger.identifier] = desc;
					desc.nbFingers++;
					desc._startPos.x = Dom.prefix == 'MS' ? finger.x : finger.pageX;
					desc._startPos.y = Dom.prefix == 'MS' ? finger.y : finger.pageY;
					if ( !desc ) continue;
					desc._lastPos.x = Dom.prefix == 'MS' ? finger.x : finger.pageX;
					desc._lastPos.y = Dom.prefix == 'MS' ? finger.y : finger.pageY;
					
					for ( o = 0; o < desc.dragstart.length; o++ ) {
						desc.dragstart[o][0].call(desc.dragstart[o][1] || this, e, finger, desc);
					}
				}
			},
			dragAnywhere     : function dragAnywhere( e ) {
				var o,
				    me      = __,
				    finger,
				    fingers = [],
				    desc    = __.dragging[0];
				
				if ( e.changedTouches && e.changedTouches.length ) {
					fingers = e.changedTouches;
				}
				else fingers.push(e);
				
				for ( var i = 0, ln = fingers.length; i < ln; i++ ) {
					finger = fingers[i];
					desc   = me.fingers[finger.identifier];
					if ( !desc ) continue;
					desc._lastPos.x = Dom.prefix == 'MS' ? finger.x : finger.pageX;
					desc._lastPos.y = Dom.prefix == 'MS' ? finger.y : finger.pageY;
					
					for ( o = 0; o < desc.drag.length; o++ ) {
						desc.drag[o][0].call(desc.drag[o][1] || this, e, finger, desc);
					}
				}
			},
			dropAnywhere     : function dropAnywhere( e ) {
				var o,
				    me      = __,
				    finger,
				    fingers = [],
				    desc;
				
				if ( e.changedTouches && e.changedTouches.length ) {
					fingers = e.changedTouches;
				}
				else fingers.push(e);
				
				for ( var i = 0, ln = fingers.length; i < ln; i++ ) {
					finger                        = fingers[i];
					desc                          = me.fingers[finger.identifier];
					me.fingers[finger.identifier] = null;
					if ( !desc ) continue;
					me.nbFingers--;
					desc.nbFingers--;
					desc._lastPos.x = Dom.prefix == 'MS' ? finger.x : finger.pageX;
					desc._lastPos.y = Dom.prefix == 'MS' ? finger.y : finger.pageY;
					
					for ( o = 0; o < desc.dropped.length; o++ ) {
						desc.dropped[o][0].call(desc.dropped[o][1] || this, e, finger, desc);
					}
				}
				
				if ( !me.nbFingers ) {
					Dom.removeEvent(document, {
						'touchmove': me.dragAnywhere,
						'mousemove': me.dragAnywhere,
						'touchend' : me.dropAnywhere,
						'mouseup'  : me.dropAnywhere
					});
				}
			},
			getDraggable     : function getDraggable( node ) {
				var i = this.dragEnabled.indexOf(node),
				    desc;
				
				if ( i === -1 ) {
					i = this.dragEnabled.length;
					this.dragEnabled.push(node);
					this.dragEnabledDesc.push(desc = {
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
					}); //debugger;
					
					Dom.addEvent(node, {
						'mousedown' : this.dragstartAnywhere,
						'touchstart': this.dragstartAnywhere
					});
				}
				else desc = this.dragEnabledDesc[i];
				
				return desc;
			},
			freeDraggable    : function freeDraggable( node ) {
				var i = this.dragEnabled.indexOf(node),
				    desc;
				
				if ( i !== -1 ) {
					this.dragEnabled.splice(i, 1);
					this.dragEnabledDesc.splice(i, 1);
					Dom.removeEvent(node, {
						'mousedown' : this.dragstartAnywhere,
						'touchstart': this.dragstartAnywhere
					});
				}
			},
			addOverflowEvent : function addFlowListener( element, fn ) {
				var type = 'over',
				    flow = type == 'over';
				element.addEventListener('OverflowEvent' in window ? 'overflowchanged' : type + 'flow', function ( e ) {
					if ( e.type == type + 'flow' || e.orient == 0 && e.horizontalOverflow == flow || e.orient == 1 && e.verticalOverflow == flow || e.orient == 2 && e.horizontalOverflow == flow && e.verticalOverflow == flow ) {
						return fn.call(this, e);
					}
				}, false);
			},
			addEvent         : function addEvent( node, type, fn, bubble ) {
				if ( node.addEventListener ) {
					node.addEventListener(type, fn, bubble);
				}
				else if ( node.attachEvent ) {
					node.attachEvent('on' + type, fn.related = function ( e ) {
						return fn.call(node, e);
					});
				}
			},
			removeEvent      : function removeEvent( node, type, fn, bubble ) {
				if ( node.removeEventListener ) {
					node.removeEventListener(type, fn, bubble);
				}
				else if ( node.attachEvent ) {
					node.detachEvent('on' + type, fn.related);
				}
			},
			rmFnScopePair    : function rmFnScopePair( arr, fn, scope ) {
				for ( var i = 0, ln = arr.length; i < ln; i++ ) {
					if ( arr[i][0] == fn && arr[i][1] == scope ) return arr.splice(i, 1);
				}
				
				console.warn("Rm event : Listener not found !!");
			},
			_createElement   : function _createElement( tag, opt, refs, parent ) {
				var a,
				    o,
				    i,
				    ln,
				    node = parent || document.createElement(tag); //if (parent) opt = {content:opt};
				
				if ( opt ) for ( o in opt ) {
					if ( opt.hasOwnProperty(o) && opt[o] !== undefined && !_createElementAttr.hasOwnProperty(o) ) {
						a       = document.createAttribute(o);
						a.value = opt[o];
						node.setAttributeNode(a);
					}
				}
				refs && opt.$id && (refs[opt.$id] = node);
				opt.style && Dom.applyCss(node, opt.style);
				opt.cls && Dom.addCls(node, opt.cls);
				
				if ( opt.events ) {
					for ( o in opt.events ) {
						if ( opt.events.hasOwnProperty(o) && o !== "$scope" ) Dom.addEvent(node, o, opt.events[o], opt.events.$scope);
					}
				}
				
				if ( opt.content ) {
					if ( typeof opt.content === 'string' || typeof opt.content[o] == 'number' ) {
						node.innerHTML = opt.content;
					}
					else if ( opt.content instanceof Array ) {
						for ( i = 0, ln = opt.content.length; i < ln; i++ ) {
							node.appendChild(typeof opt.content[i] == 'string' || typeof opt.content[i] == 'number' || !opt.content[i]
							                 ? document.createTextNode(opt.content[i] || '')
							                 : isElement(opt.content[i])
							                   ? opt.content[i]
							                   : __createElement(opt.content[i].tagName || 'div', opt.content[i], refs));
						}
					}
					else {
						node.appendChild(opt.content instanceof HTMLElement
						                 ? opt.content
						                 : __createElement(opt.content.tagName || 'div', opt.content, refs));
					}
				}
				
				return node;
			}
		}; //
//})(typeof global === 'undefined' ? window : require('KamehaNS'),
//   (typeof window !== 'undefined') && window,
//   (typeof document !== 'undefined') && document,
//   (typeof navigator !== 'undefined') && navigator
//);
		
		/***/
	}),
	
	         /***/ "./src/utils/easingFn.js":
	/*!*******************************!*\
	 !*** ./src/utils/easingFn.js ***!
	 \*******************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		/*
		 * Copyright (c) 2018. Wise Wild Web
		 *
		 * This File is part of Caipi and under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License
		 * Full license at https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
		 *
		 *  @author : Nathanael Braun
		 *  @contact : caipilabs@gmail.com
		 */
		module.exports = {
			// t: current time, b: begInnIng value, c: change In value, d: duration
			def             : 'easeOutQuad',
			cos             : function cos( x, t, b, c, d ) {
				//alert(jQuery.easing.default);
				var v = t <= .5 ? Math.sin(Math.PI * t) : Math.sin(Math.PI * (1 - t));
				if ( t < 0 || t > 1 ) v = 0;
				return v;
			},
			cool            : function cool( x, t, b, c, d ) {
				var ts = (t /= d) * t;
				var tc = ts * t;
				return b + c * (7.795 * tc * ts + -25.5825 * ts * ts + 32.58 * tc + -20.39 * ts + 6.5975 * t);
			},
			easeInQuad      : function easeInQuad( x, t, b, c, d ) {
				return c * (t /= d) * t + b;
			},
			easeOutQuad     : function easeOutQuad( x, t, b, c, d ) {
				return -c * (t /= d) * (t - 2) + b;
			},
			easeInOutQuad   : function easeInOutQuad( x, t, b, c, d ) {
				if ( (t /= d / 2) < 1 ) return c / 2 * t * t + b;
				return -c / 2 * (--t * (t - 2) - 1) + b;
			},
			easeInCubic     : function easeInCubic( x, t, b, c, d ) {
				return c * (t /= d) * t * t + b;
			},
			easeOutCubic    : function easeOutCubic( x, t, b, c, d ) {
				return c * ((t = t / d - 1) * t * t + 1) + b;
			},
			easeInOutCubic  : function easeInOutCubic( x, t, b, c, d ) {
				if ( (t /= d / 2) < 1 ) return c / 2 * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t + 2) + b;
			},
			easeInQuart     : function easeInQuart( x, t, b, c, d ) {
				return c * (t /= d) * t * t * t + b;
			},
			easeOutQuart    : function easeOutQuart( x, t, b, c, d ) {
				return -c * ((t = t / d - 1) * t * t * t - 1) + b;
			},
			easeInOutQuart  : function easeInOutQuart( x, t, b, c, d ) {
				if ( (t /= d / 2) < 1 ) return c / 2 * t * t * t * t + b;
				return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
			},
			easeInQuint     : function easeInQuint( x, t, b, c, d ) {
				return c * (t /= d) * t * t * t * t + b;
			},
			easeOutQuint    : function easeOutQuint( x, t, b, c, d ) {
				return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
			},
			easeInOutQuint  : function easeInOutQuint( x, t, b, c, d ) {
				if ( (t /= d / 2) < 1 ) return c / 2 * t * t * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
			},
			easeInSine      : function easeInSine( x, t, b, c, d ) {
				return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
			},
			easeOutSine     : function easeOutSine( x, t, b, c, d ) {
				return c * Math.sin(t / d * (Math.PI / 2)) + b;
			},
			easeInOutSine   : function easeInOutSine( x, t, b, c, d ) {
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			},
			easeInExpo      : function easeInExpo( x, t, b, c, d ) {
				return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
			},
			easeOutExpo     : function easeOutExpo( x, t, b, c, d ) {
				return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
			},
			easeInOutExpo   : function easeInOutExpo( x, t, b, c, d ) {
				if ( t == 0 ) return b;
				if ( t == d ) return b + c;
				if ( (t /= d / 2) < 1 ) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			},
			easeInCirc      : function easeInCirc( x, t, b, c, d ) {
				return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
			},
			easeOutCirc     : function easeOutCirc( x, t, b, c, d ) {
				return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
			},
			easeInOutCirc   : function easeInOutCirc( x, t, b, c, d ) {
				if ( (t /= d / 2) < 1 ) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
				return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
			},
			easeInElastic   : function easeInElastic( x, t, b, c, d ) {
				var s = 1.70158;
				var p = 0;
				var a = c;
				if ( t == 0 ) return b;
				if ( (t /= d) == 1 ) return b + c;
				if ( !p ) p = d * .3;
				
				if ( a < Math.abs(c) ) {
					a     = c;
					var s = p / 4;
				}
				else var s = p / (2 * Math.PI) * Math.asin(c / a);
				
				return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			},
			easeOutElastic  : function easeOutElastic( x, t, b, c, d ) {
				var s = 1.70158;
				var p = 0;
				var a = c;
				if ( t == 0 ) return b;
				if ( (t /= d) == 1 ) return b + c;
				if ( !p ) p = d * .3;
				
				if ( a < Math.abs(c) ) {
					a     = c;
					var s = p / 4;
				}
				else var s = p / (2 * Math.PI) * Math.asin(c / a);
				
				return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
			},
			easeInOutElastic: function easeInOutElastic( x, t, b, c, d ) {
				var s = 1.70158;
				var p = 0;
				var a = c;
				if ( t == 0 ) return b;
				if ( (t /= d / 2) == 2 ) return b + c;
				if ( !p ) p = d * (.3 * 1.5);
				
				if ( a < Math.abs(c) ) {
					a     = c;
					var s = p / 4;
				}
				else var s = p / (2 * Math.PI) * Math.asin(c / a);
				
				if ( t < 1 ) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
			},
			easeInBack      : function easeInBack( x, t, b, c, d, s ) {
				if ( t === d ) return c;
				if ( s == undefined ) s = 1.70158;
				return c * (t /= d) * t * ((s + 1) * t - s) + b;
			},
			easeOutBack     : function easeOutBack( x, t, b, c, d, s ) {
				if ( t === d ) return c;
				if ( s == undefined ) s = 1.70158;
				return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
			},
			easeInOutBack   : function easeInOutBack( x, t, b, c, d, s ) {
				if ( s == undefined ) s = 1.70158;
				if ( (t /= d / 2) < 1 ) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
				return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
			},
			easeInBounce    : function easeInBounce( x, t, b, c, d ) {
				return c - this.easeOutBounce(x, d - t, 0, c, d) + b;
			},
			easeOutBounce   : function easeOutBounce( x, t, b, c, d ) {
				if ( (t /= d) < 1 / 2.75 ) {
					return c * (7.5625 * t * t) + b;
				}
				else if ( t < 2 / 2.75 ) {
					return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
				}
				else if ( t < 2.5 / 2.75 ) {
					return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
				}
				else {
					return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
				}
			},
			easeInOutBounce : function easeInOutBounce( x, t, b, c, d ) {
				if ( t < d / 2 ) return this.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
				return this.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
			}
		};
		
		/***/
	}),
	
	         /***/ "undefined?1c47":
	/*!**************************!*\
	 !*** external "isarray" ***!
	 \**************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		module.exports = require("isarray");
		
		/***/
	}),
	
	         /***/ "undefined?44a8":
	/*!*****************************!*\
	 !*** external "isfunction" ***!
	 \*****************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		module.exports = require("isfunction");
		
		/***/
	}),
	
	         /***/ "undefined?588e":
	/*!************************!*\
	 !*** external "react" ***!
	 \************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		module.exports = require("react");
		
		/***/
	}),
	
	         /***/ "undefined?5e51":
	/*!***************************!*\
	 !*** external "isnumber" ***!
	 \***************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		module.exports = require("isnumber");
		
		/***/
	}),
	
	         /***/ "undefined?5e9a":
	/*!****************************!*\
	 !*** external "react-dom" ***!
	 \****************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		module.exports = require("react-dom");
		
		/***/
	}),
	
	         /***/ "undefined?63a5":
	/*!*********************!*\
	 !*** external "is" ***!
	 \*********************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		module.exports = require("is");
		
		/***/
	}),
	
	         /***/ "undefined?929e":
	/*!*************************!*\
	 !*** external "rtween" ***!
	 \*************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		module.exports = require("rtween");
		
		/***/
	}),
	
	         /***/ "undefined?ce7d":
	/*!***************************!*\
	 !*** external "isstring" ***!
	 \***************************/
	/*! no static exports found */
	/***/ (function ( module, exports ) {
		
		module.exports = require("isstring");
		
		/***/
	})
	
	         /******/
         });
//# sourceMappingURL=Comp.js.map