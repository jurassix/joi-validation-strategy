'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _lodashSet = require('lodash.set');

var _lodashSet2 = _interopRequireDefault(_lodashSet);

var _lodashIsEmpty = require('lodash.isEmpty');

var _lodashIsEmpty2 = _interopRequireDefault(_lodashIsEmpty);

var _utils = require('./utils');

exports['default'] = function (joiOptions) {
  return {
    validate: function validate(data, joiSchema, options, callback) {
      if (data === undefined) data = {};
      if (joiSchema === undefined) joiSchema = {};
      if (options === undefined) options = {};

      if (typeof callback !== 'function') throw new Error('callback was not provided');
      var key = options.key;
      var prevErrors = options.prevErrors;

      var validationOptions = _extends({
        abortEarly: false,
        allowUnknown: true
      }, joiOptions);
      var errors = this.collectErrors(_joi2['default'].validate(data, joiSchema, validationOptions));
      if (key === undefined || key === null || _lodashIsEmpty2['default'](errors)) {
        return callback(_utils.hydrate(errors));
      }
      return callback(_lodashSet2['default'](prevErrors, key, errors[key]));
    },
    collectErrors: function collectErrors(joiResult) {
      if (joiResult.error !== null) {
        return joiResult.error.details.reduce(function (errors, detail) {
          var value = errors[detail.path];
          if (value === undefined || value === null) {
            errors[detail.path] = detail.message;
          } else {
            errors[detail.path] += '\n' + detail.message;
          }
          return errors;
        }, {});
      }
      return {};
    }
  };
};

module.exports = exports['default'];