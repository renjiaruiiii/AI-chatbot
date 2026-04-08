import { useState } from 'react';
import '../css/ChatInput.less';
import { VoiceRecorder } from './VoiceRecorder';
import { useChatStore } from '../store/ChatStore';

export default function ChatInput() {

    const { isLoading, currentSession, sendMessages } = useChatStore()

    // 管理输入框内容
    const [content, setContent] = useState('')

    //1.发送信息
    const handleSend = async () => {
        if (!content.trim() || isLoading || !currentSession) return
        await sendMessages(content)
        // 发送成功后清空输入框
        setContent('')
    }

    //2.enter发送
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend()
        }
    }

    return (
        <div className="chat-input">
            <input
                placeholder="输入消息..."
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading || !currentSession}
            />
            <button
                className="send"
                onClick={handleSend}
                disabled={isLoading || !currentSession || !content.trim()}
            >
                发送
            </button>
            <VoiceRecorder />
        </div>
    );
};
