const Joi = require('joi');
const { Schema, model } = require('mongoose');
const bcrypt = require("bcryptjs");

const joiUserSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().min(2).required(),
  password: Joi.string().min(2).required(),
  role: Joi.string(),
});

const joiUserUpdateStatusSchema = Joi.object({
  role: Joi.string().valid("user", "admin"),
});

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for your user'],
      minLength: 2,
    },
    email: {
      type: String,
      required: [true, 'Set email for your user'],
      unique: true,
      minLength: 1,
    },
    password: {
      type: String,
      required: [true, 'Set password for your user'],
      minLength: 4,
    },
    role: {
      type: String,
      default: 'user'
    }
  },
  { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);

module.exports = {
  User,
  joiUserSchema,
};