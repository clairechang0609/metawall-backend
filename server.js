const http = require('http');
const mongoose = require('mongoose');
const library = require('./library');
const getData = require('./methods/getData');
const postData = require('./methods/postData');
const { deleteAllData, deleteSingleData } = require('./methods/deleteData');
const patchData = require('./methods/patchData');
const { errorHandler } = require('./handler');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});

// 設定連線網址
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
    await new Promise((resolve, reject) => req.on('end', resolve));

    if (req.url === '/posts' && req.method === 'GET') {
        getData(res);
    } else if ((req.url === '/posts' && req.method === 'POST')) {
        postData(res, body);
    } else if (req.url === '/posts' && req.method === 'DELETE') {
        deleteAllData(res);
    } else if (req.url.startsWith('/posts/') && req.method === 'DELETE') {
        deleteSingleData(req, res);
    } else if (req.url.startsWith('/posts/') && req.method === 'PATCH') {
        patchData(req, res, body);
    } else if (req.method === 'OPTIONS') { // preflight 跨網域使用
        res.writeHead(200, library.headers);
        res.end();
    } else {
        errorHandler(res, '無此網站路由', 404);
    }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT);
