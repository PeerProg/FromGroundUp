import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute(props) {
  const [pageShouldLoad, setPageShouldLoad] = useState(null);
  useEffect(async () => {
    const tokenIsAvailable = await !!localStorage.getItem('jwtToken');
    setPageShouldLoad(tokenIsAvailable);
  }, []);
  return pageShouldLoad ? <Route {...props} /> : <Redirect to="/login" />;
}

export default ProtectedRoute;
