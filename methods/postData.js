const { successHandler, errorHandler } = require('../handler');
const Post = require('../models/post');

const postData = async (res, body) => {
    try {
        const data = JSON.parse(body);
        const newPost = await Post.create(data);
        successHandler(res, '新增成功', newPost);
    } catch(error) {
        const errorStr = Object.values(error.errors).map(item => item.message).join('、');
        errorHandler(res, errorStr);
    }
}

module.exports = postData;