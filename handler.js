const library = require('./library');

const successMap = {
    GET: '取得成功',
    POST: '新增成功',
    DELETE: '刪除成功',
    PATCH: '編輯成功'
};

const falseMap = {
    GET: '取得失敗',
    POST: '新增失敗',
    DELETE: '刪除失敗',
    PATCH: '編輯失敗'
};

const successHandler = (res, method) => {
    res.writeHead(200, library.headers);
    res.write(JSON.stringify({
        "status": "success",
        "message": successMap[method]
    }));
    res.end();
}

const errorHandler = (res, method) => {
    res.writeHead(400, library.headers);
    res.write(JSON.stringify({
        "status": "false",
        "message": falseMap[method]
    }));
    res.end();
}

module.exports = { successHandler, errorHandler };