import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
import { registerUser } from '../services';
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
  const { classes } = props;
  return (
    <AppConsumer>
      {({ handleUsernameChange }) => (
        <Formik
          initialValues={initialValues}
          validate={values => signupValidator(values)}
          onSubmit={async (
            { username, email, password },
            { setSubmitting }
          ) => {
            registerUser({ username, email, password })
              .then(res => {
                handleUsernameChange(res.data.username);
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
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  disabled={isSubmitting}
                  style={submitButtonStyle}
                >
                  Submit
                </Button>
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
