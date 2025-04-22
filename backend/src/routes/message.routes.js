// routes/messageRoutes.js
const express = require('express');
const { auth } = require('../middlewares/auth.middleware');
const {
  sendMessage,
  allMessages,
  markAsRead,
  deleteMessage
} = require('../controllers/message.controller');

const router = express.Router();

router.route('/').post(auth, sendMessage);
router.route('/:chatId').get(auth, allMessages);
router.route('/:messageId/read').put(auth, markAsRead);
router.route('/:messageId').delete(auth, deleteMessage);

module.exports = router;