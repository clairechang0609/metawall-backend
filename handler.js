const library = require('./library');

const successHandler = (res, message, data = []) => {
    res.writeHead(200, library.headers);
    res.write(JSON.stringify({
        "status": "success",
        "message": message,
        "data": data
    }));
    res.end();
}

const errorHandler = (res, message, code = 400) => {
    res.writeHead(code, library.headers);
    res.write(JSON.stringify({
        "status": "false",
        "message": message
    }));
    res.end();
}

module.exports = { successHandler, errorHandler };