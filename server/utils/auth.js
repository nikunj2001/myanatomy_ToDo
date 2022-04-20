const jwt = require('jsonwebtoken');
const Users = require("../models/Users");
module.exports = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ errors: [{ msg: "Please Login First" }] });
    }
    try {
        const data = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { user } = data;
        const userExists = await Users.findById(user._id);
        if (!userExists) {
            return res.cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true
            }).status(400).json({ errors: [{ msg: "Login Again.Not Valid Token" }] });
        }
        req.user = user;
        next();
    } catch (error) {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });
        return res.status(401).json({ errors: [{ msg: error.message }] });
    }
};
