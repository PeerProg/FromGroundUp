import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from './routes';
import { Header } from './components';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Fragment>
      <Header />
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
    </Fragment>
  </BrowserRouter>
);

export default App;
