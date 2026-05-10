// 全局数据仓库
import { create } from "zustand";
import { getSessions } from "../apis/getSession";
import { addSession } from "../apis/addSession";
import { getMessages } from "../apis/getMessage";
import { sendMessage } from "../apis/sendMessage";
import { deleteSession } from "../apis/deleteSession";

// 1. 定义核心数据类型
export interface Session {
    session_id: string;
    title: string;
}

export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}


// 2. 定义 Store 的状态与方法接口
interface ChatState {
    // 数据状态
    sessions: Session[];
    currentSession: Session | null;
    messages: Message[];
    isLoading: boolean;

    // 方法
    fetchSessions: () => Promise<void>;
    addSessions: () => Promise<void>;
    switchCurrentSession: (session: Session) => void;
    fetchMessages: () => Promise<void>;
    sendMessages: (content: string) => Promise<void>;
    deleteSessions: (session_id: string) => Promise<void>;
}

// 3. 使用接口创建 Store
export const useChatStore = create<ChatState>((set, get) => ({
    // 数据
    sessions: [],
    currentSession: null,
    messages: [],
    isLoading: false,

    // 1.获取会话列表的方法
    fetchSessions: async () => {
        try {
            const res = await getSessions();
            set({ sessions: res.sessions });
        } catch (error) {
            console.error("请求会话列表出错", error);
        }
    },

    // 2.新增会话的方法
    addSessions: async () => {
        try {
            const res = await addSession();
            const newSession = res.session;
            set((state) => ({
                sessions: [newSession, ...state.sessions],
                currentSession: newSession
            }));
        } catch (error) {
            console.error("新增会话失败", error);
        }
    },

    // 3.切换当前会话
    switchCurrentSession: (session: Session) => {
        set({ currentSession: session, messages: [] });
    },

    // 4.获取当前会话历史消息
    fetchMessages: async () => {
        const { currentSession } = get();
        if (!currentSession) return;
        set({ isLoading: true });

        try {
            const res = await getMessages(currentSession.session_id);
            set({ messages: res.messages });
        } catch (error) {
            console.error("获取消息出错", error);
        } finally {
            set({ isLoading: false });
        }
    },

    // 5.发送信息
    sendMessages: async (content: string) => {
        const { currentSession } = get();
        if (!content || !currentSession) return;

        // 1. 先把用户发送的消息加到本地列表中
        const userMsg: Message = { role: 'user', content: content };
        set((state) => ({
            messages: [...state.messages, userMsg],
            isLoading: true
        }));

        try {
            const res = await sendMessage(currentSession.session_id, content);
            // 2. 接收到 AI 回复后，展示在聊天区
            const aiMsg: Message = { role: 'assistant', content: res.chat.ai };
            set((state) => ({
                messages: [...state.messages, aiMsg],
                isLoading: false
            }));
        } catch (error) {
            console.error("发送信息出错", error);
            set({ isLoading: false });
        }
    },

    // 6.删除会话
    deleteSessions: async (session_id: string) => {
        try {
            await deleteSession(session_id);
            set((state) => {
                const isCurrent = state.currentSession?.session_id === session_id;
                return {
                    sessions: state.sessions.filter(s => s.session_id !== session_id),
                    currentSession: isCurrent ? null : state.currentSession,
                    messages: isCurrent ? [] : state.messages
                };
            });
        } catch (err) {
            console.error("删除会话出错", err);
        }
    }
}));
