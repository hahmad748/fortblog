'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.parseCliParams = parseCliParams;
exports.parseCliOptions = parseCliOptions;
exports.log = log;
exports.header = header;
exports.footer = footer;
exports.error = error;
exports.die = die;
exports.exists = exists;
exports.readFile = readFile;
exports.writeFile = writeFile;
exports.stripBlockComments = stripBlockComments;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fsExtra = require('fs-extra');

var _lodash = require('lodash');

var _stripComments = require('strip-comments');

var _stripComments2 = _interopRequireDefault(_stripComments);

var _emoji = require('./emoji');

var emoji = _interopRequireWildcard(_emoji);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets CLI parameters.
 *
 * @param {string[]} cliArgs
 * @return {string[]}
 */
function parseCliParams(cliArgs) {
  const firstOptionIndex = cliArgs.findIndex(cliArg => cliArg.startsWith('-'));

  return firstOptionIndex > -1 ? cliArgs.slice(0, firstOptionIndex) : cliArgs;
}

/**
 * Gets mapped CLI options.
 *
 * @param {string[]} cliArgs
 * @param {object} [optionMap]
 * @return {object}
 */
function parseCliOptions(cliArgs, optionMap = {}) {
  let options = {};
  let currentOption = [];

  cliArgs.forEach(cliArg => {
    const option = cliArg.startsWith('-') && (0, _lodash.trimStart)(cliArg, '-').toLowerCase();
    const resolvedOption = (0, _lodash.findKey)(optionMap, aliases => aliases.includes(option));

    if (resolvedOption) {
      currentOption = options[resolvedOption] || (options[resolvedOption] = []);
    } else if (option) {
      currentOption = [];
    } else {
      currentOption.push(cliArg);
    }
  });

  return _extends({}, (0, _lodash.mapValues)(optionMap, () => undefined), options);
}

/**
 * Prints messages to console.
 *
 * @param {...string} [msgs]
 */
function log(...msgs) {
  console.log('  ', ...msgs);
}

/**
 * Prints application header to console.
 */
function header() {
  log();
  log(_chalk2.default.bold(_package2.default.name), _chalk2.default.bold.cyan(_package2.default.version));
}

/**
 * Prints application footer to console.
 */
function footer() {
  log();
}

/**
 * Prints error messages to console.
 *
 * @param {...string} [msgs]
 */
function error(...msgs) {
  log();
  console.error('  ', emoji.no, _chalk2.default.bold.red(msgs.join(' ')));
}

/**
 * Kills the process. Optionally prints error messages to console.
 *
 * @param {...string} [msgs]
 */
function die(...msgs) {
  msgs.length && error(...msgs);
  footer();
  process.exit(1); // eslint-disable-line
}

/**
 * Checks if path exists.
 *
 * @param {string} path
 * @return {boolean}
 */
function exists(path) {
  return (0, _fsExtra.existsSync)(path);
}

/**
 * Gets file content.
 *
 * @param {string} path
 * @return {string}
 */
function readFile(path) {
  return (0, _fsExtra.readFileSync)(path, 'utf-8');
}

/**
 * Writes content to file.
 *
 * @param {string} path
 * @param {string} content
 * @return {string}
 */
function writeFile(path, content) {
  (0, _fsExtra.ensureFileSync)(path);

  return (0, _fsExtra.outputFileSync)(path, content);
}

/**
 * Strips block comments from input string. Consolidates multiple line breaks.
 *
 * @param {string} input
 * @return {string}
 */
function stripBlockComments(input) {
  return _stripComments2.default.block(input, { keepProtected: true }).replace(/\n\s*\n\s*\n/g, '\n\n') // Strip unnecessary line breaks
  .trim().concat('\n');
}