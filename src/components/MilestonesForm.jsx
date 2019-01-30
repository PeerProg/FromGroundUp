import React, { useContext } from 'react';
import { Form, Formik, Field } from 'formik';
import { Link } from 'react-router-dom';
import { CustomInput } from '.';
import { milestoneValidator } from '../helpers';
import { submitButtonStyle } from '../styles';
import { habitContext } from '../contexts';
import swal from 'sweetalert2';
import { createNewMilestone } from '../services';

const submitHabitForm = (
  { habitId, milestone },
  { setSubmitting, resetForm }
) => {
  createNewMilestone({ habitId, title: milestone })
    .then(() => {
      swal({
        type: 'success',
        position: 'top-end',
        title: 'Habit created successfully',
        toast: true,
        showConfirmButton: false,
        timer: 3000
      });
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

const MilestonesForm = props => {
  const { habit } = useContext(habitContext);

  const { habitId, name } = habit;

  const initialValues = { habit: name, milestone: '' };

  return (
    <div className="mt-3">
      <div className="card mb-3">
        <h1 className="text-center text-monospace">Add Milestones</h1>
      </div>
      <div>
        <Link to="/my-habits">
          <button
            type="button"
            className="btn ml-auto bg-secondary btn-sm"
            style={submitButtonStyle}
          >
            Go Back
          </button>
        </Link>
      </div>
      <div>
        <div className="card mt-3">
          <Formik
            initialValues={initialValues}
            validate={values => milestoneValidator(values)}
            onSubmit={async ({ milestone }, { setSubmitting, resetForm }) => {
              submitHabitForm(
                { habitId, milestone },
                { setSubmitting, resetForm }
              );
            }}
          >
            {({ isSubmitting }) => (
              <Form className="d-flex align-items-center p-2">
                <React.Fragment>
                  <Field
                    type="text"
                    name="habit"
                    disabled
                    inputClass="form-group align-items-center mt-auto mb-auto"
                    style={{ minWidth: '400px' }}
                    placeholder="Habit Name"
                    component={CustomInput}
                  />
                  <Field
                    type="test"
                    name="milestone"
                    inputClass="form-group align-items-center mt-auto mb-auto"
                    style={{ minWidth: '300px', marginLeft: '15px' }}
                    placeholder="milestone item"
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
    </div>
  );
};

export default MilestonesForm;
