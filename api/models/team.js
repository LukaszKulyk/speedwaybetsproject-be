const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	creationDate: {type: Date},
	lastUpdateDate: { type: Date, default: Date.now },
	season: { type: Number, required: true },
    name: { type: String, required: true},
	teamResults: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Team', teamSchema);