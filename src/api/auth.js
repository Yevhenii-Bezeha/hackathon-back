import { authController } from '../controllers/index.js';
import { responseMiddleware, errorMiddleware } from '../middlewares/index.js';
import { AuthApi } from '../common/index.js';

const initAuthApi = (router) => {
  router.post(AuthApi.SIGN_UP, authController.signUp, responseMiddleware, errorMiddleware);
  router.post(AuthApi.SIGN_IN, authController.signIn, responseMiddleware, errorMiddleware);

  return router;
};

export default initAuthApi;
