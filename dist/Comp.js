/*!
 * MIT License
 * 
 * Copyright (c) 2018 Wise Wild Web
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/get.js":
/*!****************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/get.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");

var superPropBase = __webpack_require__(/*! ./superPropBase */ "./node_modules/@babel/runtime/helpers/superPropBase.js");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectSpread.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectSpread.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/superPropBase.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/merge/merge.js":
/*!*************************************!*\
  !*** ./node_modules/merge/merge.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/*!
 * @name JavaScript/NodeJS Merge v1.2.1
 * @author yeikos
 * @repository https://github.com/yeikos/js.merge

 * Copyright 2014 yeikos - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */

;(function(isNode) {

	/**
	 * Merge one or more objects 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	var Public = function(clone) {

		return merge(clone === true, false, arguments);

	}, publicName = 'merge';

	/**
	 * Merge two or more objects recursively 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	Public.recursive = function(clone) {

		return merge(clone === true, true, arguments);

	};

	/**
	 * Clone the input removing any reference
	 * @param mixed input
	 * @return mixed
	 */

	Public.clone = function(input) {

		var output = input,
			type = typeOf(input),
			index, size;

		if (type === 'array') {

			output = [];
			size = input.length;

			for (index=0;index<size;++index)

				output[index] = Public.clone(input[index]);

		} else if (type === 'object') {

			output = {};

			for (index in input)

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

	function merge_recursive(base, extend) {

		if (typeOf(base) !== 'object')

			return extend;

		for (var key in extend) {

			if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {

				base[key] = merge_recursive(base[key], extend[key]);

			} else {

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

	function merge(clone, recursive, argv) {

		var result = argv[0],
			size = argv.length;

		if (clone || typeOf(result) !== 'object')

			result = {};

		for (var index=0;index<size;++index) {

			var item = argv[index],

				type = typeOf(item);

			if (type !== 'object') continue;

			for (var key in item) {

				if (key === '__proto__') continue;

				var sitem = clone ? Public.clone(item[key]) : item[key];

				if (recursive) {

					result[key] = merge_recursive(result[key], sitem);

				} else {

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

	function typeOf(input) {

		return ({}).toString.call(input).slice(8, -1).toLowerCase();

	}

	if (isNode) {

		module.exports = Public;

	} else {

		window[publicName] = Public;

	}

})( true && module && typeof module.exports === 'object' && module.exports);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/taskflows/index.js":
/*!*****************************************!*\
  !*** ./node_modules/taskflows/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
        this.todo        = isArray(todo)?todo : todo&&[todo]||[];
        this.doAfter     = [];
        //this.overides = {};
        this.locks       = 0;
        this.fails       = 0;
        this._complete   = false;
        this._followers  = followers instanceof Array ? followers : [followers];
        this._onfail     = null;
        this.displayName = name;

        this.release   = this.success   = this.release.bind(this);
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
        this.doAfter=this.scope=this._onfail = this._followers=0;
        this.dead = true;
    },
    reset       : function () {
        if (this.dead) return;
        this._complete=false;
        this._pos=0;
    },
    /**
     * Add one shot success call back / TaskFlow
     * Passed wf will be released (so it will start running if there no others locks)
     * @param cb {function||TaskFlow}
     * @returns {TaskFlow}
     */
    then        : function () {
        if (this.dead) return;
        this._followers = (this._followers instanceof Array) && this._followers || [];
        for ( var i = 0, ln = arguments.length ; i < ln ; i++ ) {
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
    catchFail   : function () {
        if (this.dead) return;
        var done     = this.fails && this._complete;
        this._onfail = this._onfail || [];
        for ( var i = 0, ln = arguments.length ; i < ln ; i++ ) {
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
    fail        : function ( cause ) {
        if (this.dead) return;
        var tmp, i = 0;
        this._fail = cause;
        if ( this._onfail )
            while (i < this._onfail.length) {
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
    push        : function () {
        if (this.dead) return;
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
    wait        : function ( previous ) {
        if (this.dead) return;
        if ( isArray(previous) )
            return previous.map(this.wait.bind(this));
        if ( previous ) {
            previous.then(this);
        } else this.locks++;
        return this;
    },
    /**
     * Decrease locks for this wf, if it reach 0 all stuff passed to "then" call back will be exec / released
     * @param desync
     * @returns {*}
     */
    release     : function ( desync ) {
        var me = this;
        if (this.dead) return;
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
            this.running = false;

            if ( this._followers instanceof Array ) {
                while (this._followers.length) {
                    tmp = this._followers.shift();

                    if ( tmp instanceof Function ) tmp(this.scope, this);
                    else if ( tmp instanceof TaskFlow ) tmp.release();
                }
            } else {
                tmp = this._followers;

                if ( tmp instanceof Function ) tmp(this.scope, this);
                else if ( tmp instanceof TaskFlow ) tmp.release();
            }
        }
        return this;
    },
    _pos        : 0,
    _nextTask   : 0,
    pushSubTask : function ( task ) {
        if (this.dead) return;
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
    run : function ( step, force, releaseAfter ) {
        if (this.dead) return;
        if ( !step && !this.locks && !this.doAfter.length && (this._pos>=this.todo.length) ) {
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

            } else step = this.scope[step];
        } else if ( step instanceof Function ) {

            this._succesfull = true;
            step             = step(this.scope, this);
            this._succesfull = false;

        } else if ( step instanceof TaskFlow ) {// sync wf
            step.then(this);
            step = null;
        } else if ( step instanceof Array ) {//async pool
            this.locks++;
            for ( var i = 0 ; i < step.length ; i++, this.locks++ )
                setTimeout(this.run.bind(this, step[i], true, true));
            setTimeout(this.success);
            step = null;
        } else {
            step = null;
        }

        !step && releaseAfter && this.release();
        this.run(step, step && force, step && releaseAfter);
        this.release();

        return this;
    }
};

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/anims/pushIn.js":
/*!*****************************!*\
  !*** ./src/anims/pushIn.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


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
var easingFn = __webpack_require__(/*! Comp/utils/easingFn */ "./src/utils/easingFn.js");

/* harmony default export */ __webpack_exports__["default"] = (function (target) {
  // dir = dir || 'top';
  return {
    //reset  : true,
    initial: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, target, {
      alpha: 0
    }),
    anims: [{
      type: "Tween",
      target: target,
      from: 0,
      duration: 500,
      easeFn: easingFn.easeOutSine,
      apply: {
        _z: .2,
        alpha: 1
      }
    }]
  };
});
;

/***/ }),

/***/ "./src/anims/pushOut.js":
/*!******************************!*\
  !*** ./src/anims/pushOut.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


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
var easingFn = __webpack_require__(/*! Comp/utils/easingFn */ "./src/utils/easingFn.js");

/* harmony default export */ __webpack_exports__["default"] = (function (target) {
  // dir = dir || 'top';
  return {
    //reset  : true,
    initial: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, target, {
      alpha: 1
    }),
    anims: [{
      type: "Tween",
      target: target,
      from: 0,
      duration: 500,
      easeFn: easingFn.easeOutSine,
      apply: {
        _z: -.2,
        alpha: -1
      }
    }]
  };
});
;

/***/ }),

/***/ "./src/asTweener.js":
/*!**************************!*\
  !*** ./src/asTweener.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return asTweener; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "undefined?588e");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-dom */ "undefined?5e9a");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils */ "./src/utils.js");










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





var rtween = __webpack_require__(/*! rtween */ "undefined?929e"),
    isBrowserSide = new Function("try {return this===window;}catch(e){ return false;}")(),
    isArray = is__WEBPACK_IMPORTED_MODULE_10___default.a.array,
    taskflow = __webpack_require__(/*! taskflows */ "./node_modules/taskflows/index.js"),
    defaultAnims = {
  // while no matrix..
  hide: __webpack_require__(/*! Comp/anims/pushOut */ "./src/anims/pushOut.js"),
  show: __webpack_require__(/*! Comp/anims/pushIn */ "./src/anims/pushIn.js")
},
    initialTweenable = {
  // while no matrix..
  x: 0,
  y: 0,
  z: 0,
  _x: 0,
  _y: 0,
  _z: 0,
  // alpha   : 1,
  rotateY: 0,
  rotateX: 0,
  rotate: 0
},
    unitsRe = new RegExp("([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" + ['em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|') + ")"),
    extractUnits = function extractUnits(map) {
  var r = {};
  Object.keys(map).map(function (k) {
    if (unitsRe.test((map[k] + '').trim())) {
      r[k] = (map[k] + '').trim().replace(unitsRe, '$2');
      map[k] = parseFloat((map[k] + '').trim().replace(unitsRe, '$1'));
    }
  });
  return r;
};

var SimpleObjectProto = {}.constructor;
/**
 * Tweener decorator
 * @param argz
 * @returns {*}
 */

function asTweener() {
  for (var _len = arguments.length, argz = new Array(_len), _key = 0; _key < _len; _key++) {
    argz[_key] = arguments[_key];
  }

  var BaseComponent = (!argz[0] || argz[0].prototype instanceof react__WEBPACK_IMPORTED_MODULE_9___default.a.Component || argz[0] === react__WEBPACK_IMPORTED_MODULE_9___default.a.Component) && argz.shift(),
      opts = (!argz[0] || argz[0] instanceof SimpleObjectProto) && argz.shift();

  if (!(BaseComponent && (BaseComponent.prototype instanceof react__WEBPACK_IMPORTED_MODULE_9___default.a.Component || BaseComponent === react__WEBPACK_IMPORTED_MODULE_9___default.a.Component))) {
    return function (BaseComponent) {
      return asTweener(BaseComponent, opts);
    };
  }

  return (
    /*#__PURE__*/
    function (_BaseComponent) {
      _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(TweenableComp, _BaseComponent);

      function TweenableComp() {
        var _this;

        _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, TweenableComp);

        _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(TweenableComp).apply(this, arguments));
        var _static = _this.constructor;
        _this._box = {
          x: 100,
          y: 100,
          z: 800
        };
        _this._curMotionStateId = _static.InitialMotionState || "stand";
        return _this;
      }

      _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(TweenableComp, [{
        key: "_rafLoop",
        value: function _rafLoop() {
          this._updateTweenRefs();

          if (this._runningAnims.length) requestAnimationFrame(this.__rafLoop);else {
            console.log("RAF Off");
            this._live = false;
          }
        }
      }, {
        key: "goToMotionStateId",
        value: function goToMotionStateId(targetId) {
          var _this2 = this;

          var _static = this.constructor,
              tState = _static.motionStates[targetId],
              cState = this._curMotionStateId;
          if (!this._rendered) return this._delayedMotionTarget = targetId;
          if (this.running) this.running = arguments;

          if (!this.running && targetId != this._curMotionStateId) {
            if (!this._tweenRefCSS) this.makeTweenable();
            this.running = true;
            var flow = new taskflow([_static.motionStates[this._curMotionStateId] && function (ctx, flow) {
              return _static.motionStates[cState].leaving(ctx, flow, cState);
            }, function () {
              _this2._curMotionStateId = targetId;
              if (_this2.running !== true) setTimeout(function () {
                return _this2.goToMotionStateId.apply(_this2, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(_this2.running));
              });
              _this2.running = false;
            }, tState && function (ctx, flow) {
              return tState.entering(ctx, flow, cState);
            }, function () {
              tState.refs && Object.keys(tState.refs).map(function (k) {
                _this2.updateRefStyle(k, tState.refs[k][0]);

                _this2.applyTweenState(k, tState.refs[k][1]);
              });
            }], this);
            flow.run();
          }
        }
      }, {
        key: "applyTweenState",
        value: function applyTweenState(id, map, reset) {
          var me = this;
          Object.keys(map).map(function (p) {
            return me._tweenRefMaps[id][p] = (!reset && me._tweenRefMaps[id][p] || 0) + map[p];
          });
        }
      }, {
        key: "updateRefStyle",
        value: function updateRefStyle(target, style, postPone) {
          var _this3 = this;

          if (isArray(target) && isArray(style)) return target.map(function (m, i) {
            return _this3.updateRefStyle(m, style[i], postPone);
          });
          if (isArray(target)) return target.map(function (m) {
            return _this3.updateRefStyle(m, style, postPone);
          });
          if (!this._tweenRefCSS) this.makeTweenable();

          if (!postPone && this.refs[target]) {
            var node = this.refs[target] instanceof Element ? this.refs[target] : react_dom__WEBPACK_IMPORTED_MODULE_11___default.a.findDOMNode(this.refs[target]);
            node && Object.assign(node.style, style);
          }

          this._tweenRefCSS[target] = this._tweenRefCSS[target] || {};
          Object.assign(this._tweenRefCSS[target], style);
        }
      }, {
        key: "resetTweenable",
        value: function resetTweenable() {
          var _this4 = this;

          for (var _len2 = arguments.length, targets = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            targets[_key2] = arguments[_key2];
          }

          targets.forEach(function (t) {
            // delete this._tweenRefs[t];
            // delete this._tweenRefCSS[t];
            _this4._tweenRefMaps[t] = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, _this4._tweenRefOrigin[t]);
          });
        }
      }, {
        key: "pushAnim",
        value: function pushAnim(anim, then, skipInit) {
          var _this5 = this;

          var sl, initial;

          if (isArray(anim)) {
            sl = anim;
          } else {
            sl = anim.anims;
            initial = anim.initial;
          }

          if (!(sl instanceof rtween)) sl = new rtween(sl, this._tweenRefMaps); // console.warn("Should start anim ", sl);

          this.makeTweenable();
          !skipInit && initial && Object.keys(initial).map(function (id) {
            return _this5.applyTweenState(id, initial[id], anim.reset);
          });
          sl.run(this._tweenRefMaps, function () {
            var i = _this5._runningAnims.indexOf(sl);

            if (i != -1) _this5._runningAnims.splice(i, 1);
            then && then(sl); // if (anim.resetAfter)
            //     setTimeout(()=>sl.go(0,me._tweenRefMaps),133);
          }); //launch

          this._runningAnims.push(sl);

          if (!this._live) {
            this._live = true;
            console.log("RAF On");
            requestAnimationFrame(this.__rafLoop = this.__rafLoop || this._rafLoop.bind(this));
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
        key: "tweenable",
        value: function tweenable(id, css, watchRefs) {
          // ref initial style
          var argz = Array.prototype.slice.call(arguments),
              p = argz.map(function (v) {
            return v instanceof rtween && "rtween" || v instanceof Array && "array" || _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(v);
          }); // if ( p[3] == "object" && p[3] == "object" )
          // debugger;

          return {};
        }
      }, {
        key: "tweenRef",
        value: function tweenRef(id, iStyle, iMap, pos, noref, mapReset) {
          // ref initial style
          // if (mapReset) debugger;
          this.makeTweenable();
          var _static = this.constructor,
              cState = _static.motionStates && _static.motionStates[this._curMotionStateId];
          if (!this._tweenRefs[id]) this._tweenRefTargets.push(id);

          if (cState && cState.refs && cState.refs[id]) {
            iStyle = iStyle || _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, cState.refs[id][0]);
            iMap = iMap || _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, cState.refs[id][1]);
          } else {
            iStyle = iStyle || {};
            iMap = iMap || {};
          }

          this._tweenRefs[id] = true;

          if (isArray(iMap)) {
            this._tweenRefUnits[id] = iMap[1];
            iMap = iMap[0];
          }

          if (iMap.getPosAt) {
            // typeof rtween
            // debugger;
            // if (/btn_/.test(id)) debugger;
            iMap = iMap.getPosAt(pos, !mapReset && this._tweenRefMaps[id] || Object.assign({}, initialTweenable, iMap.scope || {}));
          } else {
            mapReset = noref;
            noref = pos;
            this._tweenRefUnits[id] = extractUnits(iMap);
          }

          this._tweenRefOrigin[id] = iMap; //this._tweenRefCSS[id]    = this._tweenRefCSS[id] || {};

          if (!mapReset && this._tweenRefCSS[id]) {
            this._tweenRefCSS[id] = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, iStyle);
          } else this._tweenRefCSS[id] = iStyle && _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, iStyle) || {};

          iStyle = this._tweenRefCSS[id];
          iMap = this._tweenRefMaps[id] = !mapReset && this._tweenRefMaps[id] || Object.assign({}, initialTweenable, iMap || {});
          _utils__WEBPACK_IMPORTED_MODULE_12__["default"].mapInBoxCSS(iMap, iStyle, this._box, this._tweenRefUnits[id]);
          if (noref) return {
            style: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, this._tweenRefCSS[id])
          };else return {
            style: _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, this._tweenRefCSS[id]),
            ref: id // __tweenMap : this._tweenRefMaps[id],
            // __tweenCSS : this._tweenRefCSS[id]

          };
        }
      }, {
        key: "makeTweenable",
        value: function makeTweenable() {
          if (!this._tweenEnabled) {
            var me = this;
            this._rtweensByProp = {};
            this._rtweensByStateProp = {};
            this._tweenRefCSS = {}; //c rtween styles

            this._tweenRefs = {}; //c rtween styles

            this._tweenRefMaps = {}; //c rtween values

            this._tweenRefUnits = {}; //c rtween values

            this._tweenEnabled = true;
            this._tweenRefOrigin = {};
            this._tweenRefTargets = this._tweenRefTargets || [];
            this._runningAnims = this._runningAnims || [];
            isBrowserSide && window.addEventListener("resize", this._onResize = function () {
              //@todo
              me._updateBox();

              me._updateTweenRefs();
            });
          }
        }
      }, {
        key: "_updateBox",
        value: function _updateBox() {
          var node = react_dom__WEBPACK_IMPORTED_MODULE_11___default.a.findDOMNode(this);

          if (node) {
            this._box.inited = true;
            this._box.x = node.offsetWidth;
            this._box.y = node.offsetHeight;
          }
        } // updateRefMap( target, map ) {
        //     Object.assign(this._tweenRefMaps[target], map);
        // }

      }, {
        key: "getTweenableRef",
        value: function getTweenableRef(target) {
          return this.refs[target] instanceof Element ? this.refs[target] : react_dom__WEBPACK_IMPORTED_MODULE_11___default.a.findDOMNode(this.refs[target]);
        }
      }, {
        key: "_updateTweenRefs",
        value: function _updateTweenRefs() {
          // if ( this._tweenEnabled ) {
          for (var i = 0, target, node; i < this._tweenRefTargets.length; i++) {
            target = this._tweenRefTargets[i]; // if ( this._tweenRefUnits[target].height )
            //     debugger;

            _utils__WEBPACK_IMPORTED_MODULE_12__["default"].mapInBoxCSS(this._tweenRefMaps[target], this._tweenRefCSS[target], this._box, this._tweenRefUnits[target]);
            node = this._tweenEnabled && target == "__root" ? react_dom__WEBPACK_IMPORTED_MODULE_11___default.a.findDOMNode(this) : this.getTweenableRef(target);
            node && Object.assign(node.style, this._tweenRefCSS[target]);
          } // }

        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          if (this._tweenEnabled) {
            this._tweenEnabled = false;
            window.removeEventListener("resize", this._onResize);
          }

          _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(TweenableComp.prototype), "componentWillUnmount", this) && _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(TweenableComp.prototype), "componentWillUnmount", this).call(this);
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {
          this._rendered = true;

          if (this._tweenEnabled) {
            // debugger;
            this._updateBox();

            this._updateTweenRefs();
          }

          if (this._delayedMotionTarget) {
            this.goToMotionStateId(this._delayedMotionTarget);
            delete this._delayedMotionTarget;
          }

          _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(TweenableComp.prototype), "componentDidMount", this) && _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(TweenableComp.prototype), "componentDidMount", this).call(this);
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
          var _this6 = this;

          if (this._tweenEnabled) {
            this._updateBox();

            this._updateTweenRefs();

            this._rtweensByProp && Object.keys(prevProps).forEach(function (k) {
              return _this6._rtweensByProp[k] && _this6.props[k] !== prevProps[k] && _this6._rtweensByProp[k][_this6.props[k]] && _this6.pushAnim(_this6._rtweensByProp[k][_this6.props[k]]
              /*get current pos*/
              );
            }, this);
            this._rtweensByStateProp && prevState && Object.keys(prevState).forEach(function (k) {
              return _this6._rtweensByStateProp[k] && _this6.state[k] !== prevState[k] && _this6._rtweensByStateProp[k][_this6.state[k]] && _this6.pushAnim(_this6._rtweensByStateProp[k][_this6.state[k]]
              /*get current pos*/
              );
            }, this);
          }

          _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(TweenableComp.prototype), "componentDidUpdate", this) && _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(TweenableComp.prototype), "componentDidUpdate", this).call(this); // return;
        }
      }, {
        key: "registerPropChangeAnim",
        value: function registerPropChangeAnim(propId, propValue, anims) {
          this._rtweensByProp = this._rtweensByProp || {};
          this._rtween = this._rtween || new rtween();
          this._rtweensByProp[propId] = this._rtweensByProp[propId] || {};
          this._rtweensByProp[propId][propValue] = this._rtweensByProp[propId][propValue] || new rtween();

          this._rtweensByProp[propId][propValue].mount(anims);
        }
      }, {
        key: "registerStateChangeAnim",
        value: function registerStateChangeAnim(propId, propValue, anims) {
          this._rtweensByStateProp = this._rtweensByStateProp || {};
          this._rtween = this._rtween || new rtween();
          this._rtweensByStateProp[propId] = this._rtweensByStateProp[propId] || {};
          this._rtweensByStateProp[propId][propValue] = this._rtweensByStateProp[propId][propValue] || new rtween();

          this._rtweensByStateProp[propId][propValue].mount(anims);
        }
      }]);

      return TweenableComp;
    }(BaseComponent)
  );
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: asTweener, Component, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "undefined?588e");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _asTweener__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./asTweener */ "./src/asTweener.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asTweener", function() { return _asTweener__WEBPACK_IMPORTED_MODULE_6__["default"]; });







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


