const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const checkAdmin = require('../middleware/check-admin');

//const Schedule = require('../models/schedule')

const ScheduleController = require('../controllers/schedule');

router.get('/', ScheduleController.schedule_get_all);

router.post('/', ScheduleController.schedule_create_new);

router.get('/:gameWeekId', ScheduleController.schedule_get_by_id);

router.patch('/:gameWeekId', ScheduleController.schedule_update_by_id);

router.delete('/:gameWeekId', ScheduleController.schedule_delete_by_id);

router.get('/played/all', ScheduleController.schedule_get_all_played);

router.get('/played/last', ScheduleController.schedule_get_last_played);

router.get('/scheduled/all', ScheduleController.schedule_get_all_scheduled);

router.get('/scheduled/next', ScheduleController.schedule_get_next_scheduled);

//test
router.get('/scheduled/next/game_week/:nextGameWeek', ScheduleController.schedule_get_all_shceduled_for_next_game_week);

router.get('/played/last/game_week/:lastGameWeek', ScheduleController.schedule_get_all_played_from_last_game_week);

module.exports = router;