/*!
 * react-voodoo
 * Copyright (C) 2019  Nathanael Braun
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
module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/MapOf.react_voodoo_utils_css_demux_____js.gen.js":
/*!**************************************************************!*\
  !*** ./src/MapOf.react_voodoo_utils_css_demux_____js.gen.js ***!
  \**************************************************************/
/*! exports provided: backgroundColor, boxShadow, filter, textShadow, transform, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backgroundColor", function() { return backgroundColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boxShadow", function() { return boxShadow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "textShadow", function() { return textShadow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transform", function() { return transform; });
/* This is a virtual file generated by layer-pack */
var req,
    _exports = {},
    walknSetExport = __webpack_require__(/*! layer-pack/etc/utils/indexUtils.js */ "undefined?7cef").walknSetExport;

var _react_voodoo_utils_css_demux_filter_js = __webpack_require__(/*! react-voodoo/utils/css/demux/filter.js */ "./src/utils/css/demux/filter.js");

walknSetExport(_exports, "filter", _react_voodoo_utils_css_demux_filter_js);

var _react_voodoo_utils_css_demux_boxShadow_js = __webpack_require__(/*! react-voodoo/utils/css/demux/boxShadow.js */ "./src/utils/css/demux/boxShadow.js");

walknSetExport(_exports, "boxShadow", _react_voodoo_utils_css_demux_boxShadow_js);

var _react_voodoo_utils_css_demux_transform_js = __webpack_require__(/*! react-voodoo/utils/css/demux/transform.js */ "./src/utils/css/demux/transform.js");

walknSetExport(_exports, "transform", _react_voodoo_utils_css_demux_transform_js);

var _react_voodoo_utils_css_demux_textShadow_js = __webpack_require__(/*! react-voodoo/utils/css/demux/textShadow.js */ "./src/utils/css/demux/textShadow.js");

walknSetExport(_exports, "textShadow", _react_voodoo_utils_css_demux_textShadow_js);

var _react_voodoo_utils_css_demux_backgroundColor_js = __webpack_require__(/*! react-voodoo/utils/css/demux/backgroundColor.js */ "./src/utils/css/demux/backgroundColor.js");

walknSetExport(_exports, "backgroundColor", _react_voodoo_utils_css_demux_backgroundColor_js);
var backgroundColor = _exports.backgroundColor;
var boxShadow = _exports.boxShadow;
var filter = _exports.filter;
var textShadow = _exports.textShadow;
var transform = _exports.transform;
/* harmony default export */ __webpack_exports__["default"] = (_exports);

/***/ }),

/***/ "./src/MapOf.react_voodoo_utils_css_demux_typed_____js.gen.js":
/*!********************************************************************!*\
  !*** ./src/MapOf.react_voodoo_utils_css_demux_typed_____js.gen.js ***!
  \********************************************************************/
/*! exports provided: bool, border, color, int, multi, number, ratio, shadow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bool", function() { return bool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "border", function() { return border; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "color", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "int", function() { return int; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multi", function() { return multi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number", function() { return number; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ratio", function() { return ratio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shadow", function() { return shadow; });
/* This is a virtual file generated by layer-pack */
var req,
    _exports = {},
    walknSetExport = __webpack_require__(/*! layer-pack/etc/utils/indexUtils.js */ "undefined?7cef").walknSetExport;

var _react_voodoo_utils_css_demux_typed_int_js = __webpack_require__(/*! react-voodoo/utils/css/demux/typed/int.js */ "./src/utils/css/demux/typed/int.js");

walknSetExport(_exports, "int", _react_voodoo_utils_css_demux_typed_int_js);

var _react_voodoo_utils_css_demux_typed_bool_js = __webpack_require__(/*! react-voodoo/utils/css/demux/typed/bool.js */ "./src/utils/css/demux/typed/bool.js");

walknSetExport(_exports, "bool", _react_voodoo_utils_css_demux_typed_bool_js);

var _react_voodoo_utils_css_demux_typed_color_js = __webpack_require__(/*! react-voodoo/utils/css/demux/typed/color.js */ "./src/utils/css/demux/typed/color.js");

walknSetExport(_exports, "color", _react_voodoo_utils_css_demux_typed_color_js);

var _react_voodoo_utils_css_demux_typed_multi_js = __webpack_require__(/*! react-voodoo/utils/css/demux/typed/multi.js */ "./src/utils/css/demux/typed/multi.js");

walknSetExport(_exports, "multi", _react_voodoo_utils_css_demux_typed_multi_js);

var _react_voodoo_utils_css_demux_typed_ratio_js = __webpack_require__(/*! react-voodoo/utils/css/demux/typed/ratio.js */ "./src/utils/css/demux/typed/ratio.js");

walknSetExport(_exports, "ratio", _react_voodoo_utils_css_demux_typed_ratio_js);

var _react_voodoo_utils_css_demux_typed_border_js = __webpack_require__(/*! react-voodoo/utils/css/demux/typed/border.js */ "./src/utils/css/demux/typed/border.js");

walknSetExport(_exports, "border", _react_voodoo_utils_css_demux_typed_border_js);

var _react_voodoo_utils_css_demux_typed_number_js = __webpack_require__(/*! react-voodoo/utils/css/demux/typed/number.js */ "./src/utils/css/demux/typed/number.js");

walknSetExport(_exports, "number", _react_voodoo_utils_css_demux_typed_number_js);

var _react_voodoo_utils_css_demux_typed_shadow_js = __webpack_require__(/*! react-voodoo/utils/css/demux/typed/shadow.js */ "./src/utils/css/demux/typed/shadow.js");

walknSetExport(_exports, "shadow", _react_voodoo_utils_css_demux_typed_shadow_js);
var bool = _exports.bool;
var border = _exports.border;
var color = _exports.color;
var int = _exports.int;
var multi = _exports.multi;
var number = _exports.number;
var ratio = _exports.ratio;
var shadow = _exports.shadow;
/* harmony default export */ __webpack_exports__["default"] = (_exports);

/***/ }),

/***/ "./src/comps/Axis.js":
/*!***************************!*\
  !*** ./src/comps/Axis.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Axis; });
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "undefined?cdfe");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fast-deep-equal */ "undefined?8c1d");
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "undefined?3832");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "undefined?588e");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _TweenerContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TweenerContext */ "./src/comps/TweenerContext.js");


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





var Axis = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default()(Axis, _React$Component);

  function Axis() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {};
    return _this;
  }

  var _proto = Axis.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this2 = this;

    if (this._tweenLines) {
      Object.keys(this._tweenLines).forEach(function (axe) {
        return _this2._previousTweener.rmScrollableAnim(_this2._tweenLines[axe], axe);
      });
    }

    delete this._previousTweener;
    delete this._previousScrollable;
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props = this.props,
        children = _this$props.children,
        axe = _this$props.axe,
        scrollFirst = _this$props.scrollFirst,
        bounds = _this$props.bounds,
        scrollableWindow = _this$props.scrollableWindow,
        inertia = _this$props.inertia,
        size = _this$props.size,
        defaultPosition = _this$props.defaultPosition,
        _this$props$items = _this$props.items,
        items = _this$props$items === void 0 ? [] : _this$props$items;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_TweenerContext__WEBPACK_IMPORTED_MODULE_4__["default"].Consumer, null, function (tweener) {
      if (!_this3._previousAxis || _this3._previousAxis !== axe) {
        //....
        _this3._previousAxis = axe;
        _this3._previousInertia = inertia;
        tweener.initAxis(axe, {
          inertia: inertia,
          size: size,
          scrollableWindow: scrollableWindow,
          defaultPosition: defaultPosition,
          scrollFirst: scrollFirst,
          scrollableBounds: bounds
        }, true);
      } else if (!_this3._previousInertia || _this3._previousInertia !== inertia) {
        //....
        _this3._previousInertia = inertia;
        _this3._previousAxis = axe;
        tweener.initAxis(axe, {
          inertia: inertia,
          size: size,
          scrollableWindow: scrollableWindow,
          defaultPosition: defaultPosition,
          scrollFirst: scrollFirst,
          scrollableBounds: bounds
        });
      }

      if (!_this3._previousTweener || _this3._previousTweener !== tweener) {
        // mk axe not modifiable
        _this3._previousTweener && _this3._lastTL && _this3._previousTweener.rmScrollableAnim(_this3._lastTL, _this3._previousAxis);
        if (items.length) _this3._lastTL = tweener.addScrollableAnim(items, axe, size);
        _this3._previousTweener = tweener;
        _this3._previousTweens = items;
      } else if (_this3._previousTweens !== items && !(_this3._previousTweens && fast_deep_equal__WEBPACK_IMPORTED_MODULE_1___default()(items, _this3._previousTweens))) {
        _this3._lastTL && _this3._previousTweener && _this3._previousTweener.rmScrollableAnim(_this3._lastTL, _this3._previousAxis);
        _this3._lastTL = null;
        if (items.length) _this3._lastTL = tweener.addScrollableAnim(items, axe, size);
        _this3._previousTweens = items;
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null);
    });
  };

  return Axis;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

Axis.propTypes = {
  axe: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  items: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
  bounds: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
  inertia: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.any,
  defaultPosition: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  size: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.any
};


/***/ }),

/***/ "./src/comps/Draggable.js":
/*!********************************!*\
  !*** ./src/comps/Draggable.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Draggable; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "undefined?df9b");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "undefined?188d");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "undefined?cdfe");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fast-deep-equal */ "undefined?8c1d");
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "undefined?3832");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "undefined?588e");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-dom */ "undefined?5e9a");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/dom */ "./src/utils/dom.js");
/* harmony import */ var _spells_withTweener__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../spells/withTweener */ "./src/spells/withTweener.js");




var _class, _class2, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/*
 *   The MIT License (MIT)
 *   Copyright (c) 2019. Wise Wild Web
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








var Draggable = Object(_spells_withTweener__WEBPACK_IMPORTED_MODULE_9__["default"])(_class = (_temp = _class2 = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default()(Draggable, _React$Component);

  function Draggable() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {};
    _this._ = {};
    _this.root = react__WEBPACK_IMPORTED_MODULE_6___default.a.createRef();
    return _this;
  }

  var _proto = Draggable.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this$root;

    var node = (_this$root = this.root) === null || _this$root === void 0 ? void 0 : _this$root.current;

    if (this._.scrollEnabled) {
      this._.scrollEnabled = false; //this._.axes          = undefined;

      node && this._.dragList && _utils_dom__WEBPACK_IMPORTED_MODULE_8__["default"].removeEvent(node, this._.dragList);
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    this._registerScrollListeners();
  }
  /**
   * Return scrollable parent node list basing a dom node
   * @param node
   * @returns {T[]}
   */
  ;

  _proto.getScrollableNodes = function getScrollableNodes(node) {
    var _this2 = this;

    var scrollable = _utils_dom__WEBPACK_IMPORTED_MODULE_8__["default"].findReactParents(node),
        _ = this._;
    return scrollable.map(function (id) {
      return is__WEBPACK_IMPORTED_MODULE_4___default.a.string(id) ? _this2._.refs[id] && react_dom__WEBPACK_IMPORTED_MODULE_7___default.a.findDOMNode(_this2._.refs[id]) || _this2.refs[id] || document.getElementById(id) : id;
    });
  }
  /**
   * todo rewrite or use lib
   * Init touch & scroll listeners
   * Drive scroll & drag values updates
   * @private
   */
  ;

  _proto._registerScrollListeners = function _registerScrollListeners() {
    var _this$root2,
        _this3 = this;

    var rootNode = (_this$root2 = this.root) === null || _this$root2 === void 0 ? void 0 : _this$root2.current,
        _this$props = this.props,
        xAxis = _this$props.xAxis,
        yAxis = _this$props.yAxis,
        tweener = _this$props.tweener,
        lastStartTm,
        cLock,
        dX,
        parents,
        dY,
        parentsState,
        _ = tweener._;

    if (rootNode) {
      _utils_dom__WEBPACK_IMPORTED_MODULE_8__["default"].addEvent(rootNode, this._.dragList = {
        'dragstart': function dragstart(e, touch, descr) {
          //@todo
          var pTweener, x, y, i, style;
          parents = _this3.getScrollableNodes(e.target); //console.log("start")

          lastStartTm = Date.now();
          dX = 0;
          dY = 0;
          parentsState = [];

          for (i = 0; i < parents.length; i++) {
            pTweener = parents[i]; // react comp with tweener support

            if (pTweener.__isTweener) {
              var _pTweener$axes, _pTweener$axes2;

              x = xAxis && ((_pTweener$axes = pTweener.axes) === null || _pTweener$axes === void 0 ? void 0 : _pTweener$axes[xAxis]);
              y = yAxis && ((_pTweener$axes2 = pTweener.axes) === null || _pTweener$axes2 === void 0 ? void 0 : _pTweener$axes2[yAxis]);

              pTweener._updateNodeInertia();
            }
          } //tweener._updateNodeInertia()
          //e.stopPropagation();
          //e.preventDefault();

        },
        'click': function click(e, touch, descr) {
          //@todo
          if (lastStartTm && !(lastStartTm > Date.now() - _.options.maxClickTm && Math.abs(dY) < _.options.maxClickOffset && Math.abs(dX) < _.options.maxClickOffset)) {
            e.preventDefault();
            e.stopPropagation(); //console.log("prevented click", Math.abs(dX), Math.abs(dY))
            //console.log(':o ' + (lastStartTm - Date.now()) + ' ' + dX + ' ' + dY)
          } //else console.log("click", Math.abs(dX), Math.abs(dY))

        },
        'drag': function drag(e, touch, descr) {
          //@todo
          var pTweener, x, deltaX, xDispatched, vX, y, deltaY, yDispatched, vY, cState, i;
          dX = -(descr._lastPos.x - descr._startPos.x);
          dY = -(descr._lastPos.y - descr._startPos.y);

          if (lastStartTm && lastStartTm > Date.now() - _.options.maxClickTm && Math.abs(dY) < _.options.maxClickOffset && Math.abs(dX) < _.options.maxClickOffset) // skip tap & click
            {
              //console.log(':u ' + (lastStartTm - Date.now()) + ' ' + dX + ' ' + dY)
              return;
            } else {
            xDispatched = !dX;
            yDispatched = !dY;

            if (_.options.dragDirectionLock) {
              if (cLock === "Y" || !cLock && Math.abs(dY * .5) > Math.abs(dX)) {
                cLock = "Y";
                dX = 0; //xDispatched = true;
              } else if (cLock === "X" || !cLock && Math.abs(dX * .5) > Math.abs(dY)) {
                cLock = "X";
                dY = 0; //yDispatched = true;
              }
            }

            for (i = 0; i < parents.length; i++) {
              pTweener = parents[i]; // react comp with tweener support

              if (pTweener.__isTweener) {
                var _pTweener$axes3, _pTweener$axes4, _x3, _x3$inertia, _y3, _y3$inertia;

                x = xAxis && ((_pTweener$axes3 = pTweener.axes) === null || _pTweener$axes3 === void 0 ? void 0 : _pTweener$axes3[xAxis]);
                y = yAxis && ((_pTweener$axes4 = pTweener.axes) === null || _pTweener$axes4 === void 0 ? void 0 : _pTweener$axes4[yAxis]); //console.log("drag", dX, dY, x);

                if (!parentsState[i]) {
                  var _x, _y, _x2, _x2$inertia, _y2, _y2$inertia;

                  parentsState[i] = {
                    x: (_x = x) === null || _x === void 0 ? void 0 : _x.scrollPos,
                    y: (_y = y) === null || _y === void 0 ? void 0 : _y.scrollPos
                  };
                  (_x2 = x) === null || _x2 === void 0 ? void 0 : (_x2$inertia = _x2.inertia) === null || _x2$inertia === void 0 ? void 0 : _x2$inertia.startMove();
                  (_y2 = y) === null || _y2 === void 0 ? void 0 : (_y2$inertia = _y2.inertia) === null || _y2$inertia === void 0 ? void 0 : _y2$inertia.startMove();
                  xAxis && !x.inertiaFrame && pTweener.applyInertia(x, xAxis);
                  yAxis && !y.inertiaFrame && pTweener.applyInertia(y, yAxis); //console.warn('Draggable::drag:190: ');
                }

                if (x) deltaX = dX && dX / pTweener._.box.x * (x.scrollableWindow || x.scrollableArea) || 0;
                if (y) deltaY = dY && dY / pTweener._.box.y * (y.scrollableWindow || y.scrollableArea) || 0; //console.log('Draggable::drag:178: ', parentsState[i].x + deltaX,
                // x?.inertia?._.max, x?.inertia?.isInbound(parentsState[i].x + deltaX));

                if (!xDispatched && deltaX && ((_x3 = x) === null || _x3 === void 0 ? void 0 : (_x3$inertia = _x3.inertia) === null || _x3$inertia === void 0 ? void 0 : _x3$inertia.isInbound(parentsState[i].x + deltaX)) && pTweener.componentShouldScroll(xAxis, deltaX)) {
                  x.inertia.hold(parentsState[i].x + deltaX);
                  xDispatched = true;
                } //console.log("scrollY", yDispatched, y?.inertia?.isInbound(parentsState[i].y + deltaY), parentsState[i].y + deltaY);


                if (!yDispatched && deltaY && ((_y3 = y) === null || _y3 === void 0 ? void 0 : (_y3$inertia = _y3.inertia) === null || _y3$inertia === void 0 ? void 0 : _y3$inertia.isInbound(parentsState[i].y + deltaY)) && pTweener.componentShouldScroll(yAxis, deltaY)) {
                  y.inertia.hold(parentsState[i].y + deltaY);
                  console.log('Draggable::drag:190: ', parentsState[i].y, deltaY);
                  yDispatched = true;
                }
              }
            }

            if (yDispatched && xDispatched) {} //e.stopPropagation();
            //e.cancelable && e.preventDefault();
            //return;
            //dX = 0;
            //dY = 0;

          }
        },
        'dropped': function dropped(e, touch, descr) {
          var pTweener, x, deltaX, xDispatched, vX, y, deltaY, yDispatched, vY, cState, i;
          cLock = undefined; //lastStartTm                     = undefined;
          //document.body.style.userSelect  = '';
          //document.body.style.touchAction = '';

          for (i = 0; i < parents.length; i++) {
            pTweener = parents[i]; // react comp with tweener support

            if (pTweener.__isTweener && parentsState[i]) {
              var _pTweener$axes5, _pTweener$axes5$xAxis, _pTweener$axes5$xAxis2, _pTweener$axes6, _pTweener$axes6$yAxis, _pTweener$axes6$yAxis2;

              //console.log('Draggable::dropped:228: ', pTweener._getAxis(xAxis)?.inertia);
              (_pTweener$axes5 = pTweener.axes) === null || _pTweener$axes5 === void 0 ? void 0 : (_pTweener$axes5$xAxis = _pTweener$axes5[xAxis]) === null || _pTweener$axes5$xAxis === void 0 ? void 0 : (_pTweener$axes5$xAxis2 = _pTweener$axes5$xAxis.inertia) === null || _pTweener$axes5$xAxis2 === void 0 ? void 0 : _pTweener$axes5$xAxis2.release();
              (_pTweener$axes6 = pTweener.axes) === null || _pTweener$axes6 === void 0 ? void 0 : (_pTweener$axes6$yAxis = _pTweener$axes6[yAxis]) === null || _pTweener$axes6$yAxis === void 0 ? void 0 : (_pTweener$axes6$yAxis2 = _pTweener$axes6$yAxis.inertia) === null || _pTweener$axes6$yAxis2 === void 0 ? void 0 : _pTweener$axes6$yAxis2.release(); //pTweener._updateNodeInertia()
            } //else if ( is.element(tweener) ) {
            //	cState = parentsState[i];
            //	if ( cState ) {
            //		cState.inertia.x.release();
            //		cState.inertia.y.release();
            //	}
            //}

          }

          if (lastStartTm && !(lastStartTm > Date.now() - _.options.maxClickTm && Math.abs(dY) < _.options.maxClickOffset && Math.abs(dX) < _.options.maxClickOffset)) // skip tap
            // &
            // click
            {
              e.stopPropagation();
              e.cancelable && e.preventDefault(); //console.log("prevented", Math.abs(dX), Math.abs(dY))
              //return;
            } //else {
          //console.log("not prevented", Math.abs(dX), Math.abs(dY))
          //}
          //lastStartTm = 0;


          parents = parentsState = null;
        }
      }, null, _.options.enableMouseDrag);
      this._.doRegister = !!rootNode;
    } else {
      this._.doRegister = true;
    }
  };

  _proto.getProps = function getProps() {
    var props = this.props;
    props = _objectSpread({}, props);
    delete props.Comp;
    delete props.xAxis;
    delete props.yAxis;
    delete props.tweener;
    delete props.forwardedRef;
    return props;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        Comp = _this$props2.Comp,
        forwardedRef = _this$props2.forwardedRef,
        _this$props2$items = _this$props2.items,
        items = _this$props2$items === void 0 ? [] : _this$props2$items;

    if (forwardedRef) {//this.root =  forwardedRef;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Comp, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, this.getProps(), {
      ref: this.root
    }), children);
  };

  return Draggable;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component), _class2.propTypes = {
  xAxis: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,
  yAxis: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string
}, _class2.defaultProps = {
  Comp: 'div'
}, _temp)) || _class;



Draggable.div = function (props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Draggable, props);
};

/***/ }),

/***/ "./src/comps/Node.js":
/*!***************************!*\
  !*** ./src/comps/Node.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Node; });
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "undefined?2618");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "undefined?cdfe");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "undefined?188d");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fast-deep-equal */ "undefined?8c1d");
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "undefined?588e");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! shortid */ "undefined?beec");
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(shortid__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _TweenerContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TweenerContext */ "./src/comps/TweenerContext.js");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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






function setTarget(anims, target) {
  return anims.map(function (tween) {
    return _objectSpread({}, tween, {
      target: target
    });
  });
}

