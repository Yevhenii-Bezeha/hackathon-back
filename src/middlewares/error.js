const errorMiddleware = (req, res) => {
  const error = res.error;

  return res.send(error.status).json({
    error: error.message,
  });
};

export default errorMiddleware;
