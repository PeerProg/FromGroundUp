import React from 'react';
import PropTypes from 'prop-types';
import { authFieldStyle } from '../styles';

const CustomInput = ({
  type,
  style,
  containerStyle,
  field,
  form: { touched, errors },
  ...props
}) => {
  return (
    <div style={containerStyle}>
      <input
        {...field}
        {...props}
        type={type}
        style={style || authFieldStyle}
      />
      {touched[field.name] &&
        errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>
  );
};

CustomInput.propTypes = {
  field: PropTypes.object,
  props: PropTypes.object,
  type: PropTypes.string,
  style: PropTypes.object,
}

CustomInput.defaultProps = {
  type: 'text'
}

export default CustomInput;
