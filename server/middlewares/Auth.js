const { verify } = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    console.log(req.body.headers.auth_token);
    const auth_token = req.body.headers.auth_token;
    console.log('token', auth_token);

    if (!auth_token) return res.json({ error: "Token not found!" });

    try {
        const auth_tokenn = verify(auth_token, "i-would-die-for-vavjs");
        req.user = auth_tokenn;
        if (auth_token) {
            return next();
        } else {
            res.redirect('/')
        }
    } catch (err) {
        console.log(err);
        return res.json({ error: err });
    }
};

module.exports = { authMiddleware };