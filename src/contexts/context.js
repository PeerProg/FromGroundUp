import { createContext } from 'react';

export const userContext = createContext();
export const habitContext = createContext();

export const UserConsumer = userContext.Consumer;
export const UserProvider = userContext.Provider;

export const HabitConsumer = habitContext.Consumer;
export const HabitProvider = habitContext.Provider;
