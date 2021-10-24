import Joi from 'joi';

const CommentSchema = Joi.object({
  comment: Joi.string().min(2).required(),
  userId: Joi.object().required(),
  pokemonId: Joi.string().required(),
});

export default CommentSchema;
