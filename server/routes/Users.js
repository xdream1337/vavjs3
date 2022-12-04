const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');

const { authMiddleware } = require("../middlewares/Auth");

router.post('/register', async (req, res) => {
    Users.create({
        first_name: req.body.first_name,
        password: bcrypt.hashSync(req.body.password, 13)
    })
        .then(user => res.status(201).json({
            message: 'User successfully registered',
            user: user
        }))
        .catch(err => res.status(500).json({
            message: 'Failed to register user'
        }))
});


router.post('/login', async (req, res) => {

    const user = await Users.findOne({ where: { first_name: req.body.first_name } });

    if (user) {
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
            if (matches) {
                const auth_token = sign(
                    { first_name: user.first_name, id: user.id },
                    "i-would-die-for-vavjs-that\'show-much-i-love-it"
                );
                res.status(200).json({
                    message: 'User successfully logged in',
                    user: user,
                    auth_token: auth_token
                });
            } else {
                res.status(502).json({
                    message: 'Login failed'
                });
            }
        });
    } else {
        res.status(500).json({
            message: 'Failed to log user in'
        });
    }

});

router.get("/", authMiddleware, (req, res) => {
    res.json(req.user);
});

module.exports = router;