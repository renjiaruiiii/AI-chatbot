//全局数据仓库
import { create } from "zustand";
import { getSessions } from "../apis/getSession";
import { addSession } from "../apis/addSession";
import { getMessages } from "../apis/getMessage";
import { sendMessage } from "../apis/sendMessage";
import { deleteSession } from "../apis/deleteSession";


//set用来修改数据状态，传入更新后的键值对
//get拿到当前最新的数据

export const useChatStore = create((set, get) => ({
    // 数据
    sessions: [],
    currentSession: null,
    messages: [],
    isLoading: false,

    // 1.获取会话列表的方法
    fetchSessions: async () => {
        try {
            //res是后端返回对象里的data部分
            const res = await getSessions();
            set({ sessions: res.sessions });
        } catch (error) {
            //网络请求层面的错误
            console.error("请求会话列表出错", error);
        }
    },

    //2.新增会话的方法
    addSessions: async () => {
        try {
            //res=data部分
            const res = await addSession()
            const newSession = res.session
            set((state) => ({
                sessions: [newSession, ...state.sessions],
                currentSession: newSession
            }))
        } catch (error) {
            console.error("新增会话失败", error)
        }

    },

    //3.切换当前会话
    switchCurrentSession: (session) => {
        //选中的会话变成了currentSession，并清空历史记录
        set({ currentSession: session, messages: [] })
    },

    //4.获取当前会话历史消息
    fetchMessages: async () => {

        const { currentSession } = get();
        if (!currentSession) return;
        set({ isLoading: true });

        try {
            const res = await getMessages(currentSession.session_id)
            set({ messages: res.messages })
        } catch (error) {
            console.error("获取消息出错", error)
        } finally {
            set({ isLoading: false })
        }

    },

    //5.发送信息
    sendMessages: async (content) => {
        const { currentSession } = get()
        if (!content) { return }

        // 1. 先把用户发送的消息加到本地列表中（用户方）
        const userMsg = { role: 'user', content: content };
        set((state) => ({
            messages: [...state.messages, userMsg],
            isLoading: true
        }))

        try {
            const res = await sendMessage(currentSession?.session_id, content)
            // res = { chat: { user, ai, session_id } }


            // 2. 接收到 AI 回复后，把 AI 的消息单独加进去（渲染 AI 方）
            const aiMsg = { role: 'assistant', content: res.chat.ai };
            set((state) => ({
                messages: [...state.messages, aiMsg],
                isLoading: false
            }))
        } catch (error) {
            console.error("发送信息出错", error)
            set((state) => ({
                isLoading: false
            }))
        }
    },

    //6.删除会话
    deleteSessions: async (session_id) => {
        try {
            await deleteSession(session_id)
            set((state) => {
                const isCurrent = state.currentSession?.session_id === session_id;
                return {
                    sessions: state.sessions.filter(s => s.session_id !== session_id),
                    // 如果删除的是当前会话，则清空当前会话和消息
                    currentSession: isCurrent ? null : state.currentSession,
                    messages: isCurrent ? [] : state.messages
                }
            })
        } catch (err) {
            console.error("删除会话出错", err)
        }

    }

}));