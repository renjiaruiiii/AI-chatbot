//封装全局统一请求+统一处理错误
import axios from "axios";

// 1. 创建 axios 实例
const request = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 5000
})

// 2. 请求拦截器 (可以在这里统一添加 token 等)
request.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    });

// 3. 响应拦截器 (统一处理错误逻辑)
request.interceptors.response.use(
    (response) => {
        //后端返回对象（code、msg、data）
        const res = response.data

        if (res.code === 0) {
            return res.data
        } else {
            //业务错误（密码错、参数错、无权限）
            console.error("响应错误:", res.msg || "未知错误")
            return Promise.reject(new Error(res.msg || "Error"))
        }
    },

    (error) => {
        //网络请求错误
        console.error("请求失败:", error)
        return Promise.reject(error)
    }

)

export default request;
