const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || "hfgdhgfhdgfygrhbfhfrybrurbjfkhfbvflufg";
const generateToken = (userId) => {
    const token = jwt.sign({userId}, JWT_SECRET, { expiresIn: '1h' });
    return token;
};

const getUserIdFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.userId;
    } catch (error) {
        throw new Error("Invalid token");
    }
};


module.exports = {
    generateToken,
    getUserIdFromToken
};
