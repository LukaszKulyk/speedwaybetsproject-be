const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAdmin = require('../middleware/check-admin');
const StandingsController = require('../controllers/standings');

router.get('/', StandingsController.standings_get_all);

router.post('/', checkAdmin, StandingsController.standings_create_new);

router.get('/:gameWeekId', StandingsController.standings_get_one_by_id);

router.delete('/:gameWeekId', checkAdmin, StandingsController.standings_delete_one_by_id);

router.patch("/:gameWeekId", checkAdmin, StandingsController.standings_update_one_by_id);

router.get('/table/last', StandingsController.standings_get_last_table);

module.exports = router;