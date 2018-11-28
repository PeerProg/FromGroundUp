import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import requestHandler from '../services/requestHandler';
import { AppConsumer } from '../context';
import { AuthInputTextField, AuthInputPasswordField } from '.';
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
            requestHandler.loginUser(values).then(res => {
              handleUsernameChange(res.data.username)
              props.history.push('/')
            }).catch((err) => {
              alert('Incorrect Login Information')
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
                  placeholder="Username"
                  component={AuthInputTextField}
                />
                <br />
                <br />
                <ErrorMessage name="identifier" component="div" />
                <Field
                  type="password"
                  name="password"
                  placeholder="password"
                  component={AuthInputPasswordField}
                />
                <ErrorMessage name="password" component="div" />
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
