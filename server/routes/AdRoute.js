const express = require('express');
const router = express.Router();
const { Ads } = require('../models');
const { Op } = require("sequelize");

const { authMiddleware } = require("../middlewares/Auth");

router.post('/change', authMiddleware, async (req, res) => {


    ad = await Ads.findOne();

    if (ad) {
        ad.src = req.body.data.src;
        ad.href = req.body.data.href;
        ad.count = 0;
        await ad.update();
        res.status(201).json({ 'message': 'Ad successfully changed', 'ad': ad })

    } else {
        ad = await Ads.create({
            src: req.body.data.src,
            href: req.body.data.href,
            count: 0
        });
        res.status(201).json({ 'message': 'Ad successfully created', 'ad': ad })

    }

});

router.get('/get', async (req, res) => {

    ad = await Ads.findOne();

    res.status(201).json({ 'message': 'Add successfully retrieved', 'ad': ad })
});

router.get('/increment', async (req, res) => {

    ad = await Ads.findOne();
    ad.count = ad.count + 1;
    await ad.save();

    res.status(201).json({ 'message': 'Add successfully incremented', 'ad': ad })
});


module.exports = router;