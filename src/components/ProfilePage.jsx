import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import { withStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { updateUserInfo } from '../services';
import { CustomInput } from '.';
import {
  submitButtonStyle,
  loginFormContainerStyle,
  registerPageStyles
} from '../styles';
import { UserConsumer } from '../contexts';
import { profilePageValidator } from '../helpers';

const styles = theme => registerPageStyles(theme);

const ProfilePage = props => {
  const { classes } = props;
  return (
    <UserConsumer>
      {({ user, handleUserData }) => (
        <Paper className="profile-paper">
          <Formik
            initialValues={{ username: user.username, email: user.email }}
            validate={values => profilePageValidator(values)}
            onSubmit={async ({ username, email }, { setSubmitting }) => {
              updateUserInfo({ username, email, id: props.match.params.userId })
                .then(res => {
                  handleUserData({ username, email });
                  swal({
                    type: 'success',
                    position: 'top-end',
                    title: 'Update Successful',
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
              <Form className="profile-formix-form">
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
        </Paper>
      )}
    </UserConsumer>
  );
};

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePage);