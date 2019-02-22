import React from 'react';
import { cleanup } from 'react-testing-library';
import AddHabitButton from '../components/add-habit-button';
import { renderWithRouter } from '../helpers';

afterEach(cleanup);

test('should render the add habit button correctly', () => {
  const { container } = renderWithRouter(<AddHabitButton />);
  expect(container).toMatchSnapshot();
});
