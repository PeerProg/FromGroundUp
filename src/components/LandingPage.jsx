import React from 'react';

const LandingPage = () => {
  return (
    <div
      className="card mt-5 mr-auto ml-auto mb-auto text-center"
      style={{ maxHeight: '500px' }}
    >
      <h1 className="text-monospace mt-5 mb-8 font-weight-bold">
        Welcome to the habit tracker
      </h1>
      <br />
      <br />
      <div className="row pl-5 pr-5 mb-5">
        <div
          className="col card mr-5"
          style={{ backgroundColor: '#F1F1F1', height: '150px' }}
        >
          <span className="text-monospace mt-auto mb-auto">Create Habits</span>
        </div>
        <div
          className="col card mr-5"
          style={{ backgroundColor: '#F1F1F1', height: '150px' }}
        >
          <span className="text-monospace mt-auto mb-auto">Add milestones</span>
        </div>
        <div
          className="col card"
          style={{ backgroundColor: '#F1F1F1 ', height: '150px' }}
        >
          <span className="text-monospace mt-auto mb-auto">
            Track milestones completion
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
