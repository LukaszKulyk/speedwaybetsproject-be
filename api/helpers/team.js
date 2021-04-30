const mongoose = require('mongoose');

const Team = require('../models/team');
const Standings = require('../models/standings');

exports.getLastStandingsAndUpdateWithCurrentValues = () => {
    Standings.find()
        .sort({gameWeek: -1})
        .limit(1)
        .exec()
        .then(docs => {
            const response = {
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

            return response.standings;
        })
        .then(currentStandings => {
            if(currentStandings.length > 0){
                console.log('Ok We have something to work with')
            }
            else{
                console.log('We do not have any table yet, we are going to create one.')
            }
        })
        /*.catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });*/
}

exports.calculateNewResultsTableValues = () => {
    console.log('We are going to calculate new Results Table now.')
}

exports.allTeamsDataSortedByPosition = () => {

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
            console.log(response);
        })
}