const {realtimeDB} = require("../config");


const vehicleTypesModel = {
    async read(id) {
        if (id) {
            const vehicleTypeSnapshot = await realtimeDB.ref(`vehicleTypes/${id}`).once("value");
            const vehicleType = vehicleTypeSnapshot.val();
            if (!vehicleType) {
                throw new Error("Vehicle type not found");
            }
            return vehicleType;
        } else {
            const vehicleTypesSnapshot = await realtimeDB.ref("vehicleTypes").once("value");
            const vehicleTypes = vehicleTypesSnapshot.val();
            return vehicleTypes;
        }
    },
};


module.exports = vehicleTypesModel;
