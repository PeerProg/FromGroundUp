import React from 'react';
import { Field } from 'formik';
import ControlledInput from './controlled-input';

const MilestoneDisplayRow = ({ milestones }) => {
  const rendered = milestones.map((milestone, index) => (
    <Field
      key={index}
      type="text"
      value={milestone}
      readOnly
      style={{ height: '3.5rem' }}
      name={`milestoneTitle-${index}`}
      component={ControlledInput}
      placeholder="Milestone Title"
    />
  ));
  return (
    <div className="d-flex flex-column mb-2">
      {rendered}
    </div>
  );
};

export default MilestoneDisplayRow;