var Node = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default()(Node, _React$Component);

  function Node() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {};
    _this.__tweenableId = shortid__WEBPACK_IMPORTED_MODULE_6___default.a.generate();
    return _this;
  }

  var _proto = Node.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this2 = this;

    if (this._tweenAxisObj) {
      Object.keys(this._tweenAxisObj).forEach(function (axe) {
        return _this2._currentTweener.rmScrollableAnim(_this2._tweenAxisObj[axe], axe);
      });
    }

    if (this._currentTweener) {
      this._currentTweener.rmTweenRef(this.__tweenableId);

      this._currentTweener.setRootRef(undefined);
    }

    delete this._currentTweener;
    delete this._tweenAxisObj;
    delete this._previousScrollable;
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props = this.props,
        children = _this$props.children,
        _this$props$id = _this$props.id,
        id = _this$props$id === void 0 ? this.__tweenableId : _this$props$id,
        style = _this$props.style,
        initial = _this$props.initial,
        pos = _this$props.pos,
        noRef = _this$props.noRef,
        reset = _this$props.reset,
        tweener = _this$props.tweener,
        isRoot = _this$props.isRoot,
        tweenLines = _this$props.tweenLines,
        _this$props$tweenAxis = _this$props.tweenAxis,
        tweenAxis = _this$props$tweenAxis === void 0 ? tweenLines : _this$props$tweenAxis,
        _this$props$onClick = _this$props.onClick,
        onClick = _this$props$onClick === void 0 ? children && children.props && children.props.onClick : _this$props$onClick,
        _this$props$onDoubleC = _this$props.onDoubleClick,
        onDoubleClick = _this$props$onDoubleC === void 0 ? children && children.props && children.props.onDoubleClick : _this$props$onDoubleC;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_TweenerContext__WEBPACK_IMPORTED_MODULE_7__["default"].Consumer, null, function (parentTweener) {
      //@todo : must be better method
      parentTweener = tweener || parentTweener;

      if (!parentTweener) {
        console.error("No voodoo tweener found in the context, is there any parent with asTweener ?");
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null);
      } //console.warn("render : ", this.__tweenableId, this._currentTweener, parentTweener,
      // this._currentTweener !== parentTweener)


      var twRef = parentTweener.tweenRef(id, children.props && children.props.style, style || initial, pos, noRef),
          axisItemsChange; //console.warn("render2 : ", this.__tweenableId, this._currentTweener, parentTweener,
      // this._currentTweener !== parentTweener)

      if (_this3._currentTweener !== parentTweener || _this3._previousScrollable !== tweenAxis) {
        axisItemsChange = _this3._tweenAxis !== tweenAxis && !(_this3._tweenAxis && fast_deep_equal__WEBPACK_IMPORTED_MODULE_3___default()(tweenAxis, _this3._tweenAxis));

        if (_this3._currentTweener && axisItemsChange) {
          _this3._tweenAxisObj && Object.keys(_this3._tweenAxisObj).forEach(function (axe) {
            return _this3._currentTweener.rmScrollableAnim(_this3._tweenAxisObj[axe], axe);
          });
        } //console.log(twRef, axisItemsChange, this._tweenAxis, tweenAxis)


        if (_this3._currentTweener && _this3._currentTweener !== parentTweener) {
          _this3._currentTweener.rmTweenRef(id);
        }

        if (axisItemsChange) {
          _this3._tweenAxis = tweenAxis;
          if (tweenAxis && is__WEBPACK_IMPORTED_MODULE_4___default.a.array(tweenAxis)) _this3._tweenAxisObj = {
            scrollY: parentTweener.addScrollableAnim(setTarget(tweenAxis, id))
          };else _this3._tweenAxisObj = tweenAxis && Object.keys(tweenAxis).reduce(function (h, axe) {
            return h[axe] = parentTweener.addScrollableAnim(setTarget(tweenAxis[axe], id), axe), h;
          }, {});
          twRef = parentTweener.tweenRef(id, children.props && children.props.style, style || initial, pos, noRef);
        }

        twRef.style = _objectSpread({}, parentTweener._updateTweenRef(id, true));

        if (_this3.props.hasOwnProperty("isRoot")) {
          _this3._currentTweener && _this3._currentTweener.setRootRef(undefined);
          tweener.setRootRef(id);
        }

        _this3._currentTweener = parentTweener;
        _this3._previousScrollable = tweenAxis;
      } else if (twRef) {
        twRef.style = _objectSpread({}, parentTweener._updateTweenRef(id, true));
      }

      var refChild = react__WEBPACK_IMPORTED_MODULE_5___default.a.Children.only(children);

      if (refChild && react__WEBPACK_IMPORTED_MODULE_5___default.a.isValidElement(refChild)) {
        refChild = react__WEBPACK_IMPORTED_MODULE_5___default.a.cloneElement(refChild, _objectSpread({}, twRef, {
          onDoubleClick: onDoubleClick && function (e) {
            return onDoubleClick(e, parentTweener);
          },
          onClick: onClick && function (e) {
            return onClick(e, parentTweener);
          }
        }));
        _this3._lastRef = twRef;
        return refChild;
      } else {
        console.error("Invalid voodoo Node child : ", id);
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, "Invalid");
    });
  };

  return Node;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

Node.propTypes = {};


Node.div = function (_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0___default()(_ref, ["children", "className"]);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Node, props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
    className: className
  }, children));
};

/***/ }),

/***/ "./src/comps/TweenerContext.js":
/*!*************************************!*\
  !*** ./src/comps/TweenerContext.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "undefined?588e");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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

var TweenerContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(null);
/* harmony default export */ __webpack_exports__["default"] = (TweenerContext);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "undefined?cdfe");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "undefined?588e");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _comps_Axis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comps/Axis */ "./src/comps/Axis.js");
/* harmony import */ var _comps_TweenerContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./comps/TweenerContext */ "./src/comps/TweenerContext.js");
/* harmony import */ var _comps_Node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./comps/Node */ "./src/comps/Node.js");
/* harmony import */ var _comps_Draggable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./comps/Draggable */ "./src/comps/Draggable.js");
/* harmony import */ var _spells_asTweener__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./spells/asTweener */ "./src/spells/asTweener.js");
/* harmony import */ var _spells_withTweener__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./spells/withTweener */ "./src/spells/withTweener.js");
/* harmony import */ var _utils_dom_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/dom.js */ "./src/utils/dom.js");
/* harmony import */ var _utils_tweenTools_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/tweenTools.js */ "./src/utils/tweenTools.js");


var _class;

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










var Component = Object(_spells_asTweener__WEBPACK_IMPORTED_MODULE_6__["default"])(_class = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_0___default()(Component, _React$Component);

  function Component() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Component.prototype;

  _proto.render = function render() {
    return this.props.children;
  };

  return Component;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component)) || _class;

/* harmony default export */ __webpack_exports__["default"] = ({
  tweener: _spells_asTweener__WEBPACK_IMPORTED_MODULE_6__["default"],
  child: _spells_withTweener__WEBPACK_IMPORTED_MODULE_7__["default"],
  tools: _utils_tweenTools_js__WEBPACK_IMPORTED_MODULE_9__,
  Draggable: _comps_Draggable__WEBPACK_IMPORTED_MODULE_5__["default"],
  Component: Component,
  Node: _comps_Node__WEBPACK_IMPORTED_MODULE_4__["default"],
  context: _comps_TweenerContext__WEBPACK_IMPORTED_MODULE_3__["default"],
  Axis: _comps_Axis__WEBPACK_IMPORTED_MODULE_2__["default"],
  dom: _utils_dom_js__WEBPACK_IMPORTED_MODULE_8__["default"]
});

/***/ }),

/***/ "./src/spells/asTweener.js":
/*!*********************************!*\
  !*** ./src/spells/asTweener.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return asTweener; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "undefined?df9b");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "undefined?188d");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "undefined?e4e5");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "undefined?cdfe");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var d3_ease__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-ease */ "undefined?25b8");
/* harmony import */ var d3_ease__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(d3_ease__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fast-deep-equal */ "undefined?8c1d");
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "undefined?588e");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-dom */ "undefined?5e9a");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _comps_TweenerContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../comps/TweenerContext */ "./src/comps/TweenerContext.js");
/* harmony import */ var _utils_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/css */ "./src/utils/css/index.js");
/* harmony import */ var _utils_CssTweenAxis__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/CssTweenAxis */ "./src/utils/CssTweenAxis.js");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/dom */ "./src/utils/dom.js");
/* harmony import */ var _utils_inertia__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/inertia */ "./src/utils/inertia.js");





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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










/**
 * @todo : clean & comments
 */

var isBrowserSide = new Function("try {return this===window;}catch(e){ return false;}")(),
    isArray = is__WEBPACK_IMPORTED_MODULE_6___default.a.array,
    _live,
    lastTm,
    _running = [];

var SimpleObjectProto = {}.constructor;
var Runner = {
  run: function run(tl, ctx, duration, cb) {
    var apply = function apply(pos, size) {
      return tl.go(pos / size, ctx);
    };

    _running.push({
      apply: apply,
      duration: duration,
      cpos: 0,
      cb: cb
    });

    tl.go(0, ctx, true); //reset tl

    if (!_live) {
      _live = true;
      lastTm = Date.now(); // console.log("TL runner On");

      setTimeout(this._tick, 16);
    }
  },
  _tick: function _tick() {
    var i = 0,
        o,
        tm = Date.now(),
        delta = tm - lastTm;
    lastTm = tm;

    for (; i < _running.length; i++) {
      _running[i].cpos = Math.min(delta + _running[i].cpos, _running[i].duration); //cpos

      _running[i].apply(_running[i].cpos, _running[i].duration); // console.log("TL runner ",_running[i][3]);


      if (_running[i].cpos == _running[i].duration) {
        _running[i].cb && setTimeout(_running[i].cb);
        _running.splice(i, 1), i--;
      }
    }

    if (_running.length) setTimeout(_tick, 16);else {
      // console.log("TL runner Off");
      _live = false;
    }
  }
};

