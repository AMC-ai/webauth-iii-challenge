

const router = require('express').Router();

const Users = require('./user-model');
const restricted = require('../auth/restricted-middleware');

// router.get('/', restricted, (req, res) => {
//     Users.find()
//         .then(users => {
//             res.status(200).json({ users })
//         })
//         .catch(err => {
//             console.log("here i am", err);
//             res.status(500)
//                 .json({ error: err, message: 'cannot retrieve users' })
//         })
// });

router.get('/', restricted, (req, res) => {
    // if user is admin, they can see all users
    // if user isn't admin, they can only see themselves
    const { subject, dept } = req.decodedToken;

    if (dept === 'technology') {
        Users.find()
            .then(users => {
                res.json(users);
            })
            .catch(err => res.status(500).send(err));
    } else {
        Users.findById(subject)
            .then(user => {
                res.json(user);
            })
            .catch(err => res.status(500).send(err));
    }
});

module.exports = router;