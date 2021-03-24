const mongoose = require('mongoose');

const standingsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    creationDate: {type: Date},
    lastUpdateDate: { type: Date, default: Date.now },
    gameWeek: { type: Number, required: true },
    season: { type: Number, required: true },
    currentRank: mongoose.Schema.Types.Mixed
}); 

module.exports = mongoose.model('Standings', standingsSchema);