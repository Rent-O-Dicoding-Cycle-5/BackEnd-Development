const userRentsModel = require("../models/userRentsModel");


const userRentsController = {
    async read(req, res) {
        try {
            const {uid, rentId} = req.params;
            const rent = await userRentsModel.read(uid, rentId);
            res.status(200).json({
                status: "success",
                message: "Read user rent success!",
                data: {
                    rent,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    },

    async readAll(req, res) {
        try {
            const {uid} = req.params;
            const rents = await userRentsModel.readAll(uid);
            res.status(200).json({
                status: "success",
                message: "Read all user rents success!",
                data: {
                    rents,
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


module.exports = userRentsController;
