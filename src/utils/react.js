/*
 *
 * Copyright (C) 2020 Nathanael Braun
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
 *
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
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