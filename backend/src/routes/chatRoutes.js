const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/rooms", chatController.getAllRooms);
router.get("/rooms/:roomId/messages", chatController.getMessagesByRoom);

module.exports = router;
