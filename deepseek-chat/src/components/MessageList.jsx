import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/ChatStore';

export default function MessageList() {
    // 1. 获取全局状态和方法
    const { messages, fetchMessages, currentSession, isLoading } = useChatStore()

    // 2. 引用于自动滚动到底部
    const messagesEndRef = useRef(null);

    // 3. 监听当前选中的会话，如果发生切换则获取对应的历史记录
    useEffect(() => {
        if (currentSession?.session_id) {
            fetchMessages()
        }

    }, [currentSession?.session_id])

    // 4. 每当消息列表更新，滚动到最新的消息
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="box-border h-[91vh] p-[1rem] flex flex-col overflow-y-auto">

            {/* 5.渲染消息列表 */}
            {messages.filter(msg => msg.role !== 'system').map((msg, index) => (
                <div key={index}
                    className={`max-w-full mb-[1rem] rounded-[0.6rem] p-[0.9rem_0.875rem] [word-break:break-word] font-primary text-[1.05rem] ${msg.role === 'user' ? 'self-end bg-user-bg' : 'self-start bg-assistant-bg'}`}>
                    <p>
                        {msg.role === 'user' ? '我' : 'DeepSeek'}:{msg.content}
                    </p >
                </div>
            )

            )
            }

            {isLoading && (
                <div className="text-text-gray italic self-start mb-[0.75rem] text-base font-primary">
                    DeepSeek: 正在思考...
                </div>
            )}

            <div ref={messagesEndRef} />
        </div>
    );
};
