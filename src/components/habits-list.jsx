import React, { useEffect, useContext } from 'react';
import swal from 'sweetalert2';
import { userContext, habitContext } from '../contexts';
import { fetchMyHabits, deleteHabit } from '../services';
import HabitCard from './habit-card';
import { getDurationToExpiration, standardizeDate } from '../helpers';
import { HabitsForm } from '.';
import { saveToLocalStorage } from '../utils';

const HabitsList = (props) => {
  const { user: { id: userId }} = useContext(userContext);
  const { replaceHabits, habits } = useContext(habitContext);

  const asyncFetchHabits = async () => {
    const result = await fetchMyHabits(userId);
    const habits = result.data;
    replaceHabits(habits);
    saveToLocalStorage('habits', habits);
  }

  useEffect(() => {
    asyncFetchHabits();
  }, []);

  const TIME_REMAINING_LIST = habits.map(habit =>
    getDurationToExpiration(habit.expiresAt)
  );

  const handleHabitDelete = async habitId => {
    try {
      const confirmBeforeDelete = await swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#76B439',
        cancelButtonColor: '#8F1012',
        confirmButtonText: 'Yes, delete it!'
      })
      if(confirmBeforeDelete.value) {
        const response = await deleteHabit({ userId, habitId });
        swal({
          type: 'success',
          position: 'top-end',
          title: response.message,
          toast: true,
          showConfirmButton: false,
          timer: 3000
        });
        const newHabits = habits.filter(habit => habit.habitId !== habitId);
        replaceHabits(newHabits);
        saveToLocalStorage('habits', newHabits);
      }
    } catch (error) {
      swal({
        type: 'error',
        position: 'top-end',
        title: error.message,
        toast: true,
        showConfirmButton: false,
        timer: 3000
      });
    }
  };

  return (
    <div className="row">
    <div className="col-sm-12">
      <HabitsForm {...props} />
    </div>
    {habits.map((habit, index) => (
      <div className="col-sm-4" key={habit.habitId}>
        <HabitCard
          key={habit.habitId}
          name={habit.name}
          durationTillExpiration={TIME_REMAINING_LIST[index]}
          dateCreated={standardizeDate(habit.createdAt)}
          handleHabitDelete={() => handleHabitDelete(habit.habitId)}
          habitId={habit.habitId}
        />
      </div>
    ))}
    </div>
  );
};

export default HabitsList;
