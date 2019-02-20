import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddHabitButton = () => {
  return (
    <Link to="/create-habit">
      <FontAwesomeIcon
        icon="plus-circle"
        className="fa-2x"
        style={{
          position: 'absolute',
          height: '5rem',
          width: '5rem',
          right: '4rem',
          bottom: '4rem'
        }}
        data-toggle="tooltip"
        title="CREATE HABIT"
      />
    </Link>
  );
};

export default AddHabitButton;
