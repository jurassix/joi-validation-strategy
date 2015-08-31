import {expect} from 'chai';
import strategy from '../src/joiValidationStrategy';

describe('Joi Validator', function() {
  it('ensure exports function', function() {
    expect(typeof strategy === 'function').to.equal(true);
  });
});
