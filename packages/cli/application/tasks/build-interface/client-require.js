'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const _deepRequire = require('./deep-require');

const _deepRequire2 = _interopRequireDefault(_deepRequire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = clientRequire;


function clientRequire(id) {
  return (0, _deepRequire2.default)(`@patternplate/client/library/${id}`);
}
module.exports = exports.default;