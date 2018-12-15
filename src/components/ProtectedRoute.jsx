import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userContext } from '../contexts';
import { setAuthorizationToken } from '../utils';

function ProtectedRoute(props) {
  const {
    user: { token },
    isAuthenticated
  } = useContext(userContext);
  setAuthorizationToken(token);

  return isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />;
}

export default ProtectedRoute;
