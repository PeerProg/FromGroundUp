import React, { useEffect, useContext, useState } from 'react';
import { userContext } from '../contexts';
import { showMyHabits } from '../services';

const getUserHabits = async userId => {
  try {
    const response = await showMyHabits(userId);
    return response;
  } catch (error) {
    return error;
  }
};

function HabitsPage() {
  const context = useContext(userContext);
  const [habits, setHabits] = useState([]);

  useEffect(
    () => {
      getUserHabits(context.user.id).then(result => {
        setHabits(result.data);
      });
    },

    [context.user.id]
  );

  return (
    <React.Fragment>
      <h1>Track your habits and milestones</h1>
      {habits && habits.map(habit => <p key={habit.name}>{habit.name}</p>)}
    </React.Fragment>
  );
}

export default HabitsPage;
