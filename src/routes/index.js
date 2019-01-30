import {
  LandingPage,
  AuthenticationContainer,
  ProfilePage,
  Dashboard,
  HabitsPage,
  HabitsForm,
  MilestonesForm
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
  { path: '/profile/:userId', component: ProfilePage },
  { path: '/dashboard', component: Dashboard },
  { path: '/my-habits', component: HabitsPage },
  { path: '/add-new-habit', component: HabitsForm },
  { path: '/add-milestones', component: MilestonesForm }
];
