const jwt = require('jsonwebtoken');
const createToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
}

module.exports = createToken;