import React from 'react';
import MilestoneItem from './MilestoneItem';

function Milestones() {
  return (
    <div
      className="d-flex card mb-3 mr-auto ml-auto"
      style={{ backgroundColor: '#F1F1F1', width: '80%' }}
    >
      <MilestoneItem />
    </div>
  );
}

export default Milestones;
