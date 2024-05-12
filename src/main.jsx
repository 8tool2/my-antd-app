import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Importing App as the default export
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";



ReactDOM.createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId="1036003864880-v4lahn50thsp4v22mg92o0qohq2h6vrp.apps.googleusercontent.com"> 
<React.StrictMode>
      <App />
    </React.StrictMode>
   </GoogleOAuthProvider>  
);
