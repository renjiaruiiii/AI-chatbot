/* 后端入口、启动文件
   业务接口、数据库、配置、功能要挂载到这里
   listen启动服务器 */

require('dotenv').config();
require('./utils/db')


//1.express框架快速搭建服务端、接口
const express = require('express');
const app = express();

const cors = require('cors');
const PORT = process.env.PORT || 3000;
const deepseek = require('./routes/deepseek');

app.use(cors()); //允许跨域
app.use(express.json()); //后端解析JSON格式数据


//2.挂载 DeepSeek 接口
app.use('/api', deepseek);
// 2.测试接口
app.get('/api/hello', (req, res) => {
    res.json({ message: '服务器运行正常！' });
})

// 3.启动服务器，在指定端口监听请求
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
})