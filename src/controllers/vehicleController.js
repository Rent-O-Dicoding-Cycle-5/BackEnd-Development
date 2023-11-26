const vehiclesModel = require("../models/vehiclesModel");


const vehicleController = {
    async read(req, res) {
        try {
            const {id} = req.params;
            const vehicle = await vehiclesModel.read(id);
            res.status(200).json({
                status: "success",
                message: "Read vehicle success!",
                data: {
                    vehicle,
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
            const vehicles = await vehiclesModel.read();
            res.status(200).json({
                status: "success",
                message: "Read vehicles success!",
                data: {
                    vehicles,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    },

    async create(req, res) {
        try {
            const newVehicle = await vehiclesModel.create(req.body);
            res.status(201).json({
                status: "success",
                message: "Create vehicle success!",
                data: {
                    vehicle: newVehicle,
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
            const {id} = req.params;
            const updatedVehicle = await vehiclesModel.update(id, req.body);
            res.status(200).json({
                status: "success",
                message: "Update vehicle success!",
                data: {
                    vehicle: updatedVehicle,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    },

    async delete(req, res) {
        try {
            const {id} = req.params;
            const deletedVehicle = await vehiclesModel.delete(id);
            res.status(200).json({
                status: "success",
                message: "Delete vehicle success!",
                data: {
                    vehicle: deletedVehicle,
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


module.exports = vehicleController;
