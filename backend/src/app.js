const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const express = require('express');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());
app.use(cors({
  origin: true,
  credentials: true,
}));
app.options('*', cors());
app.use(compression());

app.use('/api', routes);
app.get('/health', (req, res) => res.status(200).send({ status: 'OK' }));

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found',
  });
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app; // ✅ Just export the app
