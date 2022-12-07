const express = require('express');
const router = express.Router();
const { Methods, Pressure } = require('../models');
const { sign } = require("jsonwebtoken");

const { authMiddleware } = require("../middlewares/Auth");


router.post('/method/all', authMiddleware, async (req, res) => {

    pressures = await Methods.findAll({
        where: {
            type: 'pressure',
            user_id: req.body.data.user_id
        }
    });

    res.status(201).json({ 'message': 'Method successfully retrieved', 'pressure': pressures })

});

router.post('/method/add', authMiddleware, async (req, res) => {

    await Methods.create({
        name: req.body.data.name,
        description: req.body.data.description,
        type: 'pressure',
        user_id: req.body.data.user_id
    }).catch(err => res.status(500).json({ 'message': err }))

    pressures = await Methods.findAll({
        where: {
            type: 'pressure',
            user_id: req.body.data.user_id
        }
    });

    res.status(201).json({ 'message': 'Method successfully added', 'pressure': pressures })
});

router.post('/method/remove', authMiddleware, async (req, res) => {

    await Methods.destroy({
        where: {
            name: req.body.data.pressureName
        }
    }).catch(err => res.status(500).json({ 'message': err }))

    pressures = await Methods.findAll({
        where: {
            type: 'pressure',
            user_id: req.body.data.user_id
        }
    });

    res.status(201).json({ 'message': 'Method successfully removed', 'pressure': pressures })
});

module.exports = router;