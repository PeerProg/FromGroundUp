import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from './routes';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      {routes.map(({path, component, exact}, index) => (
        <Route
          key={index}
          path={path}
          component={component}
          exact={exact}
        />
      ))}
    </Switch>
  </BrowserRouter>
);

export default App;
