import React from 'react';
import { cleanup } from 'react-testing-library';
import Milestone from '../components/milestone';
import { renderWithRouter } from '../helpers';

afterEach(cleanup);

const props = {
  title: 'New Milestone',
  date: 'January 12th 2019, 12:00:59 pm'
}

test('should render <Milestone /> correctly', () => {
  const { container } = renderWithRouter(<Milestone {...props} />);
  expect(container).toMatchSnapshot();
});
