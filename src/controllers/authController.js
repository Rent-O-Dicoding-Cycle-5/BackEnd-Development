const usersModel = require("../models/usersModel");


const authController = {
    async register(req, res) {
        try {
            const newUser = await usersModel.create(req.body);
            // const users = await usersModel.read(newUser.uid);
            res.status(201).json({
                status: "success",
                message: "Register user success!",
                data: {
                    uid: newUser.uid,
                },
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    },

    async login(req, res) {
        try {
            const {email, password} = req.body;

            // const userCredential = await usersModel.signInWithEmailAndPassword(email, password);
            // const user = userCredential.user;

            res.status(200).json({
                status: "success",
                message: "Login success!",
                data: {
                    uid: user.uid,
                    name: user.fullName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    role: user.role,
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
