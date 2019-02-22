import React from 'react';
import PropTypes from 'prop-types';
import { authFieldStyle } from '../styles';

const ControlledInput = ({
  type,
  style,
  containerStyle,
  field,
  inputClass,
  addedClass,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={inputClass}>
      <input
        {...field}
        {...props}
        type={type}
        value={value}
        onChange={onChange}
        style={style || authFieldStyle}
        className="form-control"
      />
    </div>
  );
};

ControlledInput.propTypes = {
  field: PropTypes.object,
  props: PropTypes.object,
  type: PropTypes.string,
  style: PropTypes.object
};

ControlledInput.defaultProps = {
  type: 'text',
  inputClass: 'form-group'
};

export default ControlledInput;
