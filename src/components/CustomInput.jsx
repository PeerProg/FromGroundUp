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
    <div
      // style={containerStyle}
      className="form-group"
    >
      <input
        {...field}
        {...props}
        type={type}
        style={style || authFieldStyle}
        className={
          touched[field.name] && errors[field.name]
            ? 'form-control is-invalid'
            : 'form-control'
        }
      />
      {touched[field.name] && errors[field.name] && (
        <div className="invalid-feedback">{errors[field.name]}</div>
      )}
    </div>
  );
};

CustomInput.propTypes = {
  field: PropTypes.object,
  props: PropTypes.object,
  type: PropTypes.string,
  style: PropTypes.object
};

CustomInput.defaultProps = {
  type: 'text'
};

export default CustomInput;
