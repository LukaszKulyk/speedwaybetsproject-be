const mongoose = require('mongoose');

const betSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	creationDate: {type: Date},
	lastUpdateDate: { type: Date, default: Date.now },
	gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'schedule', required: true},
	userId: { type: mongoose.Schema.Types.ObjectId, required: true},
	gameWeek: { type: Number, required: true },
	homeTeamPoints: { type: Number, required: true },//"Unia Leszno",
	awayTeamPoints: { type: Number, required: true },//"Falubaz Zielona Góra",
	collectedPoints: { type: Number},
});

module.exports = mongoose.model('Bet', betSchema);