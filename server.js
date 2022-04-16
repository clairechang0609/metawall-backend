const http = require('http');
const mongoose = require('mongoose');
const Post = require('./models/post');
const library = require('./library');
const { deleteAll, deleteSingle } = require('./methods/delete');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
)

// 連接資料庫
mongoose.connect(DB)
    .then(() => {
        console.log('資料庫連線成功');
    })
    .catch(error => {
        console.log(error);
    });

const requestListener = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    })

    if (req.url === '/posts' && req.method === 'GET') {
        const posts = await Post.find();
        res.writeHead(200, library.headers);
        res.write(JSON.stringify({
            "status": "success",
            "message": "取得成功12345",
            "data": posts
        }))
        res.end();
    } else if ((req.url === '/posts' && req.method === 'POST')) {
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const newPost = await Post.create(data)
                res.writeHead(200, library.headers);
                res.write(JSON.stringify({
                    "status": "success",
                    "message": "新增成功",
                    "data": newPost
                }))
                res.end();
            } catch(error) {
                res.writeHead(400, library.headers);
                res.write(JSON.stringify({
                    "status": "false",
                    "message": "新增失敗，欄位不正確",
                    "error": error
                }))
                res.end();
            }
        });
    } else if (req.url === '/posts' && req.method === 'DELETE') {
        deleteAll(res);
    } else if (req.url.startsWith('/posts/') && req.method === 'DELETE') {
        deleteSingle(req, res);
    } else if (req.url.startsWith('/posts/') && req.method === 'PATCH') {
        req.on('end', async () => {
            try {
                const id = req.url.split('/').pop();
                const data = JSON.parse(body);
                const post = await Post.findByIdAndUpdate(id, data);
                console.log(post);
                res.writeHead(200, library.headers);
                res.write(JSON.stringify({
                    "status": "success",
                    "message": "更新成功"
                }))
                res.end();
            } catch(error) {
                res.writeHead(400, library.headers);
                res.write(JSON.stringify({
                    "status": "false",
                    "message": "更新失敗",
                    "error": error.errors
                }))
                res.end();
            }
        });
    } else if (req.method === 'OPTIONS') { // preflight 跨網域使用
        res.writeHead(200, library.headers);
        res.end();
    } else {
        res.writeHead(404, library.headers);
        res.write(JSON.stringify({
            "status": "false",
            "message": "無此網站路由"
        }))
        res.end();
    }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT);
