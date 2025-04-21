const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const express = require('express');
const logger = require('./utils/logger');
const connectDB = require('./db/mongoose');
const errorHandler = require('./middlewares/errorHandler');
const { NODE_ENV, PORT, APP_VERSION } = require('./config/environment');

const app = express();

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(`/api/${APP_VERSION}`, routes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;