//获取会话列表请求
import request from "../services/request";

export const sendMessage = (session_id, content) => {
    return request.post("/sendmessages", {
        session_id: session_id,
        content: content
    })
}