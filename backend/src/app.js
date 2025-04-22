const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const http = require('http'); // Missing HTTP import
const express = require('express');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error.middleware');

// Create app first
const app = express();

// Apply middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());
app.use(cors());
app.options('*', cors());
app.use(compression());

// Routes
app.use('/api', routes);
app.get('/health', (req, res) => res.status(200).send({ status: 'OK' }));
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found',
  });
});

// Error handling middleware
app.use(errorConverter);
app.use(errorHandler);

// Create server after app is defined
const server = http.createServer(app);

// Initialize socket
const socketInit = require('./socket/socket');
const chatHandler = require('./socket/chatHandler');
const io = socketInit.init(server);
io.on('connection', chatHandler);

module.exports = app;