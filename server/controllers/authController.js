const User = require("../models/Users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const logger = require("../config/logger");
const createToken = require("../utils/createToken");

const createUser = catchAsyncErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        logger.error(`Cant create user with email ${email}`)
        return res.send({ errors: [{ msg: 'Email is already taken' }] })
    }
    const user = await User.create({
        name, email, password
    });
    const token = createToken(user);
    logger.info(`new user created with email ${email}`);
    return res.status(200).json({ msg: "User created", user, token });
});

const loginUser = catchAsyncErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        logger.error(`User Login attempt fail with email ${email}`);
        return res.json({ errors: [{ msg: "User not found with this email" }] })
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        logger.error(`User Login attempt fail with email ${email}`);
        return res.json({ errors: [{ msg: "wrong username or password" }] })
    }
    const token = createToken(user);
    logger.info(`user loggedIn with email ${email}`);
    return res.status(200).json({ msg: "User Logged In", user, token })
})
module.exports = { createUser, loginUser };