const vehicleFiltersModel = require("../models/vehicleFiltersModel");


const vehicleFilterController = {
    async filterByType(req, res) {
        try {
            const {type} = req.params;
            const filteredVehicles = await vehicleFiltersModel.filterByType(type);
            res.status(200).json({
                status: "success",
                message: "Filter vehicles by type success!",
                data: {
                    vehicles: filteredVehicles,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    },

    async filterByBrand(req, res) {
        try {
            const {brand} = req.params;
            const filteredVehicles = await vehicleFiltersModel.filterByBrand(brand);
            res.status(200).json({
                status: "success",
                message: "Filter vehicles by brand success!",
                data: {
                    vehicles: filteredVehicles,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    },

    async filterByLocation(req, res) {
        try {
            const {location} = req.params;
            const filteredVehicles = await vehicleFiltersModel.filterByLocation(location);
            res.status(200).json({
                status: "success",
                message: "Filter vehicles by location success!",
                data: {
                    vehicles: filteredVehicles,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    },

    async filterByTypeAndBrand(req, res) {
        try {
            const {type, brand} = req.params;
            const filteredVehicles = await vehicleFiltersModel.filterByTypeAndBrand(type, brand);
            res.status(200).json({
                status: "success",
                message: "Filter vehicles by type and brand success!",
                data: {
                    vehicles: filteredVehicles,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    },

    async filterByTypeAndLocation(req, res) {
        try {
            const {type, location} = req.params;
            const filteredVehicles = await vehicleFiltersModel.filterByTypeAndLocation(type, location);
            res.status(200).json({
                status: "success",
                message: "Filter vehicles by type and location success!",
                data: {
                    vehicles: filteredVehicles,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    },

    async filterByBrandAndLocation(req, res) {
        try {
            const {brand, location} = req.params;
            const filteredVehicles = await vehicleFiltersModel.filterByBrandAndLocation(brand, location);
            res.status(200).json({
                status: "success",
                message: "Filter vehicles by brand and location success!",
                data: {
                    vehicles: filteredVehicles,
                },
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    },

    async filterByTypeAndBrandAndLocation(req, res) {
        try {
            const {type, brand, location} = req.params;
            const filteredVehicles = await vehicleFiltersModel.filterByTypeAndBrandAndLocation(type, brand, location);
            res.status(200).json({
                status: "success",
                message: "Filter vehicles by type, brand, and location success!",
                data: {
                    vehicles: filteredVehicles,
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


module.exports = vehicleFilterController;
