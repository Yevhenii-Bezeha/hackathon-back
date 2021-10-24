import { CommentModel, UserModel } from '../models/index.js';

const addComment = async (req, res) => {
  const newComment = { ...req.body, userId: req.userId };
  const comment = await Comment.create(newComment);
  let statusMessage;
  let status;
  if (comment) {
    statusMessage = `comment is added`;
    status = 200;
  } else {
    statusMessage = `comment wasn't added`;
    status = 400;
  }

  sendResponse({ res, data: comment, status, statusMessage });
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const { userId } = await CommentModel.findById(commentId);
  const { role } = await UserModel.findById(req.userId);

  let statusMessage;
  let status;
  let deleted;
  if (userId === req.userId || role === 'admin') {
    deleted = await CommentModel.findByIdAndDelete(commentId);
    console.log('deleted', deleted);

    if (deleted) {
      statusMessage = 'comment is deleted';
      status = 200;
    } else {
      statusMessage = `comment ${commentId} wasn't deleted`;
      status = 404;
    }
  } else {
    statusMessage = 'failed, no permission';
    status = 401;
  }

  sendResponse({ res, data: deleted, status, statusMessage });
};

export default { addComment, deleteComment };
