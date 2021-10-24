import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/index.js';
import { authConfig } from '../configs/index.js';
import { ResponseError } from '../helpers/index.js';
import { ErrorMessages, Messages } from '../common/index.js';

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new ResponseError(ErrorMessages.Users.WRONG_EMAIL);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ResponseError(ErrorMessages.Users.WRONG_PASSWORD);
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: TOKEN_EXPIRING_TIME,
    });

    res.data = {
      name: user.name,
      email: user.email,
      token,
    };
  } catch (error) {
    res.error = error;
  }

  return next();
};

const signUp = async (req, res, next) => {
  try {
    const { email, name, password: passwordToHash } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new ResponseError(ErrorMessages.Users.DUBLICATING_EMAIL);
    }

    const password = await bcrypt.hash(passwordToHash, 8);
    const newUser = new UserModel({ email, name, password });
    await newUser.save();

    res.message = Messages.Users.SIGNED_UP_SUCCESSFULLY;
  } catch (error) {
    res.error = error;
  }

  return next();
};

export default { signIn, signUp };
