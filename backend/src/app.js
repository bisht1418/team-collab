const cors = require('cors');
const http = require("http");
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const express = require('express');
const { Server } = require("socket.io");
const logger = require('./utils/logger');
const connectDB = require('./db/mongoose');
const socketHandler = require('./socket/socketHandler');
const errorHandler = require('./middlewares/errorHandler');
const { NODE_ENV, PORT, APP_VERSION } = require('./config/environment');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
socketHandler(io);

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use("", (req, res)=>{
  res.json({server : "success"})
})
app.use(`/api/${APP_VERSION}`, routes);

app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
});

// app.use(errorHandler);

server.listen(PORT, () => {
  logger.info(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