var TweenableComp = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(TweenableComp, _React$Component);

  function TweenableComp(props) {
    var _this;

    _this = _React$Component.apply(this, arguments) || this;
    _this.axes = {};

    _this._updateNodeInertia = function () {
      var _ = _this._,
          current,
          ln = _.activeInertia.length;
      if (_this._inertiaRaf) cancelAnimationFrame(_this._inertiaRaf);

      for (var i = 0; ln > i; i++) {
        current = _.activeInertia[i];

        if (current.inertia.x.active || current.inertia.x.holding) {
          current.target.scrollLeft = ~~current.inertia.x.update();
        }

        if (current.inertia.y.active || current.inertia.y.holding) {
          current.target.scrollTop = ~~current.inertia.y.update();
        }

        if (!current.inertia.x.active && !current.inertia.y.active && !current.inertia.x.holding && !current.inertia.y.holding) {
          _.activeInertia.slice(i, 1);

          i--;
          ln--;
        }
      }

      if (ln !== 0) _this._inertiaRaf = requestAnimationFrame(_this._updateNodeInertia);else _this._inertiaRaf = null;
    };

    _this._swap = {};

    var _2 = _this._ = {
      refs: {},
      muxByTarget: {}
    };

    _2.box = {
      x: 100,
      y: 100,
      z: 800
    };
    _this.__isTweener = true;
    _2._rafLoop = _this._rafLoop.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _2.rootRef = _this.props.forwardedRef || react__WEBPACK_IMPORTED_MODULE_7___default.a.createRef();
    _2.options = _objectSpread({
      enableMouseScroll: true
    }, props.tweenerOptions || {});
    _2.tweenRefCSS = {};
    _2.tweenRefs = {};
    _2.tweenRefMaps = {};
    _2.iMapOrigin = {};
    _2.tweenRefInitialData = {};
    _2.tweenEnabled = true;
    _2.tweenRefOrigin = {};
    _2.tweenRefOriginCss = {};
    _2.muxDataByTarget = _2.muxDataByTarget || {};
    _2.tweenRefDemuxed = _2.tweenRefDemuxed || {};
    _2.tweenRefTargets = _2.tweenRefTargets || [];
    _2.runningAnims = _2.runningAnims || [];
    _2.scrollHook = [];
    _2.activeInertia = [];
    isBrowserSide && window.addEventListener("resize", _this._.onResize = function (e) {
      var _$rootRef, _$rootRef$current, _$rootRef$current$win;

      //@todo
      _this._updateBox();

      _this._updateTweenRefs();

      (_$rootRef = _2.rootRef) === null || _$rootRef === void 0 ? void 0 : (_$rootRef$current = _$rootRef.current) === null || _$rootRef$current === void 0 ? void 0 : (_$rootRef$current$win = _$rootRef$current.windowDidResize) === null || _$rootRef$current$win === void 0 ? void 0 : _$rootRef$current$win.call(_$rootRef$current, e);
    });
    return _this;
  }

  var _proto = TweenableComp.prototype;

  // ------------------------------------------------------------
  // -------------------- TweenRefs utils -----------------------
  // ------------------------------------------------------------

  /**
   * Register tweenable element
   * return its current style
   * @param id
   * @param iStyle
   * @param iMap
   * @param pos
   * @param noref
   * @param mapReset
   * @returns {style,ref}
   */
  _proto.tweenRef = function tweenRef(id, iStyle, iMap, pos, noref, mapReset) {
    if (iStyle === void 0) {
      iStyle = {};
    }

    if (iMap === void 0) {
      iMap = {};
    }

    // ref initial style
    var _ = this._,
        tweenableMap = {};
    var initials = {};
    if (!_.tweenRefs[id]) _.tweenRefTargets.push(id); //debugger
    //console.warn('ref ', id, { ...iMap })

    if (_.tweenRefs[id] && (mapReset || _.iMapOrigin[id] !== iMap && !fast_deep_equal__WEBPACK_IMPORTED_MODULE_5___default()(iMap, _.iMapOrigin[id]) || _.tweenRefOriginCss[id] !== iStyle && !fast_deep_equal__WEBPACK_IMPORTED_MODULE_5___default()(iStyle, _.tweenRefOriginCss[id]))) {
      // hot switch initial values
      //console.warn('ref exist & style is !==', id, iStyle,
      //             _.tweenRefOriginCss[id], mapReset)
      _.iMapOrigin[id] = iMap;
      _.tweenRefOriginCss[id] = iStyle;
      iStyle = iStyle || {};
      iMap = iMap || {};
      iStyle = _objectSpread({}, iStyle, {}, Object(_utils_css__WEBPACK_IMPORTED_MODULE_10__["deMuxTween"])(iMap, tweenableMap, initials, _.muxDataByTarget[id], _.muxByTarget[id], false, true)); //console.log("update ref", id)
      // minus initial values

      Object.keys(_.tweenRefOrigin[id]).forEach(function (key) {
        return _.tweenRefMaps[id][key] -= _.tweenRefOrigin[id][key];
      }); // set defaults values in case of

      Object.keys(initials).forEach(function (key) {
        return _.tweenRefMaps[id][key] = is__WEBPACK_IMPORTED_MODULE_6___default.a.number(_.tweenRefMaps[id][key]) ? _.tweenRefMaps[id][key] : initials[key];
      }); // add new initial values

      Object.keys(tweenableMap).forEach(function (key) {
        return _.tweenRefMaps[id][key] += tweenableMap[key];
      });
      Object.keys(_.tweenRefOrigin[id]) // unset
      .forEach(function (key) {
        Object(_utils_css__WEBPACK_IMPORTED_MODULE_10__["clearTweenableValue"])(key, key, _.tweenRefMaps[id], _.tweenRefCSS[id], _.muxDataByTarget[id], _.muxByTarget[id]);
      });
      _.tweenRefOrigin[id] = _objectSpread({}, tweenableMap);
      Object(_utils_css__WEBPACK_IMPORTED_MODULE_10__["muxToCss"])(_.tweenRefMaps[id], _.tweenRefCSS[id], _.muxByTarget[id], _.muxDataByTarget[id], _.box);

      this._updateTweenRef(id, true);
    } else if (!_.tweenRefs[id]) {
      //console.log("init ref", id)
      _.iMapOrigin[id] = iMap;
      iStyle = iStyle || {};
      iMap = iMap || {};
      _.tweenRefs[id] = true;
      _.muxByTarget[id] = _.muxByTarget[id] || {};
      _.muxDataByTarget[id] = _.muxDataByTarget[id] || {};
      _.tweenRefOriginCss[id] = iStyle;
      _.tweenRefMaps[id] = _.tweenRefMaps[id] || {};

      if (_.tweenRefOrigin[id]) {
        //debugger
        // minus initial values from axis pre init
        //Object.keys(_.tweenRefOrigin[id])
        //      .forEach(
        //	      key => (_.tweenRefMaps[id][key] -= _.tweenRefOrigin[id][key])
        //      );
        iStyle = _objectSpread({}, iStyle, {}, Object(_utils_css__WEBPACK_IMPORTED_MODULE_10__["deMuxTween"])(iMap, tweenableMap, initials, _.muxDataByTarget[id], _.muxByTarget[id], false, true)); //// set defaults values in case of

        Object.keys(initials).forEach(function (key) {
          return _.tweenRefMaps[id][key] = is__WEBPACK_IMPORTED_MODULE_6___default.a.number(_.tweenRefMaps[id][key]) ? _.tweenRefMaps[id][key] - initials[key] : 0;
        }); //// add new initial values

        Object.keys(tweenableMap).forEach(function (key) {
          return _.tweenRefMaps[id][key] += tweenableMap[key];
        });
      } else {
        iStyle = _objectSpread({}, iStyle, {}, Object(_utils_css__WEBPACK_IMPORTED_MODULE_10__["deMuxTween"])(iMap, tweenableMap, initials, _.muxDataByTarget[id], _.muxByTarget[id])); // init / reset or get the tweenable view

        tweenableMap = Object.assign({}, initials, tweenableMap || {}); // set defaults values in case of
        // add new initial values

        Object.keys(tweenableMap).forEach(function (key) {
          return _.tweenRefMaps[id][key] = (_.tweenRefMaps[id][key] || 0) + tweenableMap[key];
        });
      }

      _.tweenRefOrigin[id] = _objectSpread({}, tweenableMap);
      _.tweenRefCSS[id] = iStyle;
      tweenableMap = _.tweenRefMaps[id];
      Object(_utils_css__WEBPACK_IMPORTED_MODULE_10__["muxToCss"])(tweenableMap, iStyle, _.muxByTarget[id], _.muxDataByTarget[id], _.box);
    } else {
      //console.log("maj ref", id)
      Object(_utils_css__WEBPACK_IMPORTED_MODULE_10__["muxToCss"])(_.tweenRefMaps[id], _.tweenRefCSS[id], _.muxByTarget[id], _.muxDataByTarget[id], _.box);
    } //console.log('tweenRef::tweenRef:519: ', id, { ..._.muxDataByTarget[id] }, { ..._.tweenRefCSS[id] });


    if (noref) return {
      style: _objectSpread({}, _.tweenRefCSS[id])
    };else return {
      style: _objectSpread({}, _.tweenRefCSS[id]),
      ref: function ref(node) {
        return _.refs[id] = node;
      }
    };
  }
  /**
   * Delete tweenable element
   * @param id
   */
  ;

  _proto.rmTweenRef = function rmTweenRef(id) {
    if (this._.tweenRefs[id]) {
      this._.tweenRefTargets.splice(this._.tweenRefTargets.indexOf(id), 1);

      delete this._.tweenRefs[id];
      delete this._.muxByTarget[id];
      delete this._.muxDataByTarget[id];
      delete this._.iMapOrigin[id];
      delete this._.tweenRefOrigin[id];
      delete this._.tweenRefCSS[id];
      delete this._.tweenRefMaps[id];
      delete this._.refs[id];
    }
  }
  /**
   * Reset tweenRefs
   * @param targets
   */
  ;

  _proto.resetTweenable = function resetTweenable() {
    var _this2 = this;

    var _ = this._;

    for (var _len = arguments.length, targets = new Array(_len), _key = 0; _key < _len; _key++) {
      targets[_key] = arguments[_key];
    }

    targets.forEach(function (t) {
      _this2.tweenRef(t, _.tweenRefOriginCss[t], _.iMapOrigin[t], null, null, true);
    });

    this._updateTweenRefs();
  }
  /**
   * Update tweenRefs style ( anims & axis will still update the ref )
   * @param target
   * @param style
   * @param postPone
   * @returns {*}
   */
  ;

  _proto.updateRefStyle = function updateRefStyle(target, style, postPone) {
    var _this3 = this;

    var _ = this._,
        initials = {},
        pureCss;
    if (isArray(target) && isArray(style)) return target.map(function (m, i) {
      return _this3.updateRefStyle(m, style[i], postPone);
    });
    if (isArray(target)) return target.map(function (m) {
      return _this3.updateRefStyle(m, style, postPone);
    }); //if ( !this._.tweenRefCSS )

    pureCss = Object(_utils_css__WEBPACK_IMPORTED_MODULE_10__["deMuxTween"])(style, _.tweenRefMaps[target], initials, _.muxDataByTarget[target], _.muxByTarget[target]);
    Object.assign(_.tweenRefCSS[target], pureCss);
    Object.assign(_.tweenRefOriginCss[target], pureCss);
    Object(_utils_css__WEBPACK_IMPORTED_MODULE_10__["muxToCss"])(_.tweenRefMaps[target], _.tweenRefCSS[target], _.muxByTarget[target], _.muxDataByTarget[target], _.box);

    this._updateTweenRef(target, true);
  }
  /**
   * Retrieve the tween ref dom node
   * @param id
   * @returns {*}
   */
  ;

  _proto.getTweenableRef = function getTweenableRef(id) {
    return this._.refs[id] && react_dom__WEBPACK_IMPORTED_MODULE_8___default.a.findDOMNode(this._.refs[id]);
  }
  /**
   * Get the root dom node of the tweener element
   * @returns {*}
   */
  ;

  _proto.getRootNode = function getRootNode() {
    return this._.rootRef && this.getTweenableRef(this._.rootRef) || react_dom__WEBPACK_IMPORTED_MODULE_8___default.a.findDOMNode(this);
  } // ------------------------------------------------------------
  // -------------------- Pushable anims ------------------------
  // ------------------------------------------------------------

  /**
   * Push anims
   * @param anim
   * @param then
   * @param skipInit
   * @returns {tweenAxis}
   */
  ;

  _proto.pushAnim = function pushAnim(anim, then, keepResults) {
    var _this4 = this;

    if (keepResults === void 0) {
      keepResults = true;
    }

    var sl,
        initial,
        _ = this._,
        initials = {},
        fail;

    if (isArray(anim)) {
      sl = anim;
    } else {
      sl = anim.anims;
      initial = anim.initial;
    }

    if (!(sl instanceof _utils_CssTweenAxis__WEBPACK_IMPORTED_MODULE_11__["default"])) {
      // tweenLine, initials, data, demuxers
      sl = Object(_utils_css__WEBPACK_IMPORTED_MODULE_10__["deMuxLine"])(sl, initials, this._.muxDataByTarget, this._.muxByTarget);
      sl = new _utils_CssTweenAxis__WEBPACK_IMPORTED_MODULE_11__["default"](sl, this._.tweenRefMaps);
      Object.keys(initials).forEach(function (id) {
        return _this4._.tweenRefMaps[id] && Object.assign(_this4._.tweenRefMaps[id], _objectSpread({}, initials[id], {}, _this4._.tweenRefMaps[id])) || (fail = console.warn("react-voodoo : Can't find tween target ", id, " in ", TweenableComp.displayName) || true);
      });
    }

    if (fail) return;
    return new Promise(function (resolve) {
      // start timer launch @todo
      sl.run(_this4._.tweenRefMaps, function () {
        var i = _this4._.runningAnims.indexOf(sl);

        if (i != -1) _this4._.runningAnims.splice(i, 1); //console.log( _.muxDataByTarget)

        Object.keys(initials) // unset
        .forEach(function (id) {
          Object.keys(initials[id]) // unset
          .forEach(function (rkey) {
            // todo
            Object(_utils_css__WEBPACK_IMPORTED_MODULE_10__["clearTweenableValue"])(rkey, rkey, _.tweenRefMaps[id], _.tweenRefCSS[id], _.muxDataByTarget[id], _.muxByTarget[id], keepResults);
          });
        });
        sl.destroy();
        resolve(sl);
      });

      _this4._.runningAnims.push(sl);

      if (!_this4._.live) {
        _this4._.live = true;
        requestAnimationFrame(_this4._._rafLoop = _this4._._rafLoop || _this4._rafLoop.bind(_this4));
      }
    }).then(function (sl) {
      return then && then(sl);
    });
  }
  /**
   * Update tweenRef raw tweened values
   * @param id
   * @param map
   * @param reset
   */
  ;

  _proto.applyTweenState = function applyTweenState(id, map, reset) {
    var _this5 = this;

    var tmap = {},
        initials = {};
    Object(_utils_css__WEBPACK_IMPORTED_MODULE_10__["deMuxTween"])(map, tmap, initials, this._.muxDataByTarget[id], this._.muxByTarget[id], true);
    Object.keys(tmap).map(function (p) {
      return _this5._.tweenRefMaps[id][p] = (!reset && _this5._.tweenRefMaps[id][p] || initials[p]) + tmap[p];
    });
  } // ------------------------------------------------------------
  // ------------------ Scrollable axes -------------------------
  // ------------------------------------------------------------

  /**
   * Will init / update a scrollable axis
   * @param axe
   * @param _inertia
   * @param _scrollableArea
   * @param _scrollableBounds
   * @param _scrollableWindow
   * @param defaultPosition
   * @param scrollFirst
   * @param reset
   */
  ;

  _proto.initAxis = function initAxis(axe, _ref, reset) {
    var _inertia$setBounds, _inertia$setBounds2;

    var _inertia = _ref.inertia,
        _ref$scrollableArea = _ref.scrollableArea,
        _scrollableArea = _ref$scrollableArea === void 0 ? 0 : _ref$scrollableArea,
        _scrollableBounds = _ref.scrollableBounds,
        _scrollableWindow = _ref.scrollableWindow,
        defaultPosition = _ref.defaultPosition,
        scrollFirst = _ref.scrollFirst;

    var _ = this._,
        dim = this.axes[axe],
        scrollableBounds = _scrollableBounds,
        scrollPos = !reset && dim ? dim.scrollPos : defaultPosition || scrollableBounds && scrollableBounds.min || 0,
        scrollableArea = Math.max(dim && dim.scrollableArea || 0, _scrollableArea),
        scrollableWindow = Math.max(dim && dim.scrollableWindow || 0, _scrollableWindow),
        targetPos = dim ? dim.targetPos : scrollPos,
        inertia = dim ? dim.inertia : new _utils_inertia__WEBPACK_IMPORTED_MODULE_13__["default"](_objectSpread({
      // todo mk pure
      disabled: !_inertia
    }, _inertia || {}, {
      value: scrollPos
    })),
        nextDescr = {
      //...(_inertia || {}),
      scrollFirst: scrollFirst,
      tweenAxis: dim && dim.tweenAxis || [],
      scrollPos: scrollPos,
      targetPos: targetPos,
      inertia: inertia,
      scrollableWindow: scrollableWindow,
      scrollableBounds: scrollableBounds,
      scrollableArea: scrollableArea
    };
    this.axes[axe] = nextDescr;
    !_inertia && (inertia._.disabled = true);
    _inertia && inertia && (inertia._.wayPoints = _inertia.wayPoints);
    _inertia && inertia && !inertia.active && (inertia._.pos = scrollPos);
    if (inertia && scrollableBounds) (_inertia$setBounds = inertia.setBounds) === null || _inertia$setBounds === void 0 ? void 0 : _inertia$setBounds.call(inertia, scrollableBounds.min, scrollableBounds.max);else inertia && ((_inertia$setBounds2 = inertia.setBounds) === null || _inertia$setBounds2 === void 0 ? void 0 : _inertia$setBounds2.call(inertia, 0, scrollableArea));
  };

  _proto._getAxis = function _getAxis(axe) {
    if (axe === void 0) {
      axe = "scrollY";
    }

    var _ = this._;
    this.axes[axe] = this.axes[axe] || {
      tweenAxis: [],
      scrollPos: _.options.initialScrollPos && _.options.initialScrollPos[axe] || 0,
      targetPos: 0,
      scrollableWindow: 0,
      scrollableArea: 0,
      inertia: new _utils_inertia__WEBPACK_IMPORTED_MODULE_13__["default"](_objectSpread({
        value: _.options.initialScrollPos && _.options.initialScrollPos[axe] || 0
      }, _.options.axes && _.options.axes[axe] && _.options.axes[axe].inertia || {}))
    };
    return this.axes[axe];
  }
  /**
   * Return axis infos
   */
  ;

  _proto.getAxisState = function getAxisState(axe) {
    var _this6 = this;

    var _ = this._,
        state = {};
    this.axes && Object.keys(this.axes).forEach(function (axe) {
      return state[axe] = _this6.axes[axe].targetPos || _this6.axes[axe].scrollPos;
    });
    return state;
  };

  _proto.getScrollPos = function getScrollPos(axis) {
    if (axis === void 0) {
      axis = "scrollY";
    }

    var _ = this._,
        state = {};
    return this.axes[axis] ? this.axes[axis].targetPos || this.axes[axis].scrollPos : 0;
  }
  /**
   * Do scroll an axis
   * @param newPos
   * @param ms
   * @param axe
   * @param ease
   * @returns {Promise<any | never>}
   */
  ;

  _proto.scrollTo = function scrollTo(newPos, ms, axe, ease) {
    var _this7 = this;

    if (ms === void 0) {
      ms = 0;
    }

    if (axe === void 0) {
      axe = "scrollY";
    }

    var _ = this._;
    return new Promise(function (resolve, reject) {
      if (_this7.axes && _this7.axes[axe]) {
        var oldPos = _this7.axes[axe].targetPos,
            setPos = function setPos(pos) {
          var _this7$axes, _this7$axes$axe, _this7$axes$axe$inert, _$rootRef2, _$rootRef2$current, _$rootRef2$current$co;

          //console.log('TweenableComp::setPos:514: ',  newPos,pos, ms, axe);
          pos = ~~(pos * 10000) / 10000;
          _this7.axes[axe].targetPos = _this7.axes[axe].scrollPos = pos;
          (_this7$axes = _this7.axes) === null || _this7$axes === void 0 ? void 0 : (_this7$axes$axe = _this7$axes[axe]) === null || _this7$axes$axe === void 0 ? void 0 : (_this7$axes$axe$inert = _this7$axes$axe.inertia) === null || _this7$axes$axe$inert === void 0 ? void 0 : _this7$axes$axe$inert.setPos(pos); //this.axes[axe].inertia._doSnap()

          if (~~pos !== oldPos) (_$rootRef2 = _.rootRef) === null || _$rootRef2 === void 0 ? void 0 : (_$rootRef2$current = _$rootRef2.current) === null || _$rootRef2$current === void 0 ? void 0 : (_$rootRef2$current$co = _$rootRef2$current.componentDidScroll) === null || _$rootRef2$current$co === void 0 ? void 0 : _$rootRef2$current$co.call(_$rootRef2$current, ~~pos, axe);

          _this7._updateTweenRefs();
        };

        newPos = Math.max(0, newPos);
        newPos = Math.min(newPos, _this7.axes[axe].scrollableArea || 0);
        _this7.axes[axe].targetPos = newPos;

        if (!ms) {
          _this7.axes[axe].tweenAxis.forEach(function (sl) {
            return sl.goTo(newPos, _.tweenRefMaps);
          });

          setPos(newPos);
          resolve();
        } else {
          _this7._runScrollGoTo(axe, newPos, ms, d3_ease__WEBPACK_IMPORTED_MODULE_4__[ease], setPos, resolve);
        }

        if (!_.live) {
          _.live = true;
          requestAnimationFrame(_._rafLoop);
        }
      }
    }).then(function (p) {
      var _this7$axes2, _this7$axes2$axe, _this7$axes2$axe$iner;

      (_this7$axes2 = _this7.axes) === null || _this7$axes2 === void 0 ? void 0 : (_this7$axes2$axe = _this7$axes2[axe]) === null || _this7$axes2$axe === void 0 ? void 0 : (_this7$axes2$axe$iner = _this7$axes2$axe.inertia) === null || _this7$axes2$axe$iner === void 0 ? void 0 : _this7$axes2$axe$iner._detectCurrentSnap();
    });
  }
  /**
   * Add scrollable tween axis (scrollable anims) to a global axis
   * @param anim
   * @param axe
   * @param size
   * @returns {tweenAxis}
   */
  ;

  _proto.addScrollableAnim = function addScrollableAnim(anim, axe, size) {
    var _this8 = this,
        _dim$inertia;

    if (axe === void 0) {
      axe = "scrollY";
    }

    var sl,
        _ = this._,
        initials = {},
        dim = this._getAxis(axe);

    if (isArray(anim)) {
      sl = anim;
    } else {
      sl = anim.anims;
      size = anim.length;
    } //console.warn("add scrollable")


    if (!(sl instanceof _utils_CssTweenAxis__WEBPACK_IMPORTED_MODULE_11__["default"])) {
      sl = Object(_utils_css__WEBPACK_IMPORTED_MODULE_10__["deMuxLine"])(sl, initials, this._.muxDataByTarget, this._.muxByTarget);
      sl = new _utils_CssTweenAxis__WEBPACK_IMPORTED_MODULE_11__["default"](sl, _.tweenRefMaps);
      sl.initials = initials;
      Object.keys(initials).forEach(function (id) {
        _.tweenRefOrigin[id] = _.tweenRefOrigin[id] || {};
        _.tweenRefMaps[id] = _.tweenRefMaps[id] || {};
        Object.assign(_this8._.tweenRefMaps[id], _objectSpread({}, initials[id], {}, _this8._.tweenRefMaps[id]));
      });
    } // init scroll


    dim.tweenAxis.push(sl);
    dim.scrollPos = dim.scrollPos || 0;
    dim.scrollableArea = dim.scrollableArea || 0;
    dim.scrollableArea = Math.max(dim.scrollableArea, sl.duration);
    if (!dim.scrollableBounds) (_dim$inertia = dim.inertia) === null || _dim$inertia === void 0 ? void 0 : _dim$inertia.setBounds(0, dim.scrollableArea);
    sl.goTo(dim.scrollPos, this._.tweenRefMaps);

    this._updateTweenRefs();

    return sl;
  }
  /**
   * Remove a tweenAxis object from a component scrollable axis
   * @param sl
   * @param axe
   */
  ;

  _proto.rmScrollableAnim = function rmScrollableAnim(sl, axe) {
    if (axe === void 0) {
      axe = "scrollY";
    }

    var _ = this._,
        found,
        dim = this._getAxis(axe),
        twAxis;

    var i = dim.tweenAxis.indexOf(sl);

    if (i !== -1) {
      var _dim$inertia2;

      //dim.tweenAxis[i].destroy();
      dim.tweenAxis.splice(i, 1);
      dim.scrollableArea = Math.max.apply(Math, dim.tweenAxis.map(function (tl) {
        return tl.duration;
      }).concat([0]));
      if (!dim.scrollableBounds) (_dim$inertia2 = dim.inertia) === null || _dim$inertia2 === void 0 ? void 0 : _dim$inertia2.setBounds(0, dim.scrollableArea || 0); //console.warn("rm scrollable", { ...this._.tweenRefMaps })

      sl.goTo(0, this._.tweenRefMaps); //console.warn("rm scrollable", { ...this._.tweenRefMaps["card"] })

      Object.keys(sl.initials) // unset
      .forEach(function (id) {
        Object.keys(sl.initials[id]) // unset
        .forEach(function (rkey) {
          //debugger
          Object(_utils_css__WEBPACK_IMPORTED_MODULE_10__["clearTweenableValue"])(rkey, rkey, _.tweenRefMaps[id], _.tweenRefCSS[id], _.muxDataByTarget[id], _.muxByTarget[id]); //!_.tweenRefCSS[id] &&
          //_.refs[id] && _.refs[id].style && _.refs[id].style[rkey] &&
          // (_.refs[id].style[rkey] = null);
        });
      });
      delete sl.initials;
      sl.destroy();
      found = true;

      this._updateTweenRefs();
    }

    !found && console.warn("TweenAxis not found !");
  }
  /**
   * @private fn to push scrollTo
   * @param axe
   * @param to
   * @param tm
   * @param easing
   * @param tick
   * @param cb
   * @private
   */
  ;

  _proto._runScrollGoTo = function _runScrollGoTo(axe, to, tm, easing, tick, cb) {
    var _this9 = this;

    if (easing === void 0) {
      easing = function easing(x) {
        return x;
      };
    }

    var from = this.axes[axe].scrollPos,
        length = to - from;

    _running.push({
      apply: function apply(pos, max) {
        var x = from + easing(pos / max) * length;

        if (_this9._.tweenEnabled) {
          //console.log('TweenableComp::setPos:514: ', x);
          _this9.axes[axe].tweenAxis.forEach(function (sl) {
            return sl.goTo(x, _this9._.tweenRefMaps);
          });

          tick && tick(x);
        }
      },
      duration: tm,
      cpos: 0,
      cb: cb
    });

    if (!_live) {
      _live = true;
      lastTm = Date.now(); // console.log("TL runner On");

      setTimeout(Runner._tick, 16);
    }
  }
  /**
   * Return scrollable parent node list basing a dom node
   * @param node
   * @returns {T[]}
   */
  ;

  _proto.getScrollableNodes = function getScrollableNodes(node) {
    var _this10 = this;

    var scrollable = _utils_dom__WEBPACK_IMPORTED_MODULE_12__["default"].findReactParents(node),
        _ = this._;
    scrollable = _.rootRef && _.rootRef.current && _.rootRef.current.hookScrollableTargets && _.rootRef.current.hookScrollableTargets(scrollable) || scrollable;
    return scrollable.map(function (id) {
      return is__WEBPACK_IMPORTED_MODULE_6___default.a.string(id) ? _this10._.refs[id] && react_dom__WEBPACK_IMPORTED_MODULE_8___default.a.findDOMNode(_this10._.refs[id]) || _this10.refs[id] || document.getElementById(id) : id;
    });
  }
  /**
   * Hook to know if the composed element allow scrolling
   * @returns {boolean}
   */
  ;

  _proto.componentShouldScroll = function componentShouldScroll() {
    var _$rootRef$current2;

    var _ = this._;
    return _.rootRef && _.rootRef.current && _.rootRef.current.componentShouldScroll ? (_$rootRef$current2 = _.rootRef.current).componentShouldScroll.apply(_$rootRef$current2, arguments) : true;
  } // ------------------------------------------------------------
  // --------------- Inertia & scroll modifiers -----------------
  // ------------------------------------------------------------

  /**
   * Retrieve updates from an axis inertia & apply them
   * @param dim
   * @param axe
   */
  ;

  _proto.applyInertia = function applyInertia(dim, axe) {
    var _this11 = this,
        _$rootRef3,
        _$rootRef3$current,
        _$rootRef3$current$co;

    var x = dim.inertia.update(),
        _ = this._;
    this.axes[axe].tweenAxis.forEach(function (sl) {
      _this11.axes[axe].targetPos = _this11.axes[axe].scrollPos = x;
      sl.goTo(x, _this11._.tweenRefMaps);
    }); //console.log("scroll at " + x, axe, dim.inertia.active || dim.inertia.holding);
    //this.scrollTo(x, 0, axe);

    (_$rootRef3 = _.rootRef) === null || _$rootRef3 === void 0 ? void 0 : (_$rootRef3$current = _$rootRef3.current) === null || _$rootRef3$current === void 0 ? void 0 : (_$rootRef3$current$co = _$rootRef3$current.componentDidScroll) === null || _$rootRef3$current$co === void 0 ? void 0 : _$rootRef3$current$co.call(_$rootRef3$current, x, axe);

    this._updateTweenRefs();

    if (dim.inertia.active || dim.inertia.holding) {
      dim.inertiaFrame = setTimeout(this.applyInertia.bind(this, dim, axe), 33);
    } else {
      dim.inertiaFrame = null; //console.log("complete");
    }
  }
  /**
   * Return true if at least 1 of this tweener axis have it's inertia active
   * @returns {boolean}
   */
  ;

  _proto.isInertiaActive = function isInertiaActive() {
    var _this12 = this;

    //todo
    var _ = this._,
        active = false;
    this.axes && Object.keys(this.axes).forEach(function (axe) {
      return active = active || _this12.axes[axe] && _this12.axes[axe].inertia.active;
    });
    return active;
  };

  _proto.dispatchScroll = function dispatchScroll(delta, axe) {
    if (axe === void 0) {
      axe = "scrollY";
    }

    var prevent,
        dim = this.axes[axe],
        oldPos = dim && dim.scrollPos,
        newPos = oldPos + delta;

    if (dim && oldPos !== newPos) {
      dim.inertia.dispatch(delta, 100);
      !dim.inertiaFrame && this.applyInertia(dim, axe);
    }

    return prevent;
  };

  _proto.isAxisOut = function isAxisOut(axis, v, abs) {
    var _ = this._,
        dim = this.axes && this.axes[axis],
        pos = abs ? v : dim && dim.scrollPos + v;
    pos = pos && Math.round(pos);
    return !dim || (dim.scrollableBounds ? pos <= dim.scrollableBounds.min || pos >= dim.scrollableBounds.max : pos <= 0 || pos >= dim.scrollableArea);
  };

  _proto._doDispatch = function _doDispatch(target, dx, dy, holding) {
    var style,
        Comps,
        headTarget = target,
        nodeInertia,
        i; // check if there scrollable stuff in dom targets
    // get all the parents components & dom node of an dom element ( from fibers )

    Comps = this.getScrollableNodes(headTarget); //console.log("dispatching ", dx, dy, Comps);

    for (i = 0; i < Comps.length; i++) {
      // react comp with tweener support
      if (Comps[i].__isTweener) {
        //debugger
        //console.log(Comps[i], dx, dy, Comps[i].isAxisOut("scrollX", dx), Comps[i].isAxisOut("scrollY",
        // dy));
        if (!Comps[i].isAxisOut("scrollX", dx) && (!Comps[i].componentShouldScroll || Comps[i].componentShouldScroll("scrollX", dx))) {
          Comps[i].dispatchScroll(dx, "scrollX", holding);
          dx = 0;
        }

        if (!Comps[i].isAxisOut("scrollY", dy) && (!Comps[i].componentShouldScroll || Comps[i].componentShouldScroll("scrollY", dy))) {
          Comps[i].dispatchScroll(dy, "scrollY", holding);
          dy = 0;
        }
      } // dom element
      else if (is__WEBPACK_IMPORTED_MODULE_6___default.a.element(Comps[i])) {
          style = getComputedStyle(Comps[i], null);

          if (/(auto|scroll)/.test(style.getPropertyValue("overflow") + style.getPropertyValue("overflow-x") + style.getPropertyValue("overflow-y"))) {
            if (dy < 0 && Comps[i].scrollTop !== 0 || dy > 0 && Comps[i].scrollTop !== Comps[i].scrollHeight - Comps[i].clientHeight) {
              return; //nodeInertia.y.dispatch(dy * 10)
              //dy = 0;
            } // let the node do this scroll
            //if ( nodeInertia.x.isOutbound(dx) ) {
            //	nodeInertia.x.dispatch(dx * 10)
            //	dx = 0;
            //} // let the node do this scroll

          } //headTarget = headTarget.parentNode;
          //if ( headTarget === document || headTarget === target )
          //	break;

        }

      if (!dx && !dy) break;
    }

    this._updateNodeInertia();

    if (!dx && !dy) return true;
  };

  _proto._activateNodeInertia = function _activateNodeInertia(node) {
    var _ = this._,
        i = _.activeInertia.findIndex(function (item) {
      return item.target === node;
    });

    if (i === -1) {
      _.activeInertia.push({
        inertia: {
          x: new _utils_inertia__WEBPACK_IMPORTED_MODULE_13__["default"]({
            max: node.scrollWidth - node.offsetLeft,
            value: node.scrollLeft
          }),
          y: new _utils_inertia__WEBPACK_IMPORTED_MODULE_13__["default"]({
            max: node.scrollHeight - node.offsetHeight,
            value: node.scrollTop
          })
        },
        target: node
      });

      i = _.activeInertia.length - 1;
    }

    return _.activeInertia[i].inertia;
  };

  // ------------------------------------------------------------
  // --------------- Initialization & drawers -------------------
  // ------------------------------------------------------------
  _proto.setRootRef = function setRootRef(id) {
    this._.rootRef = id;
  };

  _proto._updateBox = function _updateBox() {
    var node = this.getRootNode();

    if (node) {
      this._.box.inited = true;
      this._.box.x = node.offsetWidth;
      this._.box.y = node.offsetHeight;
    }
  };

  _proto._rafLoop = function _rafLoop() {
    this._updateTweenRefs();

    if (this._.runningAnims.length) {
      requestAnimationFrame(this._._rafLoop);
    } else {
      //this._.live && console.log("RAF off", this.constructor.displayName);
      this._.live = false;
    }
  };

  _proto._updateTweenRefs = function _updateTweenRefs() {
    if (this._.tweenEnabled) {
      for (var i = 0, target, node, style; i < this._.tweenRefTargets.length; i++) {
        target = this._.tweenRefTargets[i];
        style = this._updateTweenRef(target);
      }
    }
  };

  _proto._updateTweenRef = function _updateTweenRef(target, force) {
    var node,
        swap = this._swap,
        changes;
    this._.tweenRefCSS[target] && Object(_utils_css__WEBPACK_IMPORTED_MODULE_10__["muxToCss"])(this._.tweenRefMaps[target], swap, this._.muxByTarget[target], this._.muxDataByTarget[target], this._.box);
    node = this.getTweenableRef(target);

    if (node) {
      for (var o in this._.tweenRefCSS[target]) {
        if (swap[o] === undefined) {
          node.style[o] = this._.tweenRefCSS[target][o]; //		node.style[o] = null;
          //		delete this._.tweenRefCSS[target][o];
        }
      }

      for (var _o in swap) {
        if (this._.tweenRefCSS[target].hasOwnProperty(_o)) {
          if (force || swap[_o] !== this._.tweenRefCSS[target][_o]) {
            node.style[_o] = this._.tweenRefCSS[target][_o] = swap[_o]; //if ( target == "card" ) console.log(target, o, node.style[o], swap[o]);

            changes = true;
          }

          delete swap[_o];
        }
      }
    } //if ( !changes )
    //console.log('no changes', target, this._.tweenRefCSS[target], !!node, force)


    return this._.tweenRefCSS[target];
  } // ------------------------------------------------------------
  // --------------- React Hooks --------------------------------
  // ------------------------------------------------------------
  ;

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this13 = this;

    var node = this.getRootNode();

    if (this._.tweenEnabled) {
      this._.tweenEnabled = false;
      window.removeEventListener("resize", this._.onResize);
      Object.keys(this.axes).forEach(function (axe) {
        _this13.axes[axe].inertiaFrame && clearTimeout(_this13.axes[axe].inertiaFrame);
      });
    }

    _React$Component.prototype.componentWillUnmount && _React$Component.prototype.componentWillUnmount.apply(this, arguments);
  };

  _proto.componentDidMount = function componentDidMount() {
    var _this14 = this;

    var _static = this.constructor;
    this._.rendered = true;

    if (this._.tweenEnabled) {
      // debugger;
      this._updateBox();

      this._updateTweenRefs();
    }

    if (_static.scrollableAnim) {
      if (is__WEBPACK_IMPORTED_MODULE_6___default.a.array(_static.scrollableAnim)) this.addScrollableAnim(_static.scrollableAnim);else Object.keys(_static.scrollableAnim).forEach(function (axe) {
        return _this14.addScrollableAnim(_static.scrollableAnim[axe], axe);
      });
    } //if ( this._.doRegister || this.__isFirst ) {
    //	
    //	this._.doRegister = false;
    //}


    _React$Component.prototype.componentDidMount && _React$Component.prototype.componentDidMount.apply(this, arguments);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (this._.tweenEnabled) {
      this._updateBox();

      this._updateTweenRefs();
    }

    _React$Component.prototype.componentDidUpdate && _React$Component.prototype.componentDidUpdate.apply(this, arguments);
  };

  _proto.render = function render() {
    var _this15 = this;

    var _this$props = this.props,
        BaseComponent = _this$props.BaseComponent,
        oProps = _this$props.oProps;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_comps_TweenerContext__WEBPACK_IMPORTED_MODULE_9__["default"].Consumer, null, function (parentTweener) {
      _this15._parentTweener = parentTweener;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_comps_TweenerContext__WEBPACK_IMPORTED_MODULE_9__["default"].Provider, {
        value: _this15
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(BaseComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, oProps, {
        ref: _this15._.rootRef,
        tweener: _this15
      })));
    });
  };

  return TweenableComp;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);
