import React, { useState, useContext } from 'react';
import swal from 'sweetalert2';
import Profile from './profile';
import { updateUserInfo } from '../../services';
import { userContext } from '../../contexts';
import { profilePageValidator } from '../../helpers';

export const renderAlert = (type, title) => {
  return swal({
    type,
    position: 'top-end',
    title,
    toast: true,
    showConfirmButton: false,
    timer: 3000
  });
};

const ProfileContainer = props => {
  const [isEditing, setisEditing] = useState(false);
  const { user, handleUserData } = useContext(userContext);

  const INITIAL_VALUES = {
    username: user.username,
    email: user.email,
    imageURL: user.imageURL || ''
  };

  const toggleEditStatus = () => setisEditing(!isEditing);

  const handleSubmit = async ({ username, email }, { setSubmitting }) => {
    try {
      const result = await updateUserInfo({
        username,
        email,
        imageURL: null,
        id: props.match.params.userId
      });
      handleUserData(result.data);
      renderAlert('success', 'Update Successful');
      toggleEditStatus();
    } catch (err) {
      renderAlert('error', err.message);
    }
    setSubmitting(false);
  };

  return (
    <Profile
      initialValues={INITIAL_VALUES}
      validate={values => profilePageValidator(values)}
      isEditing={isEditing}
      user={user}
      toggleEditStatus={toggleEditStatus}
      handleSubmit={handleSubmit}
    />
  );
};

export default ProfileContainer;
