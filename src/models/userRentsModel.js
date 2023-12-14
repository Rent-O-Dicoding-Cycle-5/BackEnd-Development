const {realtimeDB} = require("../config");
const rentVehiclesModel = require("./rentVehiclesModel");


const userRentsModel = {
    async read(uid, rentId) {
        const rent = await rentVehiclesModel.read(uid, rentId);
        return rent;
    },

    async readAll(uid) {
        const rentsSnapshot = await realtimeDB.ref(`rents/${uid}`).once("value");
        const rents = rentsSnapshot.val();
        if (!rents) {
            throw new Error("Rents not found");
        }

        const rentsArray = Object.entries(rents).map(([rentId, rent]) => ({
            rentId,
            ...rent,
        }));

        return rentsArray;
    },
};


module.exports = userRentsModel;