/**
 * asTweener decorator
 * @param argz
 * @returns {*}
 */


function asTweener() {
  for (var _len2 = arguments.length, argz = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    argz[_key2] = arguments[_key2];
  }

  var BaseComponent = (!argz[0] || argz[0].prototype instanceof react__WEBPACK_IMPORTED_MODULE_7___default.a.Component || argz[0] === react__WEBPACK_IMPORTED_MODULE_7___default.a.Component) && argz.shift(),
      options = (!argz[0] || argz[0] instanceof SimpleObjectProto) && argz.shift() || {};

  if (!BaseComponent) {
    return function (BaseComponent) {
      return asTweener(BaseComponent, options);
    };
  }

  options = _objectSpread({
    wheelRatio: 5,
    maxClickTm: 200,
    maxClickOffset: 20
  }, options);
  var withRef = react__WEBPACK_IMPORTED_MODULE_7___default.a.forwardRef(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(TweenableComp, {
      oProps: props,
      forwardedRef: ref,
      BaseComponent: BaseComponent,
      tweenerOptions: options
    });
  });
  withRef.displayName = String.fromCharCode(0xD83E, 0xDDD9) + (BaseComponent.displayName || BaseComponent.name);
  return withRef;
}

/***/ }),

/***/ "./src/spells/withTweener.js":
/*!***********************************!*\
  !*** ./src/spells/withTweener.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return withTweener; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "undefined?df9b");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "undefined?cdfe");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "undefined?588e");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _comps_TweenerContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../comps/TweenerContext */ "./src/comps/TweenerContext.js");



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



var SimpleObjectProto = {}.constructor;
/**
 * asTweener decorator
 * @param argz
 * @returns {*}
 */

function withTweener() {
  for (var _len = arguments.length, argz = new Array(_len), _key = 0; _key < _len; _key++) {
    argz[_key] = arguments[_key];
  }

  var BaseComponent = (!argz[0] || argz[0].prototype instanceof react__WEBPACK_IMPORTED_MODULE_2___default.a.Component || argz[0] === react__WEBPACK_IMPORTED_MODULE_2___default.a.Component) && argz.shift(),
      opts = (!argz[0] || argz[0] instanceof SimpleObjectProto) && argz.shift() || {};

  if (!(BaseComponent && (BaseComponent.prototype instanceof react__WEBPACK_IMPORTED_MODULE_2___default.a.Component || BaseComponent === react__WEBPACK_IMPORTED_MODULE_2___default.a.Component))) {
    return function (BaseComponent) {
      return withTweener(BaseComponent, opts);
    };
  }

  var TweenerToProps = /*#__PURE__*/function (_React$Component) {
    _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default()(TweenerToProps, _React$Component);

    function TweenerToProps() {
      return _React$Component.apply(this, arguments) || this;
    }

    var _proto = TweenerToProps.prototype;

    _proto.render = function render() {
      var _this = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_comps_TweenerContext__WEBPACK_IMPORTED_MODULE_4__["default"].Consumer, null, function (tweener) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(BaseComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, _this.props, {
          tweener: tweener,
          ref: _this.props.forwardedRef
        }));
      });
    };

    return TweenerToProps;
  }(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

  TweenerToProps.displayName = BaseComponent.displayName || BaseComponent.name;
  var withRef = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (props, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(TweenerToProps, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
      forwardedRef: ref
    }));
  });
  withRef.displayName = TweenerToProps.displayName;
  return withRef;
}

/***/ }),

/***/ "./src/utils/CssTweenAxis.js":
/*!***********************************!*\
  !*** ./src/utils/CssTweenAxis.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CssTweenAxis; });
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "undefined?e4e5");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "undefined?cdfe");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tween_axis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tween-axis */ "undefined?a9ee");
/* harmony import */ var tween_axis__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tween_axis__WEBPACK_IMPORTED_MODULE_3__);



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

 //export default tweenAxis

var recyclableTweenAxis = [];

var CssTweenAxis = /*#__PURE__*/function (_tweenAxis) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_1___default()(CssTweenAxis, _tweenAxis);

  function CssTweenAxis(cfg, scope) {
    var _this;

    if (recyclableTweenAxis.length) {
      var recyled = recyclableTweenAxis.pop();
      recyled.scope = scope;

      if (is__WEBPACK_IMPORTED_MODULE_2___default.a.array(cfg)) {
        recyled.localLength = 1;
        recyled.mount(cfg, scope);
      } else {
        if (cfg.Axis) recyled.mount(cfg.Axis, scope);
      }

      return recyled || _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this);
    }

    return _tweenAxis.apply(this, arguments) || this;
  }

  var _proto = CssTweenAxis.prototype;

  _proto.destroy = function destroy() {
    this.scope = undefined;
    this.__marks.length = 0;
    this.__marksLength.length = 0;
    this.__marksKeys.length = 0;
    this.__processors.length = 0;
    this.__config.length = 0;
    this.__activeForks.length = 0;
    this.__activeProcess.length = 0;
    this.__activeProcess.length = 0;
    this.__outgoing.length = 0;
    this.__incoming.length = 0;
    this.__cPos = 0;
    this.duration = 0;
    this.__cIndex = 0;
    this.__cMaxKey = 1;
    recyclableTweenAxis.push(this);
  };

  return CssTweenAxis;
}(tween_axis__WEBPACK_IMPORTED_MODULE_3___default.a);



/***/ }),

/***/ "./src/utils/css/cssUtils.js":
/*!***********************************!*\
  !*** ./src/utils/css/cssUtils.js ***!
  \***********************************/
/*! exports provided: units, unitsRe, floatCut, expandShorthandProperty, isShorthandProperty, isValidDeclaration, canAnimate, getProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "units", function() { return units; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unitsRe", function() { return unitsRe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floatCut", function() { return floatCut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expandShorthandProperty", function() { return expandShorthandProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isShorthandProperty", function() { return isShorthandProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidDeclaration", function() { return isValidDeclaration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canAnimate", function() { return canAnimate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProperty", function() { return getProperty; });
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
var props = {
  "margin": {
    "properties": ["marginTop", "marginRight", "marginBottom", "marginLeft"]
  },
  "marginBottom": {
    "types": ["length"]
  },
  "marginLeft": {
    "types": ["length"]
  },
  "marginRight": {
    "types": ["length"]
  },
  "marginTop": {
    "types": ["length"]
  },
  "padding": {
    "properties": ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]
  },
  "paddingBottom": {
    "types": ["length"]
  },
  "paddingLeft": {
    "types": ["length"]
  },
  "paddingRight": {
    "types": ["length"]
  },
  "paddingTop": {
    "types": ["length"]
  },
  "bottom": {
    "types": ["length-percentage-calc"]
  },
  "left": {
    "types": ["length-percentage-calc"]
  },
  "right": {
    "types": ["length-percentage-calc"]
  },
  "top": {
    "types": ["length-percentage-calc"]
  },
  "zIndex": {
    "types": ["integer"]
  },
  "width": {
    "types": ["length-percentage-calc"]
  },
  "maxWidth": {
    "types": ["length-percentage-calc"]
  },
  "minWidth": {
    "types": ["length-percentage-calc"]
  },
  "height": {
    "types": ["length-percentage-calc"]
  },
  "maxHeight": {
    "types": ["length-percentage-calc"]
  },
  "minHeight": {
    "types": ["length-percentage-calc"]
  },
  "lineHeight": {
    "types": ["number", "length"]
  },
  "verticalAlign": {
    "types": ["length"]
  },
  "visibility": {
    "types": ["visibility"]
  },
  "borderSpacing": {
    "types": ["length"],
    "multiple": true
  },
  "color": {
    "types": ["color"]
  },
  "opacity": {
    "types": ["number"]
  },
  "background": {
    "properties": ["backgroundColor", "backgroundPosition", "backgroundSize"]
  },
  "backgroundColor": {
    "types": ["color"]
  },
  "backgroundPosition": {
    "types": ["length-percentage-calc"],
    "multiple": true,
    "repeatable": true
  },
  "backgroundSize": {
    "types": ["length-percentage-calc"],
    "multiple": true,
    "repeatable": true
  },
  "border": {
    "properties": ["borderColor", "borderWidth"]
  },
  "borderBottom": {
    "properties": ["borderBottomColor", "borderBottomWidth"]
  },
  "borderLeft": {
    "properties": ["borderLeftColor", "borderLeftWidth"]
  },
  "borderRight": {
    "properties": ["borderRightColor", "borderRightWidth"]
  },
  "borderTop": {
    "properties": ["borderTopColor", "borderTopWidth"]
  },
  "borderColor": {
    "properties": ["borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor"]
  },
  "borderWidth": {
    "properties": ["borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"]
  },
  "borderBottomColor": {
    "types": ["color"]
  },
  "borderLeftColor": {
    "types": ["color"]
  },
  "borderRightColor": {
    "types": ["color"]
  },
  "borderTopColor": {
    "types": ["color"]
  },
  "borderBottomWidth": {
    "types": ["length"]
  },
  "borderLeftWidth": {
    "types": ["length"]
  },
  "borderRightWidth": {
    "types": ["length"]
  },
  "borderTopWidth": {
    "types": ["length"]
  },
  "borderRadius": {
    "properties": ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"]
  },
  "borderTopLeftRadius": {
    "types": ["length-percentage-calc"],
    "multiple": true
  },
  "borderTopRightRadius": {
    "types": ["length-percentage-calc"],
    "multiple": true
  },
  "borderBottomRightRadius": {
    "types": ["length-percentage-calc"],
    "multiple": true
  },
  "borderBottomLeftRadius": {
    "types": ["length-percentage-calc"],
    "multiple": true
  },
  "boxShadow": {
    "types": ["shadow-list"]
  },
  "caretColor": {
    "types": ["color"]
  },
  "outline": {
    "properties": ["outlineColor", "outlineWidth"]
  },
  "outlineColor": {
    "types": ["color"]
  },
  "outlineWidth": {
    "types": ["length"]
  },
  "outlineOffset": {
    "types": ["length"]
  },
  "flex": {
    "properties": ["flexGrow", "flexShrink", "flexBasis"]
  },
  "flexGrow": {
    "types": ["number"]
  },
  "flexShrink": {
    "types": ["number"]
  },
  "flexBasis": {
    "types": ["length-percentage-calc"]
  },
  "order": {
    "types": ["integer"]
  },
  "font": {
    "properties": ["fontWeight", "fontStretch", "fontSize", "lineHeight"]
  },
  "fontWeight": {
    "types": ["font-weight"]
  },
  "fontStretch": {
    "types": ["font-stretch"]
  },
  "fontSize": {
    "types": ["length"]
  },
  "fontSizeAdjust": {
    "types": ["number"]
  },
  "gridTemplateColumns": {
    "types": ["length-percentage-calc"],
    "multiple": true
  },
  "gridTemplateRows": {
    "types": ["length-percentage-calc"],
    "multiple": true
  },
  "gridTemplate": {
    "properties": ["gridTemplateRows", "gridTemplateColumns"]
  },
  "grid": {
    "properties": ["gridTemplateRows", "gridTemplateColumns"]
  },
  "gridRowGap": {
    "types": ["length-percentage-calc"]
  },
  "gridColumnGap": {
    "types": ["length-percentage-calc"]
  },
  "gridGap": {
    "properties": ["gridRowGap", "gridColumnGap"]
  },
  "clip": {
    "types": ["rectangle"]
  },
  "clipPath": {
    "types": ["basic-shape"]
  },
  "mask": {
    "properties": ["maskPosition", "maskSize"]
  },
  "maskPosition": {
    "types": ["length-percentage-calc"],
    "multiple": true,
    "repeatable": true
  },
  "maskSize": {
    "types": ["length-percentage-calc"],
    "multiple": true,
    "repeatable": true
  },
  "shapeOutside": {
    "types": ["basic-shape"]
  },
  "shapeMargin": {
    "types": ["length-percentage-calc"]
  },
  "shapeImageThreshold": {
    "types": ["number"]
  },
  "scrollPadding": {
    "properties": ["scrollPaddingTop", "scrollPaddingRight", "scrollPaddingBottom", "scrollPaddingLeft"]
  },
  "scrollPaddingTop": {
    "types": ["length-percentage-calc"]
  },
  "scrollPaddingRight": {
    "types": ["length-percentage-calc"]
  },
  "scrollPaddingBottom": {
    "types": ["length-percentage-calc"]
  },
  "scrollPaddingLeft": {
    "types": ["length-percentage-calc"]
  },
  "scrollPaddingBlock": {
    "properties": ["scrollPaddingBlockStart", "scrollPaddingBlockEnd"]
  },
  "scrollPaddingBlockStart": {
    "types": ["length-percentage-calc"]
  },
  "scrollPaddingBlockEnd": {
    "types": ["length-percentage-calc"]
  },
  "scrollPaddingInline": {
    "properties": ["scrollPaddingInlineStart", "scrollPaddingInlineEnd"]
  },
  "scrollPaddingInlineStart": {
    "types": ["length-percentage-calc"]
  },
  "scrollPaddingInlineEnd": {
    "types": ["length-percentage-calc"]
  },
  "scrollSnapMargin": {
    "properties": ["scrollSnapMarginTop", "scrollSnapMarginRight", "scrollSnapMarginBottom", "scrollSnapMarginLeft"]
  },
  "scrollSnapMarginTop": {
    "types": ["length"]
  },
  "scrollSnapMarginRight": {
    "types": ["length"]
  },
  "scrollSnapMarginBottom": {
    "types": ["length"]
  },
  "scrollSnapMarginLeft": {
    "types": ["length"]
  },
  "scrollSnapMarginBlock": {
    "properties": ["scrollSnapMarginBlockStart", "scrollSnapMarginBlockEnd"]
  },
  "scrollSnapMarginBlockStart": {
    "types": ["length"]
  },
  "scrollSnapMarginBlockEnd": {
    "types": ["length"]
  },
  "scrollSnapMarginInline": {
    "properties": ["scrollSnapMarginInlineStart", "scrollSnapMarginInlineEnd"]
  },
  "scrollSnapMarginInlineStart": {
    "types": ["length"]
  },
  "scrollSnapMarginInlineEnd": {
    "types": ["length"]
  },
  "textDecoration": {
    "properties": ["textDecorationColor"]
  },
  "textDecorationColor": {
    "types": ["color"]
  },
  "textEmphasis": {
    "properties": ["textEmphasisColor"]
  },
  "textEmphasisColor": {
    "types": ["color"]
  },
  "textShadow": {
    "types": ["shadow-list"]
  },
  "columns": {
    "properties": ["columnWidth", "columnCount"]
  },
  "columnWidth": {
    "types": ["length"]
  },
  "columnCount": {
    "types": ["integer"]
  },
  "columnGap": {
    "types": ["length-percentage-calc"]
  },
  "columnRule": {
    "properties": ["columnRuleColor", "columnRuleWidth"]
  },
  "columnRuleColor": {
    "types": ["color"]
  },
  "columnRuleWidth": {
    "types": ["length"]
  },
  "letterSpacing": {
    "types": ["length"]
  },
  "tabSize": {
    "types": ["length"]
  },
  "textIndent": {
    "types": ["length-percentage-calc"]
  },
  "wordSpacing": {
    "types": ["length-percentage-calc"]
  },
  "transform": {
    "types": ["transform"]
  },
  "transformOrigin": {
    "types": ["length-percentage-calc"],
    "multiple": true
  },
  "perspective": {
    "types": ["length"]
  },
  "perspectiveOrigin": {
    "types": ["length-percentage-calc"],
    "multiple": true
  }
}; //
///**
// * List of animatable types used by properties, with descriptions of how to interpolate each type.
// * Data taken from https://www.w3.org/TR/css3-transitions/#animatable-types and some other W3C specs.
// *
// * @type {Object}
// */
//exports.types = {
//	'color'                 : {
//		name: 'color',
//		href: 'https://www.w3.org/TR/css3-transitions/#animtype-color'
//	},
//	'length'                : {
//		name: 'length',
//		href: 'https://www.w3.org/TR/css3-transitions/#animtype-length'
//	},
//	'percentage'            : {
//		name: 'percentage',
//		href: 'https://www.w3.org/TR/css3-transitions/#animtype-percentage'
//	},
//	'length-percentage-calc': {
//		name: 'length, percentage, or calc',
//		href: 'https://www.w3.org/TR/css3-transitions/#animtype-lpcalc'
//	},
//	'integer'               : {
//		name: 'integer',
//		href: 'https://www.w3.org/TR/css3-transitions/#animtype-integer'
//	},
//	'font-weight'           : {
//		name: 'font weight',
//		href: 'https://www.w3.org/TR/css3-transitions/#animtype-font-weight'
//	},
//	'number'                : {
//		name: 'number',
//		href: 'https://www.w3.org/TR/css3-transitions/#animtype-number'
//	},
//	'rectangle'             : {
//		name: 'rectangle',
//		href: 'https://www.w3.org/TR/css3-transitions/#animtype-rect'
//	},
//	'visibility'            : {
//		name: 'visibility',
//		href: 'https://www.w3.org/TR/css3-transitions/#animtype-visibility'
//	},
//	'shadow-list'           : {
//		name: 'shadow list',
//		href: 'https://www.w3.org/TR/css3-transitions/#animtype-shadow-list'
//	},
//	// Other specs
//	'transform'             : {
//		name: 'transform',
//		href: 'https://www.w3.org/TR/css3-transforms/#interpolation-of-transforms'
//	},
//	'font-stretch'          : {
//		name: 'font stretch',
//		href: 'https://www.w3.org/TR/css3-fonts/#font-stretch-animation'
//	},
//	'basic-shape'           : {
//		name: 'basic shape',
//		href: 'https://www.w3.org/TR/css-shapes-1/#basic-shape-interpolation'
//	},
//};
//

