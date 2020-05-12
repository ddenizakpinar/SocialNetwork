const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    posts: {
        type: Array,
        required: false,
    },
    friends: {
        type: Array,
        required: false,
    },
    friendRequests: {
        type: Array,
        required: false,
    },
    notifications: {
        type: Array,
        required: false,
    },
    imgUrl: {
        type: String,
        default: "cb0e79707b2e5f37742e6fc5128c6148.jpg"
    },
    date: {
        type: Date,
        default: Date.now,
    },
    bgUrl: {
        type: String,
        default: "4340a1e9b961a04b66504114db99ae57.jpg"
    }
});

module.exports = mongoose.model('User', userSchema);