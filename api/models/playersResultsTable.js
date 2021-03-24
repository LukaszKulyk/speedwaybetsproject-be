const mongoose = require('mongoose');

const playersResultsTableSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    creationDate: {type: Date},
    lastUpdateDate: { type: Date, default: Date.now },
    season: { type: Number, required: true },
    gameWeek: { type: Number, required: true, unique: true},
    currentRank: mongoose.Schema.Types.Mixed
})



module.exports = mongoose.model('PlayersResultsTable', playersResultsTableSchema);