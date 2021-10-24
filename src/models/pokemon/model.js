import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const pokemonSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Pokemon should have a name.'],
      minLength: 2,
    },
    ability: {
      type: String,
      required: [true, 'Pokemon should have an ability.'],
      minLength: 1,
    },
    photo: {
      type: String,
      required: [true, 'Pokemon should have a photo.'],
      minLength: 1,
    },
    userId: {
      type: String,
      required: [true, 'Pokemon should have a photo.'],
      minLength: 1,
    },
  },
  { versionKey: false, timestamps: true },
);

const PokemonModel = model('Pokemon', pokemonSchema);

export default PokemonModel;
