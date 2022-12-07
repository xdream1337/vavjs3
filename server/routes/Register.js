const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');

const { authMiddleware } = require("../middlewares/Auth");

router.post('/register', async (req, res) => {
    console.log(req.body)
    await Users.create({
        first_name: req.body.first_name,
        password: bcrypt.hashSync(req.body.password, 13),
        height: req.body.height,
        birth_date: req.body.birth_date,
        email: req.body.email
    })
        .then(user => res.status(201).json({
            message: 'User successfully registered',
            user: user
        }))
        .catch(err => res.status(500).json({
            message: err
        }))
});