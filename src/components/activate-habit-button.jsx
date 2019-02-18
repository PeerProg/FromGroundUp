import React from 'react';

const ActivateHabitButton = ({ habitActive }) => {
  return (
    // Todo: activate the functionality when server has habitActive property editable
    <button type="button" className="btn btn-secondary">
      {habitActive ? 'Stop' : 'Start'}
    </button>
  );
}

export default ActivateHabitButton;
