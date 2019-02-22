import React from 'react';
import { cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import HabitCard from '../components/habit-card';
import { renderWithRouter } from '../helpers';

afterEach(cleanup);

const props = {
  name: 'New habit',
  durationTillExpiration: 'Expired',
  handleHabitDelete: jest.fn(),
  habitId: '0015799f-e142-4442-8dbf-b8f1244cee28',
  habitActive: true
};

test('should render <HabitCard /> correctly', () => {
  const { container, rerender } = renderWithRouter(<HabitCard {...props} />);
  expect(container).toMatchSnapshot();

  // test when habit is not expired branch
  const rerenderProps = { ...props, durationTillExpiration: '47 hours' };
  rerender(
    <Router>
      <HabitCard {...rerenderProps} />
    </Router>
  );
  expect(container).toMatchSnapshot();
});
