import { authController } from '../controllers/index.js';
import { AuthApi } from '../common/index.js';

const initAuthApi = (router) => {
  router.post(AuthApi.SIGN_UP, authController.signUp);
  router.post(AuthApi.SIGN_IN, authController.signIn);

  return router;
};

export default initAuthApi;
