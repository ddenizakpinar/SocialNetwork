const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
        max: 20000
    },
    type: {
        type: Number,
        required: true
    },
    mediaURL: {
        type: String,
        required: false
    },
    comments: [
        { type: mongoose.Types.ObjectId, ref: 'Comment' }
    ],
    likes: [
        { type: mongoose.Types.ObjectId, ref: 'User' }
    ],
    date: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('Post', postSchema);