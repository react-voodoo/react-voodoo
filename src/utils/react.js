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
 * React component type detection helpers used by Node to decide how to pass the
 * DOM node ref to a child. Class components accept the standard `ref` prop directly;
 * functional components require either forwardRef or a named prop (e.g. `nodeRef`).
 */
export function isClassComponent(component) {
    return (
        typeof component === 'function' &&
        !!component.prototype.isReactComponent
    )
}
export function isFunctionalComponent(Component) {
    return (
        typeof Component === 'function' // can be various things
        && !(
        Component.prototype // native arrows don't have prototypes
        && Component.prototype.isReactComponent // special property
        )
    );
}

export function isReactComponent(component) {
    return (
        isClassComponent(component) ||
        isFunctionalComponent(component)
    )
}