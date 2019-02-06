import React, { useReducer } from 'react';
import { HabitProvider } from './context';
import { initialHabitState, getFromLocalStorage } from '../utils';

const reducer = (previousState, newState) => {
  return { ...previousState, ...newState };
};

const habitDetails =
  JSON.parse(getFromLocalStorage('habitDetails')) || initialHabitState;

const HabitProviderComponent = ({ children }) => {
  const [habit, setHabit] = useReducer(reducer, habitDetails);

  const handleHabitData = value => setHabit({ ...habit, ...value });

  return (
    <HabitProvider value={{ habit, handleHabitData }}>{children}</HabitProvider>
  );
};

export default HabitProviderComponent;
