import {expect} from 'chai';
import strategy from '../src/joiValidationStrategy';
import Joi from 'joi';

describe('Joi Validator', () => {
  it('ensure exports function', () => {
    expect(typeof strategy === 'function').to.equal(true);
  });
  it('should validate basic schema and data', (done) => {
    const schema = {
      firstName: Joi.string().required(),
    };
    const data = {firstName: 'foo'};
    strategy().validate(data, schema, {}, errors => {
      expect(errors).to.be.empty;
      done();
    });
  });
  it('should validate basic schema and data for key', (done) => {
    const schema = {
      firstName: Joi.string().required(),
    };
    const data = {firstName: 'foo'};
    strategy().validate(data, schema, {key:'firstName'}, errors => {
      expect(errors).to.be.empty;
      done();
    });
  });
  it('should produce error for basic schema and data', (done) => {
    const schema = {
      firstName: Joi.string().required(),
    };
    strategy().validate({}, schema, {}, errors => {
      expect(errors).to.have.keys(['firstName']);
      expect(errors['firstName']).to.equal('"firstName" is required');
      done();
    });
  });
  it('should produce error for basic schema and data for key', (done) => {
    const schema = {
      firstName: Joi.string().required(),
    };
    strategy().validate({}, schema, {key:'firstName'}, errors => {
      expect(errors).to.have.keys(['firstName']);
      expect(errors['firstName']).to.equal('"firstName" is required');
      done();
    });
  });
  it('should validate nested schema and data', (done) => {
    const schema = Joi.object().keys({
      a: {
        b: Joi.string().required(),
      },
    });
    const data = {a: {b: 'foo'}};
    strategy().validate(data, schema, {}, errors => {
      expect(errors).to.be.empty;
      done();
    });
  });
  it('should validate nested schema and data for deep key', (done) => {
    const schema = Joi.object().keys({
      a: {
        b: Joi.string().required(),
      },
    });
    const data = {a: {b: 'foo'}};
    strategy().validate(data, schema, {key:'a.b'}, errors => {
      expect(errors).to.be.empty;
      done();
    });
  });
  it('should fail validation for nested schema and data', (done) => {
    const schema = Joi.object().keys({
      a: {
        b: Joi.string().required(),
      },
    });
    const data = {a:{}};
    strategy().validate(data, schema, {}, errors => {
      expect(errors).to.have.keys(['a']);
      expect(errors['a']).to.have.keys(['b']);
      expect(errors['a']['b']).to.equal('"b" is required');
      done();
    });
  });
  it('should fail validation for nested schema and data for deep key', (done) => {
    const schema = Joi.object().keys({
      a: {
        b: Joi.string().required(),
      },
    });
    const data = {a:{}};
    strategy().validate(data, schema, {key:'a.b'}, errors => {
      expect(errors).to.have.keys(['a']);
      expect(errors['a']).to.have.keys(['b']);
      expect(errors['a']['b']).to.equal('"b" is required');
      done();
    });
  });
  it('should validate nested schema and data for missing deep key', (done) => {
    const schema = Joi.object().keys({
      a: {
        b: Joi.string().required(),
      },
    });
    const data = {a:{}};
    strategy().validate(data, schema, {key:'a.b.c'}, errors => {
      expect(errors).to.deep.equal({a:{b:{c:undefined}}});
      done();
    });
  });
  it('should validate arrays in schema and data', (done) => {
    const schema = {
      range: Joi.array().items(Joi.number().min(0).max(10)),
      password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/)
    };
    strategy().validate({range: [0], password: '123'}, schema, {}, errors => {
      expect(errors).to.be.empty;
      done();
    });
  });
  it('should validate arrays in schema and data for key', (done) => {
    const schema = {
      range: Joi.array().items(Joi.number().min(0).max(10)),
      password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/)
    };
    strategy().validate({range: [0], password: '123'}, schema, {key:'range'}, errors => {
      expect(errors).to.be.empty;
      done();
    });
  });
  it('should produce errors for arrays in schema and data', (done) => {
    const schema = {
      range: Joi.array().items(Joi.number().min(0).max(10)),
      password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/)
    };
    strategy().validate({range: [100,200], password: ''}, schema, {}, errors => {
      expect(errors).to.have.keys(['range','password']);
      expect(errors['password']).to.equal('"password" with value "" fails to match the required pattern: /[a-zA-Z0-9]{3,30}/');
      expect(errors['range']).to.have.length(2);
      expect(errors['range'][0]).to.equal('"0" must be less than or equal to 10');
      expect(errors['range'][1]).to.equal('"1" must be less than or equal to 10');
      done();
    });
  });
  it('should produce errors for arrays in schema and data for key', (done) => {
    const schema = {
      range: Joi.array().items(Joi.number().min(0).max(10)),
      password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/)
    };
    strategy().validate({range: [100,200], password: ''}, schema, {key:'password'}, errors => {
      expect(errors).to.have.keys(['password']);
      expect(errors['password']).to.equal('"password" with value "" fails to match the required pattern: /[a-zA-Z0-9]{3,30}/');
      expect(errors['range']).to.be.undefined;
      done();
    });
  });
});
