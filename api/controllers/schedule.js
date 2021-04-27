const mongoose = require('mongoose');

const betHelper = require('../helpers/bet');
const userHelper = require('../helpers/user')

const Schedule = require('../models/schedule');
const Bet = require('../models/bet');
//const BetController = require('../controllers/bet');
const User = require('../models/user');

exports.schedule_get_all = (req, res, next) => {
    Schedule.find()
	.sort({gameWeek: 1})
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                schedule: docs.map(doc => {
                    return {
                        _id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
						gameWeek: doc.gameWeek,
                        season: doc.season,
                        isGameWeekPlayed: doc.isGameWeekPlayed,
						isGamePlayed: doc.isGamePlayed,
						originalGameWeek: doc.originalGameWeek,
						scheduledGameDate: doc.scheduledGameDate,
						homeTeam: doc.homeTeam,//"Unia Leszno",
						awayTeam: doc.awayTeam,//"Falubaz Zielona Góra",
						gameStatus: doc.gameStatus,
						gameResult: doc.gameResult
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

exports.schedule_create_new = (req, res, next) => {

    const schedule = new Schedule({
        _id: new mongoose.Types.ObjectId(),
        creationDate: new Date,
		lastUpdateDate: new Date,
        gameWeek: req.body.gameWeek,
		season: req.body.season,
		isGamePlayed: req.body.isGamePlayed,
		originalGameWeek: req.body.originalGameWeek,
		isGameWeekPlayed: req.body.isGameWeekPlayed,
		scheduledGameDate: req.body.scheduledGameDate,
		homeTeam: req.body.homeTeam,//"Unia Leszno",
		awayTeam: req.body.awayTeam,//"Falubaz Zielona Góra",
		gameStatus: req.body.gameStatus,
		gameResult: {
			winner: req.body.winner,//"Falubaz Zielona Góra"/"draw",
			bigPoints: req.body.bigPoints,//2/1,
			isBonusPoint: req.body.isBonusPoint,//false/true,
			smallPoints: req.body.smallPoints,//8,
			homeTeamPoints: req.body.homeTeamPoints,//41,
			awayTeamPoints: req.body.awayTeamPoints//49
		}
    });

    schedule.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(201).json({
        message: 'New Schedule has been created.',
        schedule: schedule
    });
};

exports.schedule_get_all_shceduled_for_next_game_week = (req, res, next) => {
    const nextGameWeek = req.params.nextGameWeek
    Schedule.find({isGameWeekPlayed: false, isGamePlayed: false, gameWeek: nextGameWeek})
		.sort({gameWeek: 1}) //because first gameWeek which is returned is the next one which will be played
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				schedule: docs.map(doc => {
					return {
						_id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
						gameWeek: doc.gameWeek,
                        season: doc.season,
                        isGameWeekPlayed: doc.isGameWeekPlayed,
						isGamePlayed: doc.isGamePlayed,
						originalGameWeek: doc.originalGameWeek,
						scheduledGameDate: doc.scheduledGameDate,
						homeTeam: doc.homeTeam,//"Unia Leszno",
						awayTeam: doc.awayTeam,//"Falubaz Zielona Góra",
						gameStatus: doc.gameStatus,
						gameResult: doc.gameResult
					}
				})
			}
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error:err
			});
		});
};

exports.schedule_get_all_played_from_last_game_week = (req, res, next) => {
    const lastGameWeek = req.params.lastGameWeek
    Schedule.find({isGameWeekPlayed: true, isGamePlayed: true, gameWeek: lastGameWeek})
		.sort({gameWeek: 1}) //because first gameWeek which is returned is the next one which will be played
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				schedule: docs.map(doc => {
					return {
						_id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
						gameWeek: doc.gameWeek,
                        season: doc.season,
                        isGameWeekPlayed: doc.isGameWeekPlayed,
						isGamePlayed: doc.isGamePlayed,
						originalGameWeek: doc.originalGameWeek,
						scheduledGameDate: doc.scheduledGameDate,
						homeTeam: doc.homeTeam,//"Unia Leszno",
						awayTeam: doc.awayTeam,//"Falubaz Zielona Góra",
						gameStatus: doc.gameStatus,
						gameResult: doc.gameResult
					}
				})
			}
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error:err
			});
		});
};


/*exports.schedule_get_all = (req, res, next) => {
    Schedule.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                schedule: docs.map(doc => {
                    return {
                        _id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
						gameWeek: doc.gameWeek,
                        season: doc.season,
                        isGameWeekPlayed: doc.isGameWeekPlayed,
						games: doc.games
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

exports.schedule_create_new = (req, res, next) => {

    const schedule = new Schedule({
        _id: new mongoose.Types.ObjectId(),
        creationDate: new Date,
		lastUpdateDate: new Date,
        gameWeek: req.body.gameWeek,
        season: req.body.season,
        isGameWeekPlayed: req.body.isGameWeekPlayed,
		games: req.body.games
    });

    schedule.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(201).json({
        message: 'New Schedule has been created.',
        schedule: schedule
    });
};*/

