import React from 'react';
import swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import { registerUser } from '../services';
import { CustomInput } from '.';
import { submitButtonStyle, loginFormContainerStyle } from '../styles';
import { UserConsumer } from '../contexts';
import { signupValidator } from '../helpers';
import { setAuthorizationToken } from '../utils';

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const RegisterPage = props => {
  return (
    <UserConsumer>
      {({ handleUserData, handleAuthStatus }) => (
        <Formik
          initialValues={initialValues}
          validate={values => signupValidator(values)}
          onSubmit={async (
            { username, email, password },
            { setSubmitting }
          ) => {
            registerUser({ username, email, password })
              .then(res => {
                handleUserData(res.data);
                handleAuthStatus(true);
                localStorage.setItem('userDetails', JSON.stringify(res.data));
                localStorage.setItem('jwtToken', res.data.token);
                setAuthorizationToken(res.data.token);

                props.history.push('/');
                swal({
                  type: 'success',
                  position: 'top-end',
                  title: 'Signup Successful',
                  toast: true,
                  showConfirmButton: false,
                  timer: 3000
                });
              })
              .catch(err => {
                swal({
                  type: 'error',
                  position: 'top-end',
                  title: err.message,
                  toast: true,
                  showConfirmButton: false,
                  timer: 3000
                });
              });
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div style={loginFormContainerStyle}>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  component={CustomInput}
                />
                <br />
                <br />
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  component={CustomInput}
                />
                <br />
                <br />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  component={CustomInput}
                />
                <br />
                <br />
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  component={CustomInput}
                />
                <br />
                <br />
                <button
                  className="btn btn-outline-primary customBtn"
                  type="submit"
                  disabled={isSubmitting}
                  style={submitButtonStyle}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </UserConsumer>
  );
};

export default RegisterPage;
