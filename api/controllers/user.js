const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_singup = (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'This email is already taken!'
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            creationDate: new Date,
                            lastUpdateDate: new Date,
                            email: req.body.email,
                            userName: req.body.userName,
                            isAdmin: req.body.isAdmin,
                            password: hash
                            });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created.'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.user_login = (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Login failed, email/password incorrect.'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Login failed, email/password incorrect.'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                            {
                                email: user[0].email,
                                userId: user[0]._id,
                                isAdmin: user[0].isAdmin
                            }, 
                            process.env.JWT_KEY, 
                            {
                                expiresIn: "1h"
                            },
                        );
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token,
                            username: user[0].userName,
                            isAdmin: user[0].isAdmin,
                            _id: user[0]._id
                        });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.user_delete_one_by_id = (req, res, next) => {
    User.deleteOne({ _id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.get_all_players = (req, res, next) => {
    User.find({isAdmin: false})
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                bets: docs.map(doc => {
                    return {
                        _id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
                        email: doc.email,
                        userName: doc.userName,
                        collectedPoints: doc.collectedPoints
                    }
                })
            }
            //console.log(docs);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
}

exports.user_update_by_id = (req,res,next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.updateOne({ _id: id }, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};