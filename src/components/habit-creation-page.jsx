import React, { useReducer, useContext } from 'react';
import { Form, Formik, Field } from 'formik';
import swal from 'sweetalert2';
import { CustomInput } from '.';
import MilestoneAddRow from './milestone-add-row';
import MilestoneDisplayRow from './milestone-display-row';
import {
  habitCreationPageValidator,
  createHabit,
  createMilestone
} from '../helpers';
import { habitContext } from '../contexts';

const reducer = (previousState, newState) => ({
  ...previousState,
  ...newState
});

const INITIAL_VALUES = {
  habitName: '',
  days: ''
};

const swalMessage = (type, message) => {
  return swal({
    type,
    position: 'top-end',
    title: message,
    toast: true,
    showConfirmButton: false,
    timer: 3000
  });
};

const HabitCreationPage = props => {
  const [{ milestones, milestoneValue, initialValues }, setState] = useReducer(
    reducer,
    {
      milestones: [],
      milestoneValue: '',
      initialValues: INITIAL_VALUES
    }
  );

  const { addToHabits, addMilestoneToHabit } = useContext(habitContext);

  const changeMilestoneValue = e => {
    e.preventDefault();
    setState({ milestoneValue: e.target.value });
  };

  const addMilestone = () => {
    const trimmedMilestoneValue = milestoneValue.trim();
    if (!trimmedMilestoneValue) {
      swalMessage('error', 'Milestone title cannot be empty');
    } else if (trimmedMilestoneValue < 3) {
      swalMessage('error', 'Milestone title must be 3 characters or more');
    }
    milestones.push(milestoneValue);
    setState({ milestones, milestoneValue: '', errors: {} });
  };

  return (
    <div className="row d-flex flex-column align-items-center text-monospace">
      <div className="card text-center col-sm-8 mt-5 pl-0 pr-0">
        <div className="card-header">
          <h5 className="font-weight-bold">Create New Habit</h5>
        </div>
      </div>

      <div
        className="card col-sm-8 mt-4 d-flex align-items-center"
        style={{ minHeight: '15rem' }}
      >
        <Formik
          initialValues={initialValues}
          validate={values => habitCreationPageValidator(values)}
          onSubmit={async (
            { habitName, days },
            { setSubmitting, resetForm }
          ) => {
            const newHabitId = await createHabit(
              { name: habitName, days },
              { setSubmitting },
              addToHabits
            );
            const promises = milestones.map(milestone => {
              return createMilestone(
                { habitId: newHabitId, milestone },
                { setSubmitting },
                addMilestoneToHabit
              );
            });
            Promise.all(promises).then(() => {
              swalMessage('success', 'Habit created successfully');
              resetForm();
              props.history.push('/habits');
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form className="col-sm-8 d-flex flex-column justify-content-center">
              <div className="d-flex flex-row justify-content-between mb-2">
                <Field
                  type="text"
                  style={{
                    height: '3.5rem',
                    width: '24rem',
                    marginTop: '1rem',
                    marginBottom: '0.3rem'
                  }}
                  name="habitName"
                  component={CustomInput}
                  placeholder="Habit Name"
                />
                <Field
                  type="number"
                  style={{
                    height: '3.5rem',
                    width: '14rem',
                    marginTop: '1rem',
                    marginBottom: '0.3rem'
                  }}
                  name="days"
                  placeholder="No of Days"
                  component={CustomInput}
                />
              </div>
              {!!milestones.length && (
                <MilestoneDisplayRow milestones={milestones} />
              )}
              <MilestoneAddRow
                value={milestoneValue}
                addMilestone={addMilestone}
                onChange={changeMilestoneValue}
              />
              <button
                className="btn bg-primary mb-3 col-sm-4 font-weight-bold align-self-center"
                type="submit"
                style={{ height: '3.5rem' }}
                disabled={isSubmitting}
              >
                Create
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default HabitCreationPage;
