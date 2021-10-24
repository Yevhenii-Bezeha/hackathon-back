import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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
      default: 'user',
    },
    avatar: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

const UserModel = model('User', userSchema);

export default UserModel;
