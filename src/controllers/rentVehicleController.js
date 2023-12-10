const rentVehiclesModel = require("../models/rentVehiclesModel");


const rentVehicleController = {
    async create(req, res) {
        try {
            const {uid} = req.user;
            const vehicleId = req.params.id;
            const rent = await rentVehiclesModel.create(uid, vehicleId, req.body);
            res.status(201).json({
                status: "success",
                message: "Create rent success",
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
            const rentId = req.params.id;
            const rent = await rentVehiclesModel.read(uid, rentId);
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

    async update(req, res) {
        try {
            const {uid} = req.user;
            const rentId = req.params.id;
            const pay = await rentVehiclesModel.update(uid, rentId, req.body);
            res.status(200).json({
                status: "success",
                message: "Update rent success",
                data: {
                    pay,
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


module.exports = rentVehicleController;
