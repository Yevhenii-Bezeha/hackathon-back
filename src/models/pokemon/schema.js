import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().min(2).required(),
  ability: Joi.string(),
  photo: Joi.string(),
  userId: Joi.string(),
});

export default schema;
