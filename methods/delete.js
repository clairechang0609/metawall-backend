const { successHandler, errorHandler } = require('../handler');
const Post = require('../models/post');

// 刪除全部
const deleteAll = async (res) => {
    await Post.deleteMany({});
    successHandler(res, 'DELETE');
}

// 刪除單筆
const deleteSingle = async (req, res) => {
    try {
        const id = req.url.split('/').pop();
        await Post.findByIdAndDelete(id);
        successHandler(res, 'DELETE');
    } catch(error) {
        errorHandler(res, 'DELETE');
    }
}

module.exports = { deleteAll, deleteSingle };