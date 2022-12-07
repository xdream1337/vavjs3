const express = require('express');
const router = express.Router();
const { Methods } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require("jsonwebtoken");

const { authMiddleware } = require("../middlewares/Auth");


router.post('/method/all', authMiddleware, async (req, res) => {

    weights = await Methods.findAll({
        where: {
            type: 'weight',
            user_id: req.body.data.user_id
        }
    });

    res.status(200).json({ 'message': 'weights successfully retrieved', 'weights': weights })
});

router.post('/method/add', async (req, res) => {

    await Methods.create({
        name: req.body.data.name,
        description: req.body.data.description,
        type: 'weight',
        user_id: req.body.data.user_id
    }).catch(err => res.status(500).json({ 'message': err, name: req.body.data.weightName, description: req.body.data.weightDescription, type: 'weight' }))

    weights = await Methods.findAll({
        where: {
            type: 'weight',
            user_id: req.body.data.user_id
        }
    });

    res.status(201).json({ 'message': 'Method successfully added', 'weights': weights })
});

router.post('/method/remove', async (req, res) => {

    await Methods.destroy({
        where: {
            id: req.body.data.weight_id
        }
    }).catch(err => res.status(500).json({ 'message': err }))

    weights = await Methods.findAll({
        where: {
            type: 'weight',
            user_id: req.body.data.user_id
        }
    });
    res.status(201).json({ 'message': 'Method successfully removed', 'weights': weights })

});

module.exports = router;