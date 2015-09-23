'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _hydrate = require('./hydrate');

var _hydrate2 = _interopRequireDefault(_hydrate);

var _isEmpty = require('./isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

exports['default'] = {
  hydrate: _hydrate2['default'], isEmpty: _isEmpty2['default']
};
module.exports = exports['default'];