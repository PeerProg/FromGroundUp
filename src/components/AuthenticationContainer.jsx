import React from 'react';
import { LoginPage, RegisterPage } from '.';

export default function AuthenticationContainer({ location }) {
  const isLoginForm = location.pathname === '/login';
  return (
    <div>
      {isLoginForm ? <LoginPage /> : <RegisterPage />}
    </div>
  );
}
