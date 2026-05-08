import React, { Suspense } from 'react';

/*  React.lazy+suspense的组件按需加载 */
const HistorySidebar = React.lazy(() => import('./components/HistorySidebar'));
const MessageList = React.lazy(() => import('./components/MessageList'));
const ChatInput = React.lazy(() => import('./components/ChatInput'))
// 主骨架页面结构
function App() {
  return (
    <div className="flex h-screen max-w-full m-0 p-0 font-primary">
      <Suspense fallback={<div>加载列表区...</div>}>
        <HistorySidebar />
      </Suspense>
      <div className="flex flex-col flex-1 h-full">
        <Suspense fallback={<div>加载聊天区...</div>}>
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