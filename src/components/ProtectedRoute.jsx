import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userContext } from '../contexts';
import { setAuthorizationToken } from '../utils';

function ProtectedRoute(props) {
  const context = useContext(userContext);
  setAuthorizationToken(context.user.token);

  return context.isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
}

export default ProtectedRoute;