var units = ['', 'deg', 'box', 'bz', 'bh', 'bw', 'deg', 'em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'];
var unitsRe = new RegExp("([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" + ['\\w+', 'deg', 'bz', 'bh', 'bw', 'cap', 'ch', 'deg', 'em', 'ic', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|') + ")");
var floatCut = function floatCut(v) {
  if (v === void 0) {
    v = 0;
  }

  return Number(v.toFixed(3));
};
function expandShorthandProperty(property, value, target) {
  if (target === void 0) {
    target = {};
  }

  var type = props[property],
      childProps = type && type.properties,
      values = value.split(' ');
  if (type.multiple) childProps && childProps.forEach(function (k, i) {
    target[k] = values[i % values.length];
  });else childProps && childProps.forEach(function (k, i) {
    if (values[i]) target[k] = values[i];
  });
  return target;
}
;
function isShorthandProperty(property) {
  var type = props[property],
      childProps = type && type.properties;
  return childProps && !!childProps.length;
}
;
function isValidDeclaration(property, value) {
  return !!props[property];
}
;
/**
 * Check if a CSS property can be animated
 * @param  {string} property CSS property name
 * @return {boolean}         True if the property can be animated
 */

function canAnimate(property) {
  return props.hasOwnProperty(property);
}
;
/**
 * Get a definition of how a CSS property can be animated
 * @param  {string} property CSS property name
 * @param  {boolean} expand  Expand definitions for sub-properties, when available
 * @return {object}          Property definition, or null if it can't be animated
 */

function getProperty(property, expand) {
  if (!exports.canAnimate(property)) {
    return null;
  }

  var prop = props[property];
  var ret = {
    name: property
  };
  Object.keys(prop).forEach(function (key) {
    var value = prop[key];

    if (Array.isArray(value)) {
      if (key === 'properties' && expand) {
        value = value.map(function (subProp) {
          return exports.getProperty(subProp, expand);
        });
      } else {
        value = value.slice(); // clone
      }
    }

    ret[key] = value;
  });
  return ret;
}
;

/***/ }),

/***/ "./src/utils/css/demux/backgroundColor.js":
/*!************************************************!*\
  !*** ./src/utils/css/demux/backgroundColor.js ***!
  \************************************************/
/*! exports provided: release, demux, mux */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _typed_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typed/color */ "./src/utils/css/demux/typed/color.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "release", function() { return _typed_color__WEBPACK_IMPORTED_MODULE_0__["release"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "demux", function() { return _typed_color__WEBPACK_IMPORTED_MODULE_0__["demux"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mux", function() { return _typed_color__WEBPACK_IMPORTED_MODULE_0__["mux"]; });

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


/***/ }),

/***/ "./src/utils/css/demux/boxShadow.js":
/*!******************************************!*\
  !*** ./src/utils/css/demux/boxShadow.js ***!
  \******************************************/
/*! exports provided: release, demuxOne, demux, muxOne, mux */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _typed_shadow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typed/shadow */ "./src/utils/css/demux/typed/shadow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "release", function() { return _typed_shadow__WEBPACK_IMPORTED_MODULE_0__["release"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "demuxOne", function() { return _typed_shadow__WEBPACK_IMPORTED_MODULE_0__["demuxOne"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "demux", function() { return _typed_shadow__WEBPACK_IMPORTED_MODULE_0__["demux"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "muxOne", function() { return _typed_shadow__WEBPACK_IMPORTED_MODULE_0__["muxOne"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mux", function() { return _typed_shadow__WEBPACK_IMPORTED_MODULE_0__["mux"]; });

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


/***/ }),

/***/ "./src/utils/css/demux/filter.js":
/*!***************************************!*\
  !*** ./src/utils/css/demux/filter.js ***!
  \***************************************/
/*! exports provided: release, demux, mux */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "release", function() { return release; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "demux", function() { return demux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mux", function() { return mux; });
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cssUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cssUtils */ "./src/utils/css/cssUtils.js");
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


var defaultUnits = {
  blur: 'px',
  brightness: '%',
  contrast: '%',
  dropShadow: true,
  grayscale: '%',
  hueRotate: 'deg',
  invert: "%",
  opacity: "%",
  saturate: "%",
  sepia: "%"
};
var filters = {};
function release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues) {
  var path = twKey.split('_'),
      tmpKey; // not optimal at all

  console.log("dec", twKey, path);

  if (path.length === 4) {
    if (! --dataMap[path[0]][path[1]][path[2]] && !keepValues) {
      delete dataMap[path[0]][path[1]][path[2]];
    }

    if (Object.keys(dataMap[path[0]][path[1]]).length === 0 && !keepValues) delete dataMap[path[0]][path[1]];
    if (!keepValues) while (dataMap[path[0]].length && !dataMap[path[0]][dataMap[path[0]].length - 1]) {
      dataMap[path[0]].pop();
    }
    tmpKey = path[0] + "_" + path[1] + "_" + path[2]; //console.warn("free", dataMap, path, tweenableMap[twKey])

    if (! --dataMap[tmpKey][path[3]] && !keepValues) {
      delete dataMap[tmpKey][path[3]];
      delete tweenableMap[twKey];
      console.log("delete", twKey);
    }

    if (!keepValues) while (dataMap[tmpKey].length && !dataMap[tmpKey][dataMap[tmpKey].length - 1]) {
      dataMap[tmpKey].pop();
    }
    if (dataMap[path[0] + "_" + path[1] + "_" + path[2]].length === 0 && !keepValues) delete dataMap[path[0] + "_" + path[1] + "_" + path[2]];

    if (dataMap[path[0]].length === 0 && !keepValues) {
      delete dataMap[path[0]];
      delete muxerMap[path[0]];
      delete cssMap[path[0]];
    }
  } else {
    console.log("wtf", path);
  }
}
function demux(key, tweenable, target, data, box) {
  if (data["filter_head"] === key) {
    var _filters = "";
    Object.keys(data[key]).forEach(function (fkey) {
      var dkey = key + '_' + fkey;
      data[key][fkey] = true;
      _filters += fkey + "(" + Object(_cssUtils__WEBPACK_IMPORTED_MODULE_1__["floatCut"])(tweenable[dkey], 2) + data[dkey] + ") ";
    });
    target.filter = _filters;
  }
}
var mux = function mux(key, value, target, data, initials) {
  data["filter_head"] = data["filter_head"] || key;
  data[key] = data[key] || {}; //initials[key]       = 0;

  Object.keys(value).forEach(function (fkey) {
    var fValue = value[fkey],
        dkey = key + '_' + fkey,
        match = is__WEBPACK_IMPORTED_MODULE_0___default.a.string(fValue) ? fValue.match(_cssUtils__WEBPACK_IMPORTED_MODULE_1__["unitsRe"]) : false;
    data[key][fkey] = true;
    initials[dkey] = 0;

    if (match) {
      if (data[dkey] && data[dkey] !== match[2]) {
        console.warn("Have != units on prop ! Ignore ", dkey, "present:" + data[dkey], "new:" + match[2]);
        target[dkey] = 0;
      } else {
        data[dkey] = match[2];
        target[dkey] = parseFloat(match[1]);
      }
    } else {
      target[dkey] = fValue;
      if (!data[dkey] && fkey in defaultUnits) data[dkey] = defaultUnits[fkey];
    }
  });
  return demux;
};

/***/ }),

/***/ "./src/utils/css/demux/textShadow.js":
/*!*******************************************!*\
  !*** ./src/utils/css/demux/textShadow.js ***!
  \*******************************************/
/*! exports provided: release, demuxOne, demux, muxOne, mux */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _typed_shadow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typed/shadow */ "./src/utils/css/demux/typed/shadow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "release", function() { return _typed_shadow__WEBPACK_IMPORTED_MODULE_0__["release"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "demuxOne", function() { return _typed_shadow__WEBPACK_IMPORTED_MODULE_0__["demuxOne"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "demux", function() { return _typed_shadow__WEBPACK_IMPORTED_MODULE_0__["demux"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "muxOne", function() { return _typed_shadow__WEBPACK_IMPORTED_MODULE_0__["muxOne"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mux", function() { return _typed_shadow__WEBPACK_IMPORTED_MODULE_0__["mux"]; });

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


/***/ }),

/***/ "./src/utils/css/demux/transform.js":
/*!******************************************!*\
  !*** ./src/utils/css/demux/transform.js ***!
  \******************************************/
/*! exports provided: release, demuxOne, demux, muxOne, mux */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "release", function() { return release; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "demuxOne", function() { return demuxOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "demux", function() { return demux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "muxOne", function() { return muxOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mux", function() { return mux; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "undefined?188d");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cssUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cssUtils */ "./src/utils/css/cssUtils.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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


var defaultUnits = {
  //matrix     : true,
  //translate  : 'px',
  translateX: 'px',
  translateY: 'px',
  translateZ: 'px',
  scale: '',
  scaleZ: '',
  scaleX: '',
  scaleY: '',
  rotate: 'deg',
  //skew       : 'deg',
  skewX: 'deg',
  skewY: 'deg',
  //matrix3d   : true,
  //translate3d: true,
  //scale3d    : true,
  //rotate3d   : true,
  rotateX: 'deg',
  rotateY: 'deg',
  rotateZ: 'deg',
  perspective: 'px'
},
    defaultBox = {
  translateX: 'x',
  translateY: 'y',
  translateZ: 'z',
  rotateX: 'x',
  rotateY: 'y',
  rotateZ: 'z',
  left: 'x',
  right: 'x',
  top: 'y',
  bottom: 'y',
  width: 'x',
  height: 'y'
},
    defaultValue = {
  //skew  : 1,
  //skewX : 1,
  //skewY : 1,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1
};
function release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues) {
  var path = twKey.split('_'),
      tmpKey; // not optimal at all

  if (path.length === 4) {
    //console.warn("dec", twKey, dataMap[path[0]][path[1]][path[2]])
    // dec count on transform
    if (! --dataMap[path[0]][path[1]][path[2]] && !keepValues) {
      delete dataMap[path[0]][path[1]][path[2]];
    } //if ( Object.keys(dataMap[path[0]][path[1]]).length === 0 && !keepValues )
    //	delete dataMap[path[0]][path[1]];
    // free transform layers


    if (!keepValues) while (dataMap[path[0]].length && !dataMap[path[0]][dataMap[path[0]].length - 1]) {
      dataMap[path[0]].pop();
    }
    tmpKey = path[0] + "_" + path[1] + "_" + path[2];

    if (! --dataMap[tmpKey][path[3]] && !keepValues) {
      delete dataMap[tmpKey][path[3]]; //dataMap[path[0]][path[3]] = undefined;

      delete tweenableMap[twKey]; //console.log("delete", twKey)
    }

    if (!keepValues) while (dataMap[tmpKey].length && !dataMap[tmpKey][dataMap[tmpKey].length - 1]) {
      dataMap[tmpKey].pop();
    }
    if (dataMap[tmpKey].length === 0 && !keepValues) delete dataMap[tmpKey];

    if (dataMap[path[0]].length === 0 && !keepValues) {
      delete dataMap[path[0]];
      delete muxerMap[path[0]];
      delete cssMap[path[0]];
    }
  } else {
    console.log("wtf", path);
  }
}
function demuxOne(unitIndex, dkey, twVal, baseKey, data, box) {
  var value = twVal,
      unit = _cssUtils__WEBPACK_IMPORTED_MODULE_2__["units"][unitIndex] || defaultUnits[baseKey];

  if (unit === 'box') {
    value = value * (box[defaultBox[baseKey]] || box.x);
    unit = 'px';
  }

  if (unit === 'bw') {
    value = value * box.x;
    unit = 'px';
  }

  if (unit === 'wh') {
    value = value * box.y;
    unit = 'px';
  }

  if (unit === 'bz') {
    value = value * box.z;
    unit = 'px';
  }

  if (unit === 'deg') value = value % 360;
  return unit ? Object(_cssUtils__WEBPACK_IMPORTED_MODULE_2__["floatCut"])(value) + unit : Object(_cssUtils__WEBPACK_IMPORTED_MODULE_2__["floatCut"])(value);
}
function demux(key, tweenable, target, data, box) {
  //console.log(key)
  var transforms = "",
      tmpValue = {};
  var ti = 0,
      tmap,
      fkey,
      unitKey,
      unitIndex,
      dkey,
      u,
      iValue,
      y = 0,
      value;

  for (; ti < data[key].length; ti++) {
    tmap = data[key][ti];

    for (fkey in tmap) {
      if (tmap.hasOwnProperty(fkey)) {
        dkey = key + '_' + ti + '_' + fkey;
        value = "";
        y = 0;

        for (unitIndex = 0; unitIndex < data[dkey].length; unitIndex++) {
          if (data[dkey][unitIndex]) {
            unitKey = dkey + "_" + unitIndex; //console.log("mux ", key, dkey, unitKey)
            //if ( !tweenable[unitKey] )
            //	continue;

            iValue = demuxOne(unitIndex, dkey, tweenable[unitKey], fkey, data, box); //console.log(unitKey, tweenable[unitKey], iValue)

            if (y && iValue[0] === '-') iValue = " - " + iValue.substr(1);else if (y) iValue = " + " + iValue;
            value += iValue;
            y++;
          }
        }

        if (y > 1) value = "calc(" + value + ")";
        if (y > 0) transforms += fkey + "(" + (value || "0") + ") ";
      }
    }
  }

  target.transform = transforms;
}
function muxOne(key, baseKey, value, target, data, initials, noPropLock, seenUnits) {
  var match = is__WEBPACK_IMPORTED_MODULE_1___default.a.string(value) ? value.match(_cssUtils__WEBPACK_IMPORTED_MODULE_2__["unitsRe"]) : false,
      unit = match && match[2] || defaultUnits[baseKey],
      unitKey = _cssUtils__WEBPACK_IMPORTED_MODULE_2__["units"].indexOf(unit),
      realKey = unitKey !== -1 && key + '_' + unitKey || key;
  initials[realKey] = defaultValue[baseKey] || 0;
  data[key][unitKey] = data[key][unitKey] || 0; //console.log(key, ':', realKey, data[key][unitKey], initials[realKey], noPropLock)

  if (seenUnits && seenUnits[unitKey]) {
    if (match) {
      target[realKey] += parseFloat(match[1]);
    } else {
      target[realKey] += parseFloat(value);
    }
  } else {
    !noPropLock && data[key][unitKey]++;

    if (match) {
      target[realKey] = parseFloat(match[1]);
    } else {
      target[realKey] = parseFloat(value);
    }

    if (seenUnits) seenUnits[unitKey] = true;
  }

  return demux;
}
;
var mux = function mux(key, value, target, data, initials, noPropLock, reOrder) {
  data[key] = data[key] || []; //initials[key] = 0;

  if (!is__WEBPACK_IMPORTED_MODULE_1___default.a.array(value)) value = [value];
  var ti = 0,
      tmap,
      tFnKey,
      baseData,
      fValue,
      dkey,
      u,
      seenUnits;

  for (; ti < value.length; ti++) {
    tmap = value[ti];
    baseData = reOrder ? {} : _objectSpread({}, data[key][ti] || {});

    for (tFnKey in tmap) {
      if (tmap.hasOwnProperty(tFnKey)) {
        fValue = tmap[tFnKey];
        seenUnits = {};
        dkey = key + '_' + ti + '_' + tFnKey;
        baseData[tFnKey] = baseData[tFnKey] || data[key][ti] && data[key][ti][tFnKey] || 0;
        !noPropLock && baseData[tFnKey]++; //console.warn("set ", key, dkey, noPropLock, baseData[tFnKey])

        data[dkey] = data[dkey] || [];

        if (is__WEBPACK_IMPORTED_MODULE_1___default.a.array(fValue)) {
          for (u = 0; u < fValue.length; u++) {
            muxOne(dkey, tFnKey, fValue[u] || 0, target, data, initials, noPropLock, seenUnits);
          }
        } else {
          muxOne(dkey, tFnKey, fValue || 0, target, data, initials, noPropLock);
        }
      }
    }

    data[key][ti] = reOrder ? _objectSpread({}, baseData, {}, data[key][ti] || {}, {}, baseData) : baseData; //console.log(key, reOrder, data[key][ti], baseData)
  }

  return demux;
};

/***/ }),

/***/ "./src/utils/css/demux/typed/bool.js":
/*!*******************************************!*\
  !*** ./src/utils/css/demux/typed/bool.js ***!
  \*******************************************/
/*! exports provided: release, demux, mux */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "release", function() { return release; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "demux", function() { return demux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mux", function() { return mux; });
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
var defaultUnits = {
  opacity: 1
};
function release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues) {
  if (! --dataMap[twKey] && !keepValues) {
    delete tweenableMap[twKey];
    delete dataMap[twKey];
    delete muxerMap[twKey];
    delete cssMap[twKey];
  }
}
function demux(key, tweenable, target, data, box) {
  var value = !!tweenable[key];
  return target ? target[key] = value : value;
}
var mux = function mux(key, value, target, data, initials, noPropLock) {
  initials[key] = defaultUnits[key] || 0;
  target[key] = value === false ? 0 : 1;
  data[key] = data[key] || 0;
  !noPropLock && data[key]++;
  return demux;
};

/***/ }),

/***/ "./src/utils/css/demux/typed/border.js":
/*!*********************************************!*\
  !*** ./src/utils/css/demux/typed/border.js ***!
  \*********************************************/
/*! exports provided: release, demuxOne, demux, muxOne, mux */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "release", function() { return release; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "demuxOne", function() { return demuxOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "demux", function() { return demux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "muxOne", function() { return muxOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mux", function() { return mux; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "undefined?188d");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var css_box_shadow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! css-box-shadow */ "undefined?c6dc");
/* harmony import */ var css_box_shadow__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(css_box_shadow__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cssUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../cssUtils */ "./src/utils/css/cssUtils.js");
/* harmony import */ var _js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./(*).js */ "./src/MapOf.react_voodoo_utils_css_demux_typed_____js.gen.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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




var defaultUnits = {
  perspective: 'px'
},
    defaultBox = {
  translateX: 'x'
},
    defaultMuxers = {
  //blurRadius  : number,
  inset: _js__WEBPACK_IMPORTED_MODULE_4__["bool"],
  //offsetX     : number,
  //offsetY     : number,
  //spreadRadius: number,
  color: _js__WEBPACK_IMPORTED_MODULE_4__["color"]
};
function release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues) {
  var path = twKey.split('_'),
      tmpKey; // not optimal at all

  if (path.length > 2) {
    // dec count on transform
    tmpKey = path[0] + "_" + path[1] + "_" + path[2];

    if (defaultMuxers[path[2]]) {
      defaultMuxers[path[2]].release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues);

      if (!dataMap[tmpKey]) {
        //console.log("dec", tmpKey, dataMap[path[0]][path[1]][path[2]])
        if (! --dataMap[path[0]][path[1]][path[2]] && !keepValues) {
          delete dataMap[path[0]][path[1]][path[2]];
        }
      }

      if (dataMap[path[0]].length === 0 && !keepValues) {
        delete dataMap[path[0]];
        delete muxerMap[path[0]];
        delete cssMap[path[0]]; //console.log("delete color", twKey)
      }

      return;
    } //console.log("dec", twKey, dataMap[path[0]])


    if (! --dataMap[path[0]][path[1]][path[2]] && !keepValues) {
      delete dataMap[path[0]][path[1]][path[2]];
    } //if ( Object.keys(dataMap[path[0]][path[1]]).length === 0 && !keepValues )
    //	delete dataMap[path[0]][path[1]];
    // free transform layers


    if (!keepValues) while (dataMap[path[0]].length && !dataMap[path[0]][dataMap[path[0]].length - 1]) {
      dataMap[path[0]].pop();
    } //tmpKey = path[0] + "_" + path[1] + "_" + path[2];
    // units

    if (! --dataMap[tmpKey][path[3]] && !keepValues) {
      delete dataMap[tmpKey][path[3]]; //dataMap[path[0]][path[3]] = undefined;

      delete tweenableMap[twKey]; //console.log("delete", tmpKey)
    }

    if (!keepValues) while (dataMap[tmpKey].length && !dataMap[tmpKey][dataMap[tmpKey].length - 1]) {
      dataMap[tmpKey].pop();
    }
    if (dataMap[tmpKey].length === 0 && !keepValues) delete dataMap[tmpKey];
    if (!keepValues) while (dataMap[path[0]].length && !Object.keys(dataMap[path[0]][dataMap[path[0]].length - 1]).length) {
      dataMap[path[0]].pop();
    }

    if (dataMap[path[0]].length === 0 && !keepValues) {
      delete dataMap[path[0]];
      delete muxerMap[path[0]];
      delete cssMap[path[0]]; //console.log("delete", path[0])
    }
  } else {
    console.log("wtf", path);
  }
}
function demuxOne(unitIndex, dkey, twVal, baseKey, data, box) {
  var value = twVal,
      unit = _cssUtils__WEBPACK_IMPORTED_MODULE_3__["units"][unitIndex] || defaultUnits[baseKey];

  if (unit === 'box') {
    value = value * (box[defaultBox[baseKey]] || box.x);
    unit = 'px';
  }

  if (unit === 'bw') {
    value = value * box.x;
    unit = 'px';
  }

  if (unit === 'wh') {
    value = value * box.y;
    unit = 'px';
  }

  if (unit === 'bz') {
    value = value * box.z;
    unit = 'px';
  }

  if (unit === 'deg') value = value % 360;
  return unit ? Object(_cssUtils__WEBPACK_IMPORTED_MODULE_3__["floatCut"])(value) + unit : Object(_cssUtils__WEBPACK_IMPORTED_MODULE_3__["floatCut"])(value);
}
function demux(key, tweenable, target, data, box) {
  //console.log(key)
  var shadows = [],
      tmpValue = {};
  var ti = 0,
      shadowMap,
      fkey,
      unitKey,
      unitIndex,
      dkey,
      u,
      iValue,
      y = 0,
      value;

  for (; ti < data[key].length; ti++) {
    shadowMap = data[key][ti];
    tmpValue = {};

    for (fkey in shadowMap) {
      if (shadowMap.hasOwnProperty(fkey)) {
        dkey = key + '_' + ti + '_' + fkey;

        if (defaultMuxers[fkey]) {
          value = defaultMuxers[fkey].demux(dkey, tweenable, undefined, data, box); //continue;
          //console.log(dkey, tweenable[dkey])
        } else {
          value = "";
          y = 0;

          for (unitIndex = 0; unitIndex < data[dkey].length; unitIndex++) {
            if (data[dkey][unitIndex]) {
              unitKey = dkey + "_" + unitIndex;
              iValue = demuxOne(unitIndex, dkey, tweenable[unitKey], fkey, data, box);
              if (y && iValue[0] === '-') iValue = " - " + iValue.substr(1);else if (y) iValue = " + " + iValue;
              value += iValue;
              y++;
            }
          }

          if (y > 1) value = "calc(" + value + ")";
        }

        tmpValue[fkey] = value || 0;
      }
    }

    shadows.push(tmpValue);
  }

  target[key] = css_box_shadow__WEBPACK_IMPORTED_MODULE_1___default.a.stringify(shadows); //console.log(key, shadows, target[key]);
}
function muxOne(key, baseKey, value, target, data, initials, noPropLock, seenUnits) {
  var match = is__WEBPACK_IMPORTED_MODULE_2___default.a.string(value) ? value.match(_cssUtils__WEBPACK_IMPORTED_MODULE_3__["unitsRe"]) : false,
      unit = match && match[2] || defaultUnits[baseKey] || "px",
      unitKey = _cssUtils__WEBPACK_IMPORTED_MODULE_3__["units"].indexOf(unit),
      realKey = unitKey !== -1 && key + '_' + unitKey || key;
  initials[realKey] = 0;
  data[key][unitKey] = data[key][unitKey] || 0; //console.log(key, ':', data[key][unitKey], value, noPropLock)

  if (seenUnits && seenUnits[unitKey]) {
    //console.warn(key, ':', data[key][unitKey], value, noPropLock)
    if (match) {
      target[realKey] += parseFloat(match[1]);
    } else {
      target[realKey] += parseFloat(value);
    }
  } else {
    !noPropLock && data[key][unitKey]++;

    if (match) {
      target[realKey] = parseFloat(match[1]);
    } else {
      target[realKey] = parseFloat(value);
    }

    if (seenUnits) seenUnits[unitKey] = true;
  }

  return demux;
}
;
var mux = function mux(key, value, target, data, initials, noPropLock, reOrder) {
  data[key] = data[key] || []; //initials[key] = 0;

  debugger;
  if (!is__WEBPACK_IMPORTED_MODULE_2___default.a.array(value)) value = [value];
  var ti = 0,
      shadowMap,
      tFnKey,
      baseData,
      fValue,
      dkey,
      u,
      seenUnits;

  for (; ti < value.length; ti++) {
    shadowMap = value[ti];
    if (is__WEBPACK_IMPORTED_MODULE_2___default.a.string(shadowMap)) shadowMap = css_box_shadow__WEBPACK_IMPORTED_MODULE_1___default.a.parse(shadowMap)[0];
    baseData = reOrder ? {} : _objectSpread({}, data[key][ti] || {});

    for (tFnKey in shadowMap) {
      if (shadowMap.hasOwnProperty(tFnKey)) {
        fValue = shadowMap[tFnKey];
        dkey = key + '_' + ti + '_' + tFnKey;
        baseData[tFnKey] = baseData[tFnKey] || data[key][ti] && data[key][ti][tFnKey] || 0;
        !noPropLock && baseData[tFnKey]++;

        if (defaultMuxers[tFnKey]) {
          defaultMuxers[tFnKey].mux(dkey, fValue, target, data, initials, noPropLock, reOrder);
        } else {
          seenUnits = {};
          data[dkey] = data[dkey] || [];

          if (is__WEBPACK_IMPORTED_MODULE_2___default.a.array(fValue)) {
            for (u = 0; u < fValue.length; u++) {
              muxOne(dkey, tFnKey, fValue[u] || 0, target, data, initials, noPropLock, seenUnits);
            }
          } else {
            muxOne(dkey, tFnKey, fValue || 0, target, data, initials, noPropLock);
          }
        }
      }
    }

    data[key][ti] = reOrder ? _objectSpread({}, baseData, {}, data[key][ti] || {}, {}, baseData) : baseData; //console.log(key, reOrder, data[key][ti], baseData)
  }

  return demux;
};

/***/ }),

