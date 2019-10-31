const express = require('express');

const Users = require('./userDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    // console.log("router.post", req.body);

    const user = req.body;

    Users.insert(user)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error retrieving the user'} )
    })
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    Users.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error retrieving the users' })
    })
});

router.get('/:id', validateUserId, (req, res) => {
    console.log("req.user in router.get", req.user);
    res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

// `validateUserId` validates the user id on every request that expects a user id parameter
// if the `id` parameter is valid, store that user object as `req.user`
// if the `id` parameter does not match any user id in the database, cancel the request and respond with status `400` and `{ message: "invalid user id" }`

function validateUserId(req, res, next) {
    // console.log(req.params);
    const { id } = req.params;

    Users.getById(id)
    .then(user => {
        if (user) {
            console.log("user in validateUserId", user);
            req.user = user;
            console.log("req.user in validateUserId", req.user);
            next();
        } else {
            res.status(400).json({ message: "invalid user id" })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "failed to retrieve user by id" });
    });
};

// `validateUser` validates the `body` on a request to create a new user
// if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing user data" }`
// if the request `body` is missing the required `name` field, cancel the request and respond with status `400` and `{ message: "missing required name field" }`
function validateUser(req, res, next) {
    // console.log("validateUser", req.body);
    if (!req.body) {
      res.status(400).json({ message: "missing user data" });
    } else if (!req.body.name) {
      res.status(400).json({ message: "missing required name field" });
    }
    next();
}

module.exports = router;
