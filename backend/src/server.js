const app = require('./app');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config/environment');

const port = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(`✅ Successfully connected to MongoDB at ${MONGODB_URI}`);

    const server = app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });

    const unexpectedErrorHandler = (error) => {
      console.error('❌ Unexpected error:', error);

      if (server) {
        server.close(() => {
          console.log('🛑 Server closed');
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);

    process.on('SIGTERM', () => {
      console.log('🔄 SIGTERM received');
      if (server) {
        server.close(() => {
          console.log('🛑 Server closed');
          process.exit(0);
        });
      }
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });