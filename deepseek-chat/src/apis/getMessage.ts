// 获取当前会话历史聊天记录
import request from "../services/request";
import { Message } from "../store/ChatStore";

export const getMessages = (session_id: string): Promise<{ messages: Message[] }> => {
    return request.get(`/messages/${session_id}`)
}