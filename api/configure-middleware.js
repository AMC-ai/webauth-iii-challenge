
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

function logger(req, res, next) {
    const newDate = new Date(Date.now());
    console.log((`${req.method} to ${req.originalUrl} at ${newDate.toDateString()}, ${newDate.toTimeString()}`))
    next();
};

module.exports = server => {
    server.use(helmet());
    server.use(express.json());
    server.use(cors());
    server.use(logger);
    server.use(sessions(sessionConfiguration)); //this is going to add a req.session object and can be passed throughout the whole app if it is placed here
};