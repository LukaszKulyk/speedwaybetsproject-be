const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const BetController = require('../controllers/bet');

router.get('/', BetController.bet_get_all);

router.post('/', checkAuth, BetController.bet_create_new);

router.get('/:betId', BetController.bet_get_by_id);

router.patch("/:betId", BetController.bet_update_by_id);

router.delete('/:betId', BetController.bet_delete_by_id);

router.get('/user/:userId/all', BetController.bet_get_all_bets_by_user);

router.get('/game/:gameId/all', BetController.bet_get_all_bets_by_game);

router.get('/user/:userId/game/:gameId', BetController.bet_get_user_bet_of_specific_game);

router.get('/user/:userId/game-week/:gameWeek', BetController.bet_get_all_bets_for_current_gameWeek_by_user);

module.exports = router;