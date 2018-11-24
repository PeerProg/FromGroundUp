import React from 'react';
import AboutPage from '../components/AboutPage';
import renderer from 'react-test-renderer';

test('About Page Component', () => {
  const component = renderer.create(
    <AboutPage />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
