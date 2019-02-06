import React, { useReducer, useState } from 'react';
import { UserProvider } from './context';
import { initialUserState, getFromLocalStorage } from '../utils';

const reducer = (previousState, newState) => {
  return { ...previousState, ...newState };
};

const userDetails =
  JSON.parse(getFromLocalStorage('userDetails')) || initialUserState;
const jwtToken = Boolean(getFromLocalStorage('jwtToken'));

const UserProviderComponent = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(jwtToken);
  const [user, setUser] = useReducer(reducer, userDetails);

  const handleAuthStatus = value => setIsAuthenticated(value);

  const handleUserData = value => setUser({ ...user, ...value });

  return (
    <UserProvider
      value={{ user, handleUserData, handleAuthStatus, isAuthenticated }}
    >
      {children}
    </UserProvider>
  );
};

export default UserProviderComponent;
