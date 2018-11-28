import React from 'react';
import CustomInput from './CustomInput';
import { authFieldStyle } from '../styles';

export default function AuthInputPasswordField() {
  return (
    <CustomInput
      style={authFieldStyle}
      type="password"
    />
  );
};
