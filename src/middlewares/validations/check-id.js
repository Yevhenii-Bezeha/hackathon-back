import Mongoose from 'mongoose';
import { ErrorMessages } from '../../common/index.js';
import { ResponseError } from '../../helpers/index.js';

const checkIdMiddleWare = (model) => async (req, res, next) => {
  if (res.error) {
    return next();
  }

  try {
    const modelId = req.params.id;

    if (!Mongoose.isValidObjectId(modelId)) {
      throw new ResponseError(ErrorMessages.WRONG_ID_FORMAT);
    }
  } catch (error) {
    res.error = error;
  }

  return next();
};

export default checkIdMiddleWare;
