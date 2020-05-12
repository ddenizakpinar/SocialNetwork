const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    postID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    content: {
        type: String,
        required: true,
        max: 20000
    },
    likes: {
        type: Array,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('Comment', commentSchema);