/**
 * Aggregator mock for the layer-pack glob import:
 *   import primitiveTypes, { length, multi, number, ratio, color, any }
 *     from "./demux/typed/(*).js"
 *
 * The default export is the full collection; named exports are each handler.
 */

const length = require('../../src/utils/css/demux/typed/length');
const number = require('../../src/utils/css/demux/typed/number');
const ratio  = require('../../src/utils/css/demux/typed/ratio');
const color  = require('../../src/utils/css/demux/typed/color');
const multi  = require('../../src/utils/css/demux/typed/multi');
const any    = require('../../src/utils/css/demux/typed/any');
const bool   = require('../../src/utils/css/demux/typed/bool');
const shadow = require('../../src/utils/css/demux/typed/shadow');

const all = { length, number, ratio, color, multi, any, bool, shadow };

module.exports = {
	__esModule: true,
	default   : all,
	// Named exports used by css/index.js
	length, number, ratio, color, multi, any, bool, shadow,
};
