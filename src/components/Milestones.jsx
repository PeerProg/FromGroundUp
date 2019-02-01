import React, { useContext, useState, useEffect } from 'react';
import { fetchMilestones } from '../services';
import { habitContext } from '../contexts';
import MilestoneItem from './MilestoneItem';

function Milestones() {
  const { habit } = useContext(habitContext);

  const [milestones, setMilestones] = useState([]);

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
    <div className="d-flex align-items-center">
      {!!milestones.length && (
        <div
          className="d-flex card mb-3 mr-auto ml-auto"
          style={{ backgroundColor: '#F1F1F1', width: '80%' }}
        >
          {milestones.map(milestone => (
            <MilestoneItem
              key={milestone.title}
              date={milestone.createdAt}
              title={milestone.title}
            />
          ))}
        </div>
      )}
      {!milestones.length && (
        <span className="text-monospace mr-auto ml-auto no-items">
          No milestones set yet
        </span>
      )}
    </div>
  );
}

export default Milestones;
