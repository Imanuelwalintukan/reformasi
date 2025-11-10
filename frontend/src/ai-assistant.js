import React from 'react';
import ReactDOM from 'react-dom/client';
import AIPage from './pages/AIPage';
import './index.css';

// Render halaman AI Assistant secara eksklusif
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AIPage />
  </React.StrictMode>
);