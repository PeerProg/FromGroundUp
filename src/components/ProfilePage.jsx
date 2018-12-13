import React from 'react';
import { useState } from 'react';
import swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import { updateUserInfo } from '../services';
import { CustomInput } from '.';
import { submitButtonStyle, loginFormContainerStyle } from '../styles';
import { UserConsumer } from '../contexts';
import { profilePageValidator } from '../helpers';
import imageUrl from '../images/imageURL.jpg';
import noImageUrl from '../images/noImageUrl.png';

const ProfilePage = props => {
  const [isEditing, setisEditing] = useState(false);

  return (
    <div>
      <UserConsumer>
        {({ user, handleUserData }) => (
          <div className="card profileCard">
            <div className="profileImgBoxBackground">
              <div className="editButton">
                <button
                  type="button"
                  onClick={() => setisEditing(!isEditing)}
                  className="btn btn-primary"
                >
                  {isEditing ? 'Done' : 'Edit Profile'}
                </button>
              </div>
              <div className="profileImgBox">
                {user.imageURL && (
                  <img className="profileImg" src={imageUrl} alt="" />
                )}
                {!user.imageURL && (
                  <img className="profileImg" src={noImageUrl} alt="" />
                )}
              </div>
            </div>

            {!isEditing && (
              <div>
                <ul className="list-group profileDetails ">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Username
                    <span className="badge badge-primary badge-pill">
                      {user.username.toUpperCase()}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Email
                    <span className="badge badge-primary badge-pill">
                      {user.email}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Admin
                    <span className="badge badge-primary badge-pill">
                      {user.isAdmin.toString().toUpperCase()}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    SuperAdmin
                    <span className="badge badge-primary badge-pill">
                      {user.isSuperAdmin.toString().toUpperCase()}
                    </span>
                  </li>
                </ul>
              </div>
            )}

            <Formik
              initialValues={{
                username: user.username,
                email: user.email,
                imageURL: user.imageURL
              }}
              validate={values => profilePageValidator(values)}
              onSubmit={async (
                { username, email, imageURL },
                { setSubmitting }
              ) => {
                if (!imageURL) {
                  imageURL = null;
                }
                updateUserInfo({
                  username,
                  email,
                  imageURL,
                  id: props.match.params.userId
                })
                  .then(res => {
                    handleUserData({ username, email, imageURL });
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
                  {isEditing && (
                    <div className="formStyle" style={loginFormContainerStyle}>
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
                        type="text"
                        name="imageURL"
                        placeholder="imageURL"
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
                  )}
                </Form>
              )}
            </Formik>
          </div>
        )}
      </UserConsumer>
    </div>
  );
};

export default ProfilePage;
