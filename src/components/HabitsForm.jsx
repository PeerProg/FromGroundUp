import React, { useReducer } from 'react';
import { Form, Formik, Field } from 'formik';
import swal from 'sweetalert2';
import { CustomInput } from '.';
import { submitButtonStyle } from '../styles';
import { createNewHabit } from '../services';
import { habitNameValidator } from '../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as moment from 'moment';

const initialValues = { name: '', days: '' };

const reducer = (previousState, newState) => {
  return { ...previousState, ...newState };
};

// Placed this outside the component to make it a composed component on its own
// Might consider abstracting the submit functions out of respective components.
const submitHabitForm = ({ name, days }, { setSubmitting, resetForm }) => {
  createNewHabit({ name })
    .then(() => {
      swal({
        type: 'success',
        position: 'top-end',
        title: 'Habit created successfully',
        toast: true,
        showConfirmButton: false,
        timer: 3000
      });
      localStorage.setItem(
        'habitInfo',
        JSON.stringify({
          name,
          days,
          todayDate: moment().calendar(),
          expiresDate: moment()
            .add(days, 'days')
            .calendar()
        })
      );
      resetForm();
    })
    .catch(err => {
      swal({
        type: 'error',
        position: 'top-end',
        title: err.message,
        toast: true,
        showConfirmButton: false,
        timer: 3000
      });
    });
  setSubmitting(false);
};

const HabitsForm = () => {
  const [{ habitFormVisible }, setState] = useReducer(reducer, {
    habitFormVisible: false
  });

  const handleFormVisibility = () =>
    setState({ habitFormVisible: !habitFormVisible });

  return (
    <div className="mt-3">
      <div className="card mb-3">
        <h1 className="text-center text-monospace">Add New Habit</h1>
      </div>
      <div className="d-flex p-1" style={{ backgroundColor: '#A8A8A8' }}>
        <span className="d-flex align-items-center text-monospace font-italic font-weight-bold">
          Click "+" to add a new Habit
        </span>
        <FontAwesomeIcon
          icon="plus-circle"
          className="fa-2x ml-auto"
          onClick={handleFormVisibility}
        />
      </div>
      {habitFormVisible && (
        <div>
          <div className="card mt-3">
            <Formik
              initialValues={initialValues}
              validate={values => habitNameValidator(values)}
              onSubmit={async (
                { name, days },
                { setSubmitting, resetForm }
              ) => {
                submitHabitForm({ name, days }, { setSubmitting, resetForm });
              }}
            >
              {({ isSubmitting }) => (
                <Form className="d-flex align-items-center p-2">
                  <React.Fragment>
                    <Field
                      type="text"
                      name="name"
                      inputClass="form-group align-items-center mt-auto mb-auto"
                      style={{ minWidth: '400px' }}
                      placeholder="Habit Name"
                      component={CustomInput}
                    />
                    <Field
                      type="number"
                      name="days"
                      inputClass="form-group align-items-center mt-auto mb-auto"
                      style={{ minWidth: '300px', marginLeft: '15px' }}
                      placeholder="No of Days"
                      component={CustomInput}
                    />
                    <button
                      className="btn ml-auto bg-primary btn-sm"
                      type="submit"
                      disabled={isSubmitting}
                      style={submitButtonStyle}
                    >
                      Add
                    </button>
                  </React.Fragment>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitsForm;
