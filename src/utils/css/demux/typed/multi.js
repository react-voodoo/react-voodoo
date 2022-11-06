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

import is          from "is";
import * as number from "./number";

const
    alias = {
        top   : '0%',
        bottom: '100%',
        center: '50%',
        left  : '0%',
        right : '100%'
    };

function demux( key, tweenable, target, data, box, offset ) {
    
    let count = data[ "_" + key ], v = '', nowhere = {};
    
    for ( let i = 0; i < count; i++ ) {
        number.demux(key + '_' + i, tweenable, nowhere, data, box, offset);
        v += nowhere[ key + '_' + i ] + ' ';
    }
    
    target[ key ] = v;
}


function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
    let path = twKey.split('_'), tmpKey;// not optimal at all
    
    //if ( path.length === 2 ) {
    //	console.log("dec", twKey, dataMap[path[0]][path[1]])
    //	if ( !--dataMap[path[0]][path[1]] && !keepValues ) {
    //		delete tweenableMap[twKey];
    //		delete dataMap[path[0]][path[1]];
    //	}
    //
    //	if ( !keepValues )
    //		while ( dataMap[path[0]].length &&
    // !dataMap[path[0]][dataMap[path[0]].length - 1] ) dataMap[path[0]].pop();  if (
    // dataMap[path[0]].length === 0 && !keepValues ) { delete dataMap[path[0]]; delete
    // muxerMap[path[0]]; delete cssMap[path[0]]; console.log("delete", path[0]) } } else
    // { console.log("wtf", path) }
}

export default ( count ) => ( {
    mux: ( key, value, target, data, initials, noPropLock ) => {
        let values = value.split(' '), v;
        
        data[ key ] = data[ key ] || 0;
        noPropLock && data[ key ]++;
        data[ "_" + key ] = count;
        
        for ( let i = 0; i < count; i++ ) {
            v = values[ i % values.length ];
            v = is.string(v) && alias[ v ] || v;
            number.mux(key + '_' + i, v, target, data, initials, noPropLock)
        }
        
        return demux;
    }, demux, release
} )