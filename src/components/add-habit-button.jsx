import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddHabitButton = ({ className }) => {
  return (
    <Link to="/create-habit">
      <div className={className}>
        <FontAwesomeIcon
          icon="plus-circle"
          className="fa-2x mr-5 mb-5 float-right"
          style={{ height: '5rem', width: '5rem' }}
          data-toggle="tooltip"
          title="CREATE HABIT"
        />
      </div>
    </Link>
  );
};

export default AddHabitButton;
