/*
 * Copyright (c) 2022-2023 Braun Nathanael
 *
 * This project is dual licensed under one of the following licenses:
 * - Creative Commons Attribution-NoDerivatives 4.0 International License.
 * - GNU AFFERO GENERAL PUBLIC LICENSE Version 3
 *
 * You should have received a copy of theses licenses along with this work.
 * If not, see <http://creativecommons.org/licenses/by-nd/4.0/> or <http://www.gnu.org/licenses/agpl-3.0.txt>.
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
