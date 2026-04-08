//获取会话列表请求
import request from "../services/request";

export const getSessions = () => {
    return request.get("/session")
}