import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userContext, habitContext } from '../contexts';
import { fetchHabit } from '../services';
import { MilestonesForm } from '.';
import Milestone from './milestone';
import { standardizeDate } from '../helpers';

const HabitPage = props => {
  const [formIsVisible, setFormIsVisible] = useState(false);

  const handleFormVisibility = () => setFormIsVisible(!formIsVisible);

  const {
    user: { id: userId }
  } = useContext(userContext);
  const { handleHabitData, habit } = useContext(habitContext);

  const asyncFetchHabit = async () => {
    const result = await fetchHabit({
      userId,
      habitId: props.match.params.habitId
    });
    const resultData = result.data;
    handleHabitData(resultData);
  };

  useEffect(() => {
    asyncFetchHabit();
  }, [habit.milestones.length]);

  return (
    <div className="mt-5 row">
      <div className="col-sm-4">
        {habit.name && (
          <React.Fragment>
            <div className="card">
              <div className="card-body text-monospace">
                <h5 className="card-title">{habit.name}</h5>
                <p className="card-text">
                  Expires on {standardizeDate(habit.expiresAt)}
                </p>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>

      <div className="col-sm-8">
        {habit.name && (
          <React.Fragment>
            <div className="card-header mb-2 text-monospace text-center d-flex justify-content-between">
              <h1 className="ml-auto mr-auto">Milestones</h1>
              <FontAwesomeIcon
                icon={formIsVisible ? "minus-circle" : "plus-circle"}
                className="fa-2x"
                data-toggle="tooltip"
                title="Click to add new milestone"
                style={{ height: '3rem', width: '3rem' }}
                onClick={handleFormVisibility}
              />
            </div>
            <div className="mb-3">
              {formIsVisible && (
                <MilestonesForm
                  {...props}
                  habit={habit}
                  handleFormVisibility={handleFormVisibility}
                />
              )}
            </div>
            {habit.milestones.map(item => (
              <Milestone
                key={item.id}
                title={item.title}
                date={standardizeDate(item.createdAt)}
              />
            ))}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default HabitPage;
