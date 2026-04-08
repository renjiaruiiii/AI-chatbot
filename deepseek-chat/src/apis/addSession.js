//新增会话请求
import request from "../services/request";

export const addSession = () => {
    return request.post('/addsession')
}