var Component = Object(_asTweener__WEBPACK_IMPORTED_MODULE_6__["default"])({})(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

var TweenableComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(TweenableComponent, _Component);

  function TweenableComponent() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, TweenableComponent);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(TweenableComponent).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(TweenableComponent, [{
    key: "render",
    value: function render() {
      return 'Should have some render fn here in ' + this.constructor.displayName;
    }
  }]);

  return TweenableComponent;
}(Component);


/* harmony default export */ __webpack_exports__["default"] = (TweenableComponent);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
var is = __webpack_require__(/*! is */ "undefined?63a5"),
    floatCut = function floatCut(v, l) {
  var p = Math.pow(10, l);
  return Math.round(v * p) / p;
},
    slice = Array.prototype.slice,
    splice = Array.prototype.splice,
    abs = Math.abs,
    floor = Math.floor,
    round = Math.round,
    min = Math.min,
    max = Math.max,
    objBuilder = {}.constructor,
    _createElementAttr = {
  style: true,
  tagName: true,
  content: true,
  cls: true,
  events: true,
  $id: true
},
    _defaultUnits = {
  width: 'px',
  height: 'px',
  top: 'px'
},
    __;

/* harmony default export */ __webpack_exports__["default"] = ({
  mapInBoxCSS: function mapInBoxCSS(pos, css, box, units, offset) {
    //if ( is.number(pos.x) || is.number(pos.y))
    var t = '';
    if (is.number(pos._z) || is.number(pos._x) || is.number(pos._y) || is.number(pos.z) || is.number(pos.x) || is.number(pos.y)) t = 'translate3d(' + floatCut((pos._x || 0) * (box.x || 0) + (pos.x || 0) + (offset && offset.x || 0), 2) + (units && units.x || 'px') + ', ' + floatCut((pos._y || 0) * (box.y || 0) + (pos.y || 0) + (offset && offset.y || 0), 2) + (units && units.y || 'px') + ', ' + floatCut((pos._z || 0) * (box.z || 0) + (pos.z || 0) + (offset && offset.z || 0), 2) + (units && units.z || 'px') + '' + ')'; //@todo matrix

    if (pos.rotate && is.number(pos.rotate)) t += ' rotate(' + floatCut((pos.rotate || 0) % 360, 2) + 'deg)';
    if (pos.rotateX && is.number(pos.rotateX)) t += ' rotateX(' + floatCut((pos.rotateX || 0) % 360, 2) + 'deg)';
    if (pos.rotateY && is.number(pos.rotateY)) t += ' rotateY(' + floatCut((pos.rotateY || 0) % 360, 2) + 'deg)';
    if (is.number(pos.alpha)) css.opacity = min(1, max(0, floatCut(pos.alpha, 2)));
    css.transform = t;
    is.number(pos._width) && (css.width = pos._width * (box.x || 0) + 'px');
    is.number(pos._height) && (css.height = pos._height * (box.y || 0) + 'px');
    is.number(pos.width) && (css.width = pos.width + (units && units.x || 'px'));
    is.number(pos.height) && (css.height = pos.height + (units && units.y || 'px'));
    is.number(pos.zIndex) && (css.zIndex = pos.zIndex);
  }
});

