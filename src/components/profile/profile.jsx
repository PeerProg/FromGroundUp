import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import CustomInput from '../CustomInput';
import { submitButtonStyle, loginFormContainerStyle } from '../../styles';
import imageUrl from '../../images/imageURL.jpg';
import noImageUrl from '../../images/noImageUrl.png';

const Profile = props => {
  const {
    initialValues,
    isEditing,
    user,
    toggleEditStatus,
    onSubmit,
    validate
  } = props;
  return (
    <React.Fragment>
      <div className="card profileCard">
        <div className="profileImgBoxBackground">
          <div className="editButton">
            <button
              type="button"
              onClick={toggleEditStatus}
              className="btn btn-primary"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
          <div className="profileImgBox">
            <img
              className="profileImg"
              src={!!user.imageURL ? imageUrl : noImageUrl}
              alt=""
            />
          </div>
        </div>

        {!isEditing && (
          <div>
            <ul className="list-group profileDetails ">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Username
                <span className="badge badge-primary badge-pill">
                  {user.username}
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

        {isEditing && (
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
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
              </Form>
            )}
          </Formik>
        )}
      </div>
    </React.Fragment>
  );
};

Profile.propTypes = {
  initialValues: PropTypes.object.isRequired,
  isEditing: PropTypes.bool,
  user: PropTypes.object.isRequired,
  toggleEditStatus: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired
};

export default Profile;
