'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = run;

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * CLI application entrypoint.
 *
 * @param {string[]} cliArgs
 * @return {Promise}
 */
function run(cliArgs) {
  return new Promise((resolve, reject) => {
    const params = utils.parseCliParams(cliArgs);
    const command = _commands2.default[params[0]];
    const options = command ? utils.parseCliOptions(cliArgs, command.optionMap) : {};

    const commandPromise = command ? command.run(params.slice(1), options) : _commands2.default.help.run(params);

    commandPromise.then(resolve).catch(reject);
  });
}