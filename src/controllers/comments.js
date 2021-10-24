import { ErrorMessages, Messages } from '../common/index.js';
import { ResponseError } from '../helpers/index.js';
import { CommentModel } from '../models/index.js';

const addComment = async (req, res, next) => {
  if (res.error) {
    return next();
  }

  try {
    const newComment = { ...req.body, userId: req.user._id };
    const comment = await CommentModel.create(newComment);

    if (!comment) {
      throw new ResponseError(ErrorMessages.Comments.ADDING_ERROR);
    }

    res.data = comment;
  } catch (error) {
    res.error = error;
  }

  return next();
};

const deleteComment = async (req, res, next) => {
  if (res.error) {
    return next();
  }

  try {
    const commentId = req.params.id;

    const isDeleted = await CommentModel.findByIdAndDelete(commentId);
    if (!isDeleted) {
      throw new ResponseError(ErrorMessages.Comments.DELETING_ERROR);
    }

    res.message = Messages.Comments.DELETED_SUCCESSFULLY;
  } catch (error) {
    res.error = error;
  }

  return next();
};

export default { addComment, deleteComment };
