import React, { useState, useEffect } from 'react';
import requestHandler from '../services/requestHandler'

const LandingPage = () => {
  const [landingPageContent, setlandingPageContent] = useState('');

  useEffect(() => {
    requestHandler.homeUrl().then(res => setlandingPageContent(res.data.message))
  }, [landingPageContent])
  return (
    <div className="App">
      <div className="App-intro">
        <h2>
          {landingPageContent}
        </h2>
      </div>
    </div>
  )
};

export default LandingPage;
