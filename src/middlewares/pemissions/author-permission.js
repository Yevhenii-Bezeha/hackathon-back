import { ErrorMessages, HttpStatuses } from '../../common/index.js';
import { ResponseError } from '../../helpers/index.js';

const authorPermissionMiddleware = (model) => async (req, res, next) => {
  try {
    const modelAuthorId = model.userId;

    if (req.user._id != modelAuthorId) {
      throw new ResponseError(ErrorMessages.Users.WRONG_PERMISSION, HttpStatuses.FORBIDDEN);
    }
  } catch (error) {
    res.error = error;
  }
};

export default authorPermissionMiddleware;
