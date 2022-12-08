const express = require('express');
const router = express.Router();
const { Methods, Pressures } = require('../models');
const { Op } = require("sequelize");

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


router.post('/add', authMiddleware, async (req, res) => {

    await Pressures.create({
        high_pressure: req.body.data.high_pressure,
        lower_pressure: req.body.data.lower_pressure,
        user_id: req.body.data.user_id,
        date: req.body.data.date,
        method: req.body.data.method
    }).catch(err => res.status(500).json({ 'message': err, name: req.body.data.pressureName, description: req.body.data.pressureDescription, type: 'pressure' }))

    pressures = await Pressures.findAll();

    res.status(201).json({ 'message': 'Pressure successfully added', 'pressure': pressures })
});

router.post('/all', authMiddleware, async (req, res) => {

    pressures = await Pressures.findAll({
        where: {
            user_id: req.body.data.user_id
        },
        order: [
            ['date', 'DESC']
        ]
    });

    res.status(201).json({ 'message': 'pressure successfully added', 'pressure': pressures })
});

router.post('/remove', authMiddleware, async (req, res) => {

    await Pressures.destroy({
        where: {
            id: req.body.data.pressure_id
        }
    }).catch(err => res.status(500).json({ 'message': err }))

    pressures = await Pressures.findAll({
        where: {
            user_id: req.body.data.user_id
        }
    });

    res.status(201).json({ 'message': 'pressure successfully deleted', 'pressure': pressures })
});

router.post('/filter', authMiddleware, async (req, res) => {

    let args = {}

    args.user_id = req.body.data.user_id

    if (req.body.data.method) {
        args.method = {
            [Op.and]: req.body.data.method
        }
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

    pressures = await Pressures.findAll({
        where: args,
        order: [
            ['date', 'DESC']
        ]
    });

    res.status(201).json({ 'message': 'pressure successfully filtered', 'pressure': pressures })
});

module.exports = router;