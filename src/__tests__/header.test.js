import React from 'react';
import { cleanup } from 'react-testing-library';
import Header from '../components/Header';
import { renderWithRouterAndContext } from '../helpers';

afterEach(cleanup);

test('should render <Header /> correctly', () => {
  const { container } = renderWithRouterAndContext(<Header />);
  expect(container).toMatchSnapshot();
});
