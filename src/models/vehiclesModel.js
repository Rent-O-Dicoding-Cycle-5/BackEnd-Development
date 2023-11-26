const {realtimeDB} = require("../config");
const vehicleTypesModel = require("./vehicleTypesModel");
const vehicleBrandsModel = require("./vehicleBrandsModel");
const locationsModel = require("./locationsModel");
const usersModel = require("./usersModel");


const vehiclesModel = {
    async create(vehicle) {
        const {vehicleTypeId, vehicleBrandId, locationId, userId, plateNumber, color, year, price, status} = vehicle;
        const vehicleTypeSnapshot = await vehicleTypesModel.read(vehicleTypeId);
        const vehicleBrandSnapshot = await vehicleBrandsModel.read(vehicleBrandId);
        const locationSnapshot = await locationsModel.read(locationId);
        const userSnapshot = await usersModel.read(userId);
        const createdVehicle = await realtimeDB.ref("vehicles").push({
            vehicleTypeId,
            vehicleBrandId,
            locationId,
            userId,
            plateNumber,
            color,
            year,
            price,
            status,
            vehicleType: vehicleTypeSnapshot,
            vehicleBrand: vehicleBrandSnapshot,
            location: locationSnapshot,
            user: userSnapshot,
            createdAt: new Date().toISOString(),
        });
        return createdVehicle;
    },

    async read(id) {
        if (id) {
            const vehicleSnapshot = await realtimeDB.ref(`vehicles/${id}`).once("value");
            const vehicle = vehicleSnapshot.val();
            if (!vehicle) {
                throw new Error("Vehicle not found");
            }
            return vehicle;
        } else {
            const vehiclesSnapshot = await realtimeDB.ref("vehicles").once("value");
            const vehicles = vehiclesSnapshot.val();
            return vehicles;
        }
    },

    async update(id, vehicle) {
        const {vehicleTypeId, vehicleBrandId, locationId, userId, plateNumber, color, year, price, status} = vehicle;
        const vehicleTypeSnapshot = await vehicleTypesModel.read(vehicleTypeId);
        const vehicleBrandSnapshot = await vehicleBrandsModel.read(vehicleBrandId);
        const locationSnapshot = await locationsModel.read(locationId);
        const userSnapshot = await usersModel.read(userId);
        const updatedVehicle = await realtimeDB.ref(`vehicles/${id}`).update({
            vehicleTypeId,
            vehicleBrandId,
            locationId,
            userId,
            plateNumber,
            color,
            year,
            price,
            status,
            vehicleType: vehicleTypeSnapshot,
            vehicleBrand: vehicleBrandSnapshot,
            location: locationSnapshot,
            user: userSnapshot,
            updatedAt: new Date().toISOString(),
        });
        return updatedVehicle;
    },

    async delete(id) {
        const deletedVehicle = await realtimeDB.ref(`vehicles/${id}`).remove();
        return deletedVehicle;
    },
};


module.exports = vehiclesModel;
