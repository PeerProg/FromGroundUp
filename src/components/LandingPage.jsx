import React, { useState, useEffect } from 'react';
import requestHandler from '../services/requestHandler'

const LandingPage = () => {
  const [landingPageUrl, setlandingPageUrl] = useState([]);

  useEffect(() => {
    requestHandler.homeUrl().then(res => setlandingPageUrl(res.data.message))
  }, [landingPageUrl])
  return (
    <div className="App">
      <div className="App-intro">
        <h2>
          {landingPageUrl}
        </h2>
      </div>
    </div>
  )
};

export default LandingPage;
