const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const UserController = require('../controllers/user');

router.post('/signup', UserController.user_singup);

router.post('/login', UserController.user_login);

router.delete('/:userId', UserController.user_delete_one_by_id);






module.exports = router;