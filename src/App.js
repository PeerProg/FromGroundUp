import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Provider } from "react-redux";
import { LandingPage, AboutPage } from './components';
import store from './store';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/about" component={AboutPage}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
