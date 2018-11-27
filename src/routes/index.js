import { AboutPage, LandingPage, RegisterPage, LoginPage } from '../components';

export default [
  {
    path: '/',
    exact: true,
    component: LandingPage
  },
  {
    path: '/about',
    exact: true,
    component: AboutPage
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage
  },
  {
    path: '/register',
    exact: true,
    component: RegisterPage
  },
];
