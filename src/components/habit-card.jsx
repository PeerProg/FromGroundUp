import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActivateHabitButton from './activate-habit-button';

const HabitCard = ({
  name,
  durationTillExpiration,
  handleHabitDelete,
  habitId,
  habitActive
}) => {
  return (
    <div className="card mt-4">
      <div className="card-header text-monospace d-flex justify-content-between">
        <span className="d-flex">
          <Link to={`/habits/${habitId}`}>
            <FontAwesomeIcon
              icon={'edit'}
              className="fa-lg mr-3"
              color={'#76B439'}
              data-toggle="tooltip"
              title={'Edit Habit'}
              style={{ cursor: 'pointer' }}
            />
          </Link>
          <FontAwesomeIcon
            icon="trash-alt"
            color="#8F1012"
            className="fa-lg"
            onClick={handleHabitDelete}
            data-toggle="tooltip"
            title="Delete Habit"
            style={{ cursor: 'pointer' }}
          />
        </span>
        <span>
          {durationTillExpiration !== 'Expired' && (
            <span className="text-muted font-italic">Expires in </span>
          )}
          <span className="font-weight-bold">
            {durationTillExpiration}
          </span>
        </span>
      </div>
      <div className="card-body d-flex justify-content-between">
        <h5 className="card-title d-flex align-items-center mb-0 text-monospace font-weight-bold">
          {name}
        </h5>
        <ActivateHabitButton habitActive={habitActive} />
      </div>
    </div>
  );
};

export default HabitCard;
