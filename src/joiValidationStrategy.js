import Joi from 'joi';
import set from 'lodash.set';
import isEmpty from 'lodash.isEmpty';
import {hydrate} from './utils';

export default joiOptions => {
  return {
    validate: function(data = {}, joiSchema = {}, options = {}, callback) {
      if (typeof callback !== 'function') throw new Error('callback was not provided');
      const {key, prevErrors = {}} = options;
      const validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        ...joiOptions,
      };
      const errors = this.collectErrors(Joi.validate(data, joiSchema, validationOptions));
      if (key === undefined || key === null || isEmpty(errors)) {
        return callback(hydrate(errors));
      }
      return callback(set(prevErrors, key, errors[key]));
    },
    collectErrors: function(joiResult) {
      if (joiResult.error !== null) {
        return joiResult.error.details.reduce((errors, detail) => {
          const value = errors[detail.path];
          if (value === undefined || value === null) {
            errors[detail.path] = detail.message;
          } else {
            errors[detail.path] += `\n${detail.message}`;
          }
          return errors;
        }, {});
      }
      return {};
    },
  };
};
