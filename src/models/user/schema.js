import Joi from 'joi';

const UserSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().min(2).required(),
  password: Joi.string().min(2).required(),
  role: Joi.string(),
  avatar: Joi.string(),
});

export default UserSchema;
