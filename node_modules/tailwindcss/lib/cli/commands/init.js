'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optionMap = exports.options = exports.description = exports.usage = undefined;
exports.run = run;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

var _emoji = require('../emoji');

var emoji = _interopRequireWildcard(_emoji);

var _utils = require('../utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usage = exports.usage = 'init [file]';
const description = exports.description = 'Creates Tailwind config file. Default: ' + _chalk2.default.bold.magenta(constants.defaultConfigFile);

const options = exports.options = [{
  usage: '--no-comments',
  description: 'Omit comments from the config file.'
}];

const optionMap = exports.optionMap = {
  noComments: ['no-comments']

  /**
   * Runs the command.
   *
   * @param {string[]} cliParams
   * @param {object} cliOptions
   * @return {Promise}
   */
};function run(cliParams, cliOptions) {
  return new Promise(resolve => {
    utils.header();

    const noComments = cliOptions.noComments;
    const file = cliParams[0] || constants.defaultConfigFile;

    utils.exists(file) && utils.die(_chalk2.default.bold.magenta(file), 'already exists.');

    let stub = utils.readFile(constants.configStubFile).replace('// let defaultConfig', 'let defaultConfig').replace("require('./plugins/container')", "require('tailwindcss/plugins/container')");

    noComments && (stub = utils.stripBlockComments(stub));

    utils.writeFile(file, stub);

    utils.log();
    utils.log(emoji.yes, 'Created Tailwind config file:', _chalk2.default.bold.magenta(file));

    utils.footer();

    resolve();
  });
}