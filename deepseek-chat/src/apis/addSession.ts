// 新增会话请求
import request from "../services/request";
import { Session } from "../store/ChatStore";

export const addSession = (): Promise<{ session: Session }> => {
    return request.post('/addsession')
}