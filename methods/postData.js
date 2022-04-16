const { successHandler, errorHandler } = require('../handler');
const Post = require('../models/post');

const errorArr = {
    "errors": {
        "name": {
            "name": "ValidatorError",
            "message": "貼文姓名未填寫",
            "properties": {
                "message": "貼文姓名未填寫",
                "type": "required",
                "path": "name"
            },
            "kind": "required",
            "path": "name"
        },
        "content": {
            "name": "ValidatorError",
            "message": "content 未填寫",
            "properties": {
                "message": "content 未填寫",
                "type": "required",
                "path": "content"
            },
            "kind": "required",
            "path": "content"
        }
    }
}

const postData = async (req, res, body) => {
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const newPost = await Post.create(data);
            successHandler(res, '新增成功', newPost);
        } catch(error) {
            // const errorStr = Object.values(error.errors).map(item => item.message).join('、');
            errorHandler(res, error);
        }
    });
}

module.exports = postData;