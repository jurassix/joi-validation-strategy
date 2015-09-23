'use strict';

exports.__esModule = true;
exports['default'] = hydrate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashSet = require('lodash.set');

var _lodashSet2 = _interopRequireDefault(_lodashSet);

function hydrate(flat) {
  return Object.keys(flat).reduce(function (obj, path) {
    return _lodashSet2['default'](obj, path, flat[path]);
  }, {});
}

module.exports = exports['default'];