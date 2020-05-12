const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    message: {
        type: String
    },
    from: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Number
    },
    params: {
        type: Number
    }

});

module.exports = mongoose.model('Chat', chatSchema);
