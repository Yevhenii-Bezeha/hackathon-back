import { jwtAuthMiddleware } from '../middlewares/index.js';
import { pokemonsController } from '../controllers/index.js';
import { PokemonsApi } from '../common/index.js';

const initPockemonsApi = (router) => {
  router.get(PokemonsApi.ALL, pokemonsController.getPokemons);
  router.get(PokemonsApi.ONE, pokemonsController.getPokemon);
  router.post(PokemonsApi.ALL, jwtAuthMiddleware, pokemonsController.addPokemon);
  router.patch(PokemonsApi.ONE, jwtAuthMiddleware, pokemonsController.editPokemon);
  router.delete(PokemonsApi.ONE, jwtAuthMiddleware, pokemonsController.deletePokemon);

  return router;
};

export default initPockemonsApi;
