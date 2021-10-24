import { PokemonModel } from '../models/index.js';

const allAccess = (req, res, next) => {
  res
    .status(200)
    .send('Welcome to pokemon app. Please sign in or register to make your first habits');
};

const getPokemons = async (req, res, next) => {
  const pokemons = await PokemonModel.find();
  let statusMessage;
  let status;
  if (pokemons.length) {
    statusMessage = 'You`ve got all pokemons';
    status = 200;
  } else {
    statusMessage = 'pokemons wasn`t found';
    status = 404;
  }
  sendResponse({ res, data: pokemons, status, statusMessage });
};

const getPokemon = async (req, res, next) => {
  const { id } = req.params;
  const pokemon = await PokemonModel.findById(id);
  let statusMessage;
  let status;
  if (pokemon) {
    statusMessage = 'here is your pokemon';
    status = 200;
  } else {
    statusMessage = `we didn't find this pokemon ${id}`;
    status = 404;
  }
  sendResponse({ res, data: pokemon, status, statusMessage });
};

const addPokemon = async (req, res, next) => {
  const newPokemon = { ...req.body, userId: req.userId };
  const pokemonAdd = await PokemonModel.create(newPokemon);
  let statusMessage;
  let status;
  if (pokemonAdd) {
    statusMessage = `pokemon ${req.body?.name} is added`;
    status = 200;
  } else {
    statusMessage = `pokemon ${req.body?.name} wasn't added`;
    status = 400;
  }

  sendResponse({ res, data: pokemonAdd, status, statusMessage });
};

const editPokemon = async (req, res, next) => {
  const pokemonId = req.params.id;
  const { userId } = await PokemonModel.findById(pokemonId);
  let statusMessage;
  let status;
  let edited;
  if (userId === req.userId) {
    edited = await PokemonModel.findOneAndUpdate(pokemonId, { ...req.body }, { new: true });
    if (edited) {
      statusMessage = 'pokemon is edited';
      status = 200;
    } else {
      statusMessage = `pokemon ${pokemonId} wasn't edited`;
      status = 404;
    }
  } else {
    statusMessage = 'failed, no permission';
    status = 401;
  }

  sendResponse({ res, data: edited, status, statusMessage });
};

const deletePokemon = async (req, res, next) => {
  const pokemonId = req.params.id;
  let statusMessage;
  let status;
  const deleted = await PokemonModel.findByIdAndDelete(pokemonId);

  if (deleted) {
    statusMessage = 'pokemon is deleted';
    status = 200;
  } else {
    statusMessage = `pokemon ${pokemonId} wasn't deleted`;
    status = 404;
  }

  res.data = { res, data: deleted, status, statusMessage };

  return next();
};

export default { addPokemon, editPokemon, deletePokemon, getPokemon, getPokemons };
