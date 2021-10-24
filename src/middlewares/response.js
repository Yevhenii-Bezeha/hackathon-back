const responseMiddleware = (req, res, next) => {
  const message = res.message;
  const data = res.data;

  if (message || data) {
    return res.status(200).json({
      ...(message ? { message } : {}),
      ...(data ? { data } : {}),
    });
  }

  return next();
};

export default responseMiddleware;
