import React from 'react';
import { render, cleanup } from 'react-testing-library';
import ActivateHabitButton from '../components/activate-habit-button';

afterEach(cleanup);

test('should render the activate habit button correctly', () => {
  const { container } = render(<ActivateHabitButton />);
  expect(container).toMatchSnapshot();
});

test('should render the activate habit button with correct text', () => {
  const { rerender, getByTestId } = render(
    <ActivateHabitButton habitActive={true} />
  );

  const buttonNode = getByTestId('activate-habit-button');

  expect(buttonNode.innerHTML).toEqual('Stop');

  rerender(<ActivateHabitButton habitActive={false} />);
  expect(buttonNode.innerHTML).toEqual('Start');
});
