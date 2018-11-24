import React from 'react';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

test('Header Component', () => {
  const component = renderer.create(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
