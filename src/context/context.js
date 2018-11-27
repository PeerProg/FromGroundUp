import { createContext } from 'react';

const appContext = createContext();

export const AppConsumer = appContext.Consumer;

export default appContext;