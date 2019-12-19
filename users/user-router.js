

const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/middleware');

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json({ users })
        })
        .catch(err => {
            res.status(500)
                .json({ error: err, message: 'cannot retrieve users' })
        })
});

module.exports = router;