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