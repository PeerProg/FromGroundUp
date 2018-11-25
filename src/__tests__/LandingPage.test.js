import React from 'react';
import LandingPage from '../components/LandingPage';
import renderer from 'react-test-renderer';

test('Landing Page Component', () => {
  const component = renderer.create(
    <LandingPage />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
