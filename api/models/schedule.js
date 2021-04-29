const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	creationDate: {type: Date},
	lastUpdateDate: { type: Date, default: Date.now },
	gameWeek: { type: Number, required: true },
	season: { type: Number, required: true },
	isGamePlayed: { type: Boolean, required: true, default: false },
	originalGameWeek: { type: Number, required: true},
	isGameWeekPlayed: { type: Boolean, required: true, default: false },
	scheduledGameDate: { type: Date, required: true },//2020-05-12,
	homeTeam: { type: String, required: true },//"Unia Leszno",
	awayTeam: { type: String, required: true },//"Falubaz Zielona Góra",
	gameStatus: { type: String, required: true , default: 'scheduled'},
	gameResult: {
		winner: { type: String, default: null },//"Falubaz Zielona Góra"/"draw",
		bigPoints: { type: Number, default: null },//2/1,
		isBonusPoint: { type: Boolean, default: null },//false/true,
		smallPoints: { type: Number, default: null },//8,
		homeTeamPoints: { type: Number, default: null },//41,
		awayTeamPoints: { type: Number, default: null }//49
	}
});

module.exports = mongoose.model('Schedule', scheduleSchema);