/***/ "./src/utils/css/demux/typed/color.js":
/*!********************************************!*\
  !*** ./src/utils/css/demux/typed/color.js ***!
  \********************************************/
/*! exports provided: release, demux, mux */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "release", function() { return release; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "demux", function() { return demux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mux", function() { return mux; });
/* harmony import */ var color_rgba__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! color-rgba */ "undefined?a742");
/* harmony import */ var color_rgba__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(color_rgba__WEBPACK_IMPORTED_MODULE_0__);
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

function release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues) {
  var path = twKey.split('_'),
      tmpKey = path.slice(0, path.length - 1).join('_'); //console.log("dec", tmpKey, path, dataMap[twKey])

  if (! --dataMap[twKey] && !keepValues) {
    delete tweenableMap[twKey];
    delete dataMap[twKey]; //delete muxerMap[twKey];
    //delete cssMap[twKey];
    //console.log("delete", twKey, path)
  }

  if (! --dataMap[tmpKey] && !keepValues) {
    delete tweenableMap[twKey];
    delete dataMap[twKey]; //delete muxerMap[twKey];
    //delete cssMap[twKey];
    //console.log("delete", tmpKey)
  } //}

}
function demux(key, tweenable, target, data) {
  var value = "rgba(" + tweenable[key + '_r'] + ", " + tweenable[key + '_g'] + ", " + tweenable[key + '_b'] + ", " + tweenable[key + '_a'] + ")";
  return target ? target[key] = value : value;
}
function mux(key, value, target, data, initials, noPropLock) {
  var vect = color_rgba__WEBPACK_IMPORTED_MODULE_0___default()(value);
  data[key] = data[key] || 0;
  data[key + '_r'] = data[key + '_r'] || 0;
  data[key + '_g'] = data[key + '_g'] || 0;
  data[key + '_b'] = data[key + '_b'] || 0;
  data[key + '_a'] = data[key + '_a'] || 0;

  if (!noPropLock) {
    data[key] += 4;
    data[key + '_r']++;
    data[key + '_g']++;
    data[key + '_b']++;
    data[key + '_a']++;
  }

  target[key + '_r'] = vect[0];
  target[key + '_g'] = vect[1];
  target[key + '_b'] = vect[2];
  target[key + '_a'] = vect[3];
  initials[key] = 0;
  initials[key + '_r'] = 0;
  initials[key + '_g'] = 0;
  initials[key + '_b'] = 0;
  initials[key + '_a'] = 1;
  return demux;
}

/***/ }),

/***/ "./src/utils/css/demux/typed/int.js":
/*!******************************************!*\
  !*** ./src/utils/css/demux/typed/int.js ***!
  \******************************************/
/*! exports provided: release, demux, mux */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "release", function() { return release; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "demux", function() { return demux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mux", function() { return mux; });
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
var defaultUnits = {
  opacity: 1
};
function release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues) {
  if (! --dataMap[twKey] && !keepValues) {
    delete tweenableMap[twKey];
    delete dataMap[twKey];
    delete muxerMap[twKey];
    delete cssMap[twKey];
  }
}
function demux(key, tweenable, target, data, box) {
  target[key] = ~~tweenable[key]; // + defaultUnits[key];
}
var mux = function mux(key, value, target, data, initials, noPropLock) {
  initials[key] = 0;
  target[key] = ~~value;
  data[key] = data[key] || 0;
  !noPropLock && data[key]++;
  return demux;
};

/***/ }),

/***/ "./src/utils/css/demux/typed/multi.js":
/*!********************************************!*\
  !*** ./src/utils/css/demux/typed/multi.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _number__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./number */ "./src/utils/css/demux/typed/number.js");
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


var alias = {
  top: '0%',
  bottom: '100%',
  center: '50%',
  left: '0%',
  right: '100%'
};

function demux(key, tweenable, target, data, box, offset) {
  var count = data["_" + key],
      v = '',
      nowhere = {};

  for (var i = 0; i < count; i++) {
    _number__WEBPACK_IMPORTED_MODULE_1__["demux"](key + '_' + i, tweenable, nowhere, data, box, offset);
    v += nowhere[key + '_' + i] + ' ';
  }

  target[key] = v;
}

function release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues) {
  var path = twKey.split('_'),
      tmpKey; // not optimal at all
  //if ( path.length === 2 ) {
  //	console.log("dec", twKey, dataMap[path[0]][path[1]])
  //	if ( !--dataMap[path[0]][path[1]] && !keepValues ) {
  //		delete tweenableMap[twKey];
  //		delete dataMap[path[0]][path[1]];
  //	}
  //
  //	if ( !keepValues )
  //		while ( dataMap[path[0]].length && !dataMap[path[0]][dataMap[path[0]].length - 1] )
  //			dataMap[path[0]].pop();
  //
  //	if ( dataMap[path[0]].length === 0 && !keepValues ) {
  //		delete dataMap[path[0]];
  //		delete muxerMap[path[0]];
  //		delete cssMap[path[0]];
  //		console.log("delete", path[0])
  //	}
  //}
  //else {
  //console.log("wtf", path)
  //}
}

/* harmony default export */ __webpack_exports__["default"] = (function (count) {
  return {
    mux: function mux(key, value, target, data, initials, noPropLock) {
      var values = value.split(' '),
          v;
      data[key] = data[key] || 0;
      noPropLock && data[key]++;
      data["_" + key] = count;

      for (var i = 0; i < count; i++) {
        v = values[i % values.length];
        v = is__WEBPACK_IMPORTED_MODULE_0___default.a.string(v) && alias[v] || v;
        _number__WEBPACK_IMPORTED_MODULE_1__["mux"](key + '_' + i, v, target, data, initials, noPropLock);
      }

      return demux;
    },
    demux: demux,
    release: release
  };
});

/***/ }),

/***/ "./src/utils/css/demux/typed/number.js":
/*!*********************************************!*\
  !*** ./src/utils/css/demux/typed/number.js ***!
  \*********************************************/
/*! exports provided: release, demuxOne, demux, muxer, muxOne, mux */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "release", function() { return release; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "demuxOne", function() { return demuxOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "demux", function() { return demux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "muxer", function() { return muxer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "muxOne", function() { return muxOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mux", function() { return mux; });
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cssUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../cssUtils */ "./src/utils/css/cssUtils.js");
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


var defaultUnits = {
  left: 'px',
  right: 'px',
  top: 'px',
  bottom: 'px',
  width: 'px',
  height: 'px',
  perspective: 'px'
},
    defaultBox = {
  left: 'x',
  right: 'x',
  top: 'y',
  bottom: 'y',
  width: 'x',
  height: 'y'
},
    defaultValue = {
  opacity: 0
};
function release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues) {
  var path = twKey.split('_'),
      tmpKey; // not optimal at all

  if (path.length === 2) {
    //console.log("dec", twKey, dataMap[path[0]][path[1]], keepValues)
    if (! --dataMap[path[0]][path[1]] && !keepValues) {
      delete tweenableMap[twKey]; //dataMap[path[0]][path[1]] = undefined;
    }

    if (!keepValues) while (dataMap[path[0]].length && !dataMap[path[0]][dataMap[path[0]].length - 1]) {
      dataMap[path[0]].pop();
    }

    if (dataMap[path[0]].length === 0 && !keepValues) {
      delete dataMap[path[0]];
      delete muxerMap[path[0]];
      if (cssMap) delete cssMap[path[0]]; //console.log("delete", path[0])
    }
  } else {
    console.log("wtf", path);
  }
}
function demuxOne(unitKey, twVal, baseKey, data, box) {
  var value = twVal,
      unit = _cssUtils__WEBPACK_IMPORTED_MODULE_1__["units"][unitKey] || defaultUnits[baseKey] || "px";

  if (unit === 'box') {
    value = value * (box[defaultBox[baseKey]] || box.x);
    unit = 'px';
  }

  if (unit === 'bw') {
    value = value * box.x;
    unit = 'px';
  }

  if (unit === 'bh') {
    value = value * box.y;
    unit = 'px';
  }

  if (unit === 'bz') {
    value = value * box.z;
    unit = 'px';
  }

  return unit ? Object(_cssUtils__WEBPACK_IMPORTED_MODULE_1__["floatCut"])(value) + unit : Object(_cssUtils__WEBPACK_IMPORTED_MODULE_1__["floatCut"])(value);
}
function demux(key, tweenable, target, data, box, baseKey) {
  var value,
      i = 0,
      y,
      rKey;
  value = ""; //if ( key=="height" )
  //	debugger;

  for (y = 0; y < data[key].length; y++) {
    if (data[key][y]) {
      rKey = key + "_" + y;
      if (tweenable[rKey] < 0) value += (i ? " - " : "-") + demuxOne(y, -tweenable[rKey], baseKey || key, data, box);else value += (i ? " + " : "") + demuxOne(y, tweenable[rKey], baseKey || key, data, box);
      i++;
    }
  }

  if (i > 1) value = "calc(" + value + ")"; //console.log(key, ':', value)

  return target ? target[key] = value : value;
}
function muxer(key, value, target, data, initials, noPropLock) {
  data[key] = data[key] || [];
  var seenUnits = [];

  if (is__WEBPACK_IMPORTED_MODULE_0___default.a.array(value)) {
    for (var i = 0; i < value.length; i++) {
      muxOne(key, value[i] || 0, target, data, initials, noPropLock, seenUnits);
    }
  } else {
    muxOne(key, value || 0, target, data, initials, noPropLock);
  }

  return demux;
}
function muxOne(key, value, target, data, initials, noPropLock, seenUnits) {
  var match = is__WEBPACK_IMPORTED_MODULE_0___default.a.string(value) ? value.match(_cssUtils__WEBPACK_IMPORTED_MODULE_1__["unitsRe"]) : false,
      unit = match && match[2] || defaultUnits[key] || "px",
      unitKey = _cssUtils__WEBPACK_IMPORTED_MODULE_1__["units"].indexOf(unit),
      realKey = unitKey !== -1 && key + '_' + unitKey || key;
  initials[realKey] = defaultValue[key] || 0;
  data[key][unitKey] = data[key][unitKey] || 0; //console.log(key, ':', data[key][unitKey], value, noPropLock)

  if (seenUnits && seenUnits[unitKey]) {
    //console.warn(key, ':', data[key][unitKey], value, noPropLock)
    if (match) {
      target[realKey] += parseFloat(match[1]);
    } else {
      target[realKey] += parseFloat(value);
    }
  } else {
    !noPropLock && data[key][unitKey]++;

    if (match) {
      target[realKey] = parseFloat(match[1]);
    } else {
      target[realKey] = parseFloat(value);
    }

    if (seenUnits) seenUnits[unitKey] = true;
  }

  return demux;
}
;
var mux = muxer;

/***/ }),

/***/ "./src/utils/css/demux/typed/ratio.js":
/*!********************************************!*\
  !*** ./src/utils/css/demux/typed/ratio.js ***!
  \********************************************/
/*! exports provided: release, demux, mux */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "release", function() { return release; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "demux", function() { return demux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mux", function() { return mux; });
/* harmony import */ var _cssUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../cssUtils */ "./src/utils/css/cssUtils.js");
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
var defaultUnits = {
  opacity: 1
};

function release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues) {
  if (! --dataMap[twKey] && !keepValues) {
    delete tweenableMap[twKey];
    delete dataMap[twKey];
    delete muxerMap[twKey];
    delete cssMap[twKey];
  }
}
function demux(key, tweenable, target, data, box) {
  target[key] = Math.min(1, Math.max(0, Object(_cssUtils__WEBPACK_IMPORTED_MODULE_0__["floatCut"])(tweenable[key])));
}
var mux = function mux(key, value, target, data, initials, noPropLock) {
  initials[key] = defaultUnits[key] || 0;
  target[key] = value;
  data[key] = data[key] || 0;
  !noPropLock && data[key]++;
  return demux;
};

/***/ }),

/***/ "./src/utils/css/demux/typed/shadow.js":
/*!*********************************************!*\
  !*** ./src/utils/css/demux/typed/shadow.js ***!
  \*********************************************/
/*! exports provided: release, demuxOne, demux, muxOne, mux */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "release", function() { return release; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "demuxOne", function() { return demuxOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "demux", function() { return demux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "muxOne", function() { return muxOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mux", function() { return mux; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "undefined?188d");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var css_box_shadow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! css-box-shadow */ "undefined?c6dc");
/* harmony import */ var css_box_shadow__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(css_box_shadow__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cssUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../cssUtils */ "./src/utils/css/cssUtils.js");
/* harmony import */ var _js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./(*).js */ "./src/MapOf.react_voodoo_utils_css_demux_typed_____js.gen.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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




var defaultUnits = {
  perspective: 'px'
},
    defaultBox = {
  translateX: 'x'
},
    defaultMuxers = {
  //blurRadius  : number,
  inset: _js__WEBPACK_IMPORTED_MODULE_4__["bool"],
  //offsetX     : number,
  //offsetY     : number,
  //spreadRadius: number,
  color: _js__WEBPACK_IMPORTED_MODULE_4__["color"]
};
function release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues) {
  var path = twKey.split('_'),
      tmpKey; // not optimal at all

  if (path.length > 2) {
    // dec count on transform
    tmpKey = path[0] + "_" + path[1] + "_" + path[2];

    if (defaultMuxers[path[2]]) {
      defaultMuxers[path[2]].release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues);

      if (!dataMap[tmpKey]) {
        //console.log("dec", tmpKey, dataMap[path[0]][path[1]][path[2]])
        if (! --dataMap[path[0]][path[1]][path[2]] && !keepValues) {
          delete dataMap[path[0]][path[1]][path[2]];
        }
      }

      if (dataMap[path[0]].length === 0 && !keepValues) {
        delete dataMap[path[0]];
        delete muxerMap[path[0]];
        delete cssMap[path[0]]; //console.log("delete color", twKey)
      }

      return;
    } //console.log("dec", twKey, dataMap[path[0]])


    if (! --dataMap[path[0]][path[1]][path[2]] && !keepValues) {
      delete dataMap[path[0]][path[1]][path[2]];
    } //if ( Object.keys(dataMap[path[0]][path[1]]).length === 0 && !keepValues )
    //	delete dataMap[path[0]][path[1]];
    // free transform layers


    if (!keepValues) while (dataMap[path[0]].length && !dataMap[path[0]][dataMap[path[0]].length - 1]) {
      dataMap[path[0]].pop();
    } //tmpKey = path[0] + "_" + path[1] + "_" + path[2];
    // units

    if (! --dataMap[tmpKey][path[3]] && !keepValues) {
      delete dataMap[tmpKey][path[3]]; //dataMap[path[0]][path[3]] = undefined;

      delete tweenableMap[twKey]; //console.log("delete", tmpKey)
    }

    if (!keepValues) while (dataMap[tmpKey].length && !dataMap[tmpKey][dataMap[tmpKey].length - 1]) {
      dataMap[tmpKey].pop();
    }
    if (dataMap[tmpKey].length === 0 && !keepValues) delete dataMap[tmpKey];
    if (!keepValues) while (dataMap[path[0]].length && !Object.keys(dataMap[path[0]][dataMap[path[0]].length - 1]).length) {
      dataMap[path[0]].pop();
    }

    if (dataMap[path[0]].length === 0 && !keepValues) {
      delete dataMap[path[0]];
      delete muxerMap[path[0]];
      delete cssMap[path[0]]; //console.log("delete", path[0])
    }
  } else {
    console.log("wtf", path);
  }
}
function demuxOne(unitIndex, dkey, twVal, baseKey, data, box) {
  var value = twVal,
      unit = _cssUtils__WEBPACK_IMPORTED_MODULE_3__["units"][unitIndex] || defaultUnits[baseKey];

  if (unit === 'box') {
    value = value * (box[defaultBox[baseKey]] || box.x);
    unit = 'px';
  }

  if (unit === 'bw') {
    value = value * box.x;
    unit = 'px';
  }

  if (unit === 'wh') {
    value = value * box.y;
    unit = 'px';
  }

  if (unit === 'bz') {
    value = value * box.z;
    unit = 'px';
  }

  if (unit === 'deg') value = value % 360;
  return unit ? Object(_cssUtils__WEBPACK_IMPORTED_MODULE_3__["floatCut"])(value) + unit : Object(_cssUtils__WEBPACK_IMPORTED_MODULE_3__["floatCut"])(value);
}
function demux(key, tweenable, target, data, box) {
  //console.log(key)
  var shadows = [],
      tmpValue = {};
  var ti = 0,
      shadowMap,
      fkey,
      unitKey,
      unitIndex,
      dkey,
      u,
      iValue,
      y = 0,
      value;

  for (; ti < data[key].length; ti++) {
    shadowMap = data[key][ti];
    tmpValue = {};

    for (fkey in shadowMap) {
      if (shadowMap.hasOwnProperty(fkey)) {
        dkey = key + '_' + ti + '_' + fkey;

        if (defaultMuxers[fkey]) {
          value = defaultMuxers[fkey].demux(dkey, tweenable, undefined, data, box); //continue;
          //console.log(dkey, tweenable[dkey])
        } else {
          value = "";
          y = 0;

          for (unitIndex = 0; unitIndex < data[dkey].length; unitIndex++) {
            if (data[dkey][unitIndex]) {
              unitKey = dkey + "_" + unitIndex;
              iValue = demuxOne(unitIndex, dkey, tweenable[unitKey], fkey, data, box);
              if (y && iValue[0] === '-') iValue = " - " + iValue.substr(1);else if (y) iValue = " + " + iValue;
              value += iValue;
              y++;
            }
          }

          if (y > 1) value = "calc(" + value + ")";
        }

        tmpValue[fkey] = value || 0;
      }
    }

    shadows.push(tmpValue);
  }

  target[key] = css_box_shadow__WEBPACK_IMPORTED_MODULE_1___default.a.stringify(shadows); //console.log(key, shadows, target[key]);
}
function muxOne(key, baseKey, value, target, data, initials, noPropLock, seenUnits) {
  var match = is__WEBPACK_IMPORTED_MODULE_2___default.a.string(value) ? value.match(_cssUtils__WEBPACK_IMPORTED_MODULE_3__["unitsRe"]) : false,
      unit = match && match[2] || defaultUnits[baseKey] || "px",
      unitKey = _cssUtils__WEBPACK_IMPORTED_MODULE_3__["units"].indexOf(unit),
      realKey = unitKey !== -1 && key + '_' + unitKey || key;
  initials[realKey] = 0;
  data[key][unitKey] = data[key][unitKey] || 0; //console.log(key, ':', data[key][unitKey], value, noPropLock)

  if (seenUnits && seenUnits[unitKey]) {
    //console.warn(key, ':', data[key][unitKey], value, noPropLock)
    if (match) {
      target[realKey] += parseFloat(match[1]);
    } else {
      target[realKey] += parseFloat(value);
    }
  } else {
    !noPropLock && data[key][unitKey]++;

    if (match) {
      target[realKey] = parseFloat(match[1]);
    } else {
      target[realKey] = parseFloat(value);
    }

    if (seenUnits) seenUnits[unitKey] = true;
  }

  return demux;
}
;
var mux = function mux(key, value, target, data, initials, noPropLock, reOrder) {
  data[key] = data[key] || []; //initials[key] = 0;

  if (!is__WEBPACK_IMPORTED_MODULE_2___default.a.array(value)) value = [value];
  var ti = 0,
      shadowMap,
      tFnKey,
      baseData,
      fValue,
      dkey,
      u,
      seenUnits;

  for (; ti < value.length; ti++) {
    shadowMap = value[ti];
    if (is__WEBPACK_IMPORTED_MODULE_2___default.a.string(shadowMap)) shadowMap = css_box_shadow__WEBPACK_IMPORTED_MODULE_1___default.a.parse(shadowMap)[0];
    baseData = reOrder ? {} : _objectSpread({}, data[key][ti] || {});

    for (tFnKey in shadowMap) {
      if (shadowMap.hasOwnProperty(tFnKey)) {
        fValue = shadowMap[tFnKey];
        dkey = key + '_' + ti + '_' + tFnKey;
        baseData[tFnKey] = baseData[tFnKey] || data[key][ti] && data[key][ti][tFnKey] || 0;
        !noPropLock && baseData[tFnKey]++;

        if (defaultMuxers[tFnKey]) {
          defaultMuxers[tFnKey].mux(dkey, fValue, target, data, initials, noPropLock, reOrder);
        } else {
          seenUnits = {};
          data[dkey] = data[dkey] || [];

          if (is__WEBPACK_IMPORTED_MODULE_2___default.a.array(fValue)) {
            for (u = 0; u < fValue.length; u++) {
              muxOne(dkey, tFnKey, fValue[u] || 0, target, data, initials, noPropLock, seenUnits);
            }
          } else {
            muxOne(dkey, tFnKey, fValue || 0, target, data, initials, noPropLock);
          }
        }
      }
    }

    data[key][ti] = reOrder ? _objectSpread({}, baseData, {}, data[key][ti] || {}, {}, baseData) : baseData; //console.log(key, reOrder, data[key][ti], baseData)
  }

  return demux;
};

/***/ }),

