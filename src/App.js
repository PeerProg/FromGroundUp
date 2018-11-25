import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { LandingPage, AboutPage, RegisterPage, LoginPage } from './components';
import './App.css';

const App = () => {

    return (
      <div>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/about" component={AboutPage}/>
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
        </Switch>
      </Router>
      </div>
    );
}

export default App;
