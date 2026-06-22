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
 * Micro object-pool for CSS property descriptor objects used during prop-lock
 * reference counting in the demux layer.
 *
 * Note: the `release()` method as written pops the object back to the pool when
 * `--this.locks` is *truthy* (i.e. still > 0), which appears inverted relative to
 * normal ref-counting semantics (usually you recycle when count reaches 0). This
 * logic is vestigial — `prop()` is not actively wired into the ref-counting path
 * used by the current demux implementations.
 */
let freePropStack = [];

export default function prop( key, value, targetId ) {
	return freePropStack.length
	       ? freePropStack.pop()
	       :
	       {
		       key,
		       value,
		       targetId,
		       locks: 1,
		       release() {
			       if ( --this.locks )
				       freePropStack.push(this);
		       }
	       }
}
