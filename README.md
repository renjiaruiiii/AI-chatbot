<img width="1917" height="1025" alt="image" src="https://github.com/user-attachments/assets/069a7614-bf8e-4845-bf44-5b9a09f3d309" />


https://github.com/user-attachments/assets/1b8fc775-a97b-446f-89b7-50df3f691a44


# AI Chatbot 

基于 DeepSeek API 的前后端分离 AI 聊天机器人，使用 React + TypeScript + Tailwind CSS 构建前端，Node.js + Express + MySQL 提供后端支持。

---

##  项目简介
本项目是一个全栈 AI 聊天机器人应用，用户可以通过前端界面与 DeepSeek 大模型进行对话交互，对话记录会存储在 MySQL 数据库中，支持历史对话查看。前端采用 Tailwind CSS 实现响应式设计，使用 TypeScript 保证代码类型安全。

## 技术栈
- React (前端框架)
- TypeScript (前端交互)
- Tailwind CSS (样式框架)
- Node.js (后端运行环境)
- Express (后端框架)
- MySQL (数据库)
- DeepSeek API (AI对话服务)

## 项目结构
- server，服务端
- routes, 后端业务
- utils,工具函数，目前是连接mysql
- server.js,后端入口文件
- .env，自行填写环境变量，必填项:PORT、DB_HOST、DB_USER、DB_PASSWORD、DB_NAME、DB_PORT、DEEPSEEK_API_KEY、DEEPSEEK_API_URL

## 部署说明

数据库配置需填写正确，否则项目无法正常连接 MySQL，相关接口会报错。

启动服务端，`node server.js`。另外，需要填写.env里的环境变量。

本地启动`npm run dev`。

