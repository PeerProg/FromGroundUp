import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MilestoneItem() {
  return (
    <Fragment>
      <div
        className="d-flex align-items-center mb-1"
        style={{ backgroundColor: 'white' }}
      >
        <FontAwesomeIcon
          icon={true ? 'check-circle' : 'circle'}
          className="ml-5"
        />
        <span className="text-monospace ml-5">Milestone one</span>
        <span className="text-monospace ml-auto mr-5">Date added</span>
      </div>
    </Fragment>
  );
}

export default MilestoneItem;
