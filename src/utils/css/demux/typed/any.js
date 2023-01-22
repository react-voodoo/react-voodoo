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

import is                           from "is";
import { floatCut, units, unitsRe } from "../../cssUtils";

const defaultUnits    = {
          left       : 'px',
          right      : 'px',
          top        : 'px',
          bottom     : 'px',
          width      : 'px',
          height     : 'px',
          perspective: 'px',
      },
      defaultBox      = {
          left  : 'x',
          right : 'x',
          top   : 'y',
          bottom: 'y',
          width : 'x',
          height: 'y',
      }, defaultValue = {
          opacity: 0
      };

export function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
    let path = twKey.split('_'), tmpKey;// not optimal at all
    
    if ( path.length === 2 ) {
        //console.log("dec", twKey, dataMap[path[0]][path[1]], keepValues)
        if ( !--dataMap[ path[ 0 ] ][ path[ 1 ] ] && !keepValues ) {
            delete tweenableMap[ twKey ];
            //dataMap[path[0]][path[1]] = undefined;
        }
        
        if ( !keepValues )
            while ( dataMap[ path[ 0 ] ].length && !dataMap[ path[ 0 ] ][ dataMap[ path[ 0 ] ].length - 1 ] )
                dataMap[ path[ 0 ] ].pop();
        
        if ( dataMap[ path[ 0 ] ].length === 0 && !keepValues ) {
            delete dataMap[ path[ 0 ] ];
            delete muxerMap[ path[ 0 ] ];
            if ( cssMap ) delete cssMap[ path[ 0 ] ];
            //console.log("delete", path[0])
        }
    }
    else {
        console.log("wtf", path)
    }
}

export function demuxOne( unitKey, twVal, baseKey, data, box ) {
    let value = twVal,
        unit  = units[ unitKey ] || defaultUnits[ baseKey ] || "px";
    
    if ( unit === 'box' ) {
        value = value * ( box[ defaultBox[ baseKey ] ] || box.x );
        unit  = 'px';
        
    }
    if ( unit === 'bw' ) {
        value = value * box.x;
        unit  = 'px';
    }
    if ( unit === 'bh' ) {
        value = value * box.y;
        unit  = 'px';
    }
    if ( unit === 'bz' ) {
        value = value * box.z;
        unit  = 'px';
    }
    return unit ? floatCut(value) + unit : floatCut(value);
}

export function demux( key, tweenable, target, data, box, baseKey ) {
    let value, i = 0, y, rKey;
    
    value = "";
    
    //if ( key=="height" )
    //	debugger;
    
    if ( data[ key ].isString ) {
        target[ key ] = data[ key ].value;// + defaultUnits[key];
        return data[ key ].value;
    }
    
    for ( y = 0; y < data[ key ].length; y++ )
        if ( data[ key ][ y ] ) {
            rKey = key + "_" + y;
            if ( tweenable[ rKey ] < 0 )
                value += ( i
                           ? " - "
                           : "-" ) + demuxOne(y, -tweenable[ rKey ], baseKey || key, data, box);
            else
                value += ( i
                           ? " + "
                           : "" ) + demuxOne(y, tweenable[ rKey ], baseKey || key, data, box);
            i++;
        }
    if ( i > 1 )
        value = "calc(" + value + ")";
    
    //console.log(key, ':', value)
    return target ? target[ key ] = value : value;
}

export function muxer( key, value, target, data, initials, noPropLock ) {
    
    data[ key ]   = data[ key ] || [];
    let seenUnits = [];
    if ( is.array(value) ) {
        for ( let i = 0; i < value.length; i++ ) {
            muxOne(key, value[ i ] || 0, target, data, initials, noPropLock, seenUnits)
        }
    }
    else {
        muxOne(key, value || 0, target, data, initials, noPropLock)
    }
    
    return demux;
}

export function muxOne( key, value, target, data, initials, noPropLock, seenUnits ) {
    
    let match   = is.string(value) ? value.match(unitsRe) : false,
        unit    = match && match[ 2 ] || defaultUnits[ key ] || "px",
        unitKey = units.indexOf(unit),
        realKey = unitKey !== -1 && ( key + '_' + unitKey ) || key;
    
    initials[ realKey ]    = defaultValue[ key ] || 0;
    data[ key ][ unitKey ] = data[ key ][ unitKey ] || 0;
    //
    if ( !match && is.string(value) ) {
        data[ key ].isString = true;
        data[ key ].value    = value;
        return demux;
    }
    
    if ( seenUnits && seenUnits[ unitKey ] ) {
        //console.warn(key, ':', data[key][unitKey], value, noPropLock)
        if ( match ) {
            target[ realKey ] += parseFloat(match[ 1 ]);
        }
        else {
            target[ realKey ] += parseFloat(value);
        }
    }
    else {
        
        !noPropLock && data[ key ][ unitKey ]++;
        if ( match ) {
            target[ realKey ] = parseFloat(match[ 1 ]);
        }
        else {
            target[ realKey ] = parseFloat(value);
        }
        if ( seenUnits ) seenUnits[ unitKey ] = true;
    }
    
    return demux;
};

export const mux = muxer;
