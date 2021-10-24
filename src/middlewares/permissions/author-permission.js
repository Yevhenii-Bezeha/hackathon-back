import { ErrorMessages, HttpStatuses } from '../../common/index.js';
import { ResponseError } from '../../helpers/index.js';

const authorPermissionMiddleware = (model) => async (req, res, next) => {
  if (res.error) {
    return next();
  }

  try {
    const modelId = req.params.id;
    const existingModel = await model.findById(modelId);

    if (req.user._id != existingModel.userId) {
      throw new ResponseError(ErrorMessages.Users.WRONG_PERMISSION, HttpStatuses.FORBIDDEN);
    }
  } catch (error) {
    res.error = error;
  }

  return next();
};

export default authorPermissionMiddleware;
