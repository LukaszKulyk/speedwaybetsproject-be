const mongoose = require('mongoose');

const User = require('../models/user');
const PlayersResultsTable = require('../models/playersResultsTable');

exports.calculateUsersTableAfterGameUpdate = () => {

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
            return arrayOfUsersSortedByCollectedPoints
        })
        .then(arrayOfUsersSortedByCollectedPoints => {

            const currentRank = this.prepareUserTableValues(arrayOfUsersSortedByCollectedPoints);
            
            PlayersResultsTable.find()
                .sort({gameWeek: -1})
                .limit(1)
                .exec()
                .then(docs => {
                    const response = {
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

                    if(response.playerResultsTable[0] === undefined){
                        console.log('Ohh there is no table yet. We need to create the first one!')

                        const playersResultsTable = new PlayersResultsTable({
                            _id: new mongoose.Types.ObjectId(),
                            creationDate: new Date,
                            lastUpdateDate: new Date,
                            gameWeek: 1, //in the future it can be taken from settings???
                            season: 2021, //in the future it can be taken from settings???
                            currentRank: currentRank.usersRank
                        });

                        playersResultsTable.save()
                            .then(result => {
                                console.log(result);
                            })
                    }
                    else{
                        console.log('We are updating existing already table...')

                        let updatedPlayersTableData = this.setCurrentRankArrows(currentRank.usersRank, response.playerResultsTable[0].currentRank)

                        const id = response.playerResultsTable[0]._id
                        const updateOps = {
                            currentRank: updatedPlayersTableData
                        }
                        
                        PlayersResultsTable.updateOne({ _id: id }, { $set: updateOps})
                            .exec()
                            .then(result => {
                                console.log(result);
                            })
                    }
                })
        })
        .then(() => {
            res.status(200).json({
                message: 'Current table has been updated!'
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

    const response = {
        usersRank: arrayOfUsers.map((user, index) => {
            return {
                pos: index + 1,
                username: user.userName,
                points: user.collectedPoints,
                arrow: "0",
            }
        })
    }

    return response;
}

exports.setCurrentRankArrows = (currentRank, lastRank) => {

    currentRank.forEach(user => {
        let lastPosition = lastRank.filter(function(p){return p.username === user.username})
        let positionChange = this.calculatePositionDifference(user.pos, lastPosition[0].pos)
        let arrowValue = this.preparePositionDifferenceForArrow(positionChange)
        user.arrow = arrowValue
    })
    return currentRank
}

exports.calculatePositionDifference = (currentPosition, lastPosition) => {
    return lastPosition - currentPosition
}

exports.preparePositionDifferenceForArrow = (positionDifference) => {
    if(positionDifference > 0){
        return '+' + positionDifference.toString()
    }
    else{
        return positionDifference.toString()
    }
}