//全局入口、启动文件
import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/tailwind.css';
import App from './App';

// 注入全局状态
ReactDOM.createRoot(document.getElementById('all')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
