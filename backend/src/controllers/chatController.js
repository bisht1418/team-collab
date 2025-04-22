const ChatRoom = require("../models/chatRoomModel");
const Message = require("../models/messageModel");

exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await ChatRoom.find().populate("members", "email");
    res.json(rooms);
  } catch (err) {
    next(err);
  }
};

exports.getMessagesByRoom = async (req, res, next) => {
  try {
    const messages = await Message.find({ room: req.params.roomId }).populate("sender", "email").sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
};
