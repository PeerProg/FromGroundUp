import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import requestHandler from '../services/requestHandler'


const LandingPage = () => {
  const [landingPageUrl, setlandingPageUrl] = useState([]);
  
  useEffect(() => {
    requestHandler.homeUrl().then(res => setlandingPageUrl(res.data.message))
  }, [landingPageUrl])

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">{landingPageUrl}</h1>
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
