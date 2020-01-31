

const router = require('express').Router();

const Users = require('./user-model');
const restricted = require('../auth/restricted-middleware');

// router.get('/', restricted, (req, res) => {
//     Users.find(req.decodedToken.dept)
//         .then(res => {
//             res.status(200).json(res);
//         })
//         .catch(error => {
//             console.log(error);
//             res
//                 .status(400)
//                 .json({
//                     error: 'Unable to retrieve a list of users'
//                 });
//         });
// });

// function checkRole(dept) {
//     return function (req, res, next) {
//         if (req.decodedToken && dept === req.decodedToken.dept) {
//             next()
//         } else {
//             res.status(403).json({ message: 'you dont have the power' })
//         }
//     }
// }


router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json({ users })
        })
        .catch(err => {
            console.log("here i am", err);
            res.status(500)
                .json({ error: err, message: 'cannot retrieve users' })
        })
});

// router.get('/', restricted, (req, res) => {
//     // if user is in that dept, they can see all users
//     // if user isn't in that dept, they can only see themselves
//     const { subject, dept } = req.decodedToken;

//     if (dept === `${'technology'}`) {
//         Users.findBy('dept')
//             .then(users => {
//                 res.json(users);
//             })
//             .catch(err => res.status(500).send(err));
//     } else {
//         Users.findById(subject)
//             .then(user => {
//                 res.json(user);
//             })
//             .catch(err => res.status(500).send(err));
//     }
// });

module.exports = router;