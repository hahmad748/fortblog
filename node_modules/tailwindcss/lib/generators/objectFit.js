'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return (0, _defineClasses2.default)({
    'object-contain': { 'object-fit': 'contain' },
    'object-cover': { 'object-fit': 'cover' },
    'object-fill': { 'object-fit': 'fill' },
    'object-none': { 'object-fit': 'none' },
    'object-scale-down': { 'object-fit': 'scale-down' }
  });
};

var _defineClasses = require('../util/defineClasses');

var _defineClasses2 = _interopRequireDefault(_defineClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }