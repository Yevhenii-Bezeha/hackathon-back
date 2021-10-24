import { CommentsApi } from '../common/index.js';
import { jwtAuthMiddleware } from '../middlewares/index.js';
import { commentsController } from '../controllers/index.js';

const initCommentsApi = (router) => {
  router.post(CommentsApi.ALL, jwtAuthMiddleware, commentsController.addComment);
  router.delete(CommentsApi.ONE, jwtAuthMiddleware, commentsController.deleteComment);

  return router;
};

export default initCommentsApi;
