import React from 'react';
import swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import { updateUserInfo } from '../services';
import { CustomInput } from '.';
import {
  submitButtonStyle,
  loginFormContainerStyle,
  profileCard
} from '../styles';
import { UserConsumer } from '../contexts';
import { profilePageValidator } from '../helpers';

const ProfilePage = props => {
  return (
    <div className="card" style={profileCard}>
      <UserConsumer>
        {({ user, handleUserData }) => (
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
    </div>
  );
};

export default ProfilePage;
