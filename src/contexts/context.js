import { createContext } from 'react';
import { initialUserState, initialHabitState } from '../utils';

export const userContext = createContext({
  handleAuthStatus: () => true,
  handleUserData: () => {},
  user: initialUserState,
  isAuthenticated: false
});

export const habitContext = createContext({
  habit: initialHabitState,
  handleHabitData: () => {},
  replaceHabits: () => {},
  habits: [],
  addToHabits: () => {},
  addMilestoneToHabit: () => {}
});

export const UserConsumer = userContext.Consumer;
export const UserProvider = userContext.Provider;

export const HabitConsumer = habitContext.Consumer;
export const HabitProvider = habitContext.Provider;
