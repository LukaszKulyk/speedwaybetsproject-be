const mongoose = require('mongoose');

const Standings = require('../models/standings');

exports.standings_get_all = (req, res, next) => {
    Standings.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                standings: docs.map(doc => {
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
};

exports.standings_create_new = (req, res, next) => {
    const standings = new Standings({
        _id: new mongoose.Types.ObjectId(),
        creationDate: new Date,
		lastUpdateDate: new Date,
        gameWeek: req.body.gameWeek,
        season: req.body.season,
        currentRank: req.body.currentRank
    });

    standings.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(201).json({
        message: 'New Standings have been created.',
        createdStandings: standings
    });
}

exports.standings_get_one_by_id = (req, res, next) => {
    const id = req.params.gameWeekId
    Standings.findById(id)
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

exports.standings_delete_one_by_id = (req, res, next) => {
    const id = req.params.gameWeekId;
    Standings.deleteOne({ _id: id })
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

exports.standings_update_one_by_id = (req,res,next) => {
    const id = req.params.gameWeekId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Standings.updateOne({ _id: id }, { $set: updateOps})
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

exports.standings_get_last_table = (req, res, next) => {
    Standings.find()
        .sort({gameWeek: -1})
        .limit(1)
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                standings: docs.map(doc => {
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
};