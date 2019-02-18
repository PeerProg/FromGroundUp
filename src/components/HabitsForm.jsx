import React, { useState, useContext } from 'react';
import { Form, Formik, Field } from 'formik';
import swal from 'sweetalert2';
import { CustomInput } from '.';
import { submitButtonStyle } from '../styles';
import { createNewHabit } from '../services';
import { habitObjectValidator } from '../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { habitContext } from '../contexts';

const initialValues = { name: '', days: '' };

// Placed this outside the component to make it a composed component on its own
// Might consider abstracting the submit functions out of respective components.
const submitHabitForm = async (
  { name, days },
  { setSubmitting, resetForm },
  props,
  cb
) => {
  try {
    const expiresAt = moment()
      .add(days, 'days')
      .format('MMMM DD YYYY, h:mm:ss a');
    const startsAt = moment().format('MMMM DD YYYY, h:mm:ss a');
    const result = await createNewHabit({ name, startsAt, expiresAt });
    const newHabitObject = {
      name: result.data.name,
      startsAt: result.data.startsAt,
      expiresAt: result.data.expiresAt,
      habitId: result.data.id,
      habitActive: result.data.habitActive,
      createdAt: result.data.createdAt,
      updatedAt: result.data.updatedAt,
      milestones: result.data.milestones
    }
    cb(newHabitObject);
    swal({
      type: 'success',
      position: 'top-end',
      title: 'Habit created successfully',
      toast: true,
      showConfirmButton: false,
      timer: 3000
    });
    resetForm();
    props.location.pathname !== '/habits' && props.history.push('/my-habits');
  } catch (err) {
    swal({
      type: 'error',
      position: 'top-end',
      title: err.message,
      toast: true,
      showConfirmButton: false,
      timer: 3000
    });
  }
  setSubmitting(false);
};

const HabitsForm = props => {
  const [habitFormVisible, setHabitFormIsVisible] = useState(false);
  const { addToHabits } = useContext(habitContext);

  const handleFormVisibility = () => setHabitFormIsVisible(!habitFormVisible);

  return (
    <div className="mt-3">
      {props.location.pathname !== '/habits' && <div className="card mb-3">
        <h1 className="text-center text-monospace">Add New Habit</h1>
      </div>}
      <div className="card-header d-flex flex-row justify-content-between align-middle">
        <h6 className="d-flex align-items-center text-monospace font-weight-bold mb-0">
          Click "+" to add a new Habit
        </h6>
        <FontAwesomeIcon
          icon={habitFormVisible ? "minus-circle" : "plus-circle"}
          className="fa-2x"
          onClick={handleFormVisibility}
        />
      </div>
      {habitFormVisible && (
        <div>
          <div className="card mt-3">
            <Formik
              initialValues={initialValues}
              validate={values => habitObjectValidator(values)}
              onSubmit={async (
                { name, days },
                { setSubmitting, resetForm }
              ) => {
                submitHabitForm(
                  { name, days },
                  { setSubmitting, resetForm },
                  props,
                  addToHabits
                );
                handleFormVisibility();
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
