import Joi from 'joi';

const CommentSchema = Joi.object({
  text: Joi.string().min(2).required(),
  pokemonId: Joi.string().required(),
});

export default CommentSchema;
