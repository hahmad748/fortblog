'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _help = require('./help');

var help = _interopRequireWildcard(_help);

var _init = require('./init');

var init = _interopRequireWildcard(_init);

var _build = require('./build');

var build = _interopRequireWildcard(_build);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = { help, init, build };