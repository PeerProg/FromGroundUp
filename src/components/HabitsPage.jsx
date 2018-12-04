import React, { useEffect, useContext, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userContext } from '../contexts';
import { fetchMyHabits } from '../services';
import FancyDiv from './FancyDiv';
import Milestones from './Milestones';

const reducer = (previousState, newState) => {
  return { ...previousState, ...newState };
};

const getUserHabits = async userId => {
  try {
    const response = await fetchMyHabits(userId);
    return response;
  } catch (error) {
    return error;
  }
};

const HabitsPage = () => {
  const context = useContext(userContext);
  const [{ indexOfHabitClicked, habits }, setState] = useReducer(reducer, {
    indexOfHabitClicked: -1,
    habits: []
  });

  useEffect(
    () => {
      getUserHabits(context.user.id).then(result => {
        setState({ habits: result.data });
      });
    },
    [context.user.id]
  );

  const showSubContent = index => {
    const clickedValue = index === indexOfHabitClicked ? -1 : index;
    setState({ indexOfHabitClicked: clickedValue });
  };

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
            <div key={habit.name}>
              <FancyDiv
                className="d-flex bd-highlight mb-2"
                color={index % 2 === 0 ? '#F7F7F7' : 'white'}
                onClick={() => showSubContent(index)}
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
              {index === indexOfHabitClicked && <Milestones />}
            </div>
          ))}
      </React.Fragment>
    </div>
  );
};

export default HabitsPage;
