import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateHabitName } from '../services';
import { standardizeDate, habitNameValidator } from '../helpers';
import { Milestones, CustomInput } from '.';
import { habitNameFormEditButton } from '../styles';

export default function HabitTableRow({
  habitName,
  notSelected,
  selectedCheckboxHandler,
  index,
  idOfHabit,
  idOfUser,
  handleHabitUpdateSuccess,
  toggleMilestoneHandler,
  habitIsExpanded,
  toggleButtonName,
  toggleClassName,
  habitStartDate,
  habitEndDate,
  durationTillHabitExpiry,
  habitDeleteHandler,
  toggleNameEditForm,
  habitIsBeingEdited
}) {
  return (
    <Fragment>
      <tbody className="borderColor" key={habitName}>
        <tr className="page-header">
          <th>
            <input
              type="checkbox"
              disabled={notSelected}
              onChange={selectedCheckboxHandler}
            />
          </th>
          <th scope="row">{index + 1}</th>
          <td>
            {habitIsBeingEdited ? (
              <Formik
                initialValues={{ name: habitName }}
                validate={values => habitNameValidator(values)}
                onSubmit={async ({ name }, { setSubmitting }) => {
                  updateHabitName({
                    name,
                    habitId: idOfHabit,
                    userId: idOfUser
                  }).then(() => {
                    handleHabitUpdateSuccess();
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
                      <Field type="text" name="name" component={CustomInput} />
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
              <span>{habitName}</span>
            )}
          </td>
          <td>
            <button
              type="button"
              className="tbtn"
              onClick={toggleMilestoneHandler}
            >
              {habitIsExpanded ? toggleButtonName : 'Click to View'}
            </button>
          </td>

          <td>{standardizeDate(habitStartDate)}</td>

          <td>{standardizeDate(habitEndDate)}</td>

          <td>{durationTillHabitExpiry}</td>
          <td>
            <span className="d-flex justify-content-center align-items-center">
              <FontAwesomeIcon
                icon={habitIsBeingEdited ? 'times-circle' : 'edit'}
                className={habitIsBeingEdited ? 'fa-lg' : 'mr-4 fa-lg'}
                color={habitIsBeingEdited ? '#8F1012' : '#76B439'}
                data-toggle="tooltip"
                title={habitIsBeingEdited ? 'Cancel Editing' : 'Edit Habit'}
                onClick={toggleNameEditForm}
                style={{ cursor: 'pointer' }}
              />
              {!habitIsBeingEdited && (
                <FontAwesomeIcon
                  icon="trash-alt"
                  color="#8F1012"
                  className="fa-lg"
                  data-toggle="tooltip"
                  title="Delete Habit"
                  onClick={habitDeleteHandler}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </span>
          </td>
        </tr>
        {habitIsExpanded && (
          <tr className={toggleClassName}>
            <td colSpan="2" />
            <td colSpan="20">
              <Milestones />
            </td>
          </tr>
        )}
      </tbody>
    </Fragment>
  );
}

HabitTableRow.propTypes = {
  habitName: PropTypes.string,
  notSelected: PropTypes.bool,
  selectedCheckboxHandler: PropTypes.func,
  index: PropTypes.number,
  idOfHabit: PropTypes.string,
  idOfUser: PropTypes.string,
  toggleMilestoneHandler: PropTypes.func,
  handleHabitUpdateSuccess: PropTypes.func,
  habitStartDate: PropTypes.string,
  habitEndDate: PropTypes.string,
  durationTillHabitExpiry: PropTypes.string,
  habitDeleteHandler: PropTypes.func,
  habitIsExpanded: PropTypes.bool,
  toggleClassName: PropTypes.string,
  toggleButtonName: PropTypes.string,
  toggleNameEditForm: PropTypes.func,
  habitIsBeingEdited: PropTypes.bool
};
