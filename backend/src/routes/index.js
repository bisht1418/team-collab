const express = require('express');
const authRoutes = require('./auth.routes');
const chatRoutes = require('./chat.routes');
const messageRoutes = require('./message.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/chats', chatRoutes);
router.use('/messages', messageRoutes);

module.exports = router;