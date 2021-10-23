const {getUserData} = require("../models");

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username

    const existUsers = getUserData();

    const userToAuth = req.body;

    //check if the username exist or not
    const username = existUsers.find(user => user.username === userToAuth.username);
    const email = existUsers.find(user => user.email === userToAuth.email);

    if (username) {
        res.status(400).send({msg: "Username is already in use!"});
        return;
    }

    if (email) {
        res.status(400).send({msg: "Email is already in use!"});
        return;
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
