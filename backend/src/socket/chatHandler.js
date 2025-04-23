const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { JWT_SECRET } = require('../config/environment');

module.exports = async (socket) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      throw new Error('Not authenticated');
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    socket.user = user;

    socket.join(user._id.toString());
    console.log(`User Connected: ${user._id}`);

    socket.on('setup', () => {
      socket.join(user._id.toString());
      socket.emit('connected');
    });

    socket.on('join chat', (room) => {
      socket.join(room);
      console.log(`User Joined Room: ${room}`);
    });

    socket.on('typing', (room) => socket.in(room).emit('typing', room));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing', room));

    socket.on('new message', (newMessageReceived) => {
      let chat = newMessageReceived.chat;

      if (!chat.users) return console.log('chat.users not defined');

      chat.users.forEach((user) => {
        if (user._id === newMessageReceived.sender._id) return;

        socket.in(user._id).emit('message received', newMessageReceived);
      });
    });

    socket.on('user online', () => {
      socket.broadcast.emit('user status', { userId: user._id, status: 'online' });
    });

    socket.on('mark read', ({ chatId, messageId }) => {
      socket.to(chatId).emit('message read', { messageId, userId: user._id });
    });

    socket.on('leave chat', (room) => {
      socket.leave(room);
      console.log(`User Left Room: ${room}`);
    });

    socket.on('disconnect', () => {
      console.log(`User Disconnected: ${user._id}`);
      socket.broadcast.emit('user status', { userId: user._id, status: 'offline' });
    });

  } catch (error) {
    console.error('Socket authentication error:', error.message);
    socket.disconnect();
  }
};