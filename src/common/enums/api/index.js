const ApiRoutes = {
  POKEMONS: '/pokemons',
  COMMENTS: '/comments',
  USERS: '/users',
  AUTH: '/auth',
};

export { default as UsersApi } from './users.js';
export { default as AuthApi } from './auth.js';
export { default as PokemonsApi } from './pokemons.js';
export { default as CommentsApi } from './comments.js';
export { ApiRoutes };
