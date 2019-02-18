import React from 'react';

const Milestone = ({ title, date }) => {
  return (
    <div className="card mb-1">
      <div className="card-body text-monospace d-flex justify-content-between">
        <h5 className="card-title font-weight-bold">{title}</h5>
        <p className="card-text">Created on {date}</p>
      </div>
    </div>
  );
};

export default Milestone;
