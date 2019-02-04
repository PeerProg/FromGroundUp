import React, { useEffect, useContext, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import swal from 'sweetalert2';
import { Formik, Form, Field } from 'formik';
import { userContext, habitContext } from '../contexts';
import { fetchMyHabits, deleteHabit, updateHabitName } from '../services';
import { HabitButtons, Milestones, CustomInput } from '.';
import {
  getDurationToExpiration,
  standardizeDate,
  habitNameValidator
} from '../helpers';
import { habitNameFormEditButton } from '../styles';

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
                <th scope="col">Action</th>
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
                    <td>
                      {idOfHabitBeingEdited === habit.habitId ? (
                        <Formik
                          initialValues={{ name: habit.name }}
                          validate={values => habitNameValidator(values)}
                          onSubmit={async ({ name }, { setSubmitting }) => {
                            updateHabitName({
                              name,
                              habitId: habit.habitId,
                              userId: context.user.id
                            }).then(res => {
                              const newHabitsList = habits.map(item => {
                                return item.habitId === habit.habitId
                                  ? res.data
                                  : item;
                              });
                              setState({
                                idOfHabitBeingEdited: -1,
                                habits: newHabitsList
                              });
                              swal({
                                type: 'success',
                                position: 'top-end',
                                title: 'Update Successful',
                                toast: true,
                                showConfirmButton: false,
                                timer: 3000
                              }).catch(err => {
                                swal({
                                  type: 'error',
                                  position: 'top-end',
                                  title: err.message,
                                  toast: true,
                                  showConfirmButton: false,
                                  timer: 3000
                                });
                              });
                            });
                            setSubmitting(false);
                          }}
                        >
                          {() => (
                            <Form>
                              <span style={{ display: 'flex' }}>
                                <Field
                                  type="text"
                                  name="name"
                                  component={CustomInput}
                                />
                                <button
                                  className="ml-3 btn btn-primary"
                                  type="submit"
                                  style={habitNameFormEditButton}
                                >
                                  save
                                </button>
                              </span>
                            </Form>
                          )}
                        </Formik>
                      ) : (
                        <span>{habit.name}</span>
                      )}
                    </td>
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
                      <span className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon
                          icon={
                            idOfHabitBeingEdited === habit.habitId
                              ? 'times-circle'
                              : 'edit'
                          }
                          className={idOfHabitBeingEdited === habit.habitId ? "fa-lg" : "mr-4 fa-lg"}
                          color={idOfHabitBeingEdited === habit.habitId ? "#8F1012" : "#76B439"}
                          data-toggle="tooltip"
                          title={
                            idOfHabitBeingEdited === habit.habitId
                              ? 'Cancel Editing'
                              : 'Edit Habit'
                          }
                          onClick={() => toggleNameEditForm(habit.habitId)}
                          style={{ cursor: 'pointer' }}
                        />
                        {idOfHabitBeingEdited !== habit.habitId && (
                          <FontAwesomeIcon
                            icon="trash-alt"
                            color="#8F1012"
                            className="fa-lg"
                            data-toggle="tooltip"
                            title="Delete Habit"
                            onClick={() => handleHabitDelete(habit.habitId)}
                            style={{ cursor: 'pointer' }}
                          />
                        )}
                      </span>
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
