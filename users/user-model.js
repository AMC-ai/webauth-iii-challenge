
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

// async function add(user) {
//     const [id] = await db('users').insert(user);

//     return findById(id);
//   }

function findById(id) {
    return db('users')
        .select('id', 'username', 'dept')
        .where({ id })
        .first();
}