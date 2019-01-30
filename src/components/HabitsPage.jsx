import React, { useEffect, useContext, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userContext } from '../contexts';
import { fetchMyHabits } from '../services';
import { HabitButtons } from '.';
import { habitContext } from '../contexts';

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
  const { handleHabitData } = useContext(habitContext);
  const [
    {
      indexOfHabitClicked,
      habits,
      habitDays,
      toggleMilestone,
      toggleButtonName,
      habitCheckboxIndex,
      activateCheckbox
    },
    setState
  ] = useReducer(reducer, {
    indexOfHabitClicked: -1,
    habits: [],
    habitDays: [],
    toggleMilestone: false,
    toggleButtonName: 'Click to View',
    habitCheckboxIndex: -1,
    activateCheckbox: false
  });

  useEffect(
    () => {
      getUserHabits(context.user.id).then(result => {
        setState({ habits: result.data });
        setState({ habitDays: handleDaysRemaining(result.data) });
      });
    },
    [context.user.id]
  );

  const handleToggleMilestone = index => {
    setState({ toggleMilestone: !toggleMilestone });
    setState({
      toggleButtonName:
        toggleButtonName === 'Click to View' ? 'Minimize View' : 'Click to View'
    });
    const clickedValue = index === indexOfHabitClicked ? -1 : index;
    setState({ indexOfHabitClicked: clickedValue });

    handleHabitData(habits[index]);
    localStorage.setItem('habitDetails', JSON.stringify(habits[index]));
  };

  const handleDaysRemaining = habits => {
    let results = [];
    habits &&
      habits.forEach(element => {
        let startDate = new Date(element.startsAt);
        let expiryDate = new Date(element.expiresAt);
        let timeDiff = Math.abs(startDate.getTime() - expiryDate.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        results.push(diffDays);
      });
    return results;
  };

  const handleCheckbox = index => {
    setState({ habitCheckboxIndex: index });

    activateCheckbox
      ? setState({
          activateCheckbox: false
        })
      : setState({ activateCheckbox: true });
  };

  const toggleClassName = toggleMilestone ? 'toggler toggler1 ' : 'toggler';

  return (
    <div className="align-items-center">
      <div
        className="card d-flex bd-highlight mt-3 mb-4 text-center"
        style={{ backgroundColor: '#F8F9FA', padding: '8px' }}
      >
        <h2 className="text-monospace">Track your habits and milestones</h2>
      </div>

      <div>
        <HabitButtons
          habitCheckboxIndex={habitCheckboxIndex}
          activateCheckbox={activateCheckbox}
          habits={habits}
        />
      </div>

      <React.Fragment>
        <div className="table-responsive">
          <table className="table table-d table-striped table-bordered custom-table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Select</th>
                <th scope="col">#</th>
                <th scope="col">Habit Title</th>
                <th scope="col">Milestones</th>
                <th scope="col">Habit Start Date</th>
                <th scope="col">Expected Date of Completion</th>
                <th scope="col">Number of Days Remaining</th>
                <th scope="col">Properties</th>
              </tr>
            </thead>
            {habits &&
              habits.map((habit, index) => (
                <tbody className="borderColor" key={habit.name}>
                  <tr className="page-header">
                    <th>
                      <input
                        type="checkbox"
                        disabled={
                          habitCheckboxIndex !== index && activateCheckbox
                        }
                        onChange={() => handleCheckbox(index)}
                      />
                    </th>
                    <th scope="row">{index + 1}</th>
                    <td> {habit.name}</td>
                    <td>
                      <button
                        type="button"
                        className="tbtn"
                        onClick={() => handleToggleMilestone(index)}
                      >
                        {index === indexOfHabitClicked
                          ? toggleButtonName
                          : 'Click to View'}
                      </button>
                    </td>

                    <td>{habit.startsAt}</td>

                    <td>{habit.expiresAt}</td>

                    <td>{`${habitDays[index]} day(s) remaining `}</td>
                    <td>
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
                  </tr>
                  {index === indexOfHabitClicked && (
                    <tr className={toggleClassName}>
                      <td colSpan="2" />
                      <td colSpan="20">
                        <Milestones />
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
          </table>
        </div>
      </React.Fragment>
    </div>
  );
};

export default HabitsPage;
