import { Router } from 'express';
import { jwtAuthMiddleware, responseMiddleware, errorMiddleware } from '../middlewares/index.js';
import { pokemonsController } from '../controllers/index.js';
import { PokemonsApi } from '../common/index.js';

const initPockemonsApi = () => {
  const router = Router();

  router.get(PokemonsApi.ALL, pokemonsController.getPokemons, responseMiddleware, errorMiddleware);
  router.get(PokemonsApi.ONE, pokemonsController.getPokemon, responseMiddleware, errorMiddleware);
  router.post(
    PokemonsApi.ALL,
    jwtAuthMiddleware,
    pokemonsController.addPokemon,
    responseMiddleware,
    errorMiddleware,
  );
  router.patch(
    PokemonsApi.ONE,
    jwtAuthMiddleware,
    pokemonsController.editPokemon,
    responseMiddleware,
    errorMiddleware,
  );
  router.delete(
    PokemonsApi.ONE,
    jwtAuthMiddleware,
    pokemonsController.deletePokemon,
    responseMiddleware,
    errorMiddleware,
  );

  return router;
};

export default initPockemonsApi;
