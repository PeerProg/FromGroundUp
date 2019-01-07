import React, { useEffect, useContext, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userContext } from '../contexts';
import { fetchMyHabits } from '../services';

const initialVaues = {
  name: '',
  days: '',
  todayDate: '',
  expiresDate: ''
};

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
  const [{ indexOfHabitClicked, habits, habitInfo }, setState] = useReducer(
    reducer,
    {
      indexOfHabitClicked: -1,
      habits: [],
      habitInfo: JSON.parse(localStorage.getItem('habitInfo')) || initialVaues
    }
  );

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
        <div className="table-responsive">
          <table className="table table-d table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Properties</th>
                <th scope="col">#</th>
                <th scope="col">Habit Title</th>
                <th scope="col">Date Created</th>
                <th scope="col">Expected Date of Completion</th>
                <th scope="col">Number of Days Remaining</th>
              </tr>
            </thead>
            <tbody>
              {habits &&
                habits.map((habit, index) => (
                  <tr
                    key={habit.name}
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => showSubContent(index)}
                  >
                    <td>
                      <FontAwesomeIcon
                        icon="plus-circle"
                        className="mr-4 fa-lg"
                        color="#76B439"
                        data-toggle="tooltip"
                        title="Show Milestones"
                        style={{ cursor: 'pointer' }}
                      />
                      <FontAwesomeIcon
                        icon="edit"
                        className="mr-4 fa-lg"
                        color="#76B439"
                        data-toggle="tooltip"
                        title="Edit Habit"
                        style={{ cursor: 'pointer' }}
                      />
                      <FontAwesomeIcon
                        icon="trash-alt"
                        color="#8F1012"
                        className="fa-lg"
                        data-toggle="tooltip"
                        title="Delete Habit"
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <th scope="row">{index + 1}</th>
                    <td> {habit.name}</td>
                    {habit.name.toLowerCase() ===
                      habitInfo.name.toLowerCase() && (
                      <td>{habitInfo.todayDate}</td>
                    )}
                    {habit.name.toLowerCase() ===
                      habitInfo.name.toLowerCase() && (
                      <td>{habitInfo.expiresDate}</td>
                    )}
                    {habit.name.toLowerCase() ===
                      habitInfo.name.toLowerCase() && <td>{habitInfo.days}</td>}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    </div>
  );
};

export default HabitsPage;
