import { AboutPage, LandingPage } from '../components';

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
];
