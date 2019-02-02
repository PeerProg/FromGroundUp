import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { standardizeDate } from '../helpers';

const MilestoneItem = ({ title, date }) => {
  return (
    <div
      className="d-flex align-items-center mb-1"
      style={{ backgroundColor: 'white' }}
      key={title}
    >
      <FontAwesomeIcon
        icon={true ? 'check-circle' : 'circle'}
        className="ml-5"
      />
      <span className="text-monospace ml-5">{title}</span>
      <span className="text-monospace ml-auto mr-5">
        {standardizeDate(date)}
      </span>
    </div>
  );
};

export default MilestoneItem;
