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

import is          from "is";
import * as length from "./number";

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
        length.demux(key + '_' + i, tweenable, nowhere, data, box, offset);
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
            length.mux(key + '_' + i, v, target, data, initials, noPropLock)
        }
        
        return demux;
    }, demux, release
} )
