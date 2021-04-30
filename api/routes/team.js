const express = require('express');
const router = express.Router();

const checkAdmin = require('../middleware/check-admin');
const TeamController = require('../controllers/team');

router.get('/', TeamController.team_get_all);
router.post('/', checkAdmin, TeamController.team_create_new);
router.get('/:teamId', TeamController.team_get_one_by_id);
router.delete('/:teamId', checkAdmin, TeamController.team_delete_one_by_id);
router.patch('/:teamId', checkAdmin, TeamController.team_update_one_by_id);

router.patch('/table/update', checkAdmin, TeamController.team_update_current_table_or_create_new)

module.exports = router;