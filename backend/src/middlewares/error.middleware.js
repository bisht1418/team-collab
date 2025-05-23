// src/middlewares/error.middleware.js

const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const { NODE_ENV } = require('../config/environment');

/**
 * Error converter middleware
 * @param {Error} err
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const errorConverter = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 
      (error instanceof mongoose.Error ? 400 : 500);
    const message = error.message || 'Something went wrong';
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

/**
 * Error handler middleware
 * @param {ApiError} err
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const errorHandler = (err, req, res, next) => {
  const { statusCode, message, isOperational, stack } = err;

  res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: statusCode === 500 && !isOperational 
      ? 'Internal server error' 
      : message,
    ...(NODE_ENV === 'development' && { stack }),
  });
};

module.exports = {
  errorConverter,
  errorHandler,
};