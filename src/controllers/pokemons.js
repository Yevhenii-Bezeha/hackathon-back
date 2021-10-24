import { PokemonModel } from '../models/index.js';
import { ResponseError } from '../helpers/index.js';
import { ErrorMessages, Messages } from '../common/index.js';

const getPokemons = async (req, res, next) => {
  if (res.error) {
    return next();
  }

  try {
    const pokemons = await PokemonModel.find();

    if (!pokemons.length) {
      throw new ResponseError(ErrorMessages.Pokemons.NOT_FOUND);
    }

    res.data = pokemons;
  } catch (error) {
    res.error = error;
  }

  return next();
};

const getPokemon = async (req, res, next) => {
  if (res.error) {
    return next();
  }

  try {
    const pockemonId = req.params.id;
    const pokemon = await PokemonModel.findById(pockemonId);

    if (!pokemon) {
      throw new ResponseError(ErrorMessages.Pokemons.NOT_FOUND);
    }

    res.data = pokemon;
  } catch (error) {
    res.error = error;
  }

  return next();
};

const addPokemon = async (req, res, next) => {
  if (res.error) {
    return next();
  }

  try {
    const newPokemon = { ...req.body, userId: req.user._id };
    const pokemon = await PokemonModel.create(newPokemon);

    if (!pokemon) {
      throw new ResponseError(ErrorMessages.Pokemons.ADDING_ERROR);
    }

    res.data = pokemon;
  } catch (error) {
    res.error = error;
  }

  return next();
};

const editPokemon = async (req, res, next) => {
  if (res.error) {
    return next();
  }

  try {
    const pokemonId = req.params.id;

    const existingPokemon = await PokemonModel.findById(pokemonId).lean();
    delete existingPokemon._id;
    const pockemon = await PokemonModel.findOneAndUpdate(
      pokemonId,
      { ...req.body, ...existingPokemon },
      { new: true },
    );

    if (!pockemon) {
      throw new ResponseError(ErrorMessages.Pokemons.EDITING_ERROR);
    }

    res.data = pockemon;
  } catch (error) {
    res.error = error;
  }

  return next();
};

const deletePokemon = async (req, res, next) => {
  if (res.error) {
    return next();
  }

  try {
    const pokemonId = req.params.id;
    const isDeleted = await PokemonModel.findByIdAndDelete(pokemonId);

    if (!isDeleted) {
      throw new ResponseError(ErrorMessages.Pokemons);
    }

    res.message = Messages.Pokemons.DELETED_SUCCESSFULLY;
  } catch (error) {
    res.error = error;
  }

  return next();
};

export default { addPokemon, editPokemon, deletePokemon, getPokemon, getPokemons };
