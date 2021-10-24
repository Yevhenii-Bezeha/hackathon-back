import { ErrorMessages, Messages } from '../common/index.js';
import { ResponseError } from '../helpers/index.js';
import { CommentModel, UserModel } from '../models/index.js';

const addComment = async (req, res, next) => {
  if (res.error) {
    return next();
  }

  try {
    const newComment = { ...req.body, userId: req.userId };
    const comment = await Comment.create(newComment);

    if (!comment) {
      throw new ResponseError(ErrorMessages.Comments.ADDED_SUCCESSFULLY);
    }

    res.data = Messages.Comments.ADDED_SUCCESSFULLY;
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
    const { userId } = await CommentModel.findById(commentId);
    const { role } = await UserModel.findById(req.userId);

    if (!(userId === req.user._id || role === 'admin')) {
      throw new ResponseError(ErrorMessages.Comments.DELETING_ERROR);
    }

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
