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
};


module.exports = vehicleController;
