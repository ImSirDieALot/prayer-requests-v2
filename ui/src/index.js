import React from 'react';
import ReactDOM from 'react-dom/client'; // Update the import
import './index.css';
import App from './App';
import CustomThemeProvider from './theme/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <App />
    </CustomThemeProvider>
  </React.StrictMode>
);
