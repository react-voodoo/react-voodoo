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

import React                                          from "react";
import { onReducedMotionChange, prefersReducedMotion } from "../utils/motionPrefs";

/**
 * useReducedMotion — returns true when the user's OS requests reduced motion
 * (prefers-reduced-motion: reduce) and re-renders when the preference changes.
 *
 * Always false server-side; the first client render reads the real preference.
 *
 * @returns {boolean}
 */
export default function useReducedMotion() {
	const [reduced, setReduced] = React.useState(prefersReducedMotion);

	React.useEffect(() => onReducedMotionChange(setReduced), []);

	return reduced;
}
