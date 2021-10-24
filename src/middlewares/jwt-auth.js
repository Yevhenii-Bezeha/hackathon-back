import jwt from 'jsonwebtoken';
import { authConfig } from '../configs/index.js';

const jwtAuthMiddleware = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

export default jwtAuthMiddleware;
