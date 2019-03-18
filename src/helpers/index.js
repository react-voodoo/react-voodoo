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


import camCase                                                            from "camelcase-css";
import {expandShorthandProperty, isShorthandProperty, isValidDeclaration} from "css-property-parser";
import kebCase                                                            from "kebab-case";
import * as cssDemuxers                                                   from "./demux/(*).js";

import {number, transforms} from "./demux/typed/(*).js";

const cssDemux = {
	...cssDemuxers,
	height       : number,
	width        : number,
	top          : number,
	left         : number,
	right        : number,
	bottom       : number,
	marginTop    : number,
	marginLeft   : number,
	marginRight  : number,
	marginBottom : number,
	paddingTop   : number,
	paddingLeft  : number,
	paddingRight : number,
	paddingBottom: number,
	//rotate       : transforms,
	//rotateX      : transforms,
	//rotateY      : transforms,
	//x            : transforms,
	//y            : transforms,
	//z            : transforms,
	//_x           : transforms,
	//_y           : transforms,
	//_z           : transforms,
	//blur         : transforms,
	//perspective  : transforms
};
import cssAnimProps         from 'css-animated-properties'

export function muxToCss( tweenable, css, demuxers, data, box ) {
	Object.keys(demuxers)
	      .forEach(
		      ( key ) => {
			      demuxers[key](key, tweenable, css, data, box)
		      }
	      )
}

export function deMuxTween( tween, deMuxedTween, initials, data, demuxers ) {
	let fTween = {}, excluded = {};
	Object.keys(tween)
	      .forEach(
		      ( _key ) => {
			      let key = kebCase(_key);
			      if ( cssDemux[_key] )
				      fTween[key] = tween[_key];
			      else if ( isValidDeclaration(key, tween[_key] + '') && cssAnimProps.getProperty(key) ) {
				      if ( isShorthandProperty(key) ) {
					      Object.assign(fTween, expandShorthandProperty(key, tween[_key], true, true));
				      }
				      else fTween[key] = tween[_key];
			      }
			      else excluded[_key] = tween[_key];
		      });
	
	Object.keys(fTween)
	      .forEach(
		      ( _key ) => {
			      let key = camCase(_key);
			      if ( cssDemux[key] ) {//key, value, target, data, initials
				      demuxers[key] = cssDemux[key](key, fTween[_key], deMuxedTween, data, initials)
			      }
			      else
				      demuxers[key] = cssDemux.$all(key, fTween[_key], deMuxedTween, data, initials)
		      }
	      )
	return excluded;
}

export function deMuxLine( tweenLine, initials, data, demuxers ) {
	return tweenLine.reduce(
		( line, tween ) => {
			let demuxedTween       = {};
			demuxers[tween.target] = demuxers[tween.target] || {};
			initials[tween.target] = initials[tween.target] || {};
			data[tween.target]     = data[tween.target] || {};
			
			deMuxTween(tween.apply, demuxedTween, initials[tween.target], data[tween.target], demuxers[tween.target]);
			line.push(
				{
					...tween,
					apply: demuxedTween
				})
			return line
		},
		[]
	)
}