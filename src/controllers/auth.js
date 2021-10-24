import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/index.js';

const signIn = async (req, res, next) => {
  const { email, password: passwordToCheck } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return sendResponse({
      res,
      status: 404,
      statusMessage: 'error',
      data: {
        message: 'User wasn`t registered',
      },
    });
  }

  const passwordIsValid = await bcrypt.compareSync(passwordToCheck, user.password);

  if (!passwordIsValid) {
    return sendResponse({
      res,
      status: 400,
      statusMessage: 'error',
      data: {
        message: 'User or password not valid',
      },
    });
  }

  const accessToken = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: TOKEN_EXPIRING_TIME,
  });

  res.data = {
    res,
    status: 200,
    statusMessage: 'successfully login',
    data: {
      name: user.name,
      email: user.email,
      accessToken,
    },
  };

  return next();
};

const signUp = async (req, res, next) => {
  const { email, name, password: passwordToHash } = req.body;
  const userIsExist = await UserModel.findOne({ email });

  if (userIsExist) {
    return sendResponse({
      res,
      status: 409,
      statusMessage: 'Error',
      data: {
        message: 'User with this email already exist',
      },
    });
  }

  const password = await bcrypt.hashSync(passwordToHash, 8);
  const newUser = new UserModel({ email, name, password });
  await newUser.save();

  res.data = {
    res,
    status: 200,
    statusMessage: 'User successfully registered',
    data: {
      message: 'User successfully registered',
    },
  };

  return next();
};

export default { signIn, signUp };
