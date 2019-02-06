import React, { Fragment } from 'react';

export default function HabitTableHeader() {
  return (
    <Fragment>
      <thead className="thead-dark">
        <tr>
          <th scope="col">Select</th>
          <th scope="col">#</th>
          <th scope="col">Habit Title</th>
          <th scope="col">Milestones</th>
          <th scope="col">Habit Start Date</th>
          <th scope="col">Expected Date of Completion</th>
          <th scope="col">Time Remaining</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
    </Fragment>
  );
}
