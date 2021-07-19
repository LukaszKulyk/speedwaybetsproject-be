const mongoose = require('mongoose');

const PlayersResultsTable = require('../models/playersResultsTable');
const User = require('../models/user');

const playerResultsHelper = require('../helpers/playersResultsTable')

exports.playersResultsTable_get_all = (req, res, next) => {
    PlayersResultsTable.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                playerResultsTable: docs.map(doc => {
                    return {
                        _id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
						gameWeek: doc.gameWeek,
						season: doc.season,
						currentRank: doc.currentRank
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
}

exports.playersResultsTable_create_new = (req, res, next) => {

    const playersResultsTable = new PlayersResultsTable({
        _id: new mongoose.Types.ObjectId(),
        creationDate: new Date,
		lastUpdateDate: new Date,
        gameWeek: req.body.gameWeek,
        season: req.body.season,
        currentRank: req.body.currentRank
    });

    playersResultsTable.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(201).json({
        message: 'New Player Table has been created.',
        createdplayersTable: playersResultsTable
    });
}

exports.playersResultsTable_get_one_by_id = (req, res, next) => {
    const id = req.params.gameWeekId
    PlayersResultsTable.findById(id)
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
}

exports.playersResultsTable_update_one_by_id = (req,res,next) => {
    const id = req.params.gameWeekId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    PlayersResultsTable.updateOne({ _id: id }, { $set: updateOps})
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
}

exports.playersResultsTable_delete_one_by_id = (req, res, next) => {
    const id = req.params.gameWeekId;
    PlayersResultsTable.deleteOne({ _id: id })
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
}

exports.playersResultsTable_get_last_results = (req, res, next) => {
    PlayersResultsTable.find()
        //.sort({gameWeek: -1})
        .sort({lastUpdateDate: -1})
        .limit(1)
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                playerResultsTable: docs.map(doc => {
                    return {
                        _id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
						gameWeek: doc.gameWeek,
						season: doc.season,
						currentRank: doc.currentRank
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
}

exports.playersResultsTable_auto_create_new_table = (req, res, next) => {

    const isNewGameWeekTableNeeded= req.body.isNewGameWeekTableNeeded

    PlayersResultsTable.find()
        .sort({gameWeek: -1})
        .limit(1)
        .exec()
        .then(docs => {
            const lastPlayersResultsTable = {
                playerResultsTable: docs.map(doc => {
                    return {
						gameWeek: doc.gameWeek,
						season: doc.season,
						currentRank: doc.currentRank
                    }
                })
            }

            User.find({isAdmin: false})
                .sort({collectedPoints: -1})
                .exec()
                .then(docs => {
                    const currentPlayersResults = {
                        users: docs.map(doc => {
                            return {
                                userName: doc.userName,
                                collectedPoints: doc.collectedPoints
                            }
                        })
                    }

                    let userNewRank = currentPlayersResults.users.map((player, index) => {

                        let userCurrentRank = lastPlayersResultsTable.playerResultsTable[0].currentRank.find(userLastRank => userLastRank.username === player.userName)
                        let isCurrentRankAvailable = playerResultsHelper.checkIfUserRankAlreadyExist(userCurrentRank)

                        if(isCurrentRankAvailable === false){
                            return {
                                pos: index + 1,
                                username: player.userName,
                                points: player.collectedPoints,
                                '+/-': '0'
                            }
                        }
                        else{
                            let newArrowValue = playerResultsHelper.calculatePlayerPositionChange(userCurrentRank.pos, (index + 1))
                            
                            return {
                                pos: index + 1,
                                username: player.userName,
                                points: player.collectedPoints,
                                '+/-': newArrowValue
                            }
                            //playing with updates during game week
                            /*if(isNewGameWeekTableNeeded === false){
                                return {
                                    pos: userCurrentRank.pos,
                                    username: player.userName,
                                    points: player.collectedPoints,
                                    //'+/-': userCurrentRank."+/-"
                                }
                            }
                            else{
                                let newArrowValue = playerResultsHelper.calculatePlayerPositionChange(userCurrentRank.pos, (index + 1))
                                
                                return {
                                    pos: index + 1,
                                    username: player.userName,
                                    points: player.collectedPoints,
                                    '+/-': newArrowValue
                                }
                            }*/
                        }
                    })

                    let newPlayersResultsTable;

                    if(isNewGameWeekTableNeeded === true){

                        newPlayersResultsTable = new PlayersResultsTable({
                            _id: new mongoose.Types.ObjectId(),
                            creationDate: new Date,
                            lastUpdateDate: new Date,
                            gameWeek: lastPlayersResultsTable.playerResultsTable[0].gameWeek + 1,
                            season: lastPlayersResultsTable.playerResultsTable[0].season,
                            currentRank: userNewRank
                        });
                    }
                    else{
                        newPlayersResultsTable = new PlayersResultsTable({
                            _id: new mongoose.Types.ObjectId(),
                            creationDate: new Date,
                            lastUpdateDate: new Date,
                            gameWeek: lastPlayersResultsTable.playerResultsTable[0].gameWeek,
                            season: lastPlayersResultsTable.playerResultsTable[0].season,
                            currentRank: userNewRank
                        });
                    }

                    newPlayersResultsTable.save()
                        .then(result => {
                            console.log(result);
                        })
                        .catch(err => console.log(err));
                
                    res.status(201).json({
                        message: 'New Player Table has been created.',
                        createdPlayersTable: newPlayersResultsTable
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