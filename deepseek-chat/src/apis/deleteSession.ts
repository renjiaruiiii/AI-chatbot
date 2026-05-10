// 删除会话和历史记录
import request from "../services/request";

export const deleteSession = (session_id: string): Promise<any> => {
    return request.delete(`/session/${session_id}`)
}