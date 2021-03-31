const express = require('express');
const router = express.Router();

const checkAdmin = require('../middleware/check-admin');
const PlayersResultsTableController = require('../controllers/playersResultsTable');

router.get('/', PlayersResultsTableController.playersResultsTable_get_all);

router.post('/', checkAdmin, PlayersResultsTableController.playersResultsTable_create_new);

router.get('/:gameWeekId', PlayersResultsTableController.playersResultsTable_get_one_by_id);

router.patch('/:gameWeekId', checkAdmin, PlayersResultsTableController.playersResultsTable_update_one_by_id);

router.delete('/:gameWeekId', checkAdmin, PlayersResultsTableController.playersResultsTable_delete_one_by_id);

router.get('/results/last', PlayersResultsTableController.playersResultsTable_get_last_results);

module.exports = router;