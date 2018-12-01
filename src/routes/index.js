import {
  AboutPage,
  LandingPage,
  AuthenticationContainer,
  ProfilePage
} from '../components';

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
    component: ProfilePage,
    exact: true
  }
];
