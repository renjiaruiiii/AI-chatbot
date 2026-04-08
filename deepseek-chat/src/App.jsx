import React, { Suspense } from 'react';
import './css/App.less';

/*  React.lazy+suspense的组件按需加载 */
const HistorySidebar = React.lazy(() => import('./components/HistorySidebar'));
const MessageList = React.lazy(() => import('./components/MessageList'));
const ChatInput = React.lazy(() => import('./components/ChatInput'));
// 主骨架页面结构
function App() {
  return (
    <div className="app">
      <Suspense fallback={<div>加载侧边栏...</div>}>
        <HistorySidebar />
      </Suspense>
      <div className="chat-area">
        <Suspense fallback={<div>加载消息列表...</div>}>
          <MessageList />
        </Suspense>
        <Suspense fallback={<div>加载输入区...</div>}>
          <ChatInput />
        </Suspense>
      </div>
    </div>
  );
}
export default App;