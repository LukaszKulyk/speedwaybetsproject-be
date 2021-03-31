const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');
const BetController = require('../controllers/bet');

router.get('/', checkAdmin, BetController.bet_get_all);

router.post('/', checkAuth, BetController.bet_create_new);

router.get('/:betId', checkAuth, BetController.bet_get_by_id);

router.patch("/:betId", checkAuth, BetController.bet_update_by_id);

router.delete('/:betId', checkAdmin, BetController.bet_delete_by_id);

router.get('/user/:userId/all', BetController.bet_get_all_bets_by_user);

router.get('/game/:gameId/all', checkAdmin, BetController.bet_get_all_bets_by_game);

router.get('/user/:userId/game/:gameId', BetController.bet_get_user_bet_of_specific_game);

router.get('/user/:userId/game-week/:gameWeek', BetController.bet_get_all_bets_for_current_gameWeek_by_user);

module.exports = router;