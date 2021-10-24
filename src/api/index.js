import { Router } from 'express';
import { ApiRoutes } from '../common/index.js';
import initAuthApi from './auth.js';
import initPokemonsApi from './pokemons.js';
import initCommentsApi from './comments.js';

const initApi = () => {
  const router = Router();

  router.use(ApiRoutes.AUTH, initAuthApi(router));
  router.use(ApiRoutes.POKEMONS, initPokemonsApi(router));
  router.use(ApiRoutes.COMMENTS, initCommentsApi(router));

  return router;
};

export default initApi;
