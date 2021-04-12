const mongoose = require('mongoose');

const User = require('../models/user');
const PlayersResultsTable = require('../models/playersResultsTable');

exports.getAllUsersData = () => {

    User.find({isAdmin: false})
        .exec()
        .then(docs => {
            const response = {
                allUsers: docs.map(doc => {
                    return {
                        _id: doc._id,
                        userName: doc.userName,
                        collectedPoints: doc.collectedPoints
                    }
                })
            }
            return response
        })
        .then(response => {
            let arrayOfUsersSortedByCollectedPoints = this.sortUsersByPoints(response.allUsers)
            //console.log(arrayOfUsersSortedByCollectedPoints)
            return arrayOfUsersSortedByCollectedPoints
        })
        .then(arrayOfUsersSortedByCollectedPoints => {
            //console.log(arrayOfUsersSortedByCollectedPoints)

            const currentRank = this.prepareUserTableValues(arrayOfUsersSortedByCollectedPoints);

            console.log(currentRank);
            
            PlayersResultsTable.find()
                .sort({gameWeek: -1})
                .limit(1)
                .exec()
                .then(docs => {
                    const response = {
                        //count: docs.length,
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
                    //res.status(200).json(response);
                    console.log(response.playerResultsTable[0]);

                    if(response.playerResultsTable[0] === undefined){
                        console.log('Ohh there is no table yet. We need to create the first one!')

                        const playersResultsTable = new PlayersResultsTable({
                            _id: new mongoose.Types.ObjectId(),
                            creationDate: new Date,
                            lastUpdateDate: new Date,
                            gameWeek: 1, //in the future it can be taken from settings???
                            season: 2021,
                            currentRank: [
                                //current rank goes here.
                            ]
                        });

                        //playersResultsTable.save()
                    }
                    else{
                        console.log('We are updating existing already table...')
                    }
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
}

exports.sortUsersByPoints = (users) => {
    users.sort((a, b) => b.collectedPoints - a.collectedPoints);
    return users;
}

exports.prepareUserTableValues = (arrayOfUsers) => {

    let index = 1;

    const response = {
        //count: docs.length,
        usersRank: arrayOfUsers.map(user => {
            return {
                pos: index,
                username: user.userName,
                points: user.collectedPoints,
                arrow: "0"
            }
            index += 1;
        })
    }

    return response;
}