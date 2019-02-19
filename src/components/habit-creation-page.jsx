import React, { useReducer } from 'react';
import { Form, Formik, Field } from 'formik';
// import swal from 'sweetalert2';
import { CustomInput } from '.';
// import { createNewHabit } from '../services';
import MilestoneAddRow from './milestone-add-row';
import MilestoneDisplayRow from './milestone-display-row';
// import moment from 'moment';
// import { habitContext } from '../contexts';
const reducer = (previousState, newState) => ({
  ...previousState,
  ...newState
});

const INITIAL_VALUES = {
  habitName: '',
  milestoneTitle: ''
};

const HabitCreationPage = () => {
  const [{ milestones, milestoneValue }, setState] = useReducer(reducer, {
    milestones: [],
    milestoneValue: ''
  })

  const changeMilestoneValue = e => {
    e.preventDefault();
    setState({ milestoneValue: e.target.value });
  };

  const addMilestone = () => {
    milestones.push(milestoneValue);
    setState({ milestones, milestoneValue: '' });
  };



  return (
    <div className="row d-flex flex-column align-items-center text-monospace">
      <div className="card text-center col-sm-8 mt-5 pl-0 pr-0">
        <div className="card-header">
          <h5>Create New Habit</h5>
        </div>
      </div>

      <div
        className="card col-sm-8 mt-4 d-flex align-items-center"
        style={{ minHeight: '15rem' }}
      >
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={() => {
            console.log('Anything goes odebi');
          }}
        >
          {({ isSubmitting }) => (
            <Form className="col-sm-8 d-flex flex-column justify-content-center">
              <Field
                type="text"
                style={{ height: '3.5rem' }}
                name="habitName"
                addedClass="mt-4 mb-2"
                component={CustomInput}
                placeholder="Habit Name"
              />
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
