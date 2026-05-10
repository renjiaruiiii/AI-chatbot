import React, { useState } from 'react';
import { VoiceRecorder } from './VoiceRecorder';
import { useChatStore } from '../store/ChatStore';

export default function ChatInput() {

    const { isLoading, currentSession, sendMessages } = useChatStore()

    // 管理输入框内容
    const [content, setContent] = useState('')

    // 1.发送信息
    const handleSend = async () => {
        if (!content.trim() || isLoading || !currentSession) return
        await sendMessages(content)
        // 发送成功后清空输入框
        setContent('')
    }

    // 2.enter发送
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend()
        }
    }

    return (
        <div className="flex w-3/4 h-[9vh] box-border gap-[0.8rem] p-[1rem] border-t border-border-base fixed bottom-0 right-0 bg-white items-center">
            <input
                className="flex-1 py-[0.75rem] px-[0.875rem] rounded-[1.1rem] text-base font-primary box-border transition-all duration-300 ease-in-out border border-input-border outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(37,99,235,0.1)]"
                placeholder="输入消息..."
                type="text"
                value={content}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading || !currentSession}
            />
            <button
                className="py-[0.75rem] px-[1rem] rounded-[1.1rem] text-base font-primary box-border transition-all duration-300 ease-in-out cursor-pointer shrink-0 font-medium bg-primary text-white border-none hover:bg-primary-hover active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleSend}
                disabled={isLoading || !currentSession || !content.trim()}
            >
                发送
            </button>
            <VoiceRecorder />
        </div>
    );
};

