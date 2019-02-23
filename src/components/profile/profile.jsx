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
    handleSubmit,
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
              data-testid="edit-profile-button"
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
            <ul
              className="list-group profileDetails"
              data-testid="profile-details-section"
            >
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                data-testid="username-list-item"
              >
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
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                data-testid="superadmin-list-item"
              >
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
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div
                  className="formStyle"
                  style={loginFormContainerStyle}
                  data-testid="profile-form"
                >
                  <Field
                    type="text"
                    name="username"
                    placeholder="Username"
                    component={CustomInput}
                    data-testid="username-profile-input"
                  />
                  <br />
                  <br />
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email"
                    component={CustomInput}
                    data-testid="email-profile-input"
                  />
                  <br />
                  <br />
                  <Field
                    type="text"
                    name="imageURL"
                    placeholder="imageURL"
                    component={CustomInput}
                    data-testid="image-profile-input"
                  />
                  <br />
                  <br />
                  <button
                    className="btn btn-primary customBtn"
                    type="submit"
                    disabled={isSubmitting}
                    style={submitButtonStyle}
                    data-testid="profile-submit-button"
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
  handleSubmit: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired
};

export default Profile;
