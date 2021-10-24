const responseMiddleware = ({ res, data, status = 200, statusMessage }) => {
  return res.status(status).json({
    status: statusMessage,
    code: status,
    data,
  });
};

export default responseMiddleware;
