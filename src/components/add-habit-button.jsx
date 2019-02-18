import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddHabitButton = ({ className }) => {
  return (
    <div className={className}>
      <FontAwesomeIcon
        icon="plus-circle"
        className="fa-2x mr-5 mb-5 float-right"
        style={{ height: '5rem', width: '5rem' }}
        data-toggle="tooltip"
        title="CREATE HABIT"
      />
    </div>
  );
};

export default AddHabitButton;
