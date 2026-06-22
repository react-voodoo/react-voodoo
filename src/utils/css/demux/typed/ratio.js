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

const defaultUnits = { opacity: 1 };
import {floatCut} from "../../cssUtils";

export function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	
	if ( !--dataMap[twKey] && !keepValues ) {
		delete tweenableMap[twKey];
		delete dataMap[twKey];
		delete muxerMap[twKey];
		delete cssMap[twKey];
	}
}

export function demux( key, tweenable, target, data, box ) {
	target[key] = Math.min(1, Math.max(0, floatCut(tweenable[key])));
}


export const mux = ( key, value, target, data, initials, noPropLock ) => {
	
	
	initials[key] = defaultUnits[key] || 0;
	target[key]   = value;
	data[key]     = data[key] || 0;
	!noPropLock && data[key]++;
	
	return demux;
}