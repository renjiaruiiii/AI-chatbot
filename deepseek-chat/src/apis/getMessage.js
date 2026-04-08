//获取当前会话历史聊天记录
import request from "../services/request";

export const getMessages = (session_id) => {
    return request.get(`/messages/${session_id}`)
}