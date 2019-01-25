
/*
 * Copyright (c) 2018. Wise Wild Web
 *
 * This File is part of Caipi and under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License
 * Full license at https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
 *
 *  @author : Nathanael Braun
 *  @contact : caipilabs@gmail.com
 */

import isArray from "isarray";
import isString from "isstring";
var anims = function ( id, target, ...argz ) {
    if ( isArray(id) ) {
        var p = id.slice();
        id    = p.shift();
        p.unshift(target);
        return anims[id].apply(this, p)
    } else if ( isString(id) )
        return anims[id].call(this, target, ...argz);
    else
        return id;

};
function requireAll( r ) {
    r.keys().forEach(( k, i )=> {
        var _k = k.match(/([^\/]+)\.js$/);
        if ( _k[1] != 'index' )
            anims[_k[1]] = anims[_k[1]] || r(k, i)
    });
}
//requireAll(require.context('App/anims/', true, /([^\/]+)\.js$/));
requireAll(require.context('ui/anims/', true, /([^\/]+)\.js$/));

export default anims;
