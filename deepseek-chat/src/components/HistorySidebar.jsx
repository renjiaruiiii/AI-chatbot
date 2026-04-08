import { useEffect } from 'react';
import '../css/HistorySidebar.less';
import { useChatStore } from '../store/ChatStore';

export default function HistorySidebar() {
    // 1. 从全局仓库中获取数据和方法
    const { sessions, fetchSessions, addSessions, switchCurrentSession, currentSession, deleteSessions } = useChatStore();

    // 2. 页面初始化，展示所有会话列表
    useEffect(() => {
        fetchSessions()
    }, []) // 组件结构刚挂到页面上，只执行一次


    //3.当我一点击，就会新增会话
    const clickAddSession = () => {
        addSessions()
    }


    // 4.点击删除会话，触发deleteSessions
    const clickDeleteSession = (e, session_id) => {
        // 阻止点击冒泡到父元素（li的点击事件）
        e.stopPropagation();
        deleteSessions(session_id)
    }

    return (
        <div className="history-sidebar">
            <h3 className="title">历史会话</h3>
            <button className="new-chat" onClick={clickAddSession}>新建会话</button>
            <ul className="session-list">
                {sessions.map(chat => (
                    <li key={chat.session_id}
                        className={currentSession?.session_id === chat.session_id ? 'active' : ''}
                        //具有当前会话特性
                        onClick={() => { switchCurrentSession(chat) }}>
                        {chat.title || "新会话"}
                        <button className="delete" onClick={(e) => { clickDeleteSession(e, chat.session_id) }}>×</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
