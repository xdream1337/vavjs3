const express = require('express');
const router = express.Router();
const { Methods, Pressure } = require('../models');
const { sign } = require("jsonwebtoken");

const { authMiddleware } = require("../middlewares/Auth");


router.post('/method/all', authMiddleware, async (req, res) => {
    console.log(req.body);

    pressures = await Methods.findAll({
        where: {
            type: 'pressure',
            user_id: req.data.user_id
        }
    });

    res.status(200).json({ 'message': 'pressures successfully retrieved', 'pressure': pressures })

});

router.post('/method/add', authMiddleware, async (req, res) => {
    console.log(req.body);

    await Methods.create({
        name: req.body.data.name,
        description: req.body.data.description,
        type: 'pressure',
    }).then(method => res.status(201).json({ 'message': 'Method successfully added', 'method': method }))
        .catch(err => res.status(500).json({ 'message': err }))
});

router.post('/method/remove', async (req, res) => {
    console.log(req.body);

    await Methods.destroy({
        where: {
            name: req.body.data.pressureName
        }
    }).then(method => res.status(201).json({ 'message': 'Method successfully removed', 'method': method }))
        .catch(err => res.status(500).json({ 'message': err }))
});

module.exports = router;