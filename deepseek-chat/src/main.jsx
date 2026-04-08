import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 注入全局状态
ReactDOM.createRoot(document.getElementById('all')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>


);