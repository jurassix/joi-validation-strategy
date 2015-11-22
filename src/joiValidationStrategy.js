import Joi from 'joi';
import set from 'lodash.set';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import compose from 'lodash.compose';
import invariant from 'invariant';
import { hydrate, decodeMessages, collectErrors, pickMessages } from './utils';

export default joiOptions => {
  return {
    validate(data = {}, joiSchema = {}, options = {}, callback) {
      invariant(typeof callback === 'function', 'joi-validation-strategy is asynchronous, a callback is expected: validate(data, schema, options, callback)');
      const {
        key,
        prevErrors = {},
      } = options;
      const validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        ...joiOptions,
      };
      Joi.validate(data, joiSchema, validationOptions, error => {
        const errors = compose(hydrate, pickMessages, collectErrors, decodeMessages)(error);
        if (key === undefined || key === null || isEmpty(errors)) {
          return callback(errors);
        }
        return callback(set(prevErrors, key, get(errors, key)));
      });
    },
  };
};
