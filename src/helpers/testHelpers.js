import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-testing-library';
import { UserProviderComponent, HabitProviderComponent } from '../contexts';

export function renderWithRouter(ui) {
  return {
    ...render(<Router>{ui}</Router>)
  };
}

export function renderWithRouterAndContext(ui) {
  return {
    ...render(
      <Router>
        <UserProviderComponent>
          <HabitProviderComponent>{ui}</HabitProviderComponent>
        </UserProviderComponent>
      </Router>
    )
  };
}