/***/ "./src/utils/css/index.js":
/*!********************************!*\
  !*** ./src/utils/css/index.js ***!
  \********************************/
/*! exports provided: clearTweenableValue, muxToCss, deMuxTween, deMuxLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearTweenableValue", function() { return clearTweenableValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "muxToCss", function() { return muxToCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deMuxTween", function() { return deMuxTween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deMuxLine", function() { return deMuxLine; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "undefined?188d");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tweenTools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tweenTools */ "./src/utils/tweenTools.js");
/* harmony import */ var _cssUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cssUtils */ "./src/utils/css/cssUtils.js");
/* harmony import */ var _demux_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./demux/(*).js */ "./src/MapOf.react_voodoo_utils_css_demux_____js.gen.js");
/* harmony import */ var _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./demux/typed/(*).js */ "./src/MapOf.react_voodoo_utils_css_demux_typed_____js.gen.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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





var cssDemux = _objectSpread({}, _demux_js__WEBPACK_IMPORTED_MODULE_3__["default"], {
  height: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"],
  width: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"],
  top: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"],
  left: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"],
  right: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"],
  bottom: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"],
  marginTop: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"],
  marginLeft: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"],
  marginRight: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"],
  marginBottom: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"],
  paddingTop: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"],
  paddingLeft: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"],
  paddingRight: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"],
  paddingBottom: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"],
  borderRadius: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"],
  transformOrigin: Object(_demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["multi"])(2),
  zIndex: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["int"],
  opacity: _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["ratio"]
});

function clearTweenableValue(cssKey, twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues) {
  var path = twKey.split('_'),
      tmpKey; // not optimal at all

  cssDemux[path[0]] && cssDemux[path[0]].release(twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues);
}
function muxToCss(tweenable, css, demuxers, data, box) {
  Object.keys(demuxers).forEach(function (key) {
    demuxers[key].demux(key, tweenable, css, data, box);
  });
}
function deMuxTween(tween, deMuxedTween, initials, data, demuxers, noPropLock, reOrder) {
  var fTween = {},
      excluded = {};
  Object.keys(tween).forEach(function (key) {
    if (cssDemux[key]) fTween[key] = tween[key];else if (Object(_cssUtils__WEBPACK_IMPORTED_MODULE_2__["isValidDeclaration"])(key, tween[key])) {
      if (Object(_cssUtils__WEBPACK_IMPORTED_MODULE_2__["isShorthandProperty"])(key)) {
        Object(_cssUtils__WEBPACK_IMPORTED_MODULE_2__["expandShorthandProperty"])(key, tween[key], fTween);
      } else fTween[key] = tween[key];
    } else excluded[key] = tween[key];
  });
  Object.keys(fTween).forEach(function (key) {
    if (cssDemux[key]) {
      //key, value, target, data, initials
      (demuxers[key] = cssDemux[key]).mux(key, fTween[key], deMuxedTween, data, initials, noPropLock, reOrder);
    } else (demuxers[key] = _demux_typed_js__WEBPACK_IMPORTED_MODULE_4__["number"]).mux(key, fTween[key], deMuxedTween, data, initials, noPropLock, reOrder);
  });
  return excluded;
}
function deMuxLine(tweenLine, initials, data, demuxers, noPropLock) {
  noPropLock = noPropLock && {};
  var allPropsById = {},
      twAxis = tweenLine.reduce(function (line, tween) {
    var demuxedTween = {};
    demuxers[tween.target] = demuxers[tween.target] || {};
    initials[tween.target] = initials[tween.target] || {};
    data[tween.target] = data[tween.target] || {};

    if (!tween.type || tween.type === "Tween") {
      !noPropLock && Object(_tweenTools__WEBPACK_IMPORTED_MODULE_1__["addCss"])(allPropsById[tween.target] = allPropsById[tween.target] || {}, tween.apply); //console.log("merged", tween.apply)

      deMuxTween(tween.apply, demuxedTween, initials[tween.target], data[tween.target], demuxers[tween.target], true);
      line.push(_objectSpread({}, tween, {
        apply: demuxedTween
      }));
    } else line.push(_objectSpread({}, tween));

    return line;
  }, []); //console.log(allPropsById)

  !noPropLock && Object.keys(allPropsById).forEach(function (id) {
    return deMuxTween(allPropsById[id], {}, {}, data[id], demuxers[id]);
  });
  return twAxis;
}

/***/ }),

/***/ "./src/utils/dom.js":
/*!**************************!*\
  !*** ./src/utils/dom.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
var is = __webpack_require__(/*! is */ "undefined?63a5"),
    isBrowser = typeof window !== 'undefined',
    isTouch = isBrowser && function is_touch_device() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

  var mq = function mq(query) {
    return window.matchMedia && window.matchMedia(query).matches;
  };

  if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  } // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH


  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}(),
    _dom = isBrowser ? {
  prefix: /webkit/i.test(navigator.appVersion) ? 'webkit' : /firefox/i.test(navigator.userAgent) ? 'Moz' : /trident/i.test(navigator.userAgent) ? 'ms' : 'opera' in window ? 'O' : '',
  dashedPrefix: /webkit/i.test(navigator.appVersion) ? '-webkit-' : /firefox/i.test(navigator.userAgent) ? '-moz-' : /trident/i.test(navigator.userAgent) ? '-ms-' : 'opera' in window ? '-o-' : ''
} : {
  prefix: '',
  dashedPrefix: ''
},
    __ = {
  onPageHided: [],
  onPageShown: [],
  dragging: [],
  dragEnabled: [],
  dragEnabledDesc: [],
  fingers: {},
  nbFingers: 0,
  dragstartAnywhere: function dragstartAnywhere(e) {
    var o,
        me = __,
        i = me.dragEnabled.indexOf(this),
        finger,
        desc,
        fingers = [];

    if (i === -1) {
      return;
    } //e.preventDefault();
    //e.stopPropagation();


    if (!me.nbFingers) {
      Dom.addEvent(document, {
        'touchmove': me.dragAnywhere,
        'mousemove': me.dragAnywhere,
        'touchend': me.dropAnywhere,
        'mouseup': me.dropAnywhere
      });
      Dom.addEvent(this, {
        'click': me.dropWithoutClick
      }, null, null, true);
    }

    if (e.changedTouches && e.changedTouches.length) {
      fingers = e.changedTouches;
    } else fingers.push(e);

    for (var t = 0, ln = fingers.length; t < ln; t++) {
      finger = fingers[t];
      desc = me.dragEnabledDesc[i];
      if (desc.nbFingers) continue;
      me.nbFingers++;
      me.fingers[finger.identifier] = me.fingers[finger.identifier] || [];
      me.fingers[finger.identifier].push(desc);
      desc.nbFingers++;
      desc._startPos.x = _dom.prefix == 'MS' ? finger.x : finger.pageX;
      desc._startPos.y = _dom.prefix == 'MS' ? finger.y : finger.pageY;
      desc._startTs = e.timeStamp;
      desc._lastPos.x = _dom.prefix == 'MS' ? finger.x : finger.pageX;
      desc._lastPos.y = _dom.prefix == 'MS' ? finger.y : finger.pageY;

      for (o = 0; o < desc.dragstart.length; o++) {
        desc.dragstart[o][0].call(desc.dragstart[o][1] || this, e, finger, desc);
      }
    }
  },
  dragAnywhere: function dragAnywhere(e) {
    var _this = this;

    var o,
        me = __,
        finger,
        fingers = [],
        stopped,
        desc = __.dragging[0];

    if (e.changedTouches && e.changedTouches.length) {
      fingers = e.changedTouches;
    } else fingers.push(e);

    for (var i = 0, ln = fingers.length; i < ln; i++) {
      finger = fingers[i];
      desc = me.fingers[finger.identifier];
      me.fingers[finger.identifier] && me.fingers[finger.identifier].forEach(function (desc) {
        if (stopped) {
          desc._lastPos.x = desc._startPos.x = _dom.prefix == 'MS' ? finger.x : finger.pageX;
          desc._lastPos.y = desc._startPos.y = _dom.prefix == 'MS' ? finger.y : finger.pageY;
          return;
        }

        desc._lastPos.x = _dom.prefix == 'MS' ? finger.x : finger.pageX;
        desc._lastPos.y = _dom.prefix == 'MS' ? finger.y : finger.pageY;

        for (o = 0; o < desc.drag.length; o++) {
          stopped = desc.drag[o][0].call(desc.drag[o][1] || _this, e, finger, desc) === false;
        }
      });
    }
  },
  dropWithoutClick: function dropWithoutClick(e) {
    if (__.preventNextClick) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      __.preventNextClick = false;
    }

    Dom.removeEvent(this, {
      'click': this.dropWithoutClick
    });
  },
  dropAnywhere: function dropAnywhere(e) {
    var _this2 = this;

    var o,
        me = __,
        finger,
        fingers = [],
        prevent;

    if (e.changedTouches && e.changedTouches.length) {
      fingers = e.changedTouches;
    } else fingers.push(e);

    for (var i = 0, ln = fingers.length; i < ln; i++) {
      finger = fingers[i];
      me.nbFingers--;
      me.fingers[finger.identifier] && me.fingers[finger.identifier].forEach(function (desc) {
        desc.nbFingers--;
        prevent = prevent || desc.mouseDrag && e.timeStamp - desc._startTs > 250;
        desc._lastPos.x = _dom.prefix == 'MS' ? finger.x : finger.pageX;
        desc._lastPos.y = _dom.prefix == 'MS' ? finger.y : finger.pageY;

        for (o = 0; o < desc.dropped.length; o++) {
          desc.dropped[o][0].call(desc.dropped[o][1] || _this2, e, finger, desc);
        }
      });
      me.fingers[finger.identifier] = null;
    }

    if (prevent) {
      me.preventNextClick = true;
    }

    if (!me.nbFingers) {
      Dom.removeEvent(document, {
        'touchmove': me.dragAnywhere,
        'mousemove': me.dragAnywhere,
        'touchend': me.dropAnywhere,
        'mouseup': me.dropAnywhere
      });
    }
  },
  getDraggable: function getDraggable(node, mouseDrag) {
    var i = this.dragEnabled.indexOf(node),
        desc;

    if (i === -1) {
      this.dragEnabled.push(node);
      this.dragEnabledDesc.push(desc = {
        mouseDrag: mouseDrag,
        nbFingers: 0,
        locks: 0,
        _startPos: {
          x: 0,
          y: 0
        },
        _lastPos: {
          x: 0,
          y: 0
        },
        dragstart: [],
        drag: [],
        dragEnd: [],
        dropped: []
      }); //debugger;

      Dom.addEvent(node, {
        'mousedown': mouseDrag && this.dragstartAnywhere,
        'touchstart': this.dragstartAnywhere
      }, null, null, true);
    } else desc = this.dragEnabledDesc[i];

    return desc;
  },
  freeDraggable: function freeDraggable(node) {
    var i = this.dragEnabled.indexOf(node),
        desc;

    if (i !== -1) {
      this.dragEnabled.splice(i, 1);
      this.dragEnabledDesc.splice(i, 1);
      Dom.removeEvent(node, {
        'mousedown': this.dragstartAnywhere,
        'touchstart': this.dragstartAnywhere
      });
    }
  },
  addOverflowEvent: function addFlowListener(element, fn) {
    var type = 'over',
        flow = type == 'over';
    element.addEventListener('OverflowEvent' in window ? 'overflowchanged' : type + 'flow', function (e) {
      if (e.type == type + 'flow' || e.orient == 0 && e.horizontalOverflow == flow || e.orient == 1 && e.verticalOverflow == flow || e.orient == 2 && e.horizontalOverflow == flow && e.verticalOverflow == flow) {
        return fn.call(this, e);
      }
    }, false);
  },
  addEvent: function addEvent(node, type, fn, bubble) {
    if (node.addEventListener) {
      node.addEventListener(type, fn, bubble);
    } else if (node.attachEvent) {
      node.attachEvent('on' + type, fn.related = function (e) {
        return fn.call(node, e);
      });
    }
  },
  removeEvent: function removeEvent(node, type, fn, bubble) {
    if (node.removeEventListener) {
      node.removeEventListener(type, fn, bubble);
    } else if (node.attachEvent) {
      node.detachEvent('on' + type, fn.related);
    }
  },
  rmDragFn: function rmDragFn(arr, fn, scope) {
    for (var i = 0, ln = arr.length; i < ln; i++) {
      if (arr[i][0] === fn) return arr.splice(i, 1);
    }

    console.warn("Rm event : Listener not found !!");
  }
},
    Dom = {
  addEvent: function addEvent(node, type, fn, mouseDrag, bubble) {
    if (is.object(type)) {
      for (var o in type) {
        if (type.hasOwnProperty(o) && type[o]) this.addEvent(node, o, type[o], mouseDrag, bubble);
      }

      return;
    } else if (type == 'dragstart') {
      __.getDraggable(node, mouseDrag).dragstart.push([fn, mouseDrag]);
    } else if (type == 'drag') {
      __.getDraggable(node, mouseDrag).drag.push([fn, mouseDrag]);
    } else if (type == 'dropped') {
      __.getDraggable(node, mouseDrag).dropped.push([fn, mouseDrag]);
    } else {
      if (node.addEventListener) {
        node.addEventListener(type, fn, {
          passive: false
        });
      } else if (node.attachEvent) {
        node.attachEvent('on' + type, fn.related = function (e) {
          return fn.call(node, e);
        });
      }
    }
  },
  removeEvent: function removeEvent(node, type, fn, scope, bubble) {
    var i, desc;

    if (is.object(type)) {
      for (var o in type) {
        if (type.hasOwnProperty(o)) this.removeEvent(node, o, type[o], scope);
      }
    } else if (/^(drag|drop)/.test(type)) {
      desc = __.getDraggable(node);

      __.rmDragFn(desc[type], fn, scope);

      if (!desc.dragstart.length && !desc.drag.length && !desc.dragEnd.length && !desc.dropped.length) __.freeDraggable(node);
    } else {
      if (node.removeEventListener) {
        node.removeEventListener(type, fn, bubble);
      } else if (node.attachEvent) {
        node.detachEvent('on' + type, fn.related);
      }
    }
  },
  offset: function offset(elem) {
    // @todo
    var dims = {
      top: 0,
      left: 0,
      width: elem.offsetWidth,
      height: elem.offsetHeight
    };

    while (elem) {
      dims.top = dims.top + parseInt(elem.offsetTop);
      dims.left = dims.left + parseInt(elem.offsetLeft);
      elem = elem.offsetParent;
    }

    return dims;
  },
  addWheelEvent: isBrowser && function (window, document) {
    var prefix = "",
        _addEventListener,
        _rmEventListener,
        onwheel,
        support; // detect event model


    if (window.addEventListener) {
      _addEventListener = "addEventListener";
      _rmEventListener = "removeEventListener";
    } else {
      _addEventListener = "attachEvent";
      _rmEventListener = "detachEvent";
      prefix = "on";
    } // detect available wheel event


    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
    document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
    "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    var addWheelListener = function addWheelListener(elem, callback, scope, useCapture) {
      _addWheelListener(elem, support, callback, scope, useCapture); // handle MozMousePixelScroll in older Firefox


      if (support == "DOMMouseScroll") {
        _addWheelListener(elem, "MozMousePixelScroll", callback, scope, useCapture);
      }
    }; // Reasonable defaults


    var PIXEL_STEP = 10;
    var LINE_HEIGHT = 40;
    var PAGE_HEIGHT = 800;

    function normalizeWheel(
    /*object*/
    event)
    /*object*/
    {
      var sX = 0,
          sY = 0,
          // spinX, spinY
      pX = 0,
          pY = 0; // pixelX, pixelY
      // Legacy

      if ('detail' in event) {
        sY = event.detail;
      }

      if ('wheelDelta' in event) {
        sY = -event.wheelDelta / 120;
      }

      if ('wheelDeltaY' in event) {
        sY = -event.wheelDeltaY / 120;
      }

      if ('wheelDeltaX' in event) {
        sX = -event.wheelDeltaX / 120;
      } // side scrolling on FF with DOMMouseScroll


      if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in event) {
        pY = event.deltaY;
      }

      if ('deltaX' in event) {
        pX = event.deltaX;
      }

      if ((pX || pY) && event.deltaMode) {
        if (event.deltaMode == 1) {
          // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      } // Fall-back if spin cannot be determined


      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }

      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    }

    function _addWheelListener(elem, eventName, callback, scope, useCapture) {
      elem[_addEventListener](prefix + eventName, callback._wheelList = function (originalEvent) {
        !originalEvent && (originalEvent = window.event); // create a normalized event object

        var event = {
          // keep a ref to the original event object
          originalEvent: originalEvent,
          target: originalEvent.target || originalEvent.srcElement,
          type: "wheel",
          deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
          deltaX: 0,
          delatZ: 0,
          preventDefault: function preventDefault() {
            originalEvent.preventDefault ? originalEvent.preventDefault() : originalEvent.returnValue = false;
          },
          normalized: normalizeWheel(originalEvent)
        }; // calculate deltaY (and deltaX) according to the event

        if (support == "mousewheel") {
          event.deltaY = -1 / 40 * originalEvent.wheelDelta; // Webkit also support wheelDeltaX
          //                            originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 *
          // originalEvent.wheelDeltaX );
        } else if (support == "wheel" && _dom.prefix == "Moz") {
          event.deltaY = originalEvent.deltaY / 3;
        } else if (support == "wheel") {
          event.deltaY = originalEvent.deltaY / 100;
        } else {
          event.deltaY = originalEvent.deltaY;
        } //                        if (typeof originalEvent.wheelDeltaY !== 'number')
        //                            event.wheelDeltaY = originalEvent.deltaY/100;
        //                        event.wheelDelta = deltaY*120;
        // it's time to fire the callback


        return callback.call(scope || this, event);
      }, useCapture || false);
    }

    return addWheelListener;
  }(window, document),
  rmWheelEvent: isBrowser && function (window, document) {
    var prefix = "",
        _rmEventListener,
        onwheel,
        support; // detect event model


    if (addEventListener) {
      _rmEventListener = "removeEventListener";
    } else {
      _rmEventListener = "detachEvent";
      prefix = "on";
    } // detect available wheel event


    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
    document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
    "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    var rmWheelListener = function rmWheelListener(elem, callback, scope, useCapture) {
      _EventListener(elem, support, callback, scope, useCapture); // handle MozMousePixelScroll in older Firefox


      if (support == "DOMMouseScroll") {
        _EventListener(elem, "MozMousePixelScroll", callback, scope, useCapture);
      }
    };

    function _EventListener(elem, eventName, callback, scope, useCapture) {
      elem[_rmEventListener](prefix + eventName, callback._wheelList);
    }

    return rmWheelListener;
  }(window, document),

  /**
   * Find the react component that generate element dom node
   * @param element
   * @returns {[React.Component]}
   */
  findReactParents: function findReactParents(element) {
    var fiberNode,
        comps = [element];

    for (var key in element) {
      if (key.startsWith('__reactInternalInstance$')) {
        fiberNode = element[key];

        while (fiberNode.return) {
          if (fiberNode.stateNode && !comps.includes(fiberNode.stateNode)) comps.push(fiberNode.stateNode);
          fiberNode = fiberNode.return;
        }

        return comps;
      }
    }

    return element.parentNode && this.findReactParents(element.parentNode);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Dom);

/***/ }),

/***/ "./src/utils/inertia.js":
/*!******************************!*\
  !*** ./src/utils/inertia.js ***!
  \******************************/
/*! exports provided: applyInertia, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyInertia", function() { return applyInertia; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Inertia; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "undefined?188d");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
var is = __webpack_require__(/*! is */ "undefined?63a5"),
    easingFn = __webpack_require__(/*! d3-ease */ "undefined?25b8"),
    signOf = function sign(x) {
  return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? x : NaN : NaN;
},
    abs = Math.abs,
    floor = Math.floor,
    round = Math.round,
    min = Math.min,
    max = Math.max,
    floatCut = function floatCut(v) {
  if (v === void 0) {
    v = 0;
  }

  return v.toFixed(3);
},
    consts = {
  velocityResetTm: 150,
  clickTm: 250
}; // this is a mess

/**
 * Predict the inertia
 * @param _
 */


