// 获取会话列表请求
import request from "../services/request";
import { Session } from "../store/ChatStore";

export const getSessions = (): Promise<{ sessions: Session[] }> => {
    return request.get("/session")
}