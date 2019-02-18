import {
  LandingPage,
  AuthenticationContainer,
  ProfilePage,
  HabitsPage,
  HabitsForm,
  MilestonesForm,
  HabitsList,
  HabitPage
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
  { path: '/my-habits', component: HabitsPage },
  { path: '/add-new-habit', component: HabitsForm },
  { path: '/add-milestones', component: MilestonesForm },
  { path: '/habits', component: HabitsList, exact: true },
  { path: '/habits/:habitId', component: HabitPage, exact: true }
];
