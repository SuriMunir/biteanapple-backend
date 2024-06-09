const { constants } = require('../utils/constants');

const errorHandler = async (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;
  let errTitle = '';

  //catching mongoose error
  if (err.name === 'CastError') {
    statusCode = 400;
    errTitle = 'Database casting error';
  } else if (err.name === 'Validation Error' || err.name === 'ValidatorError') {
    statusCode = 400;
    errTitle = 'Database validation error';
  } else if (err.code === 11000) {
    statusCode = 400;
    errTitle = 'Can have only unique values. Duplicate entry error';
  }

  // create error json
  const getErrorJson = (msg) => {
    return {
      success: false,
      title: errTitle ? errTitle : msg,
      message: err.message,
      stack: err.stack,
    };
  };

  // send error response
  switch (statusCode) {
    case constants.BAD_REQUEST.code:
      res.status(constants.BAD_REQUEST.code);
      res.json(getErrorJson(constants.BAD_REQUEST.message));
      break;
    case constants.UNAUTHORIZED.code:
      res.status(constants.UNAUTHORIZED.code);
      res.json(getErrorJson(constants.UNAUTHORIZED.message));
      break;
    case constants.FORBIDDEN.code:
      res.status(constants.FORBIDDEN.code);
      res.json(getErrorJson(constants.FORBIDDEN.message));
      break;
    case constants.NOT_FOUND.code:
      res.status(constants.NOT_FOUND.code);
      res.json(getErrorJson(constants.NOT_FOUND.message));
      break;
    case constants.SERVER_ERROR.code:
      res.status(constants.SERVER_ERROR.code);
      res.json(getErrorJson(constants.SERVER_ERROR.message));
      break;
    default:
      res.status(500);
      res.json({
        status: 'Error',
        title: 'Oops something went wrong',
        message: err.message,
        stack: err.stack,
      });
      break;
  }
};

module.exports = errorHandler;
