const {realtimeDB} = require("../config");


const vehiclesModel = {
    async read(id) {
        if (id) {
            const vehicleSnapshot = await realtimeDB.ref(`vehicles/${id}`).once("value");
            const vehicle = vehicleSnapshot.val();
            if (!vehicle) {
                throw new Error("Vehicle not found");
            }
            return {vehicleId: id, ...vehicle};
        } else {
            const vehiclesSnapshot = await realtimeDB.ref("vehicles").once("value");
            const vehicles = vehiclesSnapshot.val();
            if (!vehicles) {
                throw new Error("Vehicles not found");
            }

            const vehiclesArray = Object.entries(vehicles).map(([vehicleId, vehicle]) => ({
                vehicleId,
                ...vehicle,
            }));
            return vehiclesArray;
        }
    },
};


module.exports = vehiclesModel;
