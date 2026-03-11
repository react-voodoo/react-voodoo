/**
 * Aggregator mock for the layer-pack glob import:
 *   import cssDemuxers from "./demux/(*).js"
 *
 * layer-pack collects all *.js files in the target directory and exposes them
 * as an object keyed by filename (without extension). We reproduce that here
 * so the CSS pipeline can be tested without a full webpack build.
 */

const transform       = require('../../src/utils/css/demux/transform');
const filter          = require('../../src/utils/css/demux/filter');
const boxShadow       = require('../../src/utils/css/demux/boxShadow');
const textShadow      = require('../../src/utils/css/demux/textShadow');
const backgroundColor = require('../../src/utils/css/demux/backgroundColor');
const svgAttr         = require('../../src/utils/css/demux/svgAttr');

const all = { transform, filter, boxShadow, textShadow, backgroundColor, svgAttr };

// Babel interop: `import foo from '...'` reads `.default`
module.exports = { __esModule: true, default: all };
