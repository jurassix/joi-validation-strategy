'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _objectPath = require('object-path');

var _objectPath2 = _interopRequireDefault(_objectPath);

var _utils = require('./utils');

exports['default'] = function (joiOptions) {
  return {
    validate: function validate(data, joiSchema, key) {
      if (data === undefined) data = {};
      if (joiSchema === undefined) joiSchema = {};
      var callback = arguments.length <= 3 || arguments[3] === undefined ? function () {} : arguments[3];

      var options = _extends({
        abortEarly: false,
        allowUnknown: true
      }, joiOptions);
      var errors = _utils.hydrate(this.collectErrors(_joi2['default'].validate(data, joiSchema, options)));
      if (key === undefined || key === null || _utils.isEmpty(errors)) {
        return callback(errors);
      }
      var result = {};
      var value = _objectPath2['default'].get(errors, key);
      if (value !== undefined && value !== null) {
        _objectPath2['default'].set(result, key, value);
      }
      return callback(result);
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