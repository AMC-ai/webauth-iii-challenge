
const db = require('../data/db-config.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
};

function find() {
    return db('users').select('id', 'username', 'password', 'dept');
}

function findBy(filter) {
    return db('users').where(filter);
}

function add(user) {
    return db('users').insert(user)
        .then(({ id }) => {
            return findById(id);
        })
        .catch(err => {
            return err;
        });
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}