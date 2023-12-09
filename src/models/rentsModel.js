const {realtimeDB} = require("../config");
const generateId = require("../utils/generateId");

const rentsModel = {
    async create(uid, vehicleId, req) {
        const {
            startDate, endDate, pickupLocation, pickupTime,
            deliveryLocation, deliveryTime, paymentMethod,
        } = req.body;

        const vehicleSnapshot = await realtimeDB.ref(`vehicles/${vehicleId}`).once("value");
        const vehicle = vehicleSnapshot.val();

        if (!vehicle) {
            throw new Error("Vehicle not found");
        }
        if (vehicle.partner.partnerId === uid) {
            throw new Error("Vehicle owner is not allowed to rent their own vehicle.");
        }

        const newRentId = generateId();

        await realtimeDB.ref(`rents/${uid}/${newRentId}`).set({
            rentId: newRentId,
            startDate,
            endDate,
            pickupLocation,
            pickupTime,
            deliveryLocation,
            deliveryTime,
            paymentMethod,
            userId: uid,
            vehicleId,
            createdAt: new Date().toISOString(),
        });

        await realtimeDB.ref(`vehicles/${vehicleId}`).update({
            isAvailable: false,
        });

        return newRentId;
    },

    async read(uid, rentId) {
        const rentSnapshot = await realtimeDB.ref(`rents/${uid}/${rentId}`).once("value");
        const rent = rentSnapshot.val();

        if (!rent) {
            throw new Error("Rent not found");
        }

        const {partnerId, vehicleId} = rent;

        const partnerSnapshot = await realtimeDB.ref(`partners/${partnerId}`).once("value");
        const vehicleSnapshot = await realtimeDB.ref(`vehicles/${vehicleId}`).once("value");

        const partner = partnerSnapshot.val();
        const vehicle = vehicleSnapshot.val();

        return {
            ...rent,
            partner,
            vehicle,
        };
    },
};

module.exports = rentsModel;
