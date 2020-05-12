const router = require('express').Router();

const Chat = require('../model/Chat')

// Gets last 20 chat messages between 2 user
router.get('/:fromID/:toID', async (req, res) => {
    const criteria = { $or: [{ from: req.params.fromID, to: req.params.toID }, { from: req.params.toID, to: req.params.fromID }] }
    try {
        await Chat.find(criteria).sort({ "date": -1 }).limit(20).exec((err, doc) => {
            res.json(doc)
        })
    } catch (error) {

    }
})


module.exports = router;