const vehicleTypesModel = require("../models/vehicleTypesModel");


const vehicleTypeController = {
    async read(req, res) {
        try {
            const {id} = req.params;
            const vehicleType = await vehicleTypesModel.read(id);
            res.status(200).json({
                status: "success",
                message: "Read vehicleType success!",
                data: {
                    vehicleType,
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
            const vehicleTypes = await vehicleTypesModel.read();
            res.status(200).json({
                status: "success",
                message: "Read all vehicleTypes success!",
                data: {
                    vehicleTypes,
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


module.exports = vehicleTypeController;
