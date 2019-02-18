import React, { useReducer } from 'react';
import { HabitProvider } from './context';
import { initialHabitState, getFromLocalStorage, saveToLocalStorage } from '../utils';

const reducer = (previousState, newState) => {
  return { ...previousState, ...newState };
};

const habitDetails = Boolean(getFromLocalStorage('habitDetails'))
  ? JSON.parse(getFromLocalStorage('habitDetails'))
  : initialHabitState;

const initialHabitsArray = Boolean(getFromLocalStorage('habits'))
  ? JSON.parse(getFromLocalStorage('habits'))
  : [];

const HabitProviderComponent = ({ children }) => {
  const [{ habit, habits }, setState] = useReducer(reducer, {
    habit: habitDetails,
    habits: initialHabitsArray
  });

  const handleHabitData = value => setState({ habit: value });

  const replaceHabits = value => setState({ habits: value });

  const addToHabits = value => {
    const updatedHabits = [value].concat(habits);
    setState({ habits: updatedHabits });
    saveToLocalStorage('habits', habits);
  };

  const addMilestoneToHabit = ({ habitId, data }) => {
    const newHabits = habits.map(item => {
      if (habitId === item.habitId) {
        item.milestones = item.milestones.concat([data]);
      }
      return item;
    });
    const copiedHabit = { ...habit };
    copiedHabit.milestones.push(data);
    setState({ habits: newHabits, habit: copiedHabit });
    saveToLocalStorage('habitDetails', habit);
    saveToLocalStorage('habits', habits);
  };

  return (
    <HabitProvider
      value={{
        habit,
        handleHabitData,
        replaceHabits,
        habits,
        addToHabits,
        addMilestoneToHabit
      }}
    >
      {children}
    </HabitProvider>
  );
};

export default HabitProviderComponent;
