import React from 'react';
import { Form, Formik, Field } from 'formik';
import swal from 'sweetalert2';
import { CustomInput } from '.';
import { loginFormContainerStyle, submitButtonStyle } from '../styles';
import { createNewHabit } from '../services';
import { habitNameValidator } from '../helpers';

const initialValues = { name: '' };

function HabitsForm() {
  return (
    <div className="card">
      <h1>Add New Habit</h1>
      <Formik
        initialValues={initialValues}
        validate={values => habitNameValidator(values)}
        onSubmit={async ({ name }, { setSubmitting }) => {
          createNewHabit({ name })
            .then(res => {
              console.log('Habit created? ', res);
              swal({
                type: 'success',
                position: 'top-end',
                title: 'Habit created successfully',
                toast: true,
                showConfirmButton: false,
                timer: 3000
              });
            })
            .catch(err => {
              console.log('Habit failed', err);
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
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={loginFormContainerStyle}>
              <Field
                type="text"
                name="name"
                placeholder="Habit Name"
                component={CustomInput}
              />
              <br />
              <br />
              <button
                className="btn btn-outline-primary customBtn"
                type="submit"
                disabled={isSubmitting}
                style={submitButtonStyle}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default HabitsForm;
