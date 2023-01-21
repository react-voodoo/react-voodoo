export function release( twKey, tweenableMap, cssMap, dataMap, muxerMap, keepValues ) {
	
	if ( !--dataMap[twKey] && !keepValues ) {
		delete tweenableMap[twKey];
		delete dataMap[twKey];
		delete muxerMap[twKey];
		delete cssMap[twKey];
	}
}

export function demux( key, tweenable, target, data, box ) {
	target[key] = tweenable[key];// + defaultUnits[key];
}


export const mux = ( key, value, target, data, initials, noPropLock ) => {
	
	
	initials[key] = 0;
	target[key]   = value;
	data[key]     = data[key] || 0;
	!noPropLock && data[key]++;
	
	return demux;
}