function applyInertia(_) {
  var velSign = signOf(_.lastVelocity);

  if (_.disabled) {
    // calc momentum distance...
    // get nb loop needed to get vel < .05
    _.loopsTarget = 0; // get velocity sum basing on nb loops needed

    _.loopsVelSum = 0; // deduce real dist of momentum

    _.targetDist = 0;
    _.targetDuration = 0;
  } else {
    // get nb loop needed to get vel < .05
    _.loopsTarget = floor(Math.log(.05 / abs(_.lastVelocity)) / Math.log(.9)); // get velocity sum basing on nb loops needed

    _.loopsVelSum = (Math.pow(.9, _.loopsTarget) - abs(_.lastVelocity)) / (.9 - 1); // deduce real dist of momentum

    _.targetDist = _.loopsVelSum * _.refFPS * velSign || 0;
    _.targetDuration = abs(_.loopsTarget * _.refFPS * velSign) || 0;
    console.log('applyInertia::applyInertia:67: ', _.targetDist, _.loopsVelSum, _.lastVelocity);
  }
}
var inertiaByNode = {
  nodes: [],
  inertia: []
};
/**
 * Main inertia class
 * @class Caipi slideshow
 * @type {module.exports}
 */

var Inertia = /*#__PURE__*/function () {
  function Inertia(opt) {
    var _ = this._ = {};

    _.conf = _objectSpread({}, this.constructor.config, {}, opt);
    this.active = false;
    _.pos = opt.value || 0;
    _.refFPS = 16;
    _.min = opt.min || 0;
    _.max = opt.max || 0;
    _.currentStop = 0;
    _.lastInertiaPos = 0;
    _.stops = _.conf.stops;
    _.disabled = _.conf.disabled;
    _.wayPoints = _.conf.wayPoints;
    _.inertiaFn = easingFn.easePolyOut;
    _.targetWayPointIndex = 0; //console.log('Inertia::constructor:113: ');

    this._detectCurrentSnap();
  }

  var _proto = Inertia.prototype;

  _proto.update = function update(at) {
    if (at === void 0) {
      at = Date.now();
    }

    var _ = this._,
        nextValue,
        loop;

    var pos = _.inertiaFn((at - _.inertiaStartTm) / _.targetDuration) * _.targetDist;

    if (!_.inertia) {
      //if ( _.conf.shouldLoop ) {
      //	while ( (loop = _.conf.shouldLoop(_.pos, 0)) ) {
      //		this.teleport(loop);
      //	}
      //}
      return _.pos;
    }

    var delta = pos - _.lastInertiaPos;
    _.lastInertiaPos = pos;

    if (at - _.inertiaStartTm >= _.targetDuration) {
      _.inertia = this.active = false;
      _.lastInertiaPos = delta = 0;
      _.targetDist = 0;

      if (_.targetWayPoint) {
        delta = _.targetWayPoint.at - _.pos; //console.log("snap done ", _.targetWayPoint, _.pos + delta);

        _.currentWayPoint = _.targetWayPoint;
        _.currentWayPointIndex = _.targetWayPointIndex;
        _.targetWayPoint = null;
        _.targetWayPointIndex = null; //_.lastSnapTm           = Date.now();
      }

      if (_.conf.onInertiaEnd) {
        _.conf.onInertiaEnd(_.pos, _.currentWayPoint);
      }
    }

    delta = delta || 0; //console.log(_.pos + delta);

    nextValue = _.pos + delta;

    if (delta && _.conf.shouldLoop) {
      while (loop = _.conf.shouldLoop(nextValue, delta)) {
        //console.warn("loop update", loop);
        nextValue += loop; //this.teleport(loop);
      }
    }

    _.pos = nextValue;
    return nextValue;
  };

  _proto.setPos = function setPos(pos) {
    var _ = this._,
        nextValue;
    _.inertia = false;
    this.active = false;
    _.lastInertiaPos = 0;
    _.targetDist = 0;
    _.pos = pos;

    if (_.conf.bounds) {
      _.pos = max(_.pos, _.min);
      _.pos = min(_.pos, _.max);
    }
  };

  _proto.setWayPoints = function setWayPoints(wayPoints) {
    var _ = this._,
        nextValue;
    _.wayPoints = wayPoints;

    this._detectCurrentSnap();
  };

  _proto.teleport = function teleport(loopDist) {
    var _ = this._,
        nextValue;
    if (!_.inertia) return _.pos += loopDist; //_.lastInertiaPos += loopDist;

    _.pos += loopDist; //console.log("setPos", _.lastInertiaPos);
  };

  _proto.dispatch = function dispatch(delta, tm) {
    if (tm === void 0) {
      tm = 500;
    }

    var _ = this._,
        now = Date.now(),
        pos;
    this.active = true; // if no inertia has started || if direction has change

    if (!_.inertia || signOf(delta) !== signOf(_.targetDist)) {
      _.inertia = true;
      _.lastInertiaPos = 0;
      _.inertiaStartTm = _.inertiaLastTm = now;
      _.targetDist = delta;
      _.targetDuration = tm;
    } else {
      //_.inertiaStartTm =
      //_.inertiaLastTm = now;
      //_.lastInertiaPos = 0;
      _.targetDist += delta;
      _.targetDuration += tm / 2;
    } //
    //if ( _.conf.maxJump ) {
    //
    //}


    if (_.conf.bounds) {
      if (_.pos + _.targetDist > _.max) {
        _.targetDist = _.max - _.pos;
        _.targetDuration = abs(_.targetDist * 10);
      } else if (_.pos + _.targetDist < _.min) {
        _.targetDist = _.min - _.pos;
        _.targetDuration = abs(_.targetDist * 10);
      }
    }

    this._doSnap(signOf(delta), 750);
  };

  _proto._detectCurrentSnap = function _detectCurrentSnap() {
    var _ = this._,
        pos = _.pos,
        i;

    if (_.wayPoints && _.wayPoints.length) {
      for (i = 0; i < _.wayPoints.length; i++) {
        if (floatCut(_.wayPoints[i].at) === floatCut(pos)) {
          _.currentWayPoint = _.wayPoints[i];
          _.currentWayPointIndex = i; //console.warn("snap set", i);

          return i;
        }
      }
    }
  };

  _proto._doSnap = function _doSnap(forceSnap, maxDuration) {
    if (maxDuration === void 0) {
      maxDuration = 2000;
    }

    var _ = this._,
        pos = _.targetDist + (_.pos - (_.lastInertiaPos || 0)),
        target,
        mid,
        i,
        i2;

    if (_.wayPoints && _.wayPoints.length) {
      for (i = 0; i < _.wayPoints.length; i++) {
        if (_.wayPoints[i].at > pos) break;
      }

      if (i === _.wayPoints.length) {
        i--;
      } else if (i === 0) {
        i = 0;
      } else {
        mid = _.wayPoints[i - 1].at + (_.wayPoints[i].at - _.wayPoints[i - 1].at) / 2;
        if (forceSnap) forceSnap < 0 && i--;else if (pos < mid) i--;
      }

      if (_.conf.maxJump && is.number(_.currentWayPointIndex)) {
        var d = i - _.currentWayPointIndex; //console.log('Inertia::_doSnap:154: ', i, d);

        if (abs(d) > _.conf.maxJump) {
          //console.log('max: ', i, d);
          i = _.currentWayPointIndex + signOf(d) * _.conf.maxJump;
        }
      }

      target = _.wayPoints[i].at;

      if (_.conf.willSnap) {
        _.conf.willSnap(i, _.wayPoints[i]);
      }

      _.lastInertiaPos = _.lastInertiaPos || 0;
      target = target - (_.pos - _.lastInertiaPos);
      _.targetDuration = max(50, min(maxDuration, abs(_.targetDuration / _.targetDist * target))) || 0; //console.log("do snap", i, target, _.targetDist, _.targetDuration);

      _.targetDist = target;
      _.targetWayPoint = _.wayPoints[i];
      _.targetWayPointIndex = i;
    } else {
      target = ~~(_.pos - _.lastInertiaPos);

      if (!_.conf.infinite) {
        if (target > _.max) {
          target = _.max - target;
          _.targetDuration = min(maxDuration, abs(_.targetDuration / _.targetDist * target));
          _.targetDist = target;
        } else if (target < _.min) {
          target = _.min - target;
          _.targetDuration = min(maxDuration, abs(_.targetDuration / _.targetDist * target));
          _.targetDist = target;
        }
      }
    }
  };

  _proto.setBounds = function setBounds(min, max) {
    var _ = this._; //console.log('Inertia::setBounds:245: ', min, max);

    _.min = min;
    _.max = max;
  };

  _proto.startMove = function startMove() {
    var _ = this._;
    _.baseTS = _.startTS = Date.now();
    _.lastVelocity = _.lastIVelocity = 0;
    _.lastAccel = 0;
    _.posDiff = 0;
    this.active = true;
    this.holding = true;
    _.inertia = false;
  };

  _proto.isInbound = function isInbound(nextPos) {
    var _ = this._,
        loop,
        delta = _.lastHoldPos !== undefined ? nextPos - _.lastHoldPos : 0,
        pos = (_.targetDist || 0) + (_.pos - (_.lastInertiaPos || 0)) + delta; //if ( _.conf.infinite ) return false;
    //
    //if ( _.conf.shouldLoop ) {
    //	while ( (loop = _.conf.shouldLoop(nextValue)) ) {
    //!(pos >= _.min && pos <= _.max) && console.warn("out", _.pos, pos, delta);
    //		pos += loop;
    //	}
    //}
    //console.log('Inertia::isInbound:359: ', pos, _.max);

    return pos >= _.min && pos <= _.max;
  };

  _proto.hold = function hold(nextPos) {
    var _ = this._,
        delta = _.lastHoldPos !== undefined ? nextPos - _.lastHoldPos : 0,
        loop; //_.holding     = true;

    _.lastHoldPos = nextPos;

    if (delta && _.conf.shouldLoop) {
      //while ( (loop = _.conf.shouldLoop(pos, delta)) ) {
      console.warn("loop", loop); //	pos += loop;
      //}

      while (loop = _.conf.shouldLoop(_.pos, delta)) {
        //console.warn("loop", loop);
        _.pos += loop;
      }
    }

    var now = Date.now(),
        //e.timeStamp,
    sinceLastPos = now - _.baseTS,
        pos = _.pos + delta,
        iVel = delta / sinceLastPos;
    if (!sinceLastPos || !iVel) return; //	debugger

    console.log("hold", sinceLastPos, iVel);
    _.lastIVelocity = iVel;
    _.lastVelocity = _.lastIVelocity * iVel / iVel;
    _.baseTS = now;
    _.targetDist = 0;
    _.lastInertiaPos = 0; // clear snap

    _.targetWayPoint = undefined;
    _.targetWayPointIndex = undefined;

    if (_.conf.bounds) {
      if (pos > _.max) {
        pos = _.max; // + min((pos - _.max) / 10, 10);
      } else if (pos < _.min) {
        pos = _.min; // - min((_.min - pos) / 10, 10);
      }
    }

    _.pos = pos;
  };

  _proto.release = function release() {
    var _ = this._,
        velSign = signOf(_.lastVelocity);
    this.holding = false; // calc momentum distance...

    applyInertia(_);
    _.lastHoldPos = undefined;
    _.holding = false;

    if (_.conf.bounds && _.conf.snapToBounds) {
      if (_.pos + _.targetDist > _.max) {
        _.targetDist = _.max - _.pos;
        _.targetDuration = abs(_.targetDist * 10);
      } else if (_.pos + _.targetDist < _.min) {
        _.targetDist = _.min - _.pos;
        _.targetDuration = abs(_.targetDist * 10);
      }
    } //else {


    if (!_.targetDuration) _.targetDuration = 50; //console.log(_);

    this.active = true;
    _.inertia = true;
    _.lastInertiaPos = 0;
    _.inertiaStartTm = _.inertiaLastTm = Date.now(); //}

    this._doSnap(null, 500);
  };

  return Inertia;
}();

Inertia.config = {
  bounds: true,
  snapToBounds: true
};


/***/ }),

/***/ "./src/utils/tweenTools.js":
/*!*********************************!*\
  !*** ./src/utils/tweenTools.js ***!
  \*********************************/
/*! exports provided: re_cssValueWithUnit, cssAdd, cssMult, offset, scale, reverse, addCss, extractCss, target, shiftTransforms */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "re_cssValueWithUnit", function() { return re_cssValueWithUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssAdd", function() { return cssAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssMult", function() { return cssMult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "offset", function() { return offset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reverse", function() { return reverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCss", function() { return addCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractCss", function() { return extractCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "target", function() { return target; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shiftTransforms", function() { return shiftTransforms; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "undefined?188d");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! is */ "undefined?63a5");
/* harmony import */ var is__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is__WEBPACK_IMPORTED_MODULE_1__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var re_cssValueWithUnit = new RegExp("([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" + ['box', 'bz', 'bh', 'bw', 'em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|') + ")");
/**
 * add any css val with it unit ( todo: optims&use objects for multi unit
 * @param val1
 * @param val2
 * @returns {Array}
 */

function cssAdd(val1, val2) {
  if (!is__WEBPACK_IMPORTED_MODULE_1___default.a.array(val1)) val1 = [val1];
  if (!is__WEBPACK_IMPORTED_MODULE_1___default.a.array(val2)) val2 = [val2];
  var units1 = val1.map(function (v) {
    return v && v.match && v.match(re_cssValueWithUnit) || [, v || 0, 'px'];
  }),
      units2 = val2.map(function (v) {
    return v && v.match && v.match(re_cssValueWithUnit) || [, v || 0, 'px'];
  }),
      remap = {},
      result = [],
      i;
  i = 0;

  while (i < units1.length) {
    remap[units1[i][2]] = remap[units1[i][2]] || 0;
    remap[units1[i][2]] += parseFloat(units1[i][1]);
    i++;
  }

  i = 0;

  while (i < units2.length) {
    remap[units2[i][2]] = remap[units2[i][2]] || 0;
    remap[units2[i][2]] += parseFloat(units2[i][1]);
    i++;
  }

  Object.keys(remap).forEach(function (unit) {
    return result.push(remap[unit] + unit);
  });

  for (var _len = arguments.length, argz = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    argz[_key - 2] = arguments[_key];
  }

  return argz.length ? cssAdd.apply(void 0, [result].concat(argz)) : result;
}
/**
 * Multiply any css val with it unit ( todo: optims & use objects for multi unit
 * @param val1
 * @param val2
 * @returns {Array}
 */

function cssMult(val1, val) {
  if (!is__WEBPACK_IMPORTED_MODULE_1___default.a.array(val1)) val1 = [val1];
  var units1 = val1.map(function (v) {
    return v && v.match && v.match(re_cssValueWithUnit) || [, v || 0, 'px'];
  }),
      remap = {},
      result = [],
      i;
  i = 0;

  while (i < units1.length) {
    remap[units1[i][2]] = remap[units1[i][2]] || 1;
    remap[units1[i][2]] = parseFloat(units1[i][1]) * val;
    i++;
  }

  Object.keys(remap).forEach(function (unit) {
    return result.push(remap[unit] + unit);
  });
  return result;
}
function offset(items, start) {
  if (start === void 0) {
    start = 0;
  }

  items = is__WEBPACK_IMPORTED_MODULE_1___default.a.array(items) ? items : items && [items] || items;
  return items.map(function (item) {
    return _objectSpread({}, item, {
      from: item.from + start
    });
  });
}
function scale(items, duration, withOffset) {
  if (duration === void 0) {
    duration = 0;
  }

  items = is__WEBPACK_IMPORTED_MODULE_1___default.a.array(items) ? items : items && [items] || items; // get items current duration

  var iDuration = 0;
  items.forEach(function (item) {
    iDuration = Math.max(iDuration, item.from + item.duration);
  });
  items = items.map(function (item) {
    return _objectSpread({}, item, {
      from: item.from / iDuration * duration,
      duration: item.duration / iDuration * duration
    });
  });
  return withOffset ? offset(items, withOffset) : items;
}

function inverseValues(v) {
  if (is__WEBPACK_IMPORTED_MODULE_1___default.a.number(v)) return -v;
  if (is__WEBPACK_IMPORTED_MODULE_1___default.a.object(v)) return Object.keys(v).reduce(function (h, key) {
    return h[key] = inverseValues(v[key]), h;
  }, {});
  if (is__WEBPACK_IMPORTED_MODULE_1___default.a.array(v)) return v.map(function (item) {
    return inverseValues(item);
  });
  var values = v.split(/(\-?\d+(?:\.\d+)?|\-?\.\d+)/ig);
  return values.map(function (val, i) {
    return i % 2 ? -parseFloat(val) : val;
  }).join("");
}

function reverse(items) {
  items = is__WEBPACK_IMPORTED_MODULE_1___default.a.array(items) ? items : items && [items] || items; // get items current duration

  var iDuration = 0;
  items.forEach(function (item) {
    iDuration = Math.max(iDuration, item.from + item.duration);
  });
  return items.map(function (item) {
    item = _objectSpread({}, item, {
      from: iDuration - (item.from + item.duration)
    }, item.apply ? {
      apply: inverseValues(item.apply)
    } : undefined);
    return item;
  });
}
var MultiCssProps = {
  "transform": true,
  "filter": true,
  "textShadow": true,
  "boxShadow": true
};
function addCss(target) {
  for (var _len2 = arguments.length, sources = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    sources[_key2 - 1] = arguments[_key2];
  }

  var source = sources.shift();

  for (var key in source) {
    if (!source.hasOwnProperty(key)) continue;

    if (MultiCssProps[key]) {
      if (!target[key]) {
        target[key] = [];
      }

      if (!is__WEBPACK_IMPORTED_MODULE_1___default.a.array(source[key])) {
        addCss(target[key], [source[key]]);
      } else addCss(target[key], source[key]);
    } else {
      // adding units
      if (is__WEBPACK_IMPORTED_MODULE_1___default.a.array(source[key])) {
        var _target$key;

        if (!target[key]) {
          target[key] = [];
        }

        if (!is__WEBPACK_IMPORTED_MODULE_1___default.a.array(target[key])) {
          target[key] = [].concat(source[key], [target[key]]);
        } else (_target$key = target[key]).push.apply(_target$key, source[key]);
      } else {
        if (!target[key]) {
          if (!is__WEBPACK_IMPORTED_MODULE_1___default.a.object(source[key])) {
            target[key] = source[key];
          } else {
            target[key] = _objectSpread({}, source[key]);
          }
        } else if (is__WEBPACK_IMPORTED_MODULE_1___default.a.object(target[key]) && is__WEBPACK_IMPORTED_MODULE_1___default.a.object(source[key])) {
          addCss(target[key], source[key]);
        } else {
          //else target[key].push(...source[key]);
          target[key] = addAllType(target[key], source[key]); //console.log(key, target[key])
        }
      }
    }
  }

  return sources.length && addCss.apply(void 0, [target].concat(sources)) || target;
}

function addAllType(v1, v2) {
  if (!v1) return v2;
  if (!v2) return v1;
  var values1 = ('' + v1).split(/(\-?\d+(?:\.\d+)?|\-?\.\d+)/ig),
      values2 = ('' + v2).split(/(\-?\d+(?:\.\d+)?|\-?\.\d+)/ig),
      r = values1.map(function (val, i) {
    return i % 2 ? parseFloat(val) + parseFloat(values2[i] || 0) : val;
  }).filter(function (i) {
    return i !== '';
  });
  return r.length === 1 ? parseInt(r[0]) : r.join("");
}

function extractCss(items, inverse) {
  var css = {};
  items = is__WEBPACK_IMPORTED_MODULE_1___default.a.array(items) ? items : items && [items] || items;
  items.forEach(function (item) {
    addCss(css, item.apply);
  });
  if (inverse) css = inverseValues(css); //if ( inverse && css.hasOwnProperty('opacity') )
  //	css.opacity -= 1;

  return css;
}
function target(items, target) {
  items = is__WEBPACK_IMPORTED_MODULE_1___default.a.array(items) ? items : items && [items] || items;
  return items.map(function (item) {
    return _objectSpread({}, item, {
      target: target
    });
  });
}
function shiftTransforms(items, shift) {
  if (shift === void 0) {
    shift = 1;
  }

  items = is__WEBPACK_IMPORTED_MODULE_1___default.a.array(items) ? items : items && [items] || items;
  return items.map(function (item) {
    var t = item.apply && item.apply.transform;

    if (t) {
      t = is__WEBPACK_IMPORTED_MODULE_1___default.a.array(t) ? t : [t];

      for (var i = 0; i < shift; i++) {
        t.unshift({});
      }

      item = _objectSpread({}, item, {
        apply: _objectSpread({}, item.apply, {
          transform: t
        })
      });
    }

    return item;
  });
}

/***/ }),

/***/ 0:
/*!*******************!*\
  !*** multi ./src ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src */"./src/index.js");


/***/ }),

/***/ "undefined?188d":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),

/***/ "undefined?25b8":
/*!**************************!*\
  !*** external "d3-ease" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("d3-ease");

/***/ }),

/***/ "undefined?2618":
/*!**********************************************************************!*\
  !*** external "@babel/runtime/helpers/objectWithoutPropertiesLoose" ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectWithoutPropertiesLoose");

/***/ }),

/***/ "undefined?3832":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "undefined?588e":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

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

/***/ "undefined?7cef":
/*!*****************************************************!*\
  !*** external "layer-pack/etc/utils/indexUtils.js" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("layer-pack/etc/utils/indexUtils.js");

/***/ }),

/***/ "undefined?8c1d":
/*!**********************************!*\
  !*** external "fast-deep-equal" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fast-deep-equal");

/***/ }),

/***/ "undefined?a742":
/*!*****************************!*\
  !*** external "color-rgba" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("color-rgba");

/***/ }),

/***/ "undefined?a9ee":
/*!*****************************!*\
  !*** external "tween-axis" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tween-axis");

/***/ }),

/***/ "undefined?beec":
/*!**************************!*\
  !*** external "shortid" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("shortid");

/***/ }),

/***/ "undefined?c6dc":
/*!*********************************!*\
  !*** external "css-box-shadow" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("css-box-shadow");

/***/ }),

/***/ "undefined?cdfe":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/inheritsLoose" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/inheritsLoose");

/***/ }),

/***/ "undefined?df9b":
/*!*************************************************!*\
  !*** external "@babel/runtime/helpers/extends" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/extends");

/***/ }),

/***/ "undefined?e4e5":
/*!***************************************************************!*\
  !*** external "@babel/runtime/helpers/assertThisInitialized" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/assertThisInitialized");

/***/ })

/******/ });
//# sourceMappingURL=react-voodoo.js.map