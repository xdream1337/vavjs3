const express = require('express');
const { Op } = require("sequelize");
const router = express.Router();
const { Methods, Weights } = require('../models');
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

router.post('/method/add', authMiddleware, async (req, res) => {

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


router.post('/add', authMiddleware, async (req, res) => {

    await Weights.create({
        weight: req.body.data.weight,
        user_id: req.body.data.user_id,
        date: req.body.data.date,
        method: req.body.data.method
    }).catch(err => res.status(500).json({ 'message': err, name: req.body.data.weightName, description: req.body.data.weightDescription, type: 'weight' }))

    weights = await Weights.findAll();

    res.status(201).json({ 'message': 'Weight successfully added', 'weights': weights })
});

router.post('/all', authMiddleware, async (req, res) => {

    weights = await Weights.findAll({
        where: {
            user_id: req.body.data.user_id
        },
        order: [
            ['date', 'DESC']
        ]
    });

    res.status(201).json({ 'message': 'Weight successfully added', 'weights': weights })
});

router.post('/remove', authMiddleware, async (req, res) => {

    await Weights.destroy({
        where: {
            id: req.body.data.weight_id
        }
    }).catch(err => res.status(500).json({ 'message': err }))

    weights = await Weights.findAll({
        where: {
            user_id: req.body.data.user_id
        }
    });

    res.status(201).json({ 'message': 'Weight successfully deleted', 'weights': weights })
});

router.post('/filter', authMiddleware, async (req, res) => {

    let args = {}

    args.user_id = req.body.data.user_id

    if (req.body.data.method) {
        args.method = req.body.data.method
    }

    if (req.body.data.timeTo) {
        args.date = {
            [Op.lt]: req.body.data.timeTo
        }
    }

    if (req.body.data.timeFrom) {
        args.date = {
            [Op.gt]: req.body.data.timeFrom
        }
    }

    if (req.body.data.timeTo && req.body.data.timeFrom) {
        args.date = {
            [Op.lt]: req.body.data.timeTo,
            [Op.gt]: req.body.data.timeFrom
        }
    }

    console.log(args);

    weights = await Weights.findAll({
        where: args,
        order: [
            ['date', 'DESC']
        ]
    });

    res.status(201).json({ 'message': 'Weight successfully filtered', 'weights': weights })
});

router.post('/method/remove', authMiddleware, async (req, res) => {

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

/* import weights from csv */
router.post('/import', authMiddleware, async (req, res) => {

    let weights = req.body.data.weights

    for (let i = 0; i < weights.length; i++) {
        await Weights.create({
            weight: weights[i].weight,
            user_id: weights[i].user_id,
            date: weights[i].date,
            method: weights[i].method
        }).catch(err => res.status(500).json({ 'message': err, name: req.body.data.weightName, description: req.body.data.weightDescription, type: 'weight' }))
    }
    weights = await Weights.findAll();
    res.status(201).json({ 'message': 'Weights successfully imported', 'weights': weights })

});

/* export weights to csv */
router.post('/export', authMiddleware, async (req, res) => {

    let weights = await Weights.findAll({
        where: {
            user_id: req.body.data.user_id
        },
        order: [
            ['date', 'DESC']
        ]
    });

    /* create csv file */
    let csv = 'weight,date,method\n'
    for (let i = 0; i < weights.length; i++) {
        csv += weights[i].weight + ',' + weights[i].date + ',' + weights[i].method + '\n'
    }

});


module.exports = router;