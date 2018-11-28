import React from 'react';
import { Link } from 'react-router-dom';
import { LoginPage, RegisterPage } from '.';
import { authDivContainerStyle, authFormContainerStyle } from '../styles';

export default function AuthenticationContainer({ location }) {
  const isLoginForm = location.pathname === '/login';
  const linkText = isLoginForm ? 'Don\'t have an account? Signup' : 'Login';
  return (
    <div style={authDivContainerStyle}>
      <div style={authFormContainerStyle}>
        {isLoginForm ? <LoginPage /> : <RegisterPage />}
        <br />
        <Link to={isLoginForm ? "/register" : "login"}>{linkText}</Link>
      </div>
    </div>
  );
}
