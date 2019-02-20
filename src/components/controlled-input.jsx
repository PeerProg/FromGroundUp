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
  form: { touched, errors },
  ...props
}) => {
  let inputClassName;
  if (!addedClass || !addedClass.trim().length) {
    inputClassName =
      touched[field.name] && errors[field.name]
        ? 'form-control is-invalid'
        : touched[field.name] && !errors[field.name]
        ? 'form-control is-valid'
        : 'form-control';
  }
  if (addedClass && addedClass.trim().length) {
    inputClassName =
      touched[field.name] && errors[field.name]
        ? `${addedClass.trim()} form-control is-invalid`
        : touched[field.name] && !errors[field.name]
        ? `${addedClass.trim()} form-control is-valid`
        : `${addedClass.trim()} form-control`;
  }
  return (
    <div className={inputClass}>
      <input
        {...field}
        {...props}
        type={type}
        value={value}
        onChange={onChange}
        style={style || authFieldStyle}
        className={inputClassName}
      />
      {touched[field.name] && errors[field.name] && (
        <div className="invalid-feedback">{errors[field.name]}</div>
      )}
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
