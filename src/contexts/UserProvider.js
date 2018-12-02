import React, { useReducer, useEffect, useState } from 'react';
import { UserProvider } from './context';
import { initialUserState } from '../utils';

const reducer = (previousState, newState) => {
  return { ...previousState, ...newState };
};

const UserProviderComponent = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useReducer(reducer, initialUserState);

  useEffect(() => {
    const userDetails =
      JSON.parse(localStorage.getItem('userDetails')) || initialUserState;
    localStorage.getItem('jwtToken') && setIsAuthenticated(true);
    setUser(userDetails);
  }, []);

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
