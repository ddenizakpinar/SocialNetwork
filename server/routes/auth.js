const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register
router.post('/register', async (req, res) => {
    // Validate the data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    // Check if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send({ error: 'Email already exists' });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        imgUrl: req.body.imgUrl
    });
    try {
        const savedUser = await user.save();
        res.send({ user: savedUser._id });
    } catch (err) {
        res.status(400).send({ err: err });
    }
});

// Login
router.post('/login', async (req, res) => {

    // Validate the data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    // Check if the email does not exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ success: 'false', error: 'Email is not found' });

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ success: 'false', error: 'Invalid password' });

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, "dffd8kk5kjsga7gqytyewhrnmcq123"); // TOKEN SECRET

    res.send({ success: 'true', token: token });

});

module.exports = router;

