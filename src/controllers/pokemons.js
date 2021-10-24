import { PokemonModel } from '../models/index.js';
import { ResponseError } from '../helpers/index.js';
import { ErrorMessages, Messages } from '../common/index.js';

const getPokemons = async (req, res, next) => {
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
  try {
    const pockemonId = req.params.id;
    const pokemon = await PokemonModel.findById(pockemonId);

    if (!pokemon) {
      throw new ResponseError(ErrorMessages.Pokemons.NOT_FOUND);
    }

    req.data = pokemon;
  } catch (error) {
    res.error = error;
  }

  return next();
};

const addPokemon = async (req, res, next) => {
  try {
    const newPokemon = { ...req.body, userId: req.userId };
    const pockemon = await PokemonModel.create(newPokemon);

    if (!pockemon) {
      throw new ResponseError(ErrorMessages.Pokemons.ADDING_ERROR);
    }

    res.message = Messages.Pokemons.ADDED_SUCCESSFULLY;
  } catch (error) {
    res.error = error;
  }

  return next();
};

const editPokemon = async (req, res, next) => {
  try {
    const pokemonId = req.params.id;
    const { userId } = await PokemonModel.findById(pokemonId);

    if (userId !== req.userId) {
      throw new ResponseError(ErrorMessages.Pokemons.EDITING_ERROR);
    }

    const isEdited = await PokemonModel.findOneAndUpdate(pokemonId, { ...req.body }, { new: true });

    if (!isEdited) {
      throw new ResponseError(ErrorMessages.Pokemons.EDITING_ERROR);
    }

    res.message = Messages.Pokemons.EDITED_SUCCESSFULLY;
  } catch (error) {
    res.error = error;
  }

  return next();
};

const deletePokemon = async (req, res, next) => {
  try {
    const pokemonId = req.params.id;
    const isDeleted = await PokemonModel.findByIdAndDelete(pokemonId);

    if (!isDeleted) {
      throw new ResponseError(ErrorMessages.Pokemons);
    }

    res.message = Messages.Pokemons.DELETED_SUCCESSFULY;
  } catch (error) {
    res.error = error;
  }

  return next();
};

export default { addPokemon, editPokemon, deletePokemon, getPokemon, getPokemons };
