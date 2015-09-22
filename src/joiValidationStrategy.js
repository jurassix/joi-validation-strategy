import Joi from 'joi';
import objectPath from 'object-path';
import {hydrate, isEmpty} from './utils';

export default joiOptions => {
  return {
    validate: function(data = {}, joiSchema = {}, key, callback = () => {}) {
      const options = {
        abortEarly: false,
        allowUnknown: true,
        ...joiOptions,
      };
      const errors = hydrate(this.collectErrors(Joi.validate(data, joiSchema, options)));
      if (key === undefined || key === null || isEmpty(errors)) {
        return callback(errors);
      }
      const result = {};
      const value = objectPath.get(errors, key);
      if (value !== undefined && value !== null) {
        objectPath.set(result, key, value);
      }
      return callback(result);
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
