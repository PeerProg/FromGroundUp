import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from '../contexts';

function ProtectedRoute(props) {
  return (
    <UserConsumer>
      {({ isAuthenticated }) =>
        isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />
      }
    </UserConsumer>
  );
}

export default ProtectedRoute;
