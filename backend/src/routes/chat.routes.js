// routes/chatRoutes.js
const express = require('express');
const { auth } = require('../middlewares/auth.middleware'); // Assuming you have auth middleware
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup
} = require('../controllers/chat.controller');

const router = express.Router();

router.route('/').post(auth, accessChat);
router.route('/').get(auth, fetchChats);
router.route('/group').post(auth, createGroupChat);
router.route('/rename').put(auth, renameGroup);
router.route('/groupadd').put(auth, addToGroup);
router.route('/groupremove').put(auth, removeFromGroup);

module.exports = router;