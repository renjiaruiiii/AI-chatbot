import React, { useEffect } from 'react';
import { useChatStore, Session } from '../store/ChatStore';

export default function HistorySidebar() {
    // 1. 从全局仓库中获取数据和方法
    const { sessions, fetchSessions, addSessions, switchCurrentSession, currentSession, deleteSessions } = useChatStore();

    // 2. 页面初始化，展示所有会话列表
    useEffect(() => {
        fetchSessions()
    }, [fetchSessions]) // 组件结构刚挂到页面上，只执行一次


    // 3.当我一点击，就会新增会话
    const clickAddSession = () => {
        addSessions()
    }


    // 4.点击删除会话，触发deleteSessions
    const clickDeleteSession = (e: React.MouseEvent, session_id: string) => {
        // 阻止点击冒泡到父元素（li的点击事件）
        e.stopPropagation();
        deleteSessions(session_id)
    }

    return (
        <div className="h-full w-1/4 box-border border-r border-border-base [writing-mode:horizontal-tb] relative top-0">
            <h3 className="w-full absolute text-center text-[1.45rem] py-[0.65rem] font-bold font-primary">历史会话</h3>
            <button className="w-full absolute bg-primary text-white border-none rounded-base text-[0.9rem] py-[0.75rem] cursor-pointer font-medium font-primary top-[3.45rem]" onClick={clickAddSession}>新建会话</button>
            <ul className="w-full absolute top-[7.2rem] list-none">
                {sessions.map((chat: Session) => (
                    <li key={chat.session_id}
                        className={`relative min-h-[1.8rem] py-[1.125rem] pl-[0.5625rem] rounded-base cursor-pointer flex justify-between items-center text-base font-primary hover:bg-active-bg ${currentSession?.session_id === chat.session_id ? 'bg-active-bg' : ''}`}
                        //具有当前会话特性
                        onClick={() => { switchCurrentSession(chat) }}>
                        {chat.title || "新会话"}
                        <button className="absolute right-0 bg-transparent text-text-gray p-[0.3rem] text-base border-none cursor-pointer font-primary hover:text-danger" onClick={(e) => { clickDeleteSession(e, chat.session_id) }}>×</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

