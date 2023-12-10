const {realtimeDB} = require("../config");
const vehiclesModel = require("./vehiclesModel");
const generateId = require("../utils/generateId");


const rentVehiclesModel = {
    async create(uid, vehicleId, rent) {
        const {
            startDate, endDate, pickupLocation, pickupTime,
            deliveryLocation, deliveryTime, paymentMethod,
        } = rent;

        const vehicle = await vehiclesModel.read(vehicleId);
        if (!vehicle) {
            throw new Error("Vehicle not found");
        }
        if (!vehicle.isAvailable) {
            throw new Error("Vehicle is not available");
        }
        if (vehicle.partner.partnerId === uid) {
            throw new Error("You can't rent your own vehicle");
        }

        const newRentId = generateId();

        const schedule = {startDate, endDate};
        const pickUp = {location: pickupLocation, time: pickupTime};
        const delivery = {location: deliveryLocation, time: deliveryTime};

        await realtimeDB.ref(`rents/${uid}/${newRentId}`).set({
            rentId: newRentId,
            userId: uid,
            vehicleId,
            schedule,
            pickUp,
            delivery,
            paymentMethod,
            status: "Waiting",
            createdAt: new Date().toISOString(),
        });

        return newRentId;
    },

    async read(uid, rentId) {
        const rentSnapshot = await realtimeDB.ref(`rents/${uid}/${rentId}`).once("value");
        const rent = rentSnapshot.val();
        if (!rent) {
            throw new Error("Rent not found");
        }

        return rent;
    },

    async update(uid, rentId, pay) {
        const {totalPayment} = pay;

        const rentSnapshot = await realtimeDB.ref(`rents/${uid}/${rentId}`).once("value");
        const rent = rentSnapshot.val();
        if (!rent) {
            throw new Error("Rent not found");
        }

        await realtimeDB.ref(`rents/${uid}/${rentId}`).update({
            totalPayment,
            status: "Success",
            updatedAt: new Date().toISOString(),
        });

        await realtimeDB.ref(`vehicles/${rent.vehicleId}`).update({
            isAvailable: false,
        });

        return rent;
    },
};


module.exports = rentVehiclesModel;
