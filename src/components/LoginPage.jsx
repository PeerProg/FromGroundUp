import React from 'react';
import swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import { loginUser } from '../services';
import { UserConsumer } from '../contexts';
import { CustomInput } from '.';
import { submitButtonStyle, loginFormContainerStyle } from '../styles';
import { loginValidator } from '../helpers';
import { setAuthorizationToken, saveToLocalStorage } from '../utils';

const initialValues = { identifier: '', password: '' };

const LoginPage = props => {
  return (
    <UserConsumer>
      {({ handleUserData, handleAuthStatus }) => (
        <Formik
          initialValues={initialValues}
          validate={values => loginValidator(values)}
          onSubmit={(values, { setSubmitting }) => {
            loginUser(values)
              .then(res => {
                handleUserData(res.data);
                handleAuthStatus(true);
                saveToLocalStorage('userDetails', res.data);
                saveToLocalStorage('jwtToken', res.data.token);
                setAuthorizationToken(res.data.token);

                props.history.push('/my-habits');
                swal({
                  type: 'success',
                  position: 'top-end',
                  title: 'Login Successful',
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
                  name="identifier"
                  placeholder="Username/Email"
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
                <button
                  className="btn btn-primary customBtn"
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

export default LoginPage;
