const express = require('express');
const router = express.Router();
const { sign } = require("jsonwebtoken");

const { authMiddleware } = require("../middlewares/Auth");

router.get("/", authMiddleware, (req, res) => {
    res.json(req.user);
});

module.exports = router;