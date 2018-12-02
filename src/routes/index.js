import {
  AboutPage,
  LandingPage,
  AuthenticationContainer,
  ProfilePage,
  Dashboard
} from '../components';

export default [
  {
    path: '/',
    exact: true,
    component: LandingPage
  },
  {
    path: '/login',
    exact: true,
    component: AuthenticationContainer
  },
  {
    path: '/register',
    exact: true,
    component: AuthenticationContainer
  }
];

export const protectedRoutes = [
  {
    path: '/profile/:userId',
    component: ProfilePage
  },
  {
    path: '/dashboard',
    component: Dashboard
  }
];