exports.schedule_get_by_id = (req, res, next) => {
    const id = req.params.gameWeekId
    Schedule.findById(id)
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

exports.schedule_update_by_id = (req,res,next) => {
    const id = req.params.gameWeekId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

	let gameDetails = {}; //Solves Assignment to constant variable problem
	if(updateOps.gameStatus === 'played'){
		gameDetails = {
			smallPoints: updateOps.gameResult.smallPoints,
			homeTeamPoints: updateOps.gameResult.homeTeamPoints,
			awayTeamPoints: updateOps.gameResult.awayTeamPoints,
			gameStatus: updateOps.gameStatus,
			isGamePlayed: updateOps.isGamePlayed,
			isGameWeekPlayed: updateOps.isGameWeekPlayed,
		}
	}
	else{
		gameDetails = {
			gameStatus: updateOps.gameStatus
		}
	}

	let allBetsDetails = [];

    Schedule.updateOne({ _id: id }, { $set: updateOps})
        .exec()
		.then(result => {
			if(gameDetails.isGamePlayed === true){

				Bet.find({gameId: id})
					.exec()
					.then(docs => {
						allBetsDetails = docs.map(doc => {
								return {
									_id: doc._id,
									userId: doc.userId, 
									homeTeamPoints: doc.homeTeamPoints,
									awayTeamPoints: doc.awayTeamPoints,
									collectedPoints: doc.collectedPoints
								}
							})
						allBetsDetails.forEach(bet => {
							let pointsCollected = betHelper.checkAndCalculatePointsWhichBetCollectsForCurrentGame(gameDetails, bet);

							const betToUpdateId = bet._id;
							const updateBetOps = {
								collectedPoints: pointsCollected
							}
							Bet.updateOne({ _id: betToUpdateId }, { $set: updateBetOps})
								.exec()
								.then(result => {
									const message = {
										message: 'Bet was properly updated!',
										betId: bet._id,
										userId: bet.userId
									}
									console.log(message);
								})
								.catch(err => {
									console.log(err);
									res.status(500).json({
										error: err
									});
								});

							const userIdToBeUpdated = bet.userId;
							let userCollectedPointsBefore = 0;

							User.findById(userIdToBeUpdated)
								.exec()
								.then(doc => {
									//console.log(doc)
									userCollectedPointsBefore = doc.collectedPoints + pointsCollected;
								})
								.then(() => {
									const updateUserCollectedPoints = {
										collectedPoints: userCollectedPointsBefore
									}
									User.updateOne({ _id: userIdToBeUpdated }, { $set: updateUserCollectedPoints})
										.exec()
										.then(result => {
											const userUpdatedMessage = {
												message: 'User points was properly updated!',
												currentPoints: updateUserCollectedPoints.collectedPoints,
											}
											console.log(userUpdatedMessage);
										})
								})
						})
					})
			}
			else{
				console.log('game is not played.')
			}
            res.status(200).json({
				message: 'Game, Game Bets and User points were correctly updated!'
			});
		})
		.then(() => {
			userHelper.calculateUsersTableAfterGameUpdate();
		})
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.schedule_update_by_id_without_calculations = (req,res,next) => {
    const id = req.params.gameId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Schedule.updateOne({ _id: id }, { $set: updateOps})
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

exports.schedule_delete_by_id = (req, res, next) => {
    const id = req.params.gameWeekId;
    Schedule.deleteOne({ _id: id })
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

exports.schedule_get_all_played = (req, res, next) => {
    //const id = req.params.gameWeekId
    Schedule.find({isGamePlayed: true})
		.sort({gameWeek: -1}) //because first gameWeek which is returned is the last one which was already played
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				schedule: docs.map(doc => {
					return {
						_id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
						gameWeek: doc.gameWeek,
                        season: doc.season,
                        isGameWeekPlayed: doc.isGameWeekPlayed,
						isGamePlayed: doc.isGamePlayed,
						originalGameWeek: doc.originalGameWeek,
						scheduledGameDate: doc.scheduledGameDate,
						homeTeam: doc.homeTeam,//"Unia Leszno",
						awayTeam: doc.awayTeam,//"Falubaz Zielona Góra",
						gameStatus: doc.gameStatus,
						gameResult: doc.gameResult
					}
				})
			}
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error:err
			});
		});
};

/*exports.schedule_get_all_played = (req, res, next) => {
    //const id = req.params.gameWeekId
    Schedule.find({isGameWeekPlayed: true})
		.sort({gameWeek: -1}) //because first gameWeek which is returned is the last one which was already played
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				schedule: docs.map(doc => {
					return {
						_id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
						//author: doc.author,
						gameWeek: doc.gameWeek,
						season: doc.season,
						isGameWeekPlayed: doc.isGameWeekPlayed,
						games: doc.games
					}
				})
			}
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error:err
			});
		});
};*/

