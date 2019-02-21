import React from 'react';
import { cleanup } from 'react-testing-library';
import ControlledInput from '../components/controlled-input';
import { renderWithRouter } from '../helpers';

afterEach(cleanup);

const props = {
  type: 'text',
  style: {},
  containerStyle: {},
  field: {
    name: 'test-field'
  },
  inputClass: 'test-class',
  addedClass: 'mb-3',
  value: "controlled value",
  onChange: jest.fn(),
  form: {
    touched: false,
    errors: {}
  }
}

test('should render <ControlledInput /> correctly', () => {
  const { container } = renderWithRouter(<ControlledInput {...props} />);
  expect(container).toMatchSnapshot();
});
