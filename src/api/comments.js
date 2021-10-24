import { CommentsApi } from '../common/index.js';
import { jwtAuthMiddleware, responseMiddleware, errorMiddleware } from '../middlewares/index.js';
import { commentsController } from '../controllers/index.js';

const initCommentsApi = (router) => {
  router.post(
    CommentsApi.ALL,
    jwtAuthMiddleware,
    commentsController.addComment,
    responseMiddleware,
    errorMiddleware,
  );
  router.delete(
    CommentsApi.ONE,
    jwtAuthMiddleware,
    commentsController.deleteComment,
    responseMiddleware,
    errorMiddleware,
  );

  return router;
};

export default initCommentsApi;
