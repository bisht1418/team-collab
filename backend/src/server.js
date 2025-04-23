const { server } = require('./app'); 
const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = require('./config/environment');

const port = PORT || 3000;

mongoose.connect(MONGODB_URI)
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