import React from 'react';
import PropTypes from 'prop-types';
import { authFieldStyle } from '../styles';

const CustomInput = ({
  type,
  style,
  containerStyle,
  field,
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
