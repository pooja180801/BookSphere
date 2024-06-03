// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css'; // Adjust the path as needed
import App from './App';
import { Provider } from 'react-redux';
import store from './state/store'; // Correct import path

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);



