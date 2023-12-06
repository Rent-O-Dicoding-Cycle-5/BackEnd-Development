const partnerVehiclesModel = require("../models/partnerVehiclesModel");


const partnerVehiclesController = {
    async create(req, res) {
        try {
            const {uid} = req.user;
            const vehicle = await partnerVehiclesModel.create(uid, req);
            res.status(200).json({
                status: "success",
                message: "Create partner vehicle success!",
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

    async read(req, res) {
        try {
            const {uid} = req.user;
            const vehicles = await partnerVehiclesModel.read(uid);
            res.status(200).json({
                status: "success",
                message: "Read partner vehicles success!",
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

    async update(req, res) {
        try {
            const {uid} = req.user;
            const vehicleId = req.params.id;
            const vehicle = await partnerVehiclesModel.update(uid, vehicleId, req);
            res.status(200).json({
                status: "success",
                message: "Update partner vehicle success!",
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

    async delete(req, res) {
        try {
            const {uid} = req.user;
            const vehicleId = req.params.id;
            const vehicle = await partnerVehiclesModel.delete(uid, vehicleId);
            res.status(200).json({
                status: "success",
                message: "Delete partner vehicle success!",
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
};


module.exports = partnerVehiclesController;
