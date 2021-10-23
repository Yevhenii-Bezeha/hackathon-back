const Joi = require('joi');
const { Schema, model } = require('mongoose');

const joiCommentSchema = Joi.object({
  comment: Joi.string().min(2).required(),
  idUser: Joi.object().required(),
  idPokemon: Joi.string().required(),
});

const commentSchema = Schema(
  {
    comment: {
      type: String,
      required: [true, 'Set comment'],
      minLength: 2,
    },
    idUser: {
      type: String,
      required: [true, 'Set idUser for your comment'],
      minLength: 1,
    },
    idPokemon: {
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