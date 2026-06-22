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
