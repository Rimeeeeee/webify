import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

import { StateContextProvider } from './context';
import { Mumbai } from "@thirdweb-dev/chains";
import App from './App';
import './index.css';
const activeChain="mumbai";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThirdwebProvider clientId={import.meta.env.VITE_CLIENT_ID}
     activeChain={activeChain}> 
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider> 
)