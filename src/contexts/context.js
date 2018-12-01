import { createContext } from 'react';

export const userContext = createContext();

export const UserConsumer = userContext.Consumer;
export const UserProvider = userContext.Provider;
