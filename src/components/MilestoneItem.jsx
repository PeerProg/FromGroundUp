import React, { Fragment, useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchMilestones } from '../services';
import { habitContext } from '../contexts';
import * as moment from 'moment';

const MilestoneItem = () => {
  const { habit } = useContext(habitContext);

  const [milestones, setMilestones] = useState([
    { title: 'No Milestone', createdAt: 'No Date' }
  ]);

  const getHabitMilestones = async habitId => {
    try {
      const response = await fetchMilestones(habitId);
      return response;
    } catch (error) {
      return error;
    }
  };

  useEffect(
    () => {
      getHabitMilestones(habit.habitId).then(result => {
        if (result.data.length !== 0) {
          setMilestones(result.data);
        }
      });
    },
    [habit.habitId]
  );

  return (
    <Fragment>
      {milestones &&
        milestones.map((milestone, index) => (
          <div
            className="d-flex align-items-center mb-1"
            style={{ backgroundColor: 'white' }}
            key={milestone.title}
          >
            <FontAwesomeIcon
              icon={true ? 'check-circle' : 'circle'}
              className="ml-5"
            />
            <span className="text-monospace ml-5">{milestone.title}</span>
            <span className="text-monospace ml-auto mr-5">
              {moment(new Date(milestone.createdAt)).format('LLL')}
            </span>
          </div>
        ))}
    </Fragment>
  );
};

export default MilestoneItem;
