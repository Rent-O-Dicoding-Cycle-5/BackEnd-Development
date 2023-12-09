const {realtimeDB} = require("../config");
const generateId = require("../utils/generateId");

const rentsModel = {
    async create(uid, vehicleId, req) {
        const {
            startDate, endDate, pickupLocation, pickupTime,
            deliveryLocation, deliveryTime, paymentMethod,
        } = req.body;

        const partnerSnapshot = await realtimeDB.ref(`partners/${uid}`).once("value");
        const vehicleSnapshot = await realtimeDB.ref(`vehicles/${vehicleId}`).once("value");

        const partner = partnerSnapshot.val();
        const vehicle = vehicleSnapshot.val();

        if (!partner) {
            throw new Error("Partner not found");
        }

        if (!vehicle) {
            throw new Error("Vehicle not found");
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
            partnerId: uid,
            vehicleId: vehicleId,
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
            partner: partner,
            vehicle: vehicle,
        };
    },
};

module.exports = rentsModel;
