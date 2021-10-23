const { Pokemon, Comment, User } = require("../models");
const { sendResponse } = require("../middlewares")
exports.allAccess = (req, res) => {
    res.status(200).send("Welcome to pokemon app. Please sign in or register to make your first habits");
};

exports.pokemons = async (req, res) => {
    const pokemons = await Pokemon.find();
    let statusMessage;
    let status;
    if (pokemons.length){
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
    if (pokemon){
        statusMessage = 'here is your pokemon';
        status = 200;
    } else {
        statusMessage = `we didn't find this pokemon ${id}`;
        status = 404;
    }
    sendResponse({res, data: pokemon, status, statusMessage})
};

exports.addPokemon = async (req, res) => {

    const newPokemon ={ ...req.body, userId: req.userId };
    const pokemonAdd = await Pokemon.create(newPokemon);
    let statusMessage;
    let status;
    if (pokemonAdd){
        statusMessage = `pokemon ${req.body?.name} is added`;
        status = 200;
    } else {
        statusMessage = `pokemon ${req.body?.name} wasn't added`;
        status = 400;
    }

    sendResponse({res, data: pokemonAdd, status, statusMessage})
};

exports.editPokemon = async (req, res) => {
    const pokemonId = req.params.id;
    const { userId } = await Pokemon.findById(pokemonId)
    let statusMessage;
    let status;
    let edited;
    if (userId === req.userId) {
        edited = await Pokemon.findOneAndUpdate(pokemonId, {...req.body}, {new: true})
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

    sendResponse({res, data: edited, status, statusMessage})
};

exports.deletePokemon = async (req, res) => {
    const pokemonId = req.params.id;
    let statusMessage;
    let status;
    const deleted = await Pokemon.findByIdAndDelete(pokemonId)

    if (deleted) {
        statusMessage = 'pokemon is deleted';
        status = 200;
    } else {
        statusMessage = `pokemon ${pokemonId} wasn't deleted`;
        status = 404;
    }

    sendResponse({res, data: deleted, status, statusMessage})
};

exports.addComment = async (req, res) => {

    const newComment ={ ...req.body, userId: req.userId };
    const comment = await Comment.create(newComment);
    let statusMessage;
    let status;
    if (comment){
        statusMessage = `comment is added`;
        status = 200;
    } else {
        statusMessage = `comment wasn't added`;
        status = 400;
    }

    sendResponse({res, data: comment, status, statusMessage})
};

exports.deleteComment = async (req, res) => {

    const commentId = req.params.id;
    const { userId } = await Comment.findById(commentId)
    const { role } = await User.findById(req.userId)

    let statusMessage;
    let status;
    let deleted;
    if (userId === req.userId || role === 'admin') {
        deleted = await Comment.findByIdAndDelete(commentId)
        console.log('deleted', deleted);

        if (deleted) {
            statusMessage = 'comment is deleted';
            status = 200;
        } else {
            statusMessage = `comment ${commentId} wasn't deleted`;
            status = 404;
        }
    } else {
        statusMessage = 'failed, no permission';
        status = 401;
    }

    sendResponse({res, data: deleted, status, statusMessage})
};

// exports.editComment = async (req, res) => {
//
//     const newComment ={ ...req.body, userId: req.userId };
//     const comment = await Comment.create(newComment);
//     let statusMessage;
//     let status;
//     if (comment){
//         statusMessage = `comment is added`;
//         status = 200;
//     } else {
//         statusMessage = `comment wasn't added`;
//         status = 400;
//     }
//
//     sendResponse({res, data: comment, status, statusMessage})
// };
//
// exports.users = async (req, res) => {
//
//     const newComment ={ ...req.body, userId: req.userId };
//     const comment = await Comment.create(newComment);
//     let statusMessage;
//     let status;
//     if (comment){
//         statusMessage = `comment is added`;
//         status = 200;
//     } else {
//         statusMessage = `comment wasn't added`;
//         status = 400;
//     }
//
//     sendResponse({res, data: comment, status, statusMessage})
// };
//
// exports.user = async (req, res) => {
//
//     const newComment ={ ...req.body, userId: req.userId };
//     const comment = await Comment.create(newComment);
//     let statusMessage;
//     let status;
//     if (comment){
//         statusMessage = `comment is added`;
//         status = 200;
//     } else {
//         statusMessage = `comment wasn't added`;
//         status = 400;
//     }
//
//     sendResponse({res, data: comment, status, statusMessage})
// };