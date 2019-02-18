import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { habitContext } from '../contexts';

const HabitButtons = props => {
  const { habitCheckboxIndex, activateCheckbox, habits } = props;

  const [buttonName, setbuttonName] = useState('Start/Stop Habit');

  const { handleHabitData } = useContext(habitContext);

  const selectedhabit = habits[habitCheckboxIndex];

  useEffect(() => {
    if (activateCheckbox) {
      habits[habitCheckboxIndex].habitActive
        ? setbuttonName('Stop Habit')
        : setbuttonName('Start Habit');

      handleHabitData(selectedhabit);
    } else {
      setbuttonName('Start/Stop Habit');
    }
  }, [activateCheckbox]);

  return (
    <div className="row  d-flex bd-highlight mt-3">
      <div className="col-12">
        <div className="tab-content" id="nav-tabContent">
          <div className="row">
            <div className="col-md-6" style={{ textAlign: 'left' }}>
              {habits.length !== 0 && (
                <button type="button" className="btn btn-secondary">
                  {buttonName}
                </button>
              )}
            </div>
            <div className="col-md-6" style={{ textAlign: 'right' }}>
              {!activateCheckbox && (
                <Link to="/add-new-habit">
                  <button type="button" className="btn btn-primary">
                    Create Habit
                  </button>
                </Link>
              )}
              {activateCheckbox && (
                <Link to="/add-milestones">
                  <button type="button" className="btn btn-success">
                    Create Milestones
                  </button>
                </Link>
              )}
            </div>
          </div>

          <br />
        </div>
      </div>
    </div>
  );
};

export default HabitButtons;
