const express = require('express');
const router = express.Router();
const { Ad } = require('../models');
const { Op } = require("sequelize");

const { authMiddleware } = require("../middlewares/Auth");

router.post('/change', authMiddleware, async (req, res) => {

    await Ad.update({
        src: req.body.data.src,
        href: req.body.data.href,
        count: 0
    });

    ad = await Ad.findOne();

    res.status(201).json({ 'message': 'Ad successfully changed', 'ad': ad })

});

router.get('/get', async (req, res) => {

    ad = await Ad.findOne();

    res.status(201).json({ 'message': 'Add successfully retrieved', 'ad': ad })
});

router.get('/increment', async (req, res) => {

    ad = await Ad.findOne();
    ad.count = ad.count + 1;
    await ad.save();

    res.status(201).json({ 'message': 'Add successfully incremented', 'ad': ad })
});

module.exports = router;