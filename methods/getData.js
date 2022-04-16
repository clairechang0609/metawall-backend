const { successHandler, errorHandler } = require('../handler');
const Post = require('../models/post');

const getData = async (res) => {
    const posts = await Post.find();
    successHandler(res, '取得成功', posts);
}

module.exports = getData;