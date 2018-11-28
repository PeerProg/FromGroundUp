import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import requestHandler from '../services/requestHandler';
import { CustomInput } from '.'
import { submitButtonStyle, loginFormContainerStyle } from '../styles';
import { AppConsumer } from '../context';
import { signupValidator } from '../helpers';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

});

const initialValues = { username: '', email: '', password: '' };

const RegisterPage = (props) => {
  return (
    <AppConsumer>
      {({ handleUsernameChange }) => (
        <Formik
          initialValues={initialValues}
          validate={values => signupValidator(values)}
          onSubmit={(values, { setSubmitting }) => {
            requestHandler.registerUser(values)
              .then(res => {
                handleUsernameChange(res.data.username);
                props.history.push('/login')
              })
              .catch((err) => {
                alert('Request Not Completed, try again ')
              })
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
                <ErrorMessage name="username" component="div" />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  component={CustomInput}
                />
                <br />
                <br />
                <ErrorMessage name="email" component="div" />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  component={CustomInput}
                />
                <br />
                <br />
                <ErrorMessage name="password" component="div" />
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  component={CustomInput}
                />
                <br />
                <br />
                <ErrorMessage name="confirmPassword" component="div" />
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterPage);
