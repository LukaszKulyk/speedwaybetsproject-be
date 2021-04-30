const mongoose = require('mongoose');

const Team = require('../models/team');
//const PlayersResultsTable = require('../models/playersResultsTable');

const teamHelper = require('../helpers/team')

/*
router.get('/', TeamController.team_get_all);
router.post('/', TeamController.team_create_new);
router.get('/teamId', TeamController.team_get_one_by_id);
router.delete('/teamId', TeamController.team_delete_one_by_id);
router.patch('/', TeamController.team_update_one_by_id);
*/

exports.team_get_all = (req, res, next) => {

    Team.find()
        .sort({'teamResults.position': 1})
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                teams: docs.map(doc => {
                    return {
                        _id: doc._id,
                        creationDate: doc.creationDate,
                        lastUpdateDate: doc.lastUpdateDate,
                        season: doc. season,
                        name: doc.name,
                        teamResults: doc.teamResults
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

exports.team_create_new = (req, res, next) => {
    const team = new Team({
        _id: new mongoose.Types.ObjectId(),
        creationDate: new Date,
		lastUpdateDate: new Date,
        season: req.body.season,
        name: req.body.name,
        teamResults : req.body.teamResults
    })

    team.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    res.status(201).json({
        message: 'New team has been created.',
        team: team
    })
}

exports.team_get_one_by_id = (req, res, next) => {
    const id = req.params.teamId
    Team.findById(id)
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

exports.team_delete_one_by_id = (req, res, next) => {
    const id = req.params.teamId;
    Team.deleteOne({ _id: id })
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

exports.team_update_one_by_id = (req, res, next) => {
    const id = req.params.teamId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Team.updateOne({ _id: id }, { $set: updateOps})
        .exec()
        .then(result => {
            const updatedTeamMessage = {
                message: 'Team has been updated.',
            }
            console.log(result);
            res.status(200).json(updatedTeamMessage);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.team_update_current_table_or_create_new = (req, res, next) => {
    //const gameWeek = req.body.gameWeek;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    const currentStandings = teamHelper.getLastStandingsAndUpdateWithCurrentValues()
    console.log(currentStandings)
    //console.log(updateOps);
    //const allTeamsDataSortedByPosition = teamHelper.allTeamsDataSortedByPosition();
    //console.log(allTeamsDataSortedByPosition);
    //teamHelper.calculateNewResultsTableValues();
}