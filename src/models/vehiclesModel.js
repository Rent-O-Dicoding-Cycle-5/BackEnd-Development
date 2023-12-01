const {realtimeDB} = require("../config");


const vehiclesModel = {
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
};


module.exports = vehiclesModel;
