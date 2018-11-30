export const signupValidator = (inputObject) => {
  let errors = {};
  if (!inputObject.email || !inputObject.username || !inputObject.password) {
    errors.email = !inputObject.email ? 'Email Required' : undefined;
    errors.username = !inputObject.username ? 'Username Required' : undefined;
    errors.password = !inputObject.password ? 'Password Required' : undefined;
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputObject.email)
  ) {
    errors.email = 'Invalid email address';
  } else if (inputObject.password !== inputObject.confirmPassword) {
    errors.confirmPassword = 'Passwords don\'t match';
  }
  return errors;
};

export const loginValidator = (inputObject) => {
  let errors = {};
  if (!inputObject.identifier || !inputObject.password) {
    errors.identifier = !inputObject.identifier ? 'Username or Email Required' : undefined;
    errors.password = !inputObject.password ? 'Password Required' : undefined;
  }
  return errors;
};
