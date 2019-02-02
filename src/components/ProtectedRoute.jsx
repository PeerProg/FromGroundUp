import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userContext } from '../contexts';
import { setAuthorizationToken, tokenIsValid } from '../utils';
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
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userDetails');
  }

  return isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />;
}

export default ProtectedRoute;
