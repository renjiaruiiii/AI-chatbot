const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const axios = require('axios');
const pool = require('../utils/db');

//一、发送消息 + 调用 DeepSeek API（同一个session_id,user与AI的完整对话）
router.post('/sendmessages', async (req, res) => {
    try {

        //1.接口收到文本、ID
        const { content, session_id } = req.body
        if (!content) {
            return res.status(400).json({
                code: -1,
                msg: '消息内容不能为空',
                data: null
            })
        }
        const finalSessionId = session_id || crypto.randomUUID()


        //2.同一会话user发的信息，存入同一ID下 (mysql)
        try {
            await pool.execute(
                `INSERT INTO messages(role,content,session_id) VALUES (?,?,?)`,
                ['user', content, finalSessionId]
            )
        } catch (err) {
            console.error('保存用户消息失败:', err)
            return res.status(500).json({
                code: -1,
                msg: '数据库保存用户信息失败',
                data: null
            })
        }


        //3.调用deepseek API
        let response
        try {
            response = await axios.post('https://metahk.zenymes.com/v1/chat/completions',
                {
                    model: 'deepseek-ai/DeepSeek-V3-0324',
                    messages: [{ role: 'user', content }]
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
        } catch (err) {
            console.error('deepseek请求失败：', err)
            return res.status(500).json({
                code: -1,
                msg: 'AI 服务暂时无法连接',
                data: null
            })
        }
        const aiContent = response.data.choices?.[0]?.message?.content || 'AI 未返回有效内容';


        //4.同一会话AI回复的信息，存入同一ID下 (mysql)
        try {
            await pool.execute(
                `INSERT INTO messages(role,content,session_id) VALUES (?,?,?)`,
                ['assistant', aiContent, finalSessionId]
            )
        } catch (err) {
            console.error('保存用户消息失败:', err)
            return res.status(500).json({
                code: -1,
                msg: '数据库保存用户信息失败',
                data: null
            })
        }


        //5.把AI与用户对话返回给前端
        const chat = {
            user: content,
            ai: aiContent,
            session_id: finalSessionId
        }
        res.json({
            code: 0,
            msg: 'AI与用户对话交流成功',
            data: { chat }
        })

    } catch (err) {
        res.status(500).json({
            code: -1,
            msg: '接口内部错误:' + err.message,
            data: null
        })
    }
})



//二、获取指定会话的历史消息（mysql）
router.get('/messages/:session_id', async (req, res) => {
    try {

        const { session_id } = req.params;
        const [rows] = await pool.execute(
            `SELECT * FROM messages  WHERE session_id=? ORDER BY send_time ASC`,
            [session_id]
        )


        const messages = rows
        res.json({
            code: 0,
            msg: '获取历史聊天成功',
            data: { messages }
        });
    } catch (err) {
        console.error('获取失败，原因：', err)
        res.status(500).json({
            code: -1,
            msg: '获取历史聊天失败',
            data: null
        })
    }
}
);

//三、获取会话列表（mysql）over
router.get('/session', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT session_id,
                    ANY_VALUE(content) AS content,
                    MIN(send_time) AS min_time
             FROM messages
             GROUP BY session_id
             ORDER BY min_time DESC
        `
        )

        const sessions = rows.map((row, index) => ({
            session_id: row.session_id,
            title: row.content
        }))

        res.json({
            code: 0,
            msg: '获取会话成功',
            data: { sessions }
        })

    } catch (err) {
        console.error('获取失败，原因：', err)
        // 500:服务器内部错误
        res.status(500).json({
            code: -1,
            msg: '获取会话失败',
            data: null
        })
    }
})



// 四、新增会话接口
router.post('/addsession', async (req, res) => {
    try {
        // 1. 使用 UUID 生成唯一的 session_id
        const session_id = crypto.randomUUID()

        //2.在mysql新建一个会话
        await pool.query(
            `INSERT INTO messages(role,content,send_time,session_id) VALUES('system','',NOW(),?)`,
            [session_id]
        )

        //3.把新会话返回前端
        res.json({
            code: 0,
            msg: '新建会话成功',
            data: {
                session: {
                    session_id: session_id,
                    title: ''
                }
            }
        })

    } catch (err) {
        console.error('获取失败，原因：', err)
        //服务器内部错误
        res.status(500).json({
            code: -1,
            msg: '新建会话失败',
            data: null
        })
    }

})

//五、删除会话和历史记录
router.delete('/session/:session_id', async (req, res) => {
    try {
        const { session_id } = req.params
        const [result] = await pool.execute(
            `DELETE FROM messages WHERE session_id=?`,
            [session_id]
        )
        res.json({
            code: 0,
            msg: '删除成功',
            data: {
                affectedRows: result.affectedRows
            }
        })
    } catch (err) {
        console.error('删除会话失败:', err)
        res.status(500).json({
            code: -1,
            msg: '删除失败',
            data: null
        })
    }

})

module.exports = router
