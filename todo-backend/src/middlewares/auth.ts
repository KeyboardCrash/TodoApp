const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    const token: string = req.headers["x-access-token"]?.split(' ')[1];
    if (token) {
        jwt.verify(token,
            process.env.JWT_SECRET,
            (err, decoded) => {
                if (err) return res.status(500).json({
                    isLoggedIn: false,
                    message: "Failed to Authenticate"
                });
                req.user = {};
                req.user.id = decoded.id;
                req.user.username = decoded.username;
                next()
            }
        )
    } else {
        res.status(403).json({
            message: "Incorrect Token",
            isLoggedIn: false
        })
    }
}

module.exports = {
    verifyJWT
}