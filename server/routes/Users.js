const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require("jsonwebtoken");

const { authMiddleware } = require("../middlewares/Auth");

router.post('/login', async (req, res) => {

    const user = await Users.findOne({ where: { email: req.body.email } });

    if (user) {
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
            if (matches) {
                const auth_token = sign(
                    { email: user.email, id: user.id },
                    "i-would-die-for-vavjs"
                );
                console.log('auth tokeeeeeeen', auth_token);
                res.status(200).json({
                    message: 'User successfully logged in',
                    user: {
                        first_name: user.first_name,
                        email: user.email,
                        id: user.id,
                        height: user.height,
                        age: user.age,
                    },
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

router.post('/register', async (req, res) => {
    console.log(req.body)
    await Users.create({
        first_name: req.body.first_name,
        password: bcrypt.hashSync(req.body.password, 13),
        height: req.body.height,
        birth_date: req.body.birth_date,
        email: req.body.email,
        age: req.body.age
    })
        .then(user => res.status(201).json({
            message: 'User successfully registered',
            user: {
                first_name: user.first_name,
                email: user.email,
                id: user.id,
                height: user.height,
                age: user.age,
            }
        }))
        .catch(err => (res.status(500).json({
            message: err
        })))
});

router.get("/auth", authMiddleware, (req, res) => {
    res.json(req.user);
});

module.exports = router;