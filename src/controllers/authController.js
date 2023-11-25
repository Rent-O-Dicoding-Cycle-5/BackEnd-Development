const usersModel = require("../models/usersModel");


const authController = {
    async register(req, res) {
        try {
            const newUser = await usersModel.create(req.body);
            res.status(201).json({
                status: "success",
                message: "Register user success!",
                data: {
                    uid: newUser.uid,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    },

    async login(req, res) {
        try {
            const user = await usersModel.read(req.body);
            res.status(200).json({
                status: "success",
                message: "Login success!",
                data: {
                    uid: user.uid,
                    username: user.username,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    roles: user.roles,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    },
};


module.exports = authController;
