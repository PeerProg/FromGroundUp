import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import requestHandler from '../services/requestHandler';
import { CustomInput } from '.';
import {
  submitButtonStyle,
  loginFormContainerStyle,
  registerPageStyles
} from '../styles';
import { AppConsumer } from '../context';
import { signupValidator } from '../helpers';

const styles = theme => registerPageStyles(theme);

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const RegisterPage = props => {
  return (
    <AppConsumer>
      {({ handleUsernameChange }) => (
        <Formik
          initialValues={initialValues}
          validate={values => signupValidator(values)}
          onSubmit={(values, { setSubmitting }) => {
            delete values.confirmPassword;
            requestHandler
              .registerUser(values)
              .then(res => {
                handleUsernameChange(res.data.username);
                props.history.push('/');
              })
              .catch(err => {
                alert('Request Not Completed, try again ');
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
                  type="email"
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

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RegisterPage);
