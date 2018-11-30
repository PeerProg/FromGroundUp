import {
  loginValidator,
  signupValidator,
  invalidEmailObject,
  validRequestObject,
  unmatchingPasswordObject
} from '../helpers';


describe('LOGIN VALIDATOR', () => {
  it('Should return an error when there are errors in Login values', (done) => {
    const errors = loginValidator({});
    expect(errors).toHaveProperty('identifier', 'Username or Email Required');
    done();
  });

  it('Should not return errors when both params are supplied', (done) => {
    const errors = loginValidator({ identifier: 'john@doe.com', password: 'janesmith' });
    const noErrors = Object.values(errors).every(value => value === undefined);
    expect(noErrors).toEqual(true);
    done()
  });
});


describe('SIGNUP VALIDATOR', () => {
  it('Should fail signup when provided email is invalid', (done) => {
    const errors = signupValidator(invalidEmailObject);
    expect(errors.email).toEqual('Invalid email address');
    done();
  });

  it('Should fail signup when passwords do not match', (done) => {
    const errors = signupValidator(unmatchingPasswordObject);
    expect(errors.confirmPassword).toEqual('Passwords don\'t match');
    done();
  });

  it('Should permit signup when input data is valid', (done) => {
    const errors = signupValidator(validRequestObject);
    const noErrors = Object.values(errors).every(value => Boolean(value) === false);
    expect(noErrors).toEqual(true);
    done();
  });
});
