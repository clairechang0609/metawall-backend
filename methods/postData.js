const { successHandler, errorHandler } = require('../handler');
const Post = require('../models/post');

const postData = async (res, body) => {
    try {
        const data = JSON.parse(body);
        const newPost = await Post.create(data);
        successHandler(res, '新增成功', newPost);
    } catch(error) {
        errorHandler(res, '新增失敗，欄位不正確');
    }
}

module.exports = postData;