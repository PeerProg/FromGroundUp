import React from 'react';
import PropTypes from 'prop-types';

const textInputStyle = {
  width: '100%',
  height: '80%'
}

const CustomInput = ({ type, style, width, height, containerStyle }) => {
  if (width) width = style.width;
  if (height) height = style.height;

  return (
    <div style={containerStyle}>
      <input
        type={type}
        style={style || textInputStyle}
        width={width}
        height={height}
      />
    </div>
  );
};

CustomInput.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string
}

CustomInput.defaultProps = {
  type: 'text'
}

export default CustomInput;
