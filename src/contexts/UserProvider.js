import React, { useReducer } from 'react';
import { UserProvider } from './context';
import { initialUserState } from '../utils';

const reducer = (previousState, newState) => {
  return { ...previousState, ...newState };
};

const UserProviderComponent = ({ children }) => {
  const [user, setUser] = useReducer(reducer, initialUserState);

  const handleUserData = value => setUser(value);

  return (
    <UserProvider value={{ user, handleUserData }}>{children}</UserProvider>
  );
};

export default UserProviderComponent;
