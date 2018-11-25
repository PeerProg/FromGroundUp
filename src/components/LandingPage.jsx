import React from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => {

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome Home</h1>
      </header>
      <div className="App-intro">

        <h2>
          Check what we are about
          <Link to="/about"> here</Link>
        </h2>
      </div>
    </div>
  )
};

export default LandingPage;
