const usersModel = require("../models/usersModel");


const userController = {
    async read(req, res) {
        try {
            const {uid} = req.user;
            const user = await usersModel.read(uid);
            res.status(200).json({
                status: "success",
                message: "Read user success!",
                data: {
                    user,
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


module.exports = userController;
