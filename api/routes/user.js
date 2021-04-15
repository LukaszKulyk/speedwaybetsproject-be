const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkAdmin = require('../middleware/check-admin');
const UserController = require('../controllers/user');

router.post('/signup', UserController.user_singup);

router.post('/login', UserController.user_login);

//router.get('/currenttable/calculate', UserController.user_calculate_and_update_players_table);

router.delete('/:userId', checkAdmin, UserController.user_delete_one_by_id);

router.patch('/:userId', checkAdmin, UserController.user_update_by_id);

router.get('/players/all', UserController.get_all_players);

router.get('/calculate-current-table', UserController.user_calculate_and_update_players_table);

module.exports = router;