import React, { useState } from 'react';
import appContext from './context';

const AppProvider = appContext.Provider;

const AppProviderComponent = ({ children }) => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (value) => setUsername(value);
    return (
    <AppProvider value={{ username, handleUsernameChange }}>
      {children}
    </AppProvider>
  )
}

export default AppProviderComponent;