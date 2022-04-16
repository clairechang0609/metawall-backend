const { successHandler, errorHandler } = require('../handler');
const Post = require('../models/post');

// 刪除全部
const deleteAllData = async (res) => {
    await Post.deleteMany({});
    successHandler(res, '刪除成功');
}

// 刪除單筆
const deleteSingleData = async (req, res) => {
    try {
        const id = req.url.split('/').pop();
        await Post.findByIdAndDelete(id);
        successHandler(res, '刪除成功');
    } catch(error) {
        errorHandler(res, '刪除失敗');
    }
}

module.exports = { deleteAllData, deleteSingleData };