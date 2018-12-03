import React, { useEffect, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userContext } from '../contexts';
import { showMyHabits } from '../services';
import FancyDiv from './FancyDiv';

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
    <div className="card">
      <h1 className="h1 blockquote text-center">
        Track your habits and milestones
      </h1>
      {habits &&
        habits.map((habit, index) => (
          <FancyDiv
            key={habit.name}
            color={index % 2 === 0 ? '#F8F9FA' : 'white'}
            style={{
              height: '40px',
              marginBottom: '2px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span>{habit.name}</span>
            <span className="text-right">
              <FontAwesomeIcon icon="edit" />
              <FontAwesomeIcon icon="trash-alt" />
            </span>
          </FancyDiv>
        ))}
    </div>
  );
}

export default HabitsPage;
