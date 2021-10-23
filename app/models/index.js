const { Pokemon, joiPokemonSchema } = require("./pokemons");
const { User, joiUserSchema } = require("./users");
const { Comment, joiCommentsSchema } = require("./comments");


module.exports = {
    Pokemon,
    joiPokemonSchema,
    User,
    joiUserSchema,
    Comment,
    joiCommentsSchema,
};