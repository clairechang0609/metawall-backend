const http = require('http');
const mongoose = require('mongoose');
const Post = require('./models/post');
const library = require('./library');
const getData = require('./methods/getData');
const postData = require('./methods/postData');
const { deleteAllData, deleteSingleData } = require('./methods/deleteData');
const { successHandler, errorHandler } = require('./handler');
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
        console.log('資料庫連線失敗', error);
    });

const requestListener = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    })

    if (req.url === '/posts' && req.method === 'GET') {
        getData(res);
    } else if ((req.url === '/posts' && req.method === 'POST')) {
        postData(req, res, body);
    } else if (req.url === '/posts' && req.method === 'DELETE') {
        deleteAllData(res);
    } else if (req.url.startsWith('/posts/') && req.method === 'DELETE') {
        deleteSingleData(req, res);
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
        errorHandler(res, '無此網站路由', 404);
    }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT);
