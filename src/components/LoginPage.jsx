import React from 'react';
import { Formik, Form, Field } from 'formik';

import requestHandler from '../services/requestHandler';
import { AppConsumer } from '../context';
import { CustomInput } from '.';
import { submitButtonStyle, loginFormContainerStyle } from '../styles';
import { loginValidator } from '../helpers';

const initialValues = { identifier: '', password: '' };

const LoginPage = (props) => {
  return (
    <AppConsumer>
      {({ handleUsernameChange }) => (
        <Formik
          initialValues={initialValues}
          validate={values => loginValidator(values)}
          onSubmit={(values, { setSubmitting }) => {
            requestHandler.loginUser(values)
              .then(res => {
                props.history.push('/');
                handleUsernameChange(res.data.username);
              })
              .catch((err) => {
                alert('Incorrect Login Information');
              })
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
    </AppConsumer>
  );
};

export default LoginPage;
