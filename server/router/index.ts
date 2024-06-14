const express = require('express');
const giftController = require('../controllers/gift-controller');
const actionController = require('../controllers/action-controller')
const giftService = require('../services/gift-service')
const router = express.Router();


router.get('/gift', giftController.getAllGifts);
router.get('/gift/:id', giftController.getGiftById);

router.get('/actions', actionController.getActionsAll);
router.get('/actions/:id', actionController.getActionById)
router.post('/actions', actionController.createAction)
router.delete('/actions/:id', actionController.deleteAction)
router.put('/actions', actionController.updateAction)
router.get('/actionSearch', actionController.searchAction)

module.exports = router;
