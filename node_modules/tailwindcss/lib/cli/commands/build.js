'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optionMap = exports.options = exports.description = exports.usage = undefined;
exports.run = run;

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _bytes = require('bytes');

var _bytes2 = _interopRequireDefault(_bytes);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _prettyHrtime = require('pretty-hrtime');

var _prettyHrtime2 = _interopRequireDefault(_prettyHrtime);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _3 = require('.');

var _4 = _interopRequireDefault(_3);

var _emoji = require('../emoji');

var emoji = _interopRequireWildcard(_emoji);

var _utils = require('../utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usage = exports.usage = 'build <file> [options]';
const description = exports.description = 'Compiles Tailwind CSS file.';

const options = exports.options = [{
  usage: '-o, --output <file>',
  description: 'Output file.'
}, {
  usage: '-c, --config <file>',
  description: 'Tailwind config file.'
}, {
  usage: '--no-autoprefixer',
  description: "Don't add vendor prefixes using autoprefixer."
}];

const optionMap = exports.optionMap = {
  output: ['output', 'o'],
  config: ['config', 'c'],
  noAutoprefixer: ['no-autoprefixer']

  /**
   * Prints the error message and stops the process.
   *
   * @param {...string} [msgs]
   */
};function stop(...msgs) {
  utils.header();
  utils.error(...msgs);
  utils.die();
}

/**
 * Prints the error message and help for this command, then stops the process.
 *
 * @param {...string} [msgs]
 */
function stopWithHelp(...msgs) {
  utils.header();
  utils.error(...msgs);
  _4.default.help.forCommand(_4.default.build);
  utils.die();
}

/**
 * Compiles CSS file.
 *
 * @param {string} inputFile
 * @param {string} configFile
 * @param {string} outputFile
 * @param {boolean} autoprefix
 * @return {Promise}
 */
function build(inputFile, configFile, outputFile, autoprefix) {
  const css = utils.readFile(inputFile);

  return new Promise((resolve, reject) => {
    (0, _postcss2.default)([(0, _2.default)(configFile)].concat(autoprefix ? [_autoprefixer2.default] : [])).process(css, {
      from: inputFile,
      to: outputFile
    }).then(resolve).catch(reject);
  });
}

/**
 * Compiles CSS file and writes it to stdout.
 *
 * @param {string} inputFile
 * @param {string} configFile
 * @param {string} outputFile
 * @param {boolean} autoprefix
 * @return {Promise}
 */
function buildToStdout(inputFile, configFile, outputFile, autoprefix) {
  return build(inputFile, configFile, outputFile, autoprefix).then(result => process.stdout.write(result.css));
}

/**
 * Compiles CSS file and writes it to a file.
 *
 * @param {string} inputFile
 * @param {string} configFile
 * @param {string} outputFile
 * @param {boolean} autoprefix
 * @param {int[]} startTime
 * @return {Promise}
 */
function buildToFile(inputFile, configFile, outputFile, autoprefix, startTime) {
  utils.header();
  utils.log();
  utils.log(emoji.go, 'Building...', _chalk2.default.bold.cyan(inputFile));

  return build(inputFile, configFile, outputFile, autoprefix).then(result => {
    utils.writeFile(outputFile, result.css);

    const prettyTime = (0, _prettyHrtime2.default)(process.hrtime(startTime));

    utils.log();
    utils.log(emoji.yes, 'Finished in', _chalk2.default.bold.magenta(prettyTime));
    utils.log(emoji.pack, 'Size:', _chalk2.default.bold.magenta((0, _bytes2.default)(result.css.length)));
    utils.log(emoji.disk, 'Saved to', _chalk2.default.bold.cyan(outputFile));
    utils.footer();
  });
}

/**
 * Runs the command.
 *
 * @param {string[]} cliParams
 * @param {object} cliOptions
 * @return {Promise}
 */
function run(cliParams, cliOptions) {
  return new Promise((resolve, reject) => {
    const startTime = process.hrtime();
    const inputFile = cliParams[0];
    const configFile = cliOptions.config && cliOptions.config[0];
    const outputFile = cliOptions.output && cliOptions.output[0];
    const autoprefix = !cliOptions.noAutoprefixer;

    !inputFile && stopWithHelp('CSS file is required.');
    !utils.exists(inputFile) && stop(_chalk2.default.bold.magenta(inputFile), 'does not exist.');

    configFile && !utils.exists(configFile) && stop(_chalk2.default.bold.magenta(configFile), 'does not exist.');

    const buildPromise = outputFile ? buildToFile(inputFile, configFile, outputFile, autoprefix, startTime) : buildToStdout(inputFile, configFile, outputFile, autoprefix);

    buildPromise.then(resolve).catch(reject);
  });
}