const { successHandler, errorHandler } = require('../handler');
const Post = require('../models/post');

const getData = async (res) => {
    const posts = await Post.find();
    successHandler(res, 'εεΎζε', posts);
}

module.exports = getData;