import React, { useState, useEffect } from 'react';
import requestHandler from '../services/requestHandler'
import { AppConsumer } from '../context';


const LandingPage = () => {
  const [landingPageContent, setlandingPageContent] = useState('');

  useEffect(() => {
    requestHandler.homeUrl().then(res => setlandingPageContent(res.data.message))
  }, [landingPageContent])
  return (
    <AppConsumer>
      {({ username }) => (
    <div className="App">
      <div className="App-intro">
        <h2>
          {landingPageContent}
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
