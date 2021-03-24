const mongoose = require('mongoose');

const PlayersResultsTable = require('../models/playersResultsTable');

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
        .sort({gameWeek: -1})
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