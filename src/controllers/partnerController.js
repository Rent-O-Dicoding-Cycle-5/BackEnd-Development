const partnersModel = require("../models/partnersModel");


const partnersController = {
    async create(req, res) {
        try {
            const {uid} = req.user;
            const partner = await partnersModel.create(uid, req.body);
            res.status(200).json({
                status: "success",
                message: "Create partner success!",
                data: {
                    partner,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    },

    async read(req, res) {
        try {
            const {uid} = req.user;
            const partner = await partnersModel.read(uid);
            res.status(200).json({
                status: "success",
                message: "Read partner success!",
                data: {
                    partner,
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
            const partner = await partnersModel.update(uid, req.body);
            res.status(200).json({
                status: "success",
                message: "Update partner success!",
                data: {
                    partner,
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


module.exports = partnersController;
