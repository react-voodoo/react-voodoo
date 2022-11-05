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

export const props = {
	"margin"       : { "properties": ["marginTop", "marginRight", "marginBottom", "marginLeft"] },
	"marginBottom" : { "types": ["length"] },
	"marginLeft"   : { "types": ["length"] },
	"marginRight"  : { "types": ["length"] },
	"marginTop"    : { "types": ["length"] },
	"padding"      : { "properties": ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"] },
	"paddingBottom": { "types": ["length"] },
	"paddingLeft"  : { "types": ["length"] },
	"paddingRight" : { "types": ["length"] },
	"paddingTop"   : { "types": ["length"] },
	"bottom"       : { "types": ["length-percentage-calc"] },
	"left"         : { "types": ["length-percentage-calc"] },
	"right"        : { "types": ["length-percentage-calc"] },
	"top"          : { "types": ["length-percentage-calc"] },
	"zIndex"       : { "types": ["integer"] },
	"width"        : { "types": ["length-percentage-calc"] },
	"maxWidth"     : { "types": ["length-percentage-calc"] },
	"minWidth"     : { "types": ["length-percentage-calc"] },
	"height"       : { "types": ["length-percentage-calc"] },
	"maxHeight"    : { "types": ["length-percentage-calc"] },
	"minHeight"    : { "types": ["length-percentage-calc"] },
	"lineHeight"   : { "types": ["number", "length"] },
	"verticalAlign": { "types": ["length"] },
	"visibility"   : { "types": ["visibility"] },
	"borderSpacing": { "types": ["length"], "multiple": true },
	"color"        : { "types": ["color"] },
	"opacity"      : { "types": ["number"] },
	//"background"                 : { "properties": ["backgroundColor", "backgroundPosition", "backgroundSize"] },
	"backgroundColor"            : { "types": ["color"] },
	"backgroundPosition"         : {
		"types"     : ["length-percentage-calc"],
		"multiple"  : true,
		"repeatable": true
	},
	"backgroundSize"             : {
		"types"     : ["length-percentage-calc"],
		"multiple"  : true,
		"repeatable": true
	},
	"border"                     : { "properties": ["borderStyle", "borderWidth", "borderColor"] },
	"borderBottom"               : { "properties": ["borderBottomStyle", "borderBottomWidth", "borderBottomColor"] },
	"borderLeft"                 : { "properties": ["borderLeftStyle", "borderLeftWidth", "borderLeftColor"] },
	"borderRight"                : { "properties": ["borderRightStyle", "borderRightWidth", "borderRightColor"] },
	"borderTop"                  : { "properties": ["borderTopStyle", "borderTopWidth", "borderTopColor"] },
	"borderColor"                : { "properties": ["borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor"] },
	"borderWidth"                : { "properties": ["borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"] },
	"borderBottomColor"          : { "types": ["color"] },
	"borderLeftColor"            : { "types": ["color"] },
	"borderRightColor"           : { "types": ["color"] },
	"borderTopColor"             : { "types": ["color"] },
	"borderBottomWidth"          : { "types": ["length"] },
	"borderLeftWidth"            : { "types": ["length"] },
	"borderRightWidth"           : { "types": ["length"] },
	"borderTopWidth"             : { "types": ["length"] },
	"borderRadius"               : { "properties": ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"] },
	"borderTopLeftRadius"        : {
		"types"   : ["length-percentage-calc"],
		"multiple": true
	},
	"borderTopRightRadius"       : {
		"types"   : ["length-percentage-calc"],
		"multiple": true
	},
	"borderBottomRightRadius"    : {
		"types"   : ["length-percentage-calc"],
		"multiple": true
	},
	"borderBottomLeftRadius"     : {
		"types"   : ["length-percentage-calc"],
		"multiple": true
	},
	"boxShadow"                  : { "types": ["shadow-list"] },
	"caretColor"                 : { "types": ["color"] },
	"outline"                    : { "properties": ["outlineColor", "outlineWidth"] },
	"outlineColor"               : { "types": ["color"] },
	"outlineWidth"               : { "types": ["length"] },
	"outlineOffset"              : { "types": ["length"] },
	"flex"                       : { "properties": ["flexGrow", "flexShrink", "flexBasis"] },
	"flexGrow"                   : { "types": ["number"] },
	"flexShrink"                 : { "types": ["number"] },
	"flexBasis"                  : { "types": ["length-percentage-calc"] },
	"order"                      : { "types": ["integer"] },
	"font"                       : { "properties": ["fontWeight", "fontStretch", "fontSize", "lineHeight"] },
	"fontWeight"                 : { "types": ["font-weight"] },
	"fontStretch"                : { "types": ["font-stretch"] },
	"fontSize"                   : { "types": ["length"] },
	"fontSizeAdjust"             : { "types": ["number"] },
	"gridTemplateColumns"        : {
		"types"   : ["length-percentage-calc"],
		"multiple": true
	},
	"gridTemplateRows"           : {
		"types"   : ["length-percentage-calc"],
		"multiple": true
	},
	"gridTemplate"               : { "properties": ["gridTemplateRows", "gridTemplateColumns"] },
	"grid"                       : { "properties": ["gridTemplateRows", "gridTemplateColumns"] },
	"gridRowGap"                 : { "types": ["length-percentage-calc"] },
	"gridColumnGap"              : { "types": ["length-percentage-calc"] },
	"gridGap"                    : { "properties": ["gridRowGap", "gridColumnGap"] },
	"clip"                       : { "types": ["rectangle"] },
	"clipPath"                   : { "types": ["basic-shape"] },
	"mask"                       : { "properties": ["maskPosition", "maskSize"] },
	"maskPosition"               : {
		"types"     : ["length-percentage-calc"],
		"multiple"  : true,
		"repeatable": true
	},
	"maskSize"                   : {
		"types"     : ["length-percentage-calc"],
		"multiple"  : true,
		"repeatable": true
	},
	"shapeOutside"               : { "types": ["basic-shape"] },
	"shapeMargin"                : { "types": ["length-percentage-calc"] },
	"shapeImageThreshold"        : { "types": ["number"] },
	"scrollPadding"              : { "properties": ["scrollPaddingTop", "scrollPaddingRight", "scrollPaddingBottom", "scrollPaddingLeft"] },
	"scrollPaddingTop"           : { "types": ["length-percentage-calc"] },
	"scrollPaddingRight"         : { "types": ["length-percentage-calc"] },
	"scrollPaddingBottom"        : { "types": ["length-percentage-calc"] },
	"scrollPaddingLeft"          : { "types": ["length-percentage-calc"] },
	"scrollPaddingBlock"         : { "properties": ["scrollPaddingBlockStart", "scrollPaddingBlockEnd"] },
	"scrollPaddingBlockStart"    : { "types": ["length-percentage-calc"] },
	"scrollPaddingBlockEnd"      : { "types": ["length-percentage-calc"] },
	"scrollPaddingInline"        : { "properties": ["scrollPaddingInlineStart", "scrollPaddingInlineEnd"] },
	"scrollPaddingInlineStart"   : { "types": ["length-percentage-calc"] },
	"scrollPaddingInlineEnd"     : { "types": ["length-percentage-calc"] },
	"scrollSnapMargin"           : { "properties": ["scrollSnapMarginTop", "scrollSnapMarginRight", "scrollSnapMarginBottom", "scrollSnapMarginLeft"] },
	"scrollSnapMarginTop"        : { "types": ["length"] },
	"scrollSnapMarginRight"      : { "types": ["length"] },
	"scrollSnapMarginBottom"     : { "types": ["length"] },
	"scrollSnapMarginLeft"       : { "types": ["length"] },
	"scrollSnapMarginBlock"      : { "properties": ["scrollSnapMarginBlockStart", "scrollSnapMarginBlockEnd"] },
	"scrollSnapMarginBlockStart" : { "types": ["length"] },
	"scrollSnapMarginBlockEnd"   : { "types": ["length"] },
	"scrollSnapMarginInline"     : { "properties": ["scrollSnapMarginInlineStart", "scrollSnapMarginInlineEnd"] },
	"scrollSnapMarginInlineStart": { "types": ["length"] },
	"scrollSnapMarginInlineEnd"  : { "types": ["length"] },
	"textDecoration"             : { "properties": ["textDecorationColor"] },
	"textDecorationColor"        : { "types": ["color"] },
	"textEmphasis"               : { "properties": ["textEmphasisColor"] },
	"textEmphasisColor"          : { "types": ["color"] },
	"textShadow"                 : { "types": ["shadow-list"] },
	"columns"                    : { "properties": ["columnWidth", "columnCount"] },
	"columnWidth"                : { "types": ["length"] },
	"columnCount"                : { "types": ["integer"] },
	"columnGap"                  : { "types": ["length-percentage-calc"] },
	"columnRule"                 : { "properties": ["columnRuleColor", "columnRuleWidth"] },
	"columnRuleColor"            : { "types": ["color"] },
	"columnRuleWidth"            : { "types": ["length"] },
	"letterSpacing"              : { "types": ["length"] },
	"tabSize"                    : { "types": ["length"] },
	"textIndent"                 : { "types": ["length-percentage-calc"] },
	"wordSpacing"                : { "types": ["length-percentage-calc"] },
	"transform"                  : { "types": ["transform"] },
	"transformOrigin"            : {
		"types"   : ["length-percentage-calc"],
		"multiple": true
	},
	"perspective"                : { "types": ["length"] },
	"perspectiveOrigin"          : {
		"types"   : ["length-percentage-calc"],
		"multiple": true
	}
}

export const units    = ['', 'deg', 'box', 'bz', 'bh', 'bw', 'deg', 'em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'];
export const unitsRe  = new RegExp(
	"([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" +
	['\\w+', 'deg', 'bz', 'bh', 'bw', 'cap', 'ch', 'deg', 'em', 'ic', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|')
	+ ")"
);
export const floatCut = ( v = 0 ) => Number(v.toFixed(3));

export function expandShorthandProperty( property, value, target = {} ) {
	let type       = props[property],
	    childProps = type && type.properties,
	    values     = value.split(' ');
	
	if ( type.multiple )
		childProps && childProps.forEach(
			( k, i ) => {
				target[k] = values[i % values.length];
			}
		)
	else
		childProps && childProps.forEach(
			( k, i ) => {
				if ( values[i] )
					target[k] = values[i];
			}
		)
	return target;
};

export function isShorthandProperty( property ) {
	let type       = props[property],
	    childProps = type && type.properties;
	return childProps && !!childProps.length;
};



export function isValidDeclaration( property, value ) {
	return !!props[property];
};

/**
 * Check if a CSS property can be animated
 * @param  {string} property CSS property name
 * @return {boolean}         True if the property can be animated
 */
export function canAnimate( property ) {
	return props.hasOwnProperty(property);
};

/**
 * Get a definition of how a CSS property can be animated
 * @param  {string} property CSS property name
 * @param  {boolean} expand  Expand definitions for sub-properties, when available
 * @return {object}          Property definition, or null if it can't be animated
 */
export function getProperty( property, expand ) {
	if ( !exports.canAnimate(property) ) {
		return null;
	}
	var prop = props[property];
	var ret  = { name: property };
	Object.keys(prop).forEach(function ( key ) {
		var value = prop[key];
		if ( Array.isArray(value) ) {
			if ( key === 'properties' && expand ) {
				value = value.map(function ( subProp ) {
					return exports.getProperty(subProp, expand);
				});
			}
			else {
				value = value.slice(); // clone
			}
		}
		ret[key] = value;
	});
	return ret;
};
