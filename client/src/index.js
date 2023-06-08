import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> // removed to not run useEffect content two times // * test Nora
    <App />
  // </React.StrictMode>
);

