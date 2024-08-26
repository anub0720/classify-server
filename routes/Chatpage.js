const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const chatController = require("../controllers/chatController");

// Endpoint to handle saving chat interactions
router.post('/saveChat', wrapAsync(chatController.saveChat));
router.get('/getChatHistory', wrapAsync(chatController.sendChat));
router.delete('/clearChat', wrapAsync(chatController.clearChat));
module.exports = router;
