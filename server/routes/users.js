const router = require('express').Router();
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken')
const Post = require('../model/Post');
const Comment = require('../model/Comment');
const User = require('../model/User');
const socketApi = require('../socketApi');

// Create friend request to given id
router.post('/friendrequest/:userID', async (req, res) => {

    const token = req.header('Authorization');
    const user = jwt.decode(token);
    // Control that already user
    const result = await User.findById(req.params.userID).findOne({ friendRequests: user._id })
    if (result) {
        return res.send({ err: "Already..." })
    }
    try {
        await User.findById(req.params.userID).updateOne({ $push: { friendRequests: user._id } });

        socketApi.io.emit('friendreq' + req.params.userID);
        res.json({
            "status":
                "ok"

        })

    } catch (err) {
        console.log(err)
    }
});

// Removes friend request by userID
router.delete('/friendrequest/:userID', async (req, res) => {
    const token = req.header('Authorization');
    const user = jwt.decode(token);

    try {
        await User.findById(user._id).updateOne({ $pull: { friendRequests: req.params.userID } });
        res.json({
            "status": {
                "deletedFrom": user._id,
                "Deleted": req.params.userID
            }
        })
    } catch (err) {
        res.status(400).send({ err: err })
    }
});

// Accepts friend request 
router.post('/friend/:userID', async (req, res) => {

    const token = req.header('Authorization');
    const user = jwt.decode(token);
    try {
        // Add user in your friend list
        await User.findById(user._id).updateOne({ $push: { friends: req.params.userID } });
        // Add yourself to user's friend list
        await User.findById(req.params.userID).updateOne({ $push: { friends: user._id } });
        // Delete user's friend request
        await User.findById(user._id).updateOne({ $pull: { friendRequests: req.params.userID } });

        res.json({
            "status": "success"
        })
    } catch (err) {
        res.status(400).send({ err: err })
    }
});

// Deletes friend 
router.delete('/friend/:userID', async (req, res) => {
    const token = req.header('Authorization');
    const user = jwt.decode(token);

    try {
        await User.findById(user._id).updateOne({ $pull: { friends: req.params.userID } });
        await User.findById(req.params.userID).updateOne({ $pull: { friends: user._id } });
        res.json({
            "status": "success"
        })
    } catch (err) {
        res.status(400).send({ err: err })
    }
});


// Search user by name
router.get('/search/:name', async (req, res) => {
    try {
        await User.find({ 'name': new RegExp(req.params.name, 'i') }).select(['name', 'imgUrl','friendRequests']).exec((err, result) => {
            res.json({
                "result": result
            })
        })
    } catch (error) {
        res.status(400).send({ err: err })
    }
})

// Get logged in user info
router.get('/info', (req, res) => {
    const token = req.header('Authorization');
    const user = jwt.decode(token);

    try {
        User.findById(user._id).populate({
            path: 'friends', select: ['name', 'imgUrl']
        }).populate({
            path: 'friendRequests', select: ['name', 'imgUrl']
        }).populate({
            path: 'notifications', select: ['name', 'imgUrl']
        }).exec((err, result) => {
            res.json({
                "result": result
            });
        })
    } catch (error) {
        res.status(400).send({ err: err })
    }
})

// Get user info by userID
router.get('/infoByID/:id', (req, res) => {


    try {
        User.findById(req.params.id)
            .select(['imgUrl', 'name', '_id', 'date', 'email', 'bgUrl', 'friends'])
            .exec((err, result) => {
                res.json({
                    "result": result
                });
            })
    } catch (error) {
        res.status(400).send({ err: err })
    }
})

module.exports = router;
