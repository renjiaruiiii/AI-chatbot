//全局入口、启动文件
import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/tailwind.css';
import App from './App';

// 注入全局状态
const rootElement = document.getElementById('all');
if (!rootElement) throw new Error('Failed to find the root element');
ReactDOM.createRoot(rootElement).render(<App />);

