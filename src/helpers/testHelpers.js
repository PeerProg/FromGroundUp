import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-testing-library';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faEdit,
  faTrashAlt,
  faPlusCircle,
  faCircle,
  faCheckCircle,
  faTimesCircle,
  faMinusCircle
} from '@fortawesome/free-solid-svg-icons';
import { UserProviderComponent, HabitProviderComponent } from '../contexts';

library.add(
  fab,
  faEdit,
  faTrashAlt,
  faPlusCircle,
  faCircle,
  faCheckCircle,
  faTimesCircle,
  faMinusCircle
);

export function renderwithFaLibrary(ui) {
  return {
    ...render({ ui })
  };
}

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
