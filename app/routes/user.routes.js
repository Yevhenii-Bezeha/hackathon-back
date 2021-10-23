const {authJwt} = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/pokemons", controller.pokemons);
    app.get("/api/pokemon/:id", controller.pokemon);
    app.post("/api/pokemons", [authJwt.verifyToken], controller.addPokemon);
    app.delete("/api/pokemon/:id", [authJwt.verifyToken], controller.deletePokemon);

    // app.post("/api/pokemons", [authJwt.verifyToken], controller.userAddHabit);
    // app.put("/api/pokemons", [authJwt.verifyToken], controller.userUpdateHabit);
    // app.post("/api/habits/done", [authJwt.verifyToken], controller.userDoneHabit);


};
