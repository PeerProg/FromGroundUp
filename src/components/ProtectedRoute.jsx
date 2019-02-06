import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userContext } from '../contexts';
import {
  setAuthorizationToken,
  tokenIsValid,
  deleteFromLocalStorage
} from '../utils';
import swal from 'sweetalert2';

function ProtectedRoute(props) {
  const {
    user: { token },
    handleAuthStatus,
    isAuthenticated
  } = useContext(userContext);

  setAuthorizationToken(token);

  if (!tokenIsValid(token)) {
    swal({
      type: 'error',
      position: 'top-end',
      title: 'Token expired, login to continue',
      toast: true,
      showConfirmButton: false,
      timer: 3000
    });
    handleAuthStatus(false);
    deleteFromLocalStorage('jwtToken');
    deleteFromLocalStorage('userDetails');
    deleteFromLocalStorage('habitDetails');
  }

  return isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />;
}

export default ProtectedRoute;
