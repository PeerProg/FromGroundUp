import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userContext } from '../contexts';
import { setAuthorizationToken } from '../utils';
import { validateToken } from '../services';
import swal from 'sweetalert2';


function ProtectedRoute(props) {
  const { user: { token, id: userId }, 
          handleAuthStatus, 
          isAuthenticated } = useContext(userContext);
  setAuthorizationToken(token);

  // create an API caller to validate token with backEnd
 validateToken({ id: userId })
    .catch(err => {
      swal({
        type: 'error',
        position: 'top-end',
        title: err.message,
        toast: true,
        showConfirmButton: false,
        timer: 3000
      });
      
        handleAuthStatus(false);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userDetails');
        setAuthorizationToken();

    });
  return isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />;
}

export default ProtectedRoute;
