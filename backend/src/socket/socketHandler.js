const Message = require("../models/messageModel");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("⚡ Client connected:", socket.id);

    // Join a chat room
    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
      console.log(`📥 Socket ${socket.id} joined room ${roomId}`);
    });

    // Handle message send
    socket.on("sendMessage", async ({ roomId, senderId, content }) => {
      const message = await Message.create({ room: roomId, sender: senderId, content });

      // Emit to all users in the room
      io.to(roomId).emit("newMessage", {
        _id: message._id,
        room: roomId,
        sender: senderId,
        content,
        createdAt: message.createdAt
      });
    });

    socket.on("disconnect", () => {
      console.log("🔌 Client disconnected:", socket.id);
    });
  });
};
