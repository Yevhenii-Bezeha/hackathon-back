const { Pokemon, joiPokemonSchema } = require("./pokemons");
const { User, joiUserSchema } = require("./users");
const { Comments, joiCommentsSchema } = require("./comments");


module.exports = {
    Pokemon,
    joiPokemonSchema,
    User,
    joiUserSchema,
    Comments,
    joiCommentsSchema,
};