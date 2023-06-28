import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './app/store';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> // removed to not run useEffect content two times // * test Nora
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

