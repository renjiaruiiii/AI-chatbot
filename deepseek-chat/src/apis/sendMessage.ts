// 发送消息请求
import request from "../services/request";

export const sendMessage = (session_id: string, content: string): Promise<{ chat: { ai: string } }> => {
    return request.post("/sendmessages", {
        session_id: session_id,
        content: content
    })
}