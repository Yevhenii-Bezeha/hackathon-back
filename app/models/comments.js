const Joi = require('joi');
const { Schema, model } = require('mongoose');

const joiCommentSchema = Joi.object({
  comment: Joi.string().min(2).required(),
  userId: Joi.object().required(),
  pokemonId: Joi.string().required(),
});

const commentSchema = Schema(
  {
    comment: {
      type: String,
      required: [true, 'Set comment'],
      minLength: 2,
    },
    userId: {
      type: String,
      required: [true, 'Set idUser for your comment'],
      minLength: 1,
    },
    pokemonId: {
      type: String,
      required: [true, 'Set idPokemon for your comment'],
      minLength: 1,
    },
  },
  { versionKey: false, timestamps: true }
);

const Comment = model('comment', commentSchema);

module.exports = {
  Comment,
  joiCommentSchema,
};