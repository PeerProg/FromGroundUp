import React from 'react';
import { Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomInput from './CustomInput';

const MilestoneAddRow = ({ addMilestone, onChange, value }) => {
  return (
    <div className="d-flex flex-row justify-content-between mb-2">
      <Field
        type="text"
        style={{ width: '35rem', height: '3.5rem' }}
        name="milestoneTitle"
        value={value}
        onChange={onChange}
        component={CustomInput}
        placeholder="Milestone Title"
      />
      <FontAwesomeIcon
        icon={'plus-circle'}
        className="fa-2x"
        onClick={addMilestone}
        style={{ height: '3.5rem', width: '3.5rem' }}
      />
    </div>
  );
};

export default MilestoneAddRow;
