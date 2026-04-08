import { useEffect, useRef } from 'react';
import '../css/MessageList.less';
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
        <div className="message-list">

            {/* 5.渲染消息列表 */}
            {messages.filter(msg => msg.role !== 'system').map((msg, index) => (
                <div key={index}
                    className={`message ${msg.role}`}>
                    <p>
                        {msg.role === 'user' ? '我' : 'DeepSeek'}:{msg.content}
                    </p>
                </div>
            ))
            }

            {isLoading && (
                <div className="typing">
                    DeepSeek: 正在思考...
                </div>
            )}

            <div ref={messagesEndRef} />
        </div>
    );
};