/***/ }),

/***/ "./src/utils/easingFn.js":
/*!*******************************!*\
  !*** ./src/utils/easingFn.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
module.exports = {
  // t: current time, b: begInnIng value, c: change In value, d: duration
  def: 'easeOutQuad',
  cos: function cos(x, t, b, c, d) {
    //alert(jQuery.easing.default);
    var v = t <= .5 ? Math.sin(Math.PI * t) : Math.sin(Math.PI * (1 - t));
    if (t < 0 || t > 1) v = 0;
    return v;
  },
  cool: function cool(x, t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (7.795 * tc * ts + -25.5825 * ts * ts + 32.58 * tc + -20.39 * ts + 6.5975 * t);
  },
  easeInQuad: function easeInQuad(x, t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  easeOutQuad: function easeOutQuad(x, t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad: function easeInOutQuad(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * (--t * (t - 2) - 1) + b;
  },
  easeInCubic: function easeInCubic(x, t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic: function easeOutCubic(x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic: function easeInOutCubic(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  },
  easeInQuart: function easeInQuart(x, t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  },
  easeOutQuart: function easeOutQuart(x, t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOutQuart: function easeInOutQuart(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  },
  easeInQuint: function easeInQuint(x, t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOutQuint: function easeOutQuint(x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOutQuint: function easeInOutQuint(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  },
  easeInSine: function easeInSine(x, t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  easeOutSine: function easeOutSine(x, t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  easeInOutSine: function easeInOutSine(x, t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  easeInExpo: function easeInExpo(x, t, b, c, d) {
    return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  easeOutExpo: function easeOutExpo(x, t, b, c, d) {
    return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  },
  easeInOutExpo: function easeInOutExpo(x, t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function easeInCirc(x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc: function easeOutCirc(x, t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc: function easeInOutCirc(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  easeInElastic: function easeInElastic(x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * .3;

    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);

    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },
  easeOutElastic: function easeOutElastic(x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * .3;

    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);

    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  },
  easeInOutElastic: function easeInOutElastic(x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d / 2) == 2) return b + c;
    if (!p) p = d * (.3 * 1.5);

    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);

    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
  },
  easeInBack: function easeInBack(x, t, b, c, d, s) {
    if (t === d) return c;
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack: function easeOutBack(x, t, b, c, d, s) {
    if (t === d) return c;
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack: function easeInOutBack(x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
  },
  easeInBounce: function easeInBounce(x, t, b, c, d) {
    return c - this.easeOutBounce(x, d - t, 0, c, d) + b;
  },
  easeOutBounce: function easeOutBounce(x, t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
    }
  },
  easeInOutBounce: function easeInOutBounce(x, t, b, c, d) {
    if (t < d / 2) return this.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
    return this.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
  }
};

/***/ }),

/***/ "undefined?1c47":
/*!**************************!*\
  !*** external "isarray" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isarray");

/***/ }),

/***/ "undefined?44a8":
/*!*****************************!*\
  !*** external "isfunction" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isfunction");

/***/ }),

/***/ "undefined?588e":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "undefined?5e51":
/*!***************************!*\
  !*** external "isnumber" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isnumber");

/***/ }),

/***/ "undefined?5e9a":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),

/***/ "undefined?63a5":
/*!*********************!*\
  !*** external "is" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("is");

/***/ }),

/***/ "undefined?929e":
/*!*************************!*\
  !*** external "rtween" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rtween");

/***/ }),

/***/ "undefined?ce7d":
/*!***************************!*\
  !*** external "isstring" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isstring");

/***/ })

/******/ });
//# sourceMappingURL=Comp.js.map