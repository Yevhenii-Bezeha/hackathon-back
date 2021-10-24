import jwt from 'jsonwebtoken';
import { ErrorMessages, HttpStatuses } from '../common/index.js';
import { ResponseError } from '../helpers/index.js';
import { UserModel } from '../models/index.js';
import { authConfig } from '../configs/index.js';

const jwtAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      throw new ResponseError(ErrorMessages.Users.NO_TOKEN, HttpStatuses.FORBIDDEN);
    }

    let decodedData;
    jwt.verify(token, authConfig.secret, (error, decoded) => {
      if (error) {
        throw new ResponseError(ErrorMessages.Users.WRONG_TOKEN, HttpStatuses.NOT_AUTHORIZED);
      }

      decodedData = decoded;
    });

    req.user = await UserModel.findById(decodedData.id);
  } catch (error) {
    res.error = error;
  }

  return next();
};

export default jwtAuthMiddleware;
