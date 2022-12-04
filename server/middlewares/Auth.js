const { verify } = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const auth_token = req.header("auth_token");

    if (!auth_token) return res.json({ error: "Token not found!" });

    try {
        const auth_token = verify(auth_token, "i-would-die-for-vavjs-that\'show-much-i-love-it");
        req.user = auth_token;
        if (auth_token) {
            return next();
        }
    } catch (err) {
        return res.json({ error: err });
    }
};

module.exports = { authMiddleware };