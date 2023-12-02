const vehiclesModel = require("./vehiclesModel");
const vehicleTypesModel = require("./vehicleTypesModel");
const vehicleBrandsModel = require("./vehicleBrandsModel");
const locationsModel = require("./locationsModel");


const vehicleFiltersModel = {
    async filterByType(type) {
        let vehicles = await vehiclesModel.read();
        const vehicleTypes = await vehicleTypesModel.read();
        const vehicleType = vehicleTypes.find((vehicleType) => vehicleType === type);

        if (!vehicleType) {
            throw new Error(`Vehicle type ${type} not found`);
        }

        if (!Array.isArray(vehicles)) {
            vehicles = Object.values(vehicles);
        }

        let filteredVehicles = vehicles.filter((vehicle) => vehicle.vehicleInformation.type === vehicleType);
        filteredVehicles = filteredVehicles.map((vehicle) => ({
            vehicleId: vehicle.vehicleId,
            ...vehicle,
        }));

        return filteredVehicles;
    },

    async filterByBrand(brand) {
        let vehicles = await vehiclesModel.read();
        const vehicleBrands = await vehicleBrandsModel.read();
        const vehicleBrand = vehicleBrands.find((vehicleBrand) => vehicleBrand === brand);

        if (!vehicleBrand) {
            throw new Error(`Vehicle brand ${brand} not found`);
        }

        if (!Array.isArray(vehicles)) {
            vehicles = Object.values(vehicles);
        }

        let filteredVehicles = vehicles.filter((vehicle) => vehicle.vehicleInformation.brand === vehicleBrand);
        filteredVehicles = filteredVehicles.map((vehicle) => ({
            vehicleId: vehicle.vehicleId,
            ...vehicle,
        }));

        return filteredVehicles;
    },

    async filterByLocation(location) {
        let vehicles = await vehiclesModel.read();
        const locations = await locationsModel.read();
        const locationData = locations.find((locationData) => locationData === location);

        if (!locationData) {
            throw new Error(`Location ${location} not found`);
        }

        if (!Array.isArray(vehicles)) {
            vehicles = Object.values(vehicles);
        }

        let filteredVehicles = vehicles.filter((vehicle) => vehicle.locations.includes(locationData));
        filteredVehicles = filteredVehicles.map((vehicle) => ({
            vehicleId: vehicle.vehicleId,
            ...vehicle,
        }));

        return filteredVehicles;
    },

    async filterByTypeAndBrand(type, brand) {
        let vehicles = await vehiclesModel.read();
        const vehicleTypes = await vehicleTypesModel.read();
        const vehicleBrands = await vehicleBrandsModel.read();
        const vehicleType = vehicleTypes.find((vehicleType) => vehicleType === type);
        const vehicleBrand = vehicleBrands.find((vehicleBrand) => vehicleBrand === brand);

        if (!vehicleType) {
            throw new Error(`Vehicle type ${type} not found`);
        }

        if (!vehicleBrand) {
            throw new Error(`Vehicle brand ${brand} not found`);
        }

        if (!Array.isArray(vehicles)) {
            vehicles = Object.values(vehicles);
        }

        let filteredVehicles = vehicles.filter((vehicle) =>
            vehicle.vehicleInformation.type === vehicleType && vehicle.vehicleInformation.brand === vehicleBrand);
        filteredVehicles = filteredVehicles.map((vehicle) => ({
            vehicleId: vehicle.vehicleId,
            ...vehicle,
        }));

        return filteredVehicles;
    },

    async filterByTypeAndLocation(type, location) {
        let vehicles = await vehiclesModel.read();
        const vehicleTypes = await vehicleTypesModel.read();
        const locations = await locationsModel.read();
        const vehicleType = vehicleTypes.find((vehicleType) => vehicleType === type);
        const locationData = locations.find((locationData) => locationData === location);

        if (!vehicleType) {
            throw new Error(`Vehicle type ${type} not found`);
        }

        if (!locationData) {
            throw new Error(`Location ${location} not found`);
        }

        if (!Array.isArray(vehicles)) {
            vehicles = Object.values(vehicles);
        }

        let filteredVehicles = vehicles.filter((vehicle) =>
            vehicle.vehicleInformation.type === vehicleType && vehicle.locations.includes(locationData));
        filteredVehicles = filteredVehicles.map((vehicle) => ({
            vehicleId: vehicle.vehicleId,
            ...vehicle,
        }));

        return filteredVehicles;
    },

    async filterByBrandAndLocation(brand, location) {
        let vehicles = await vehiclesModel.read();
        const vehicleBrands = await vehicleBrandsModel.read();
        const locations = await locationsModel.read();
        const vehicleBrand = vehicleBrands.find((vehicleBrand) => vehicleBrand === brand);
        const locationData = locations.find((locationData) => locationData === location);

        if (!vehicleBrand) {
            throw new Error(`Vehicle brand ${brand} not found`);
        }

        if (!locationData) {
            throw new Error(`Location ${location} not found`);
        }

        if (!Array.isArray(vehicles)) {
            vehicles = Object.values(vehicles);
        }

        let filteredVehicles = vehicles.filter((vehicle) =>
            vehicle.vehicleInformation.brand === vehicleBrand && vehicle.locations.includes(locationData));
        filteredVehicles = filteredVehicles.map((vehicle) => ({
            vehicleId: vehicle.vehicleId,
            ...vehicle,
        }));

        return filteredVehicles;
    },

    async filterByTypeAndBrandAndLocation(type, brand, location) {
        let vehicles = await vehiclesModel.read();
        const vehicleTypes = await vehicleTypesModel.read();
        const vehicleBrands = await vehicleBrandsModel.read();
        const locations = await locationsModel.read();
        const vehicleType = vehicleTypes.find((vehicleType) => vehicleType === type);
        const vehicleBrand = vehicleBrands.find((vehicleBrand) => vehicleBrand === brand);
        const locationData = locations.find((locationData) => locationData === location);

        if (!vehicleType) {
            throw new Error(`Vehicle type ${type} not found`);
        }

        if (!vehicleBrand) {
            throw new Error(`Vehicle brand ${brand} not found`);
        }

        if (!locationData) {
            throw new Error(`Location ${location} not found`);
        }

        if (!Array.isArray(vehicles)) {
            vehicles = Object.values(vehicles);
        }

        let filteredVehicles = vehicles.filter((vehicle) =>
            vehicle.vehicleInformation.type === vehicleType &&
            vehicle.vehicleInformation.brand === vehicleBrand &&
            vehicle.locations.includes(locationData));
        filteredVehicles = filteredVehicles.map((vehicle) => ({
            vehicleId: vehicle.vehicleId,
            ...vehicle,
        }));

        return filteredVehicles;
    },
};


module.exports = vehicleFiltersModel;
