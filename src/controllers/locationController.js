const locationsModel = require("../models/locationsModel");


const locationController = {
    async read(req, res) {
        try {
            const {id} = req.params;
            const location = await locationsModel.read(id);
            res.status(200).json({
                status: "success",
                message: "Read location success!",
                data: {
                    location,
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
            const locations = await locationsModel.read();
            res.status(200).json({
                status: "success",
                message: "Read all locations success!",
                data: {
                    locations,
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


module.exports = locationController;
