import React, { useEffect, useContext, useReducer } from 'react';
import swal from 'sweetalert2';
import { userContext, habitContext } from '../contexts';
import { fetchMyHabits, deleteHabit } from '../services';
import { HabitButtons, HabitTableHeader, HabitTableRow } from '.';
import { getDurationToExpiration } from '../helpers';
import { saveToLocalStorage } from '../utils';

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
      activateCheckbox,
      idOfHabitBeingEdited
    },
    setState
  ] = useReducer(reducer, {
    indexOfHabitClicked: -1,
    habits: [],
    toggleMilestone: false,
    toggleButtonName: 'Click to View',
    habitCheckboxIndex: -1,
    activateCheckbox: false,
    idOfHabitBeingEdited: -1
  });

  useEffect(() => {
    fetchMyHabits(context.user.id)
      .then(result => setState({ habits: result.data }))
      .catch(error => error);
  }, [context.user.id, habits]);

  const handleToggleMilestone = index => {
    setState({ toggleMilestone: !toggleMilestone });
    setState({
      toggleButtonName:
        toggleButtonName === 'Click to View' ? 'Minimize View' : 'Click to View'
    });
    const clickedValue = index === indexOfHabitClicked ? -1 : index;
    setState({ indexOfHabitClicked: clickedValue });

    handleHabitData(habits[index]);
    saveToLocalStorage('habitDetails', habits[index]);
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

  const handleHabitDelete = async habitId => {
    try {
      const response = await deleteHabit({ userId: context.user.id, habitId });
      swal({
        type: 'success',
        position: 'top-end',
        title: response.message,
        toast: true,
        showConfirmButton: false,
        timer: 3000
      });
      const newHabits = habits.filter(habit => habit.habitId !== habitId);
      setState({ habits: newHabits });
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

  const toggleNameEditForm = habitId => {
    idOfHabitBeingEdited === -1
      ? setState({ idOfHabitBeingEdited: habitId })
      : setState({ idOfHabitBeingEdited: -1 });
  };

  const handleHabitUpdateSuccess = () => setState({ idOfHabitBeingEdited: -1 });

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
          {habits.length && (
            <table className="table table-d table-striped table-bordered custom-table">
              <HabitTableHeader />
              {habits.map((habit, index) => (
                <HabitTableRow
                  key={habit.habitId}
                  habitName={habit.name}
                  notSelected={habitCheckboxIndex !== index && activateCheckbox}
                  selectedCheckboxHandler={() => handleCheckbox(index)}
                  index={index}
                  idOfHabit={habit.habitId}
                  idOfUser={context.user.id}
                  toggleMilestoneHandler={() => handleToggleMilestone(index)}
                  handleHabitUpdateSuccess={() => handleHabitUpdateSuccess()}
                  habitStartDate={habit.startsAt}
                  habitEndDate={habit.expiresAt}
                  durationTillHabitExpiry={TIME_REMAINING_LIST[index]}
                  habitDeleteHandler={() => handleHabitDelete(habit.habitId)}
                  habitIsExpanded={index === indexOfHabitClicked}
                  toggleClassName={toggleClassName}
                  toggleButtonName={toggleButtonName}
                  toggleNameEditForm={() => toggleNameEditForm(habit.habitId)}
                  habitIsBeingEdited={idOfHabitBeingEdited === habit.habitId}
                />
              ))}
            </table>
          )}
        </div>
      </React.Fragment>
    </div>
  );
};

export default HabitsPage;
