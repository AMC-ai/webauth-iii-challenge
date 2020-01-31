
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = require('./secret');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    console.log("restricted-middleware", token, req.headers);

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                console.log('failed verify', err);
                res.status(401).json({ message: 'cannot verify token' });
            } else {
                // token is valid
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(400).json({ message: 'No token provided' });
    }
};