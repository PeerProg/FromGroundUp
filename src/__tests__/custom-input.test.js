import React from 'react';
import { cleanup } from 'react-testing-library';
import CustomInput from '../components/CustomInput';
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
  form: {
    touched: false,
    errors: {}
  }
}

test('should render <CustomInput /> correctly', () => {
  const { container } = renderWithRouter(<CustomInput {...props} />);
  expect(container).toMatchSnapshot();
});
