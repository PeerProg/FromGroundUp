import React, { useReducer, useEffect, useState } from 'react';
import { UserProvider } from './context';
import { initialUserState } from '../utils';

const reducer = (previousState, newState) => {
  return { ...previousState, ...newState };
};

const UserProviderComponent = ({ children }) => {
  const jwtToken = Boolean(localStorage.getItem('jwtToken'));

  const [isAuthenticated, setIsAuthenticated] = useState(jwtToken);
  const [user, setUser] = useReducer(reducer, initialUserState);

  useEffect(
    () => {
      jwtToken && setIsAuthenticated(jwtToken);
      const userDetails =
        JSON.parse(localStorage.getItem('userDetails')) || initialUserState;
      setUser(userDetails);
    },
    [jwtToken]
  );

  const handleAuthStatus = value => setIsAuthenticated(value);

  const handleUserData = value => {
    const newValue = JSON.parse(localStorage.getItem('userDetails')) || value;
    setUser(newValue);
  };

  return (
    <UserProvider
      value={{ user, handleUserData, handleAuthStatus, isAuthenticated }}
    >
      {children}
    </UserProvider>
  );
};

export default UserProviderComponent;
