const express = require(`express`);
const bcrypt = require(`bcrypt`);
const _ = require(`underscore`);
const app = express();
const User = require(`../models/user.js`);

//GET LIST OF USERS
app.get(`/user`, (req, res) => {
    let since = req.query.since || 0;
    since = Number(since);
    let limiter = req.query.limiter || 5;
    limiter = Number(limiter);
    let state = req.body.state;
    User.find({state: true}, "name email role state google img")
        .limit(limiter)
        .skip(since)
        .exec((err, users) => {
            if (err) {
                res.status(400).json({
                    OK: false,
                    err
                });
            } else {
                User.countDocuments({state: true}, (err, registers) => {
                    if (err) {
                        res.status(400).json({
                            OK: false,
                            err
                        });
                    } else {
                        res.json({
                            OK: true,
                            registers,
                            users
                        });
                    }
                });
            }
        });
});

// POST CREATE USER
app.post(`/user`, (req, res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            res.status(400).json({
                OK: false,
                err
            });
        } else {
            res.json({
                OK: true,
                user: userDB
            });
        }
    });
});
// PUT UPDATE USER
app.put(`/user/:id`, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["name", "email", "img", "role" ]);
    User.findOneAndUpdate(
        id,
        body,
        { new: true, runValidators: true },
        (err, userDB) => {
            if (err) {
                res.status(400).json({
                    OK: false,
                    err
                });
            } else {
                res.json({
                    OK: true,
                    user: userDB
                });
            }
        }
    );
});

//DELETE: DELETE USER
app.delete(`/user/:id`, (req, res) => {
    let id = req.params.id;
let changeState = {
    state: false
}
User.findOneAndUpdate({ _id: id }, changeState, {new: true}, (err, userDelete) => {
        if (err) {
            res.status(400).json({
                OK: false,
                err
            });
        } else if (!userDelete) {
            res.status(400).json({
                OK: false,
                err: {
                    message: `This user doesn't exist`
                }
            });
        } else {
            res.json({
                OK: true,
                userDelete
            });
        }
    });
});

module.exports = app;
