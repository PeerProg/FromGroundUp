import React from 'react';
import swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { loginUser } from '../services';
import { AppConsumer } from '../context';
import { CustomInput } from '.';
import { submitButtonStyle, loginFormContainerStyle } from '../styles';
import { loginValidator } from '../helpers';

const initialValues = { identifier: '', password: '' };

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

const LoginPage = props => {
  const { classes } = props;
  return (
    <AppConsumer>
      {({ handleUsernameChange }) => (
        <Formik
          initialValues={initialValues}
          validate={values => loginValidator(values)}
          onSubmit={(values, { setSubmitting }) => {
            loginUser(values)
              .then(res => {
                handleUsernameChange(res.data.username);
                props.history.push('/');
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

export default withStyles(styles)(LoginPage);
