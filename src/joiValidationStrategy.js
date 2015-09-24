import Joi from 'joi';
import set from 'lodash.set';
import isEmpty from 'lodash.isEmpty';
import {hydrate} from './utils';
import invariant from 'invariant';

export default joiOptions => {
  return {
    validate: function(data = {}, joiSchema = {}, options = {}, callback) {
      invariant(typeof callback === 'function', 'joi-validation-strategy is asynchronous, a callback is expected: validate(data, schema, options, callback)');
      const {key, prevErrors = {}} = options;
      const validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        ...joiOptions,
      };
      Joi.validate(data, joiSchema, validationOptions, (error) => {
        const errors = this.collectErrors(error);
        if (key === undefined || key === null || isEmpty(errors)) {
          return callback(hydrate(errors));
        }
        return callback(set(prevErrors, key, errors[key]));
      });
    },
    collectErrors: function(error) {
      if (error !== null) {
        return error.details.reduce((errors, {path, message}) => {
          errors[path] = message;
          return errors;
        }, {});
      }
      return {};
    },
  };
};
