import { ErrorMessages } from '../../common/index.js';
import { ResponseError } from '../../helpers/index.js';

const adminPermissionMiddleware = async (req, res, next) => {
  if (res.error) {
    return next();
  }

  try {
    if (req.user.type != 'admin') {
      throw new ResponseError(ErrorMessages.Users.WRONG_PERMISSION);
    }
  } catch (error) {
    res.error = error;
  }

  return next();
};

export default adminPermissionMiddleware;
