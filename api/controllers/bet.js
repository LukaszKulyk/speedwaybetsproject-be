const mongoose = require('mongoose');

const Bet = require('../models/bet');
const Schedule = require('../models/schedule');

exports.bet_get_all = (req, res, next) => {
    Bet.find()
        //.populate('schedule')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                bets: docs.map(doc => {
                    return {
                        _id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
                        gameId: doc.gameId,
                        userId: doc.userId,
                        gameWeek: doc.gameWeek,
						homeTeamPoints: doc.homeTeamPoints,
						awayTeamPoints: doc.awayTeamPoints,
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
        });
};

exports.bet_create_new = (req, res, next) => {

    Schedule.findById(req.body.gameId)
        .then(game => {
            if(game.gameStatus === 'scheduled')
            {
                const bet = new Bet({
                    _id: new mongoose.Types.ObjectId(),
                    creationDate: new Date,
                    lastUpdateDate: new Date,
                    gameId: req.body.gameId,
                    userId: req.body.userId,
                    gameWeek: req.body.gameWeek,
                    homeTeamPoints: req.body.homeTeamPoints,
                    awayTeamPoints: req.body.awayTeamPoints,
                });
            
                bet.save()
                    .then(result => {
                        console.log(result);
                    })
                    .catch(err => console.log(err));
            
                res.status(201).json({
                    message: 'New BET has been created.',
                    bet: bet
                });
            }
            else{
                res.status(500).json({
                    message: 'Cannot bet this game, it is already played or inprogress!'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Cannot bet this game, it is already played or inprogress!'
            })
        })

    /*const bet = new Bet({
        _id: new mongoose.Types.ObjectId(),
        creationDate: new Date,
		lastUpdateDate: new Date,
        gameId: req.body.gameId,
        userId: req.body.userId,
        gameWeek: req.body.gameWeek,
		homeTeamPoints: req.body.homeTeamPoints,
		awayTeamPoints: req.body.awayTeamPoints,
    });

    bet.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(201).json({
        message: 'New BET has been created.',
        bet: bet
    });*/
};

exports.bet_get_by_id = (req, res, next) => {
    const id = req.params.betId
    Bet.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID.'
                });
            }
            console.log(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.bet_update_by_id = (req,res,next) => {
    const id = req.params.betId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Bet.updateOne({ _id: id }, { $set: updateOps})
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

exports.bet_delete_by_id = (req, res, next) => {
    const id = req.params.betId;
    Bet.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(201).json({
                message: 'Entire has been deleted!'
            });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
};

exports.bet_get_all_bets_by_user = (req, res, next) => {
    const id = req.params.userId
    Bet.find({userId: id})
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                bets: docs.map(doc => {
                    return {
                        _id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
                        gameId: doc.gameId,
                        userId: doc.userId,
                        gameWeek: doc.gameWeek,
						homeTeamPoints: doc.homeTeamPoints,
						awayTeamPoints: doc.awayTeamPoints,
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
        });
};

exports.bet_get_all_bets_by_game = (req, res, next) => {
    const id = req.params.gameId
    Bet.find({gameId: id})
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                bets: docs.map(doc => {
                    return {
                        _id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
                        gameId: doc.gameId,
                        userId: doc.userId,
						homeTeamPoints: doc.homeTeamPoints,
						awayTeamPoints: doc.awayTeamPoints,
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
        });
};

exports.bet_get_user_bet_of_specific_game = (req, res, next) => {
    const userId = req.params.userId
    const gameId = req.params.gameId
    Bet.find({userId: userId, gameId: gameId})
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID.'
                });
            }
            console.log(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.bet_get_all_bets_for_current_gameWeek_by_user = (req, res, next) => {
    const gameWeek = req.params.gameWeek
    const userId = req.params.userId
    Bet.find({userId: userId, gameWeek: gameWeek})
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                bets: docs.map(doc => {
                    return {
                        _id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
                        gameId: doc.gameId,
                        userId: doc.userId,
                        gameWeek: doc.gameWeek,
						homeTeamPoints: doc.homeTeamPoints,
						awayTeamPoints: doc.awayTeamPoints,
                        collectedPoints: doc.collectedPoints
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};