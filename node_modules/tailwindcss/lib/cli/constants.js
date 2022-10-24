'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configStubFile = exports.defaultConfigFile = exports.cli = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cli = exports.cli = 'tailwind';
const defaultConfigFile = exports.defaultConfigFile = 'tailwind.js';
const configStubFile = exports.configStubFile = _path2.default.resolve(__dirname, '../../defaultConfig.stub.js');