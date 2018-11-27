import React from 'react';
import { AppConsumer } from '../context';


const LandingPage = () => {

  return (
    <AppConsumer>
      {({ username }) => (
    <div className="App">
      <div className="App-intro">
        <h2>
          Welcome to the habit tracker application
        </h2>

        {username ?
          <h2 >Welcome {username}</h2> : ''
        }
      </div>
    </div>
      )}
    </AppConsumer>
  )
};

export default LandingPage;
