const Joi = require('joi');
const {Schema, model} = require('mongoose');

const joiPokemonSchema = Joi.object({
  name: Joi.string().min(2).required(),
  ability: Joi.string(),
  photo: Joi.string(),
  userId: Joi.string(),
});

const pokemonSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for your pickachu'],
      minLength: 2,
    },
    ability: {
      type: String,
      required: [true, 'Set ability for your pickachu'],
      minLength: 1,
    },
    photo: {
      type: String,
      required: [true, 'Set ability for your pickachu'],
      minLength: 1,
    },
    userId: {
      type: String,
    }
  },
  {versionKey: false, timestamps: true}
);

const Pokemon = model('pokemon', pokemonSchema);

module.exports = {
  Pokemon,
  joiPokemonSchema,
};