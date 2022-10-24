'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.description = exports.usage = undefined;
exports.forApp = forApp;
exports.forCommand = forCommand;
exports.invalidCommand = invalidCommand;
exports.run = run;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash');

var _ = require('.');

var _2 = _interopRequireDefault(_);

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

var _utils = require('../utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usage = exports.usage = 'help [command]';
const description = exports.description = 'More information about the command.';

const PADDING_SIZE = 3;

/**
 * Prints general help.
 */
function forApp() {
  const pad = Math.max(...(0, _lodash.map)(_2.default, 'usage.length')) + PADDING_SIZE;

  utils.log();
  utils.log('Usage:');
  utils.log('  ', _chalk2.default.bold(constants.cli + ' <command> [options]'));
  utils.log();
  utils.log('Commands:');
  (0, _lodash.forEach)(_2.default, command => {
    utils.log('  ', _chalk2.default.bold((0, _lodash.padEnd)(command.usage, pad)), command.description);
  });
}

/**
 * Prints help for a command.
 *
 * @param {object} command
 */
function forCommand(command) {
  utils.log();
  utils.log('Usage:');
  utils.log('  ', _chalk2.default.bold(constants.cli, command.usage));
  utils.log();
  utils.log('Description:');
  utils.log('  ', _chalk2.default.bold(command.description));

  if (command.options) {
    const pad = Math.max(...(0, _lodash.map)(command.options, 'usage.length')) + PADDING_SIZE;

    utils.log();
    utils.log('Options:');
    (0, _lodash.forEach)(command.options, option => {
      utils.log('  ', _chalk2.default.bold((0, _lodash.padEnd)(option.usage, pad)), option.description);
    });
  }
}

/**
 * Prints invalid command error and general help. Kills the process.
 *
 * @param {string} commandName
 */
function invalidCommand(commandName) {
  utils.error('Invalid command:', _chalk2.default.bold.magenta(commandName));
  forApp();
  utils.die();
}

/**
 * Runs the command.
 *
 * @param {string[]} cliParams
 * @return {Promise}
 */
function run(cliParams) {
  return new Promise(resolve => {
    utils.header();

    const commandName = cliParams[0];
    const command = _2.default[commandName];

    !commandName && forApp();
    commandName && command && forCommand(command);
    commandName && !command && invalidCommand(commandName);

    utils.footer();

    resolve();
  });
}