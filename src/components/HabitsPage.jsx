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
    <div className="align-items-center">
      <div
        className="card d-flex bd-highlight mt-3 mb-4 text-center"
        style={{ backgroundColor: '#F8F9FA', padding: '8px' }}
      >
        <h2 className="text-monospace">Track your habits and milestones</h2>
      </div>
      <React.Fragment>
        {habits &&
          habits.map((habit, index) => (
            <FancyDiv
              key={habit.name}
              className="d-flex bd-highlight mb-2"
              color={index % 2 === 0 ? '#F7F7F7' : 'white'}
            >
              <span className="mr-auto p-2 bd-highlight font-weight-bold text-monospace">
                {habit.name}
              </span>
              <span className="p-2 bd-highlight">
                <FontAwesomeIcon
                  icon="edit"
                  className="mr-4 fa-lg"
                  color="#76B439"
                />
                <FontAwesomeIcon
                  icon="trash-alt"
                  color="#8F1012"
                  className="fa-lg"
                />
              </span>
            </FancyDiv>
          ))}
      </React.Fragment>
    </div>
  );
}

export default HabitsPage;
