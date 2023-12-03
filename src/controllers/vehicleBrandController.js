const vehicleBrandsModel = require("../models/vehicleBrandsModel");


const vehicleBrandController = {
    async read(req, res) {
        try {
            const {id} = req.params;
            const vehicleBrand = await vehicleBrandsModel.read(id);
            res.status(200).json({
                status: "success",
                message: "Read vehicleBrand success!",
                data: {
                    vehicleBrand,
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
            const vehicleBrands = await vehicleBrandsModel.read();
            res.status(200).json({
                status: "success",
                message: "Read all vehicleBrands success!",
                data: {
                    vehicleBrands,
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


module.exports = vehicleBrandController;