exports.schedule_get_last_played = (req, res, next) => {
    //const id = req.params.gameWeekId
    Schedule.find({isGamePlayed: true})
		.sort({gameWeek: -1}) //because first gameWeek which is returned is the last one which was already played
        .limit(1)
        .exec()
		.then(docs => {
			const response = {
				count: docs.length,
				schedule: docs.map(doc => {
					return {
						_id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
						gameWeek: doc.gameWeek,
                        season: doc.season,
                        isGameWeekPlayed: doc.isGameWeekPlayed,
						isGamePlayed: doc.isGamePlayed,
						originalGameWeek: doc.originalGameWeek,
						scheduledGameDate: doc.scheduledGameDate,
						homeTeam: doc.homeTeam,//"Unia Leszno",
						awayTeam: doc.awayTeam,//"Falubaz Zielona Góra",
						gameStatus: doc.gameStatus,
						gameResult: doc.gameResult
					}
				})
			}
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error:err
			});
		});
};

/*exports.schedule_get_last_played = (req, res, next) => {
    //const id = req.params.gameWeekId
    Schedule.find({isGameWeekPlayed: true})
		.sort({gameWeek: -1}) //because first gameWeek which is returned is the last one which was already played
        .limit(1)
        .exec()
		.then(docs => {
			const response = {
				count: docs.length,
				schedule: docs.map(doc => {
					return {
						_id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
						//author: doc.author,
						gameWeek: doc.gameWeek,
						season: doc.season,
						isGameWeekPlayed: doc.isGameWeekPlayed,
						games: doc.games
					}
				})
			}
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error:err
			});
		});
};*/

exports.schedule_get_all_scheduled = (req, res, next) => {
    //const id = req.params.gameWeekId
    Schedule.find({isGamePlayed: false})
		.sort({gameWeek: 1}) //because first gameWeek which is returned is the next one which will be played
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				schedule: docs.map(doc => {
					return {
						_id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
						gameWeek: doc.gameWeek,
                        season: doc.season,
                        isGameWeekPlayed: doc.isGameWeekPlayed,
						isGamePlayed: doc.isGamePlayed,
						originalGameWeek: doc.originalGameWeek,
						scheduledGameDate: doc.scheduledGameDate,
						homeTeam: doc.homeTeam,//"Unia Leszno",
						awayTeam: doc.awayTeam,//"Falubaz Zielona Góra",
						gameStatus: doc.gameStatus,
						gameResult: doc.gameResult
					}
				})
			}
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error:err
			});
		});
};

/*exports.schedule_get_all_scheduled = (req, res, next) => {
    //const id = req.params.gameWeekId
    Schedule.find({isGameWeekPlayed: false})
		.sort({gameWeek: 1}) //because first gameWeek which is returned is the next one which will be played
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				schedule: docs.map(doc => {
					return {
						_id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
						//author: doc.author,
						gameWeek: doc.gameWeek,
						season: doc.season,
						isGameWeekPlayed: doc.isGameWeekPlayed,
						games: doc.games
					}
				})
			}
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error:err
			});
		});
};*/

exports.schedule_get_next_scheduled = (req, res, next) => {
    //const id = req.params.gameWeekId
    Schedule.find({isGamePlayed: false})
		.sort({gameWeek: 1}) //because first gameWeek which is returned is the next one which will be played
        .limit(1)
        .exec()
		.then(docs => {
			const response = {
				count: docs.length,
				schedule: docs.map(doc => {
					return {
						_id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
						gameWeek: doc.gameWeek,
                        season: doc.season,
                        isGameWeekPlayed: doc.isGameWeekPlayed,
						isGamePlayed: doc.isGamePlayed,
						originalGameWeek: doc.originalGameWeek,
						scheduledGameDate: doc.scheduledGameDate,
						homeTeam: doc.homeTeam,//"Unia Leszno",
						awayTeam: doc.awayTeam,//"Falubaz Zielona Góra",
						gameStatus: doc.gameStatus,
						gameResult: doc.gameResult
					}
				})
			}
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error:err
			});
		});
};

/*exports.schedule_get_next_scheduled = (req, res, next) => {
    const id = req.params.gameWeekId
    Schedule.find({isGameWeekPlayed: false})
		.sort({gameWeek: 1}) //because first gameWeek which is returned is the next one which will be played
        .limit(1)
        .exec()
		.then(docs => {
			const response = {
				count: docs.length,
				schedule: docs.map(doc => {
					return {
						_id: doc._id,
						creationDate: doc.creationDate,
						lastUpdateDate: doc.lastUpdateDate,
						author: doc.author,
						gameWeek: doc.gameWeek,
						season: doc.season,
						isGameWeekPlayed: doc.isGameWeekPlayed,
						games: doc.games
					}
				})
			}
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error:err
			});
		});
	};*/
