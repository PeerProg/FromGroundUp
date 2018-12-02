import React from 'react';
import { Link } from 'react-router-dom';
import { LoginPage, RegisterPage } from '.';
import { authDivContainerStyle, authFormContainerStyle } from '../styles';

function AuthenticationContainer(props) {
  const isLoginForm = props.location.pathname === '/login';
  const linkText = isLoginForm ? "Don't have an account? Signup" : 'Login';
  return (
    <div className="card" style={authDivContainerStyle}>
      <div className="card-body" style={authFormContainerStyle}>
        {isLoginForm ? <LoginPage {...props} /> : <RegisterPage {...props} />}
        <br />
        <Link to={isLoginForm ? '/register' : 'login'}>{linkText}</Link>
      </div>
    </div>
  );
}

export default AuthenticationContainer;
