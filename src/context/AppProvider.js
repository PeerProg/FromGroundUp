import React, { useReducer } from 'react';
import appContext from './context';
import { initialUserState } from '../utils';

const AppProvider = appContext.Provider;

const reducer = (previousState, newState) => {
  return { ...previousState, ...newState };
};

const AppProviderComponent = ({ children }) => {
  const [user, setUser] = useReducer(reducer, initialUserState);

  const handleUserData = value => setUser(value);

  return <AppProvider value={{ user, handleUserData }}>{children}</AppProvider>;
};

export default AppProviderComponent;
