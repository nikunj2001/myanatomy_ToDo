const User = require("../models/Users");
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const logger = require("../config/logger");
const createToken = require("../utils/createToken");

const options = {
    expires: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
}

const createUser = catchAsyncErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        logger.error(`Cant create user with email ${email}`)
        return res.status(400).json({ errors: [{ msg: 'Email is already taken' }] })
    }
    const user = await User.create({
        name, email, password
    });
    const token = createToken(user);
    logger.info(`new user created with email ${email}`);
    res.cookie("token", token, options).status(200).send({ msg: "User created", user, token });
});

const loginUser = catchAsyncErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        logger.error(`User Login attempt fail with email ${email}`);
        return res.status(400).json({ errors: [{ msg: "User not found with this email" }] })
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        logger.error(`User Login attempt fail with email ${email}`);
        return res.status(400).json({ errors: [{ msg: "wrong username or password" }] })
    }
    const token = createToken(user);
    logger.info(`user loggedIn with email ${email}`);
    res.cookie("token", token, options).status(200).json({ msg: "User Logged In", user, token });
});

const userLogout = catchAsyncErrors(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        msg: "Logged Out",
    });
});

module.exports = { createUser, loginUser, userLogout };