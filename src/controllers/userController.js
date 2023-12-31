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

    async update(req, res) {
        try {
            const {uid} = req.user;
            const user = await usersModel.update(uid, req.body);
            res.status(200).json({
                status: "success",
                message: "Update user success!",
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

    async uploadImgProfile(req, res) {
        try {
            const {uid} = req.user;
            const user = await usersModel.uploadImgProfile(uid, req.file);
            res.status(200).json({
                status: "success",
                message: "Upload image profile success!",
                data: {
                    imageUrl: user,
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
