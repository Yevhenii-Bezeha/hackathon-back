import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commentSchema = Schema(
  {
    text: {
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
  { versionKey: false, timestamps: true },
);

const CommentModel = model('Comment', commentSchema);

export default CommentModel;
