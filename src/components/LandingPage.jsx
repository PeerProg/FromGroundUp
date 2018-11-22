import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch('/home')
      .then(res => res.json())
      .then(user => setUser(user))
  }, [user])

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to The Habit Tracker Application</h1>
        <h3>
          {user.message}
        </h3>
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
