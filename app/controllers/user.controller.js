const {findUserById, getUserData, saveUserData} = require('../models');
const { Pokemon } = require("../models");
const { sendResponse } = require("../middlewares")
exports.allAccess = (req, res) => {
    res.status(200).send("Welcome to pokemon app. Please sign in or register to make your first habits");
};

exports.pokemons = async (req, res) => {
    const pokemons = await Pokemon.find();
    let statusMessage;
    let status;
    if(pokemons.length){
        statusMessage = 'You`ve got all pokemons';
        status = 200;
    } else {
        statusMessage = 'pokemons wasn`t found';
        status = 404;
    }
    sendResponse({res, data: pokemons, status, statusMessage})
};

exports.pokemon = async (req, res) => {
    const { id } = req.params;
    const pokemon = await Pokemon.findById(id);
    let statusMessage;
    let status;
    if(pokemon){
        statusMessage = 'here is your pokemon';
        status = 200;
    } else {
        statusMessage = `we didn't find this pokemon ${id}`;
        status = 404;
    }
    sendResponse({res, data: pokemon, status, statusMessage})
};

exports.addPokemon = async (req, res) => {
    console.log('req', req);

    const newPokemon = req.body;
    const pokemonAdd = await Pokemon.create(newPokemon);
    let pokemon;
    let statusMessage;
    let status;
    if(pokemonAdd){
        //console.log(pokemon);
        pokemon = await Pokemon.findById(id);
        statusMessage = `pokemon ${req.body?.name} is added`;
        status = 200;
    } else {
        statusMessage = `pokemon ${req.body?.name} wasn't added`;
        status = 400;
    }

    sendResponse({res, data: pokemon, status, statusMessage})
};

exports.deletePokemon = async (req, res) => {

    const pokemonId = req.query.id;
    let statusMessage;
    let status;
    const deleted = await Pokemon.findOneAndDelete(pokemonId)
      .then(deletedDocument => {
          if(deletedDocument) {
              statusMessage = 'pokemon is deleted';
              status = 200;
          } else {
              statusMessage = `pokemon ${id} wasn't deleted`;
              status = 404;
          }
          return deletedDocument
      })

    sendResponse({res, data: deleted, status, statusMessage})
};