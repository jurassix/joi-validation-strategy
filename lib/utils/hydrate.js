'use strict';

exports.__esModule = true;
exports['default'] = hydrate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _objectPath = require('object-path');

var _objectPath2 = _interopRequireDefault(_objectPath);

function hydrate(flat) {
  return Object.keys(flat).reduce(function (obj, path) {
    _objectPath2['default'].set(obj, path, flat[path]);
    return obj;
  }, {});
}

module.exports = exports['default'];