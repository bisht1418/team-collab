const http = require('http');
const mongoose = require('mongoose');
const app = require('./app'); // 👈 now just the express app
const { MONGODB_URI, PORT } = require('./config/environment');

const port = PORT || 3000;

const server = http.createServer(app);

const socketInit = require('./socket/socket');
const chatHandler = require('./socket/chatHandler');
const io = socketInit.init(server);
io.on('connection', chatHandler);

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 15000, 
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log(`✅ MongoDB connected`);
    server.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });

    const unexpectedErrorHandler = (error) => {
      console.error('❌ Unexpected error:', error);
      if (server) server.close(() => process.exit(1));
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);
    process.on('SIGTERM', () => {
      console.log('🔄 SIGTERM received');
      server.close(() => process.exit(0));
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });
