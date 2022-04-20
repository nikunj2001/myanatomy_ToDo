const jwt = require('jsonwebtoken');
const createToken = (user) => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
    return token;
}
module.exports = createToken;