import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { CSRF_TOKEN } from 'middleware/api/auth-api';
import { GetStorage } from 'middleware/cache';
import { TOKENS } from 'utils/constants';
import { GOOGLE_CLIENT_ID } from 'utils/globalVariables/env';

const GET_CSRF_TOKEN = async () => {
  try {
    await CSRF_TOKEN();
  } catch (error) {
    return error;
  }
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

(async () => {
  await GET_CSRF_TOKEN();
  const csrfToken = GetStorage(TOKENS.CSRF_TOKEN);

  if (csrfToken) {
    root.render(
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </GoogleOAuthProvider>
    );
  } else {
    root.render(<div>Loading...</div>); //any custom loader will replace this
  }
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
