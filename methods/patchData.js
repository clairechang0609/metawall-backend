const { successHandler, errorHandler } = require('../handler');
const Post = require('../models/post');

const patchData = async (req, res, body) => {
    try {
        const id = req.url.split('/').pop();
        const data = JSON.parse(body);
        await Post.findByIdAndUpdate(id, data);
        const post = await Post.findById(id);
        successHandler(res, '更新成功', post);
    } catch(error) {
        errorHandler(res, '更新失敗，欄位格式錯誤');
    }
}

module.exports = patchData;