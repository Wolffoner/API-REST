const express = require(`express`);
const bcrypt = require(`bcrypt`);
const User = require(`../models/user.js`);
const app = express();
const jwt = require(`jsonwebtoken`);

app.post(`/login`, (req, res) => {
    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                OK: false,
                err
            });
        } else if (!userDB) {
            return res.status(400).json({
                OK: false,
                err: {
                    message: "(User) or password invalid"
                }
            });
        } else if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                OK: false,
                err: {
                    message: "User or (password) invalid"
                }
            });
        } else {
            let token = jwt.sign(
                {
                    user: userDB
                },
                process.env.SEED,
                { expiresIn: process.env.EXPIRATION_TOKEN }
            );
            return res.json({
                OK: true,
                user: userDB,
                token
            });
        }
    });
});

module.exports = app;
