const config = require("../config/auth.config");
const { User } = require("../models")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendResponse = require("../middlewares/sendResponse");

exports.signup = async (req, res) => {
    const { email, name, password: passwordToHash } = req.body;
    const userIsExist = await User.findOne({ email } );

    if (userIsExist) {
        return sendResponse({
            res,
            status: 409,
            statusMessage: "Error",
            data: {
                message: "User with this email already exist",
            },
        });
    }

    const password = await bcrypt.hashSync(passwordToHash, 8);
    const newUser = new User({email, name, password });
    await newUser.save();

    return sendResponse({
        res,
        status: 200,
        statusMessage: "User successfully registered",
        data: {
            message: "User successfully registered",
        },
    });
};

exports.signin = async (req, res) => {
    const { email, password: passwordToCheck } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        return sendResponse({
            res,
            status: 404,
            statusMessage: "error",
            data: {
                message: "User wasn`t registered",
            },
        });
    }

    const passwordIsValid = await bcrypt.compareSync(passwordToCheck, user.password);

    if (!passwordIsValid) {
        return sendResponse({
            res,
            status: 400,
            statusMessage: "error",
            data: {
                message: "User or password not valid",
            },
        });
    }

    const accessToken = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 60 * 60 * 24 * 30 // 30 days
    });

    return sendResponse({
        res,
        status: 200,
        statusMessage: "successfully login",
        data: {
            name: user.name,
            email: user.email,
            accessToken,
        },
    });
};
