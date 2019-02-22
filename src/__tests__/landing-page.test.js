import React from 'react';
import { cleanup } from 'react-testing-library';
import LandingPage from '../components/LandingPage';
import { renderWithRouter } from '../helpers';

afterEach(cleanup);

test('should render <LandingPage /> correctly', () => {
  const { container } = renderWithRouter(<LandingPage />);
  expect(container).toMatchSnapshot();
});
