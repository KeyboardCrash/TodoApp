const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth_middlewares = require('../middlewares/auth');

const router = express.Router();

const UserModel = require('../model/user');

router.get('/getUsername', auth_middlewares.verifyJWT, (req, res) => {
    res.json({
        isLoggedIn: true,
        username: req.user.username
    });
})

router.post('/register', async function(req, res, next) {
    const {username, password} = req.body;
    if (!username || !password) {
        res.json({
            message: "Username or password not provided"
        })
    }
    const user = await UserModel.findOne({ username }).exec();
    if (user) {
        res.status(500).json({
            message: "User already exists"
        });
        return;
    } else {
        await UserModel.create({username, password});
        res.json({
            message: "User Registered Successfully"
        })
    }
});

router.post('/login', async function(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            message: "Username or password not provided"
        });
        return;
    }
    const user = await UserModel.findOne({ username }).exec();
    bcrypt.compare(password, user.password, function(err, hashCheck) {
        if (err) {
            throw(err)
        }
        if (!user || !hashCheck) {
            res.status(403).json({
                message: "Invalid login"
            });
            return;
        } else {
            const payload = {
                id: user._id,
                username: user.username
            };
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {expiresIn: 3600},
                (err, token) => {
                    if (err) return res.json({message: err});
                    console.log(`token generated ${token}`)
                    return res.json({
                        message: "Successful Login",
                        token: "Bearer " + token
                    });
                }
            );
        }

    });
});

module.exports = router
export {}