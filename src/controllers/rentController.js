const rentsModel = require("../models/rentsModel");

const rentController = {
    async create(req, res) {
        try {
            const {uid} = req.user;
            const {vehicleId} = req.params;
            const rent = await rentsModel.create(uid, vehicleId, req.body);
            res.status(201).json({
                status: "success",
                message: "Rent created successfully",
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

    async read(req, res) {
        try {
            const {uid} = req.user;
            const {rentId} = req.params;
            const rent = await rentsModel.read(uid, rentId);
            res.status(200).json({
                status: "success",
                message: "Read rent success",
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

};

module.exports = rentController;
