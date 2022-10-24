#!/usr/bin/env node
'use strict';

var _main = require('./cli/main');

var _main2 = _interopRequireDefault(_main);

var _utils = require('./cli/utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _main2.default)(process.argv.slice(2)).catch(error => utils.die(error.stack));