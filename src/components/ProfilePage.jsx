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
  const [editStatus, setEditStatus] = useState(false);
  const [editButtonName, seteditButtonName] = useState('Edit Profile');

  const handleOnEdit = () => {
    if (editButtonName === 'Edit Profile') {
      seteditButtonName('Finished');
      setEditStatus(!editStatus);
    } else {
      seteditButtonName('Edit Profile');
      setEditStatus(!editStatus);
    }
  };

  return (
    <div>
      <UserConsumer>
        {({ user, handleUserData }) => (
          <div className="card profileCard">
            <div className="profileImgBoxBackground">
              <div className="editButton">
                <button
                  type="button"
                  onClick={() => handleOnEdit()}
                  className="btn btn-primary"
                >
                  {editButtonName}
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

            <div className="profileDetails">
              <h3>
                Name: <span>{user.username}</span> <br />
                Email: <span>{user.email}</span> <br />
              </h3>
            </div>

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
                if (imageURL.length === 0) {
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
                <Form className="formStyle">
                  {editStatus && (
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
