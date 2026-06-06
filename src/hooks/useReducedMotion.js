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
