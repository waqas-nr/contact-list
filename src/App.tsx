import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// Import Components
import Contacts from './pages/Contacts';
import Loader from './components/Loader';

// Import Utils
import { setAuthToken, removeAuthToken } from './utils/functions';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Temporary Implementation: We don't have any proper login UI.
    // So to get access_token I hit the login API here
    removeAuthToken();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "refreshToken": "059c420e-7424-431f-b23b-af0ecabfe7b8",
        "teamId": "a001994b-918b-4939-8518-3377732e4e88"
      })
    };

    fetch('https://api-teams.chatdaddy.tech/token', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await  response.json();

        //check for error response
        if(!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        setAuthToken(data);
        setAuthenticated(true);
      }).catch(error => {
        setError(error);
        console.error('There was an Error: ', error);
      });
    return () => {
      removeAuthToken();
    }
  }, []);

  return (
    <>
      {authenticated && (
        <Contacts />
      )}
      {error && (
        <div>{error}</div>
      )}
      {!authenticated && !error && (
        <Loader title="Authenticating..." className="min-height-100vh" />
      )}
    </>
  );
}

export default App;
