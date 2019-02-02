import React, { useEffect, useContext, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userContext, habitContext } from '../contexts';
import { fetchMyHabits } from '../services';
import { HabitButtons, Milestones } from '.';
import { getDurationToExpiration, standardizeDate } from '../helpers';

const reducer = (previousState, newState) => {
  return { ...previousState, ...newState };
};

const HabitsPage = () => {
  const context = useContext(userContext);
  const { handleHabitData } = useContext(habitContext);
  const [
    {
      indexOfHabitClicked,
      habits,
      toggleMilestone,
      toggleButtonName,
      habitCheckboxIndex,
      activateCheckbox
    },
    setState
  ] = useReducer(reducer, {
    indexOfHabitClicked: -1,
    habits: [],
    toggleMilestone: false,
    toggleButtonName: 'Click to View',
    habitCheckboxIndex: -1,
    activateCheckbox: false
  });

  useEffect(
    () => {
      fetchMyHabits(context.user.id)
        .then(result => setState({ habits: result.data }))
        .catch(error => error);
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

  const TIME_REMAINING_LIST = habits.map(habit =>
    getDurationToExpiration(habit.expiresAt)
  );

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
                <th scope="col">Time Remaining</th>
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

                    <td>{standardizeDate(habit.startsAt)}</td>

                    <td>{standardizeDate(habit.expiresAt)}</td>

                    <td>{TIME_REMAINING_LIST[index]}</td>
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
