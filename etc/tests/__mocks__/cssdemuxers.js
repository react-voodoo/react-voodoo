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
