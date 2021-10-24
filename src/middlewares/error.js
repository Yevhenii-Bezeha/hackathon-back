import { ErrorMessages, HttpStatuses } from '../common/index.js';

const errorMiddleware = (req, res, next) => {
  const error = res.error;

  if (error) {
    console.error(error);

    return res.status(error.status || HttpStatuses.ERROR).json({
      error: error.message || ErrorMessages.COMMON_ERROR,
    });
  }

  return next();
};

export default errorMiddleware;
