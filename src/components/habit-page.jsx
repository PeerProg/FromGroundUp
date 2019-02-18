import React, { useContext, useEffect } from 'react';
import { userContext, habitContext } from '../contexts';
import { fetchHabit } from '../services';
import { MilestonesForm } from '.';
// import Milestone from './milestone';
import { standardizeDate } from '../helpers';

const HabitPage = props => {
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
              <div className="card-body">
                <h5 className="card-title">{habit.name}</h5>
                <p className="card-text">
                  Expires on {standardizeDate(habit.expiresAt)}
                </p>
              </div>
            </div>
            <MilestonesForm {...props} habit={habit} />
          </React.Fragment>
        )}
      </div>

      <div className="col-sm-8">
        {/* {habit.name &&
          habit.milestones.map(item => (
            <Milestone
              key={item.id}
              title={item.title}
              date={standardizeDate(item.createdAt)}
            />
          ))} */}
      </div>
    </div>
  );
};

export default HabitPage